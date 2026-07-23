import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Left Panel — Branding & Original Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 border-r border-white/5 bg-navy-950/40">
        {/* Animated background orbs */}
        <div className="bg-orb w-96 h-96 bg-[#d4684b] top-1/4 left-1/4 opacity-15" />
        <div className="bg-orb w-80 h-80 bg-[#e88d72] bottom-1/4 right-1/4 opacity-15" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        <div className="relative z-10 max-w-lg w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow-blue">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Inter<span className="gradient-text">vo</span>
              </span>
            </Link>

            {/* Headline and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-white leading-tight">
                Your AI-powered path to{' '}
                <span className="gradient-text">interview success</span>
              </h1>
              <p className="text-base text-slate-400 leading-relaxed">
                Practice mock interviews, study language syntax documentation, and get personalized 
                feedback — all powered by AI that adapts to your level.
              </p>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-3">
              {[
                'AI-powered mock interviews with real-time feedback',
                'Comprehensive study guides & syntax sheets for 7 languages',
                'Smart resume analysis and improvement suggestions',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        {/* Subtle background glow for form panel */}
        <div className="bg-orb w-72 h-72 bg-[#d4684b] top-10 right-10 opacity-5" />
        <div className="bg-orb w-64 h-64 bg-[#e88d72] bottom-10 left-10 opacity-5" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
