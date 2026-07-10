import { verifyAccessToken } from '../utils/authHelper.js';
import { AppError } from './errorHandler.js';

/**
 * Middleware to authenticate requests using JWT access tokens.
 */
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Access token required', 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyAccessToken(token);
    req.user = decoded; // Attach user info (id, email, role) to request
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new AppError('Access token expired', 401, { code: 'TOKEN_EXPIRED' }));
    }
    return next(new AppError('Invalid access token', 401));
  }
};

/**
 * Middleware to restrict access to specific roles.
 * @param {...string} roles 
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
};
