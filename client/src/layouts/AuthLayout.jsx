import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-navy-950 flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12">
        {/* Animated background orbs */}
        <div className="bg-orb w-96 h-96 bg-blue-600 top-1/4 left-1/4" />
        <div className="bg-orb w-80 h-80 bg-purple-600 bottom-1/4 right-1/4" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-50" />

        <div className="relative z-10 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 mb-10">
              <div className="w-10 h-10 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow-blue">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Inter<span className="gradient-text">vo</span>
              </span>
            </Link>

            <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
              Your AI-powered path to{' '}
              <span className="gradient-text">interview success</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Practice mock interviews, sharpen your coding skills, and get personalized 
              feedback — all powered by AI that adapts to your level.
            </p>

            {/* Feature bullets */}
            <div className="space-y-4">
              {[
                'AI-powered mock interviews with real-time feedback',
                '500+ coding problems across all difficulty levels',
                'Smart resume analysis and improvement suggestions',
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.15 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-accent flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-300">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
