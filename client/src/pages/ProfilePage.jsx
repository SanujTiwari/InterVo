import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  GraduationCap,
  Target,
  Briefcase,
  Flame,
  Trophy,
  Mic,
  Code2,
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function ProfilePage() {
  const { user, profile, updateProfile, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const displayProfile = {
    full_name: profile?.full_name || user?.full_name || 'User',
    email: profile?.email || user?.email || '',
    bio: profile?.bio || 'No bio added yet. Click Edit Profile to add one.',
    college: profile?.college || 'Not specified',
    graduation_year: profile?.graduation_year || 'N/A',
    target_company: profile?.target_company || 'Not specified',
    target_role: profile?.target_role || 'Not specified',
    skills: profile?.skills || [],
    xp_points: profile?.xp_points ?? 0,
    current_streak: profile?.current_streak ?? 0,
    longest_streak: profile?.longest_streak ?? 0,
    interviews_taken: profile?.interviews_taken ?? 0,
    problems_solved: profile?.problems_solved ?? 0,
    joined: profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A',
  };

  const handleEditStart = () => {
    setEditForm({
      full_name: displayProfile.full_name,
      bio: profile?.bio || '',
      college: profile?.college || '',
      graduation_year: profile?.graduation_year || '',
      target_company: profile?.target_company || '',
      target_role: profile?.target_role || '',
      skills: profile?.skills || [],
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await api.put('/users/profile', editForm);
      updateProfile(data.data);
      updateUser({ ...user, full_name: data.data.full_name });
      setIsEditing(false);
    } catch (err) {
      console.error('Error saving profile:', err);
    }
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

  const level = Math.max(1, Math.floor(displayProfile.xp_points / 200));
  const xpInLevel = displayProfile.xp_points % 200;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your profile and track your progress.</p>
        </div>
        {!isEditing ? (
          <Button variant="secondary" size="sm" icon={Edit3} onClick={handleEditStart}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                {displayProfile.full_name?.[0] || 'U'}
              </div>
              <div className="flex-1 space-y-4">
                {isEditing && editForm ? (
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
                      <h2 className="text-xl font-bold text-white">{displayProfile.full_name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <span className="text-sm text-slate-400">{displayProfile.email}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{displayProfile.bio}</p>
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
              {isEditing && editForm ? (
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
                  <InfoItem icon={GraduationCap} label="College" value={displayProfile.college} />
                  <InfoItem icon={Calendar} label="Graduation" value={displayProfile.graduation_year} />
                  <InfoItem icon={Target} label="Target Company" value={displayProfile.target_company} />
                  <InfoItem icon={Briefcase} label="Target Role" value={displayProfile.target_role} />
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
              {(isEditing && editForm ? editForm.skills : displayProfile.skills).map((skill) => (
                <div key={skill} className="flex items-center">
                  <Badge color="blue" size="md">
                    {skill}
                    {isEditing && editForm && (
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
              {isEditing && editForm && (
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
              <p className="text-xs text-slate-500">{displayProfile.xp_points.toLocaleString()} XP total</p>
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
              <StatItem icon={Flame} label="Current Streak" value={`${displayProfile.current_streak} days`} color="text-amber-400" bg="bg-amber-500/10" />
              <StatItem icon={Trophy} label="Longest Streak" value={`${displayProfile.longest_streak} days`} color="text-purple-400" bg="bg-purple-500/10" />
              <StatItem icon={Mic} label="Interviews" value={displayProfile.interviews_taken} color="text-blue-400" bg="bg-blue-500/10" />
              <StatItem icon={Code2} label="Problems Solved" value={displayProfile.problems_solved} color="text-emerald-400" bg="bg-emerald-500/10" />
              <StatItem icon={Calendar} label="Member Since" value={displayProfile.joined} color="text-slate-400" bg="bg-slate-500/10" />
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
