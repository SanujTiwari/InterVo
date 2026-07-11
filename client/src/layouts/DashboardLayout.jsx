import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const { profile } = useAuth();
  const streak = profile?.current_streak ?? 0;

  return (
    <div className="min-h-screen bg-navy-950">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-navy-950/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 text-sm">🔥</span>
              <span className="text-xs font-medium text-amber-400">{streak} day streak</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
