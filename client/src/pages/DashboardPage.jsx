import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mic,
  Code2,
  FileText,
  Map,
  Flame,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Calendar,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import PerformanceChart from '../components/PerformanceChart';
import ActivityFeed from '../components/ActivityFeed';
import { useAuth } from '../context/AuthContext';

const quickActions = [
  {
    title: 'Start Interview',
    description: 'Practice with AI interviewer',
    icon: Mic,
    color: 'from-blue-600 to-blue-500',
    link: '/interviews',
  },
  {
    title: 'Practice Coding',
    description: 'Solve coding challenges',
    icon: Code2,
    color: 'from-emerald-600 to-emerald-500',
    link: '/coding',
  },
  {
    title: 'Analyze Resume',
    description: 'Get AI-powered feedback',
    icon: FileText,
    color: 'from-purple-600 to-purple-500',
    link: '/resume',
  },
  {
    title: 'View Roadmap',
    description: 'Follow your study plan',
    icon: Map,
    color: 'from-amber-600 to-amber-500',
    link: '/profile',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'there';

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-border p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="bg-orb w-64 h-64 bg-blue-600 -top-20 -right-20 opacity-20" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-slate-400">
              You're on a <span className="text-amber-400 font-medium">5 day streak</span>. 
              Keep it going — consistency is key!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Flame className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-amber-400">5</p>
              <p className="text-xs text-amber-400/70">Streak</p>
            </div>
            <div className="text-center px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <Zap className="w-5 h-5 text-blue-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-blue-400">2,450</p>
              <p className="text-xs text-blue-400/70">XP</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Mic}
          label="Interviews Taken"
          value="24"
          change="+3 this week"
          changeType="positive"
          iconColor="text-blue-400"
          iconBg="bg-blue-500/10"
        />
        <StatCard
          icon={Code2}
          label="Problems Solved"
          value="142"
          change="+12 this week"
          changeType="positive"
          iconColor="text-emerald-400"
          iconBg="bg-emerald-500/10"
        />
        <StatCard
          icon={Target}
          label="Avg. Score"
          value="78%"
          change="+5% vs last week"
          changeType="positive"
          iconColor="text-purple-400"
          iconBg="bg-purple-500/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Level"
          value="12"
          change="450 XP to next"
          changeType="positive"
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10"
        />
      </div>

      {/* XP Progress */}
      <div className="glass p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-slate-300">Level 12 Progress</span>
          <span className="text-xs text-slate-500">2,450 / 3,000 XP</span>
        </div>
        <ProgressBar value={2450} max={3000} showValue={false} size="md" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass glass-hover p-5 group cursor-pointer h-full"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{action.title}</h3>
                <p className="text-xs text-slate-500">{action.description}</p>
                <ArrowRight className="w-4 h-4 text-slate-600 mt-3 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="glass p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Skill Radar</h2>
          <PerformanceChart />
        </div>

        {/* Recent Activity */}
        <div className="glass p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              View All
            </button>
          </div>
          <ActivityFeed />
        </div>
      </div>

      {/* Upcoming Goals */}
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Weekly Goals</h2>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            Resets in 3 days
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: 'Complete 5 mock interviews', value: 3, max: 5 },
            { label: 'Solve 15 coding problems', value: 12, max: 15 },
            { label: 'Practice 30 minutes daily', value: 5, max: 7 },
          ].map((goal, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-slate-300">{goal.label}</span>
                <span className="text-xs text-slate-500">
                  {goal.value}/{goal.max}
                </span>
              </div>
              <ProgressBar
                value={goal.value}
                max={goal.max}
                showValue={false}
                size="sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
