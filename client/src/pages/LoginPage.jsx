import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
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
        document.getElementById('google-login-btn'),
        { theme: 'filled_black', size: 'large', text: 'signin_with', width: '360', shape: 'rectangular' }
      );
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
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
      const { data } = await api.post('/auth/login', form);
      login(data.data.user, data.data.token, data.data.refreshToken);
      navigate('/dashboard');
    } catch (err) {
      setErrors({ email: err.response?.data?.message || 'Invalid email or password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[22px] font-semibold text-white tracking-tight">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-white/40">
          Sign in to your account to continue.
        </p>
      </div>

      {/* Google OAuth */}
      <div className="mb-6 min-h-[44px]">
        <div id="google-login-btn" className="w-full [&>div]:!w-full" />
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
      <form onSubmit={handleSubmit} className="space-y-4" id="login-form">
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className="block text-[13px] font-medium text-white/50 mb-1.5"
          >
            Email
          </label>
          <input
            id="login-email"
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="text-[13px] font-medium text-white/50"
            >
              Password
            </label>
            <a
              href="#"
              className="text-[12px] text-white/30 hover:text-white/50 transition-colors"
            >
              Forgot?
            </a>
          </div>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className={`auth-input ${errors.password ? 'auth-input-error' : ''}`}
          />
          {errors.password && (
            <p className="mt-1.5 text-xs text-red-400/90">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          id="login-submit"
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
            'Sign in'
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-[13px] text-white/30">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="auth-switch-link">
          <span className="auth-switch-text">Create one</span>
          <svg className="auth-switch-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </p>
    </div>
  );
}
