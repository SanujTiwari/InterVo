import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, Check, X } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

function PasswordStrength({ password }) {
  const checks = [
    { label: 'At least 8 characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', pass: /[a-z]/.test(password) },
    { label: 'Number', pass: /\d/.test(password) },
  ];

  const strength = checks.filter((c) => c.pass).length;
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500'];

  if (!password) return null;

  return (
    <div className="space-y-3 mt-3">
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i < strength ? colors[strength - 1] : 'bg-slate-700'
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {check.pass ? (
              <Check className="w-3 h-3 text-emerald-400" />
            ) : (
              <X className="w-3 h-3 text-slate-600" />
            )}
            <span className={`text-xs ${check.pass ? 'text-emerald-400' : 'text-slate-600'}`}>
              {check.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!form.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';
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
      // Mock signup — replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      login(
        { id: '1', email: form.email, full_name: form.fullName },
        'mock-jwt-token',
        'mock-refresh-token'
      );
      navigate('/dashboard');
    } catch (err) {
      setErrors({ email: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-white">
          Inter<span className="gradient-text">vo</span>
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2">Create your account</h2>
      <p className="text-slate-400 mb-8">
        Start your journey to interview success.
      </p>

      {/* Google OAuth */}
      <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-all duration-200 mb-6">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-slate-500 uppercase tracking-wider">or</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          icon={User}
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div>
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
          <PasswordStrength password={form.password} />
        </div>
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5 rounded border-slate-600 bg-navy-800 text-blue-500 focus:ring-blue-500/20"
          />
          <span className="text-sm text-slate-400">
            I agree to the{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-xs text-red-400">{errors.acceptTerms}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full mt-2"
        >
          Create Account
        </Button>
      </form>

      <p className="text-sm text-slate-400 text-center mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
          Log in
        </Link>
      </p>
    </div>
  );
}
