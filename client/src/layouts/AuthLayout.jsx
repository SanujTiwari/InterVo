import { Outlet, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] flex flex-col lg:flex-row">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-10 xl:p-14">
        {/* Background — warm muted gradient, not glowing orbs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(145deg, #1a1310 0%, #141110 40%, #0e0e0e 100%)',
          }}
        />

        {/* Subtle grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Soft accent line on the right edge */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

        {/* Top — Logo */}
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#d4684b] flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-white/90 tracking-tight">
              Intervo
            </span>
          </Link>
        </div>

        {/* Center — Headline */}
        <div className="relative z-10 max-w-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-[2.5rem] xl:text-[2.75rem] font-semibold text-white/90 leading-[1.15] tracking-tight">
              Nail your next
              <br />
              <span className="text-[#d4684b]">interview.</span>
            </h1>
            <p className="mt-5 text-[15px] text-white/40 leading-relaxed max-w-xs">
              AI mock interviews, coding practice, and resume
              feedback — built for developers who want the job.
            </p>
          </motion.div>
        </div>

        {/* Bottom — Social proof / subtle detail */}
        <div className="relative z-10">
          <p className="text-xs text-white/20 tracking-wide">
            Trusted by 2,000+ developers preparing for tech interviews
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-12 relative">
        {/* Mobile-only top bar */}
        <div className="lg:hidden absolute top-0 left-0 right-0 px-6 py-5">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#d4684b] flex items-center justify-center">
              <svg
                className="w-3.5 h-3.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </div>
            <span className="text-base font-semibold text-white/90">
              Intervo
            </span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[380px]"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
