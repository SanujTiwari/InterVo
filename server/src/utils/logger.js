import env from '../config/env.js';

/**
 * Simple structured logger.
 * In production, replace with a proper logging library (winston, pino).
 */
const logger = {
  info: (message, meta = {}) => {
    console.log(JSON.stringify({
      level: 'info',
      message,
      timestamp: new Date().toISOString(),
      ...meta,
    }));
  },

  warn: (message, meta = {}) => {
    console.warn(JSON.stringify({
      level: 'warn',
      message,
      timestamp: new Date().toISOString(),
      ...meta,
    }));
  },

  error: (message, meta = {}) => {
    console.error(JSON.stringify({
      level: 'error',
      message,
      timestamp: new Date().toISOString(),
      ...meta,
    }));
  },

  debug: (message, meta = {}) => {
    if (env.isDev) {
      console.debug(JSON.stringify({
        level: 'debug',
        message,
        timestamp: new Date().toISOString(),
        ...meta,
      }));
    }
  },
};

export default logger;
