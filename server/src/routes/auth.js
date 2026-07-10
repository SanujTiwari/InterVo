import { Router } from 'express';
import { signup, login, refresh, googleLogin, logout } from '../controllers/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Validation schemas
const signupSchema = {
  email: { required: true, type: 'email' },
  password: { required: true, type: 'string', minLength: 6 },
  full_name: { required: true, type: 'string', minLength: 2 },
};

const loginSchema = {
  email: { required: true, type: 'email' },
  password: { required: true, type: 'string' },
};

const refreshSchema = {
  refreshToken: { required: true, type: 'string' },
};

const googleSchema = {
  idToken: { required: true, type: 'string' },
};

// Route definitions
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/google', validate(googleSchema), googleLogin);
router.post('/logout', logout);

export default router;
