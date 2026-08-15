import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleCallback = async (response) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/google', { idToken: response.credential });
      login(data.data.user, data.data.token, data.data.refreshToken);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ email: err.response?.data?.message || 'Google authentication failed' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '838849345616-bm3hlet6mkguun1b7v0913hhu5somg9o.apps.googleusercontent.com',
        callback: handleGoogleCallback,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('google-signup-btn'),
        { theme: 'filled_black', size: 'large', text: 'signup_with', width: '360', shape: 'rectangular' }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Must be at least 8 characters';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords don\'t match';
    if (!form.acceptTerms) newErrors.acceptTerms = 'Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', {
        email: form.email,
        password: form.password,
        full_name: form.fullName,
      });
      login(data.data.user, data.data.token, data.data.refreshToken);
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Something went wrong. Try again.';
      setErrors({ email: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">
          Create your account
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          Get started — it only takes a minute.
        </p>
      </div>

      {/* Google OAuth */}
      <div className="mb-6 min-h-[44px]">
        <div id="google-signup-btn" className="w-full [&>div]:!w-full" />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-white/[0.07]" />
        <span className="text-[11px] text-white/25 uppercase tracking-widest font-medium">
          or
        </span>
        <div className="flex-1 h-px bg-white/[0.07]" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4" id="signup-form">
        {/* Full Name */}
        <div>
          <label
            htmlFor="signup-name"
            className="block text-[13px] font-medium text-white/50 mb-1.5"
          >
            Full name
          </label>
          <input
            id="signup-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.fullName}
            onChange={handleChange}
            className={`auth-input ${errors.fullName ? 'auth-input-error' : ''}`}
          />
          {errors.fullName && (
            <p className="mt-1.5 text-xs text-red-400/90">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="signup-email"
            className="block text-[13px] font-medium text-white/50 mb-1.5"
          >
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            className={`auth-input ${errors.email ? 'auth-input-error' : ''}`}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400/90">{errors.email}</p>
          )}
        </div>

        {/* Password row — side by side on wider screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="signup-password"
              className="block text-[13px] font-medium text-white/50 mb-1.5"
            >
              Password
            </label>
            <input
              id="signup-password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="8+ characters"
              value={form.password}
              onChange={handleChange}
              className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
            />
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-400/90">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="signup-confirm"
              className="block text-[13px] font-medium text-white/50 mb-1.5"
            >
              Confirm
            </label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`auth-input ${errors.confirmPassword ? 'auth-input-error' : ''}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-400/90">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <label
          className="flex items-start gap-2.5 cursor-pointer select-none pt-1"
          htmlFor="signup-terms"
        >
          <input
            id="signup-terms"
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
            className="mt-0.5 w-3.5 h-3.5 rounded border-white/10 bg-white/[0.04] accent-[#d4684b] cursor-pointer"
          />
          <span className="text-[12px] text-white/30 leading-normal">
            I agree to the{' '}
            <a href="#" className="text-white/50 hover:text-white/70 transition-colors underline underline-offset-2">
              Terms
            </a>{' '}
            and{' '}
            <a href="#" className="text-white/50 hover:text-white/70 transition-colors underline underline-offset-2">
              Privacy Policy
            </a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-xs text-red-400/90">{errors.acceptTerms}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          id="signup-submit"
          className="auth-btn-primary mt-2"
        >
          {loading ? (
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="opacity-20"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-[13px] text-white/30">
        Already have an account?{' '}
        <Link to="/login" className="auth-switch-link">
          <span className="auth-switch-text">Sign in</span>
          <svg className="auth-switch-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </p>
    </div>
  );
}
