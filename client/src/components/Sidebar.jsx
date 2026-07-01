import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Mic,
  Code2,
  FileText,
  User,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/interviews', label: 'Mock Interviews', icon: Mic },
  { path: '/coding', label: 'Coding Practice', icon: Code2 },
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

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[72px]' : 'w-64'
      } bg-navy-950/90 backdrop-blur-xl border-r border-white/5`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/5">
        <div className="w-9 h-9 rounded-xl bg-gradient-accent flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-white whitespace-nowrap"
          >
            Inter<span className="gradient-text">vo</span>
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-white border border-blue-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <item.icon
              className={`w-5 h-5 flex-shrink-0 transition-colors duration-200`}
            />
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div className="p-3 border-t border-white/5 space-y-2">
        {!collapsed && (
          <div className="flex items-center gap-3 px-3 py-2">
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
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-navy-700 transition-all z-50"
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>
    </motion.aside>
  );
}
