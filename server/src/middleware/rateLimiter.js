import rateLimit from 'express-rate-limit';
import { RATE_LIMIT } from '../config/constants.js';

/**
 * General API rate limiter.
 */
export const apiLimiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later',
    data: null,
    error: { retryAfter: Math.ceil(RATE_LIMIT.WINDOW_MS / 1000) },
  },
});

/**
 * Strict rate limiter for auth endpoints.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 attempts per 15 min
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later',
    data: null,
    error: null,
  },
});
