import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, BookOpen } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
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
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
      {/* Subtle top light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-[#d4684b]/40 to-transparent" />
      
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow-accent">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">
          Inter<span className="gradient-text">vo</span>
        </span>
      </div>

      <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Welcome Back</h2>
      <p className="text-sm text-slate-400 mb-8">
        Log in to continue your interview prep journey.
      </p>

      {/* Google OAuth */}
      <div className="w-full flex justify-center mb-6 min-h-[44px]">
        <div id="google-login-btn" className="w-full flex justify-center" />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">or</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="flex items-center justify-between text-sm pt-1">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/10 bg-navy-900/50 text-[#d4684b] focus:ring-[#d4684b]/20 focus:ring-offset-navy-950 cursor-pointer"
            />
            Remember me
          </label>
          <a href="#" className="text-xs font-semibold text-[#d4684b] hover:text-[#e88d72] transition-colors">
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full mt-4 h-11 rounded-xl font-bold bg-gradient-accent hover:bg-gradient-accent-hover text-white transition-all shadow-glow-accent/20 hover:shadow-glow-accent/40"
        >
          Log In
        </Button>
      </form>

      <p className="text-sm text-slate-400 text-center mt-8">
        Don&apos;t have an account?{' '}
        <Link to="/signup" className="text-[#d4684b] hover:text-[#e88d72] font-semibold transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
