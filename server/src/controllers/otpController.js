import { query } from '../config/db.js';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from '../utils/authHelper.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateOTP, sendOTPEmail } from '../utils/otpHelper.js';
import env from '../config/env.js';

/**
 * Send OTP to a user's email.
 * Invalidates previous active OTPs for the same email/type before creating a new one.
 */
export const sendOTP = async (req, res, next) => {
  const { email, type = 'signup' } = req.body;

  try {
    // Find previous active OTP for this email & type to guarantee uniqueness
    const prevRes = await query(
      `SELECT otp_code FROM otp_codes 
       WHERE email = $1 AND type = $2 AND is_used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [email, type]
    );
    const previousOtp = prevRes.rows[0]?.otp_code;

    // Invalidate all previous active OTPs for this email & type
    await query(
      `UPDATE otp_codes SET is_used = TRUE 
       WHERE email = $1 AND type = $2 AND is_used = FALSE AND expires_at > NOW()`,
      [email, type]
    );

    // Generate a fresh 6-digit OTP guaranteed to differ from previousOtp
    const otp = generateOTP(previousOtp);

    // Store in database with 10-minute expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await query(
      `INSERT INTO otp_codes (email, otp_code, type, expires_at)
       VALUES ($1, $2, $3, $4)`,
      [email, otp, type, expiresAt]
    );

    // Send OTP via email (or log to console in dev mode)
    const result = await sendOTPEmail(email, otp, type);

    const responseData = {
      message: 'OTP sent successfully',
      expiresInSeconds: 600,
    };

    // In development, include OTP for easy testing
    if (env.isDev && result.debugOtp) {
      responseData.debugOtp = result.debugOtp;
    }

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'OTP sent successfully',
      data: responseData,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Verify OTP code.
 * On success, marks the user as verified and returns tokens for auto-login.
 */
export const verifyOTP = async (req, res, next) => {
  const { email, otp, type = 'signup' } = req.body;

  try {
    // Find the most recent active OTP for this email & type
    const otpRes = await query(
      `SELECT * FROM otp_codes 
       WHERE email = $1 AND type = $2 AND is_used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [email, type]
    );

    const otpRecord = otpRes.rows[0];

    if (!otpRecord) {
      throw new AppError('OTP expired or not found. Please request a new one.', 400);
    }

    // Check max attempts
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      // Mark as used to prevent further attempts
      await query('UPDATE otp_codes SET is_used = TRUE WHERE id = $1', [otpRecord.id]);
      throw new AppError('Maximum verification attempts exceeded. Please request a new OTP.', 429);
    }

    // Check if OTP matches
    if (otpRecord.otp_code !== otp) {
      // Increment attempt counter
      await query(
        'UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1',
        [otpRecord.id]
      );

      const remainingAttempts = otpRecord.max_attempts - otpRecord.attempts - 1;
      throw new AppError(
        `Invalid OTP code. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
        400
      );
    }

    // OTP matches — mark as used
    await query('UPDATE otp_codes SET is_used = TRUE WHERE id = $1', [otpRecord.id]);

    // Mark user as verified
    const userRes = await query(
      `UPDATE users SET is_verified = TRUE WHERE email = $1
       RETURNING id, email, full_name, role, avatar_url, is_verified, provider, created_at`,
      [email]
    );

    const user = userRes.rows[0];
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Generate tokens for auto-login after verification
    const tokenPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    // Create session
    const sessionExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    await query(
      `INSERT INTO sessions (user_id, refresh_token, expires_at, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [user.id, refreshToken, sessionExpiresAt, ipAddress, userAgent]
    );

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Email verified successfully',
      data: {
        user,
        token: accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Send a forgot-password OTP to the user's email.
 */
export const forgotPasswordOTP = async (req, res, next) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const userRes = await query('SELECT id, provider FROM users WHERE email = $1', [email]);
    const user = userRes.rows[0];

    if (!user) {
      throw new AppError('No account found with this email address. Please sign up first.', 404);
    }


    // Find previous active OTP to guarantee uniqueness
    const prevRes = await query(
      `SELECT otp_code FROM otp_codes 
       WHERE email = $1 AND type = 'forgot_password' AND is_used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [email]
    );
    const previousOtp = prevRes.rows[0]?.otp_code;

    // Invalidate previous OTPs
    await query(
      `UPDATE otp_codes SET is_used = TRUE 
       WHERE email = $1 AND type = 'forgot_password' AND is_used = FALSE AND expires_at > NOW()`,
      [email]
    );

    // Generate and store OTP
    const otp = generateOTP(previousOtp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await query(
      `INSERT INTO otp_codes (email, otp_code, type, expires_at)
       VALUES ($1, $2, 'forgot_password', $3)`,
      [email, otp, expiresAt]
    );

    // Send email
    const result = await sendOTPEmail(email, otp, 'forgot_password');

    const responseData = {
      message: 'OTP sent successfully',
      expiresInSeconds: 600,
    };

    if (env.isDev && result.debugOtp) {
      responseData.debugOtp = result.debugOtp;
    }

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'If an account with this email exists, an OTP has been sent.',
      data: responseData,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Reset password using a valid OTP.
 */
export const resetPasswordOTP = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find the most recent active forgot_password OTP
    const otpRes = await query(
      `SELECT * FROM otp_codes 
       WHERE email = $1 AND type = 'forgot_password' AND is_used = FALSE AND expires_at > NOW()
       ORDER BY created_at DESC LIMIT 1`,
      [email]
    );

    const otpRecord = otpRes.rows[0];

    if (!otpRecord) {
      throw new AppError('OTP expired or not found. Please request a new one.', 400);
    }

    // Check max attempts
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      await query('UPDATE otp_codes SET is_used = TRUE WHERE id = $1', [otpRecord.id]);
      throw new AppError('Maximum verification attempts exceeded. Please request a new OTP.', 429);
    }

    // Check if OTP matches
    if (otpRecord.otp_code !== otp) {
      await query(
        'UPDATE otp_codes SET attempts = attempts + 1 WHERE id = $1',
        [otpRecord.id]
      );

      const remainingAttempts = otpRecord.max_attempts - otpRecord.attempts - 1;
      throw new AppError(
        `Invalid OTP code. ${remainingAttempts} attempt${remainingAttempts !== 1 ? 's' : ''} remaining.`,
        400
      );
    }

    // OTP matches — mark as used
    await query('UPDATE otp_codes SET is_used = TRUE WHERE id = $1', [otpRecord.id]);

    // Hash new password and update user
    const passwordHash = await hashPassword(newPassword);
    await query(
      'UPDATE users SET password_hash = $1, is_verified = TRUE WHERE email = $2',
      [passwordHash, email]
    );

    return ApiResponse.success(res, {
      statusCode: 200,
      message: 'Password reset successfully. You can now log in with your new password.',
    });
  } catch (err) {
    next(err);
  }
};
