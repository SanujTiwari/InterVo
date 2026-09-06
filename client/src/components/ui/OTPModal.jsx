import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OTPInput from './OTPInput';
import api from '../../api/axios';

/**
 * Premium OTP verification modal.
 * Supports signup verification and forgot-password flows.
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   email: string,
 *   type?: 'signup' | 'forgot_password',
 *   onVerified: (data: any) => void,
 *   debugOtp?: string,
 * }} props
 */
export default function OTPModal({
  isOpen,
  onClose,
  email,
  type = 'signup',
  onVerified,
  debugOtp: initialDebugOtp,
}) {
  const [status, setStatus] = useState('idle'); // idle | verifying | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [debugOtp, setDebugOtp] = useState(initialDebugOtp || '');
  const [otpError, setOtpError] = useState(false);

  // For forgot_password flow — step 2: new password entry
  const [step, setStep] = useState('otp'); // 'otp' | 'newPassword'
  const [verifiedOtp, setVerifiedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState({});

  // Countdown timer for resend
  useEffect(() => {
    if (!isOpen) return;

    setResendTimer(60);
    setCanResend(false);

    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setErrorMsg('');
      setOtpError(false);
      setStep('otp');
      setVerifiedOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
    }
  }, [isOpen]);

  // Handle OTP submission
  const handleOTPComplete = useCallback(async (otp) => {
    if (status === 'verifying') return;

    setStatus('verifying');
    setErrorMsg('');
    setOtpError(false);

    try {
      if (type === 'signup') {
        const { data } = await api.post('/auth/verify-otp', { email, otp, type: 'signup' });
        setStatus('success');
        setTimeout(() => {
          onVerified(data.data);
        }, 1200);
      } else if (type === 'forgot_password') {
        // For forgot password, we just validate the OTP matches (via reset-password-otp)
        // But first we need to verify it — we'll use verify-otp with type forgot_password
        // Actually let's store the OTP and move to the new password step
        // We'll validate OTP + new password together in resetPasswordOTP
        setVerifiedOtp(otp);
        setStep('newPassword');
        setStatus('idle');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Verification failed. Try again.';
      setErrorMsg(msg);
      setStatus('error');
      setOtpError(true);
      // Reset error flag after animation
      setTimeout(() => setOtpError(false), 600);
    }
  }, [email, type, status, onVerified]);

  // Handle resend
  const handleResend = async () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(60);
    setErrorMsg('');
    setOtpError(false);
    setStatus('idle');

    try {
      const endpoint = type === 'forgot_password' ? '/auth/forgot-password-otp' : '/auth/send-otp';
      const { data } = await api.post(endpoint, { email, type });
      if (data.data?.debugOtp) {
        setDebugOtp(data.data.debugOtp);
      }
    } catch (err) {
      setErrorMsg('Failed to resend OTP. Please try again.');
    }

    // Restart countdown
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle password reset submission
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!newPassword) errors.newPassword = 'Password is required';
    else if (newPassword.length < 8) errors.newPassword = 'Must be at least 8 characters';
    if (newPassword !== confirmPassword) errors.confirmPassword = "Passwords don't match";

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setStatus('verifying');
    setErrorMsg('');

    try {
      await api.post('/auth/reset-password-otp', {
        email,
        otp: verifiedOtp,
        newPassword,
      });
      setStatus('success');
      setTimeout(() => {
        onVerified({ passwordReset: true });
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Password reset failed.';
      setErrorMsg(msg);
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const headingMap = {
    signup: 'Verify your email',
    forgot_password: step === 'newPassword' ? 'Set new password' : 'Enter reset code',
  };

  const descriptionMap = {
    signup: `We sent a 6-digit code to`,
    forgot_password: step === 'newPassword'
      ? 'Create a strong password for your account.'
      : `We sent a 6-digit code to`,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-[420px] bg-[#141414] border border-white/[0.06] rounded-2xl shadow-2xl overflow-hidden">

              {/* Close Button */}
              <div className="flex justify-end p-4 pb-0">
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/[0.05] transition-all"
                  aria-label="Close"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-8 pb-8 pt-2">

                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center
                    transition-all duration-500
                    ${status === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : status === 'error'
                        ? 'bg-red-500/10 border border-red-500/20'
                        : 'bg-[#d4684b]/10 border border-[#d4684b]/20'
                    }
                  `}>
                    {status === 'success' ? (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-7 h-7 text-emerald-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <motion.path
                          d="M20 6L9 17l-5-5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      </motion.svg>
                    ) : step === 'newPassword' ? (
                      <svg className="w-7 h-7 text-[#d4684b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    ) : (
                      <svg className="w-7 h-7 text-[#d4684b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-white text-center tracking-tight">
                  {status === 'success'
                    ? (type === 'forgot_password' && step === 'newPassword' ? 'Password reset!' : 'Verified!')
                    : headingMap[type]
                  }
                </h2>

                {/* Description */}
                {status !== 'success' && (
                  <p className="mt-2 text-sm text-white/40 text-center leading-relaxed">
                    {descriptionMap[type]}
                    {(step === 'otp') && (
                      <span className="block mt-0.5 text-white/60 font-medium">{email}</span>
                    )}
                  </p>
                )}

                {status === 'success' && (
                  <p className="mt-2 text-sm text-emerald-400/70 text-center">
                    {type === 'forgot_password' && step === 'newPassword'
                      ? 'Your password has been updated. Redirecting...'
                      : 'Your email has been verified. Redirecting...'
                    }
                  </p>
                )}

                {/* Debug OTP badge (dev only) */}
                {debugOtp && status !== 'success' && step === 'otp' && (
                  <div className="mt-3 flex justify-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/20">
                      <svg className="w-3.5 h-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                      <span className="text-[11px] text-amber-400/80 font-medium tracking-wide">
                        DEV OTP: <span className="text-amber-300 font-bold tracking-[3px] ml-1">{debugOtp}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* OTP Input */}
                {step === 'otp' && status !== 'success' && (
                  <div className="mt-7">
                    <OTPInput
                      onComplete={handleOTPComplete}
                      error={otpError}
                      disabled={status === 'verifying'}
                    />
                  </div>
                )}

                {/* New Password Form (for forgot_password flow) */}
                {step === 'newPassword' && status !== 'success' && (
                  <form onSubmit={handlePasswordReset} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="otp-new-password" className="block text-[13px] font-medium text-white/50 mb-1.5">
                        New password
                      </label>
                      <input
                        id="otp-new-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="8+ characters"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); setPasswordErrors({}); }}
                        className={`auth-input ${passwordErrors.newPassword ? 'auth-input-error' : ''}`}
                      />
                      {passwordErrors.newPassword && (
                        <p className="mt-1.5 text-xs text-red-400/90">{passwordErrors.newPassword}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="otp-confirm-password" className="block text-[13px] font-medium text-white/50 mb-1.5">
                        Confirm password
                      </label>
                      <input
                        id="otp-confirm-password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setPasswordErrors({}); }}
                        className={`auth-input ${passwordErrors.confirmPassword ? 'auth-input-error' : ''}`}
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="mt-1.5 text-xs text-red-400/90">{passwordErrors.confirmPassword}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'verifying'}
                      className="auth-btn-primary mt-2"
                    >
                      {status === 'verifying' ? (
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                      ) : (
                        'Reset password'
                      )}
                    </button>
                  </form>
                )}

                {/* Error Message */}
                {errorMsg && status !== 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-center text-sm text-red-400/90"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                {/* Verifying indicator */}
                {status === 'verifying' && step === 'otp' && (
                  <div className="mt-5 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin text-[#d4684b]" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span className="text-sm text-white/40">Verifying…</span>
                  </div>
                )}

                {/* Resend / Timer (only on OTP step) */}
                {step === 'otp' && status !== 'success' && (
                  <div className="mt-6 flex items-center justify-center">
                    {canResend ? (
                      <button
                        onClick={handleResend}
                        className="text-sm text-[#d4684b] hover:text-[#e07a5f] font-medium transition-colors"
                      >
                        Resend code
                      </button>
                    ) : (
                      <p className="text-sm text-white/30">
                        Resend in{' '}
                        <span className="text-white/50 font-medium tabular-nums">
                          {formatTime(resendTimer)}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
