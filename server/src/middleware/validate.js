import { AppError } from './errorHandler.js';

/**
 * Request body validation middleware factory.
 * Takes a validation schema object and returns middleware.
 *
 * Schema format:
 * {
 *   fieldName: {
 *     required: boolean,
 *     type: 'string' | 'number' | 'boolean' | 'email',
 *     minLength: number,
 *     maxLength: number,
 *     min: number,
 *     max: number,
 *   }
 * }
 *
 * @param {object} schema - Validation schema
 * @returns {import('express').RequestHandler}
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const errors = [];
    const body = req.body || {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = body[field];

      // Required check
      if (rules.required && (value === undefined || value === null || value === '')) {
        errors.push({ field, message: `${field} is required` });
        continue;
      }

      // Skip further validation if not required and not provided
      if (value === undefined || value === null) continue;

      // Type check
      if (rules.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.push({ field, message: `${field} must be a valid email address` });
        }
      } else if (rules.type && typeof value !== rules.type) {
        errors.push({ field, message: `${field} must be of type ${rules.type}` });
      }

      // String length checks
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        errors.push({ field, message: `${field} must be at least ${rules.minLength} characters` });
      }
      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        errors.push({ field, message: `${field} must be at most ${rules.maxLength} characters` });
      }

      // Number range checks
      if (rules.min !== undefined && typeof value === 'number' && value < rules.min) {
        errors.push({ field, message: `${field} must be at least ${rules.min}` });
      }
      if (rules.max !== undefined && typeof value === 'number' && value > rules.max) {
        errors.push({ field, message: `${field} must be at most ${rules.max}` });
      }
    }

    if (errors.length > 0) {
      throw new AppError('Validation failed', 400, errors);
    }

    next();
  };
};
