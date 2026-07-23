import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Mic,
  BookOpen,
  FileText,
  User,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Notebook,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/interviews', label: 'Mock Interviews', icon: Mic },
  { path: '/coding', label: 'Documentation', icon: BookOpen },
  { path: '/resume', label: 'Resume Analyzer', icon: FileText },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Persist collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) setCollapsed(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: 0, 
        opacity: 1,
        width: collapsed ? 72 : 256 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 280, 
        damping: 28,
        mass: 0.8
      }}
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 bg-navy-950/95 backdrop-blur-xl border-r border-white/5 shadow-2xl`}
    >
      {/* Logo - Restored to original style */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="text-xl font-bold text-white whitespace-nowrap"
            >
              Inter<span className="gradient-text">vo</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item, index) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-[#d4684b]/15 to-[#e88d72]/15 text-white border border-[#d4684b]/20 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[#d4684b] to-[#e88d72] rounded-r-full"
                  />
                )}

                <item.icon
                  className={`w-5 h-5 flex-shrink-0 transition-all duration-200 group-hover:scale-110 ${
                    isActive ? 'text-white' : ''
                  }`}
                />

                <AnimatePresence mode="wait">
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, delay: index * 0.015 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Collapsed Tooltip */}
                <AnimatePresence>
                  {collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute left-full ml-4 px-3 py-2 bg-navy-900 border border-white/10 rounded-xl text-sm whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all z-50 shadow-xl"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/5">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 active:bg-red-500/10 transition-all duration-200 group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 transition-transform group-hover:rotate-12" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse Toggle - Smoother */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-7 h-7 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-700 hover:border-white/30 transition-all duration-200 z-50 active:scale-95"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </motion.div>
      </button>
    </motion.aside>
  );
}