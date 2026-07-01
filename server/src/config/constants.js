export const USER_ROLES = {
  CANDIDATE: 'candidate',
  ADMIN: 'admin',
};

export const AUTH_PROVIDERS = {
  LOCAL: 'local',
  GOOGLE: 'google',
};

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
};

export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
};
