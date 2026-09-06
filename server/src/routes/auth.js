import { Router } from 'express';
import { signup, login, refresh, googleLogin, logout } from '../controllers/auth.js';
import { sendOTP, verifyOTP, forgotPasswordOTP, resetPasswordOTP } from '../controllers/otpController.js';
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

const sendOtpSchema = {
  email: { required: true, type: 'email' },
};

const verifyOtpSchema = {
  email: { required: true, type: 'email' },
  otp: { required: true, type: 'string', minLength: 6, maxLength: 6 },
};

const resetPasswordOtpSchema = {
  email: { required: true, type: 'email' },
  otp: { required: true, type: 'string', minLength: 6, maxLength: 6 },
  newPassword: { required: true, type: 'string', minLength: 6 },
};

// Route definitions
router.post('/signup', validate(signupSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshSchema), refresh);
router.post('/google', validate(googleSchema), googleLogin);
router.post('/logout', logout);

// OTP routes
router.post('/send-otp', validate(sendOtpSchema), sendOTP);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOTP);
router.post('/forgot-password-otp', validate(sendOtpSchema), forgotPasswordOTP);
router.post('/reset-password-otp', validate(resetPasswordOtpSchema), resetPasswordOTP);

export default router;

