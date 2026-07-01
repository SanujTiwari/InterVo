import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  GraduationCap,
  Target,
  Briefcase,
  Flame,
  Zap,
  Trophy,
  Mic,
  Code2,
  Calendar,
  MapPin,
  Edit3,
  Save,
  X,
  Plus,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';

const mockProfile = {
  full_name: 'Demo User',
  email: 'demo@intervo.dev',
  bio: 'Aspiring software engineer passionate about building scalable web applications and solving complex problems.',
  college: 'Indian Institute of Technology, Delhi',
  graduation_year: 2026,
  target_company: 'Google',
  target_role: 'Software Development Engineer',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'TypeScript', 'MongoDB', 'Git', 'Docker', 'System Design'],
  xp_points: 2450,
  current_streak: 5,
  longest_streak: 14,
  interviews_taken: 24,
  problems_solved: 142,
  joined: 'March 2026',
};

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile] = useState({ ...mockProfile, ...user });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profile);
  const [newSkill, setNewSkill] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to API
  };

  const addSkill = () => {
    if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter((s) => s !== skill),
    });
  };

  const level = Math.floor(profile.xp_points / 200);
  const xpInLevel = profile.xp_points % 200;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your profile and track your progress.</p>
        </div>
        {!isEditing ? (
          <Button variant="secondary" size="sm" icon={Edit3} onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="primary" size="sm" icon={Save} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" size="sm" icon={X} onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column — Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avatar & Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6"
          >
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-accent flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                {profile.full_name?.[0] || 'U'}
              </div>
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Full Name</label>
                      <input
                        className="input-field text-sm"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 mb-1 block">Bio</label>
                      <textarea
                        className="input-field text-sm resize-none"
                        rows={3}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl font-bold text-white">{profile.full_name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-sm text-slate-400">{profile.email}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{profile.bio}</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Education & Target */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Education & Goals</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">College</label>
                    <input
                      className="input-field text-sm"
                      value={editForm.college}
                      onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Graduation Year</label>
                    <input
                      className="input-field text-sm"
                      type="number"
                      value={editForm.graduation_year}
                      onChange={(e) => setEditForm({ ...editForm, graduation_year: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Target Company</label>
                    <input
                      className="input-field text-sm"
                      value={editForm.target_company}
                      onChange={(e) => setEditForm({ ...editForm, target_company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Target Role</label>
                    <input
                      className="input-field text-sm"
                      value={editForm.target_role}
                      onChange={(e) => setEditForm({ ...editForm, target_role: e.target.value })}
                    />
                  </div>
                </>
              ) : (
                <>
                  <InfoItem icon={GraduationCap} label="College" value={profile.college} />
                  <InfoItem icon={Calendar} label="Graduation" value={profile.graduation_year} />
                  <InfoItem icon={Target} label="Target Company" value={profile.target_company} />
                  <InfoItem icon={Briefcase} label="Target Role" value={profile.target_role} />
                </>
              )}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass p-6"
          >
            <h3 className="text-sm font-semibold text-white mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {(isEditing ? editForm.skills : profile.skills).map((skill) => (
                <div key={skill} className="flex items-center">
                  <Badge color="blue" size="md">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1.5 text-blue-300 hover:text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                </div>
              ))}
              {isEditing && (
                <div className="flex items-center gap-1.5">
                  <input
                    className="w-28 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10 text-white outline-none focus:border-blue-500/40"
                    placeholder="Add skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="p-1 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Column — Stats */}
        <div className="space-y-6">
          {/* XP & Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6"
          >
            <div className="text-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-white">{level}</span>
              </div>
              <p className="text-sm font-semibold text-white">Level {level}</p>
              <p className="text-xs text-slate-500">{profile.xp_points} XP total</p>
            </div>
            <ProgressBar
              value={xpInLevel}
              max={200}
              label="Next Level"
              size="sm"
            />
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass p-6 space-y-5"
          >
            <h3 className="text-sm font-semibold text-white">Statistics</h3>
            <div className="space-y-4">
              <StatItem icon={Flame} label="Current Streak" value={`${profile.current_streak} days`} color="text-amber-400" bg="bg-amber-500/10" />
              <StatItem icon={Trophy} label="Longest Streak" value={`${profile.longest_streak} days`} color="text-purple-400" bg="bg-purple-500/10" />
              <StatItem icon={Mic} label="Interviews" value={profile.interviews_taken} color="text-blue-400" bg="bg-blue-500/10" />
              <StatItem icon={Code2} label="Problems Solved" value={profile.problems_solved} color="text-emerald-400" bg="bg-emerald-500/10" />
              <StatItem icon={Calendar} label="Member Since" value={profile.joined} color="text-slate-400" bg="bg-slate-500/10" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-400" />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}
