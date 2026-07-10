import { query, getClient } from '../config/db.js';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/authHelper.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { OAuth2Client } from 'google-auth-library';
import env from '../config/env.js';

// Load Google Client ID from environment variables
const googleClientId = process.env.GOOGLE_CLIENT_ID || env.googleClientId;
const googleClient = new OAuth2Client(googleClientId);

/**
 * Handle local user signup.
 */
export const signup = async (req, res, next) => {
  const { email, password, full_name, role } = req.body;

  const dbClient = await getClient();
  try {
    await dbClient.query('BEGIN');
    
    // Check if email already registered
    const existingUserRes = await dbClient.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUserRes.rows.length > 0) {
      throw new AppError('Email already registered', 409);
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert new user
    const userRes = await dbClient.query(
      `INSERT INTO users (email, password_hash, full_name, role) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, email, full_name, role, avatar_url, is_verified, provider, created_at`,
      [email, passwordHash, full_name, role || 'candidate']
    );
    const user = userRes.rows[0];

    // Create user profile
    await dbClient.query(
      `INSERT INTO user_profiles (user_id) VALUES ($1)`,
      [user.id]
    );

    // Generate JWT access & refresh tokens
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store refresh token session in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    await dbClient.query(
      `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, refreshToken, expiresAt, ipAddress, userAgent]
    );

    await dbClient.query('COMMIT');

    return ApiResponse.success(res, {
      statusCode: 201,
      message: 'User registered successfully',
      data: {
        user,
        token: accessToken,
        refreshToken
      }
    });
  } catch (err) {
    await dbClient.query('ROLLBACK');
    next(err);
  } finally {
    dbClient.release();
  }
};

/**
 * Handle local user login.
 */
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const userRes = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (user.provider !== 'local') {
      throw new AppError(`Please log in using your ${user.provider} account`, 400);
    }

    const isValidPassword = await comparePassword(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 401);
    }

    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Store session in DB
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    await query(
      `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, refreshToken, expiresAt, ipAddress, userAgent]
    );

    // Update last login
    await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

    delete user.password_hash;

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Logged in successfully',
      data: {
        user,
        token: accessToken,
        refreshToken
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Handle token refresh.
 */
export const refresh = async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return next(new AppError('Refresh token is required', 400));
  }

  try {
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
      throw new AppError('Invalid or expired refresh token', 401);
    }

    // Check if session is active in database
    const sessionRes = await query(
      'SELECT * FROM sessions WHERE refresh_token = $1 AND is_revoked = FALSE AND expires_at > NOW()',
      [refreshToken]
    );
    const session = sessionRes.rows[0];
    if (!session) {
      throw new AppError('Session expired or revoked', 401);
    }

    // Fetch user details
    const userRes = await query(
      'SELECT id, email, full_name, role, avatar_url, is_verified, provider, created_at FROM users WHERE id = $1',
      [decoded.id]
    );
    const user = userRes.rows[0];
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Generate new access token
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Token refreshed successfully',
      data: {
        token: accessToken
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Handle Google OAuth login.
 */
export const googleLogin = async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    return next(new AppError('Google ID token is required', 400));
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: googleClientId,
    });
    const payload = ticket.getPayload();
    const { email, name, sub, picture } = payload;

    const dbClient = await getClient();
    try {
      await dbClient.query('BEGIN');

      // Check if user exists
      let userRes = await dbClient.query('SELECT * FROM users WHERE email = $1', [email]);
      let user = userRes.rows[0];

      if (!user) {
        // Create user with provider google
        const newUserRes = await dbClient.query(
          `INSERT INTO users (email, full_name, avatar_url, role, provider, provider_id, is_verified) 
           VALUES ($1, $2, $3, $4, $5, $6, TRUE) 
           RETURNING id, email, full_name, role, avatar_url, is_verified, provider, created_at`,
          [email, name, picture, 'candidate', 'google', sub]
        );
        user = newUserRes.rows[0];

        // Create profile
        await dbClient.query(
          `INSERT INTO user_profiles (user_id) VALUES ($1)`,
          [user.id]
        );
      } else {
        // Link Google OAuth if it's local but has the same email
        if (user.provider !== 'google') {
          const updatedUserRes = await dbClient.query(
            `UPDATE users 
             SET provider = 'google', provider_id = $1, avatar_url = COALESCE(avatar_url, $2)
             WHERE id = $3 
             RETURNING id, email, full_name, role, avatar_url, is_verified, provider, created_at`,
            [sub, picture, user.id]
          );
          user = updatedUserRes.rows[0];
        }
      }

      const tokenPayload = { id: user.id, email: user.email, role: user.role };
      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      // Create session
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      const ipAddress = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];
      await dbClient.query(
        `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, refreshToken, expiresAt, ipAddress, userAgent]
      );

      // Update last login
      await dbClient.query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [user.id]);

      await dbClient.query('COMMIT');

      delete user.password_hash;

      return ApiResponse.success(res, {
        statusCode: 200,
        message: 'Logged in with Google successfully',
        data: {
          user,
          token: accessToken,
          refreshToken
        }
      });
    } catch (dbErr) {
      await dbClient.query('ROLLBACK');
      throw dbErr;
    } finally {
      dbClient.release();
    }
  } catch (error) {
    return next(new AppError(`Google authentication failed: ${error.message}`, 401));
  }
};

/**
 * Handle user logout.
 */
export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  try {
    if (refreshToken) {
      await query('UPDATE sessions SET is_revoked = TRUE WHERE refresh_token = $1', [refreshToken]);
    }

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Logged out successfully',
    });
  } catch (err) {
    next(err);
  }
};
