import env from '../config/env.js';
import logger from '../utils/logger.js';

/**
 * Custom error class for API errors.
 */
export class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 handler — catches requests to undefined routes.
 */
export const notFoundHandler = (req, res, next) => {
  const error = new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404);
  next(error);
};

/**
 * Global error handler middleware.
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error
  if (statusCode >= 500) {
    logger.error(message, {
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // PostgreSQL unique constraint violation
  if (err.code === '23505') {
    statusCode = 409;
    message = 'A record with this value already exists';
  }

  // PostgreSQL foreign key violation
  if (err.code === '23503') {
    statusCode = 400;
    message = 'Referenced resource does not exist';
  }

  // Don't leak error details in production
  const response = {
    success: false,
    message,
    data: null,
    error: env.isDev
      ? { stack: err.stack, errors: err.errors }
      : err.isOperational
        ? { errors: err.errors }
        : null,
  };

  res.status(statusCode).json(response);
};
