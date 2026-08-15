import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Mic,
  BookOpen,
  FileText,
  User,
  LogOut,
  ChevronLeft,
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

  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved !== null) setCollapsed(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const sidebarWidth = collapsed ? 'w-[68px]' : 'w-[240px]';

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col ${sidebarWidth} bg-[#0a0a0a] border-r border-white/[0.06] transition-all duration-200 ease-out`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-14 flex-shrink-0">
        <div className="w-7 h-7 rounded-md bg-[#d4684b] flex items-center justify-center flex-shrink-0">
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
        {!collapsed && (
          <span className="text-[15px] font-semibold text-white/90 tracking-tight">
            Intervo
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              `group relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-white/[0.07] text-white'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#d4684b] rounded-r-full" />
                )}
                <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="px-2.5 pb-3 pt-2 border-t border-white/[0.06]">
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#d4684b]/20 flex items-center justify-center text-[11px] font-semibold text-[#d4684b] flex-shrink-0">
              {user?.full_name?.[0] || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium text-white/80 truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-[11px] text-white/25 truncate">
                {user?.email || ''}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-[13px] font-medium text-white/30 hover:text-red-400 hover:bg-red-500/[0.06] transition-colors duration-150"
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-[#1a1a1a] border border-white/[0.08] flex items-center justify-center text-white/30 hover:text-white/60 hover:border-white/[0.15] transition-all duration-150 z-50"
      >
        <ChevronLeft
          className={`w-3 h-3 transition-transform duration-200 ${
            collapsed ? 'rotate-180' : ''
          }`}
        />
      </button>
    </aside>
  );
}