import { Link } from 'react-router-dom';
import {
  Mic,
  BookOpen,
  FileText,
  Map,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'there';

  const xpPoints = profile?.xp_points ?? 0;
  const currentStreak = profile?.current_streak ?? 0;
  const interviewsTaken = profile?.interviews_taken ?? 0;
  const problemsSolved = profile?.problems_solved ?? 0;
  const avgScore = profile?.avg_score ?? 0;

  const level = Math.max(1, Math.floor(xpPoints / 200));
  const xpInLevel = xpPoints % 200;
  const xpPercent = Math.round((xpInLevel / 200) * 100);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="mt-1.5 text-sm text-white/35">
          {currentStreak}-day streak · Level {level} · {xpInLevel} / 200 XP
        </p>

        {/* Primary Actions */}
        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/interviews"
            className="inline-flex items-center gap-2 bg-[#d4684b] hover:bg-[#c45f43] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            <Mic size={16} />
            Start Interview
          </Link>
          <Link
            to="/resume"
            className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.07] text-white/80 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border border-white/[0.08]"
          >
            <FileText size={16} />
            Analyze Resume
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
        <Stat label="Interviews" value={String(interviewsTaken)} />
        <Stat label="Problems Solved" value={String(problemsSolved)} />
        <Stat label="Avg. Score" value={`${avgScore}%`} />
        <Stat label="Level" value={String(level)} />
      </div>

      {/* XP Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-white/40">Level {level} Progress</span>
          <span className="text-sm text-white/25">{xpInLevel} / 200 XP</span>
        </div>
        <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#d4684b] rounded-full transition-all duration-500"
            style={{ width: `${xpPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-medium text-white/40 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <ActionCard
            icon={<BookOpen size={18} />}
            title="Documentation"
            description="Explore concepts & guides"
            to="/coding"
          />
          <ActionCard
            icon={<Map size={18} />}
            title="View Roadmap"
            description="Follow your study plan"
            to="/profile"
          />
          <ActionCard
            icon={<Mic size={18} />}
            title="Mock Interviews"
            description="Practice with AI interviewer"
            to="/interviews"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Small reusable pieces ---------- */

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-sm text-white/30 mb-1">{label}</p>
      <p className="text-2xl font-semibold text-white tracking-tight">{value}</p>
    </div>
  );
}

function ActionCard({ icon, title, description, to }) {
  return (
    <Link
      to={to}
      className="group text-left p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all block"
    >
      <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center text-white/50 mb-4 group-hover:bg-[#d4684b]/10 group-hover:text-[#d4684b] transition-colors">
        {icon}
      </div>
      <h3 className="font-medium text-[15px] text-white mb-1">{title}</h3>
      <p className="text-sm text-white/30">{description}</p>
      <div className="mt-4 flex items-center gap-1 text-xs text-white/20 group-hover:text-[#d4684b] transition-colors">
        Open <ArrowRight size={12} />
      </div>
    </Link>
  );
}