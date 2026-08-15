import { useState } from 'react';
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
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Profile</h1>
          <p className="mt-1 text-sm text-white/40">Manage your developer profile and placement goals.</p>
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
        {/* Main Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Avatar & Basic */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#d4684b]/15 text-[#d4684b] border border-[#d4684b]/20 flex items-center justify-center text-xl sm:text-2xl font-semibold flex-shrink-0">
                {displayProfile.full_name?.[0] || 'U'}
              </div>
              <div className="flex-1 space-y-3">
                {isEditing && editForm ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[11px] font-medium text-white/40 mb-1 block uppercase tracking-wider">Full Name</label>
                      <input
                        className="auth-input text-xs"
                        value={editForm.full_name}
                        onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-white/40 mb-1 block uppercase tracking-wider">Bio</label>
                      <textarea
                        className="auth-input text-xs resize-none"
                        rows={3}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{displayProfile.full_name}</h2>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-white/30" />
                        <span className="text-xs text-white/40">{displayProfile.email}</span>
                      </div>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">{displayProfile.bio}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Education & Goals */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Education & Placement Goals
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {isEditing && editForm ? (
                <>
                  <div>
                    <label className="text-[11px] font-medium text-white/40 mb-1 block">College</label>
                    <input
                      className="auth-input text-xs"
                      value={editForm.college}
                      onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-white/40 mb-1 block">Graduation Year</label>
                    <input
                      className="auth-input text-xs"
                      type="number"
                      value={editForm.graduation_year}
                      onChange={(e) => setEditForm({ ...editForm, graduation_year: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-white/40 mb-1 block">Target Company</label>
                    <input
                      className="auth-input text-xs"
                      value={editForm.target_company}
                      onChange={(e) => setEditForm({ ...editForm, target_company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-white/40 mb-1 block">Target Role</label>
                    <input
                      className="auth-input text-xs"
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
          </div>

          {/* Skills */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-4">
              Skills & Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isEditing && editForm ? editForm.skills : displayProfile.skills).map((skill) => (
                <div key={skill} className="flex items-center">
                  <Badge color="blue" size="md">
                    {skill}
                    {isEditing && editForm && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1.5 text-white/40 hover:text-white"
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
                    className="w-28 px-3 py-1 rounded-lg text-xs bg-white/[0.03] border border-white/[0.08] text-white outline-none focus:border-[#d4684b]"
                    placeholder="Add skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button
                    onClick={addSkill}
                    className="p-1 rounded-lg bg-white/[0.05] text-white/60 hover:text-white border border-white/[0.08]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* XP & Level */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] text-center">
            <div className="w-14 h-14 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3">
              <span className="text-xl font-bold text-white">{level}</span>
            </div>
            <p className="text-sm font-medium text-white">Level {level}</p>
            <p className="text-xs text-white/30 mb-4">{displayProfile.xp_points.toLocaleString()} XP total</p>
            <ProgressBar
              value={xpInLevel}
              max={200}
              label="Next Level"
              size="sm"
            />
          </div>

          {/* Stats */}
          <div className="p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
              Performance Stats
            </h3>
            <div className="space-y-3">
              <StatItem icon={Flame} label="Current Streak" value={`${displayProfile.current_streak} days`} />
              <StatItem icon={Trophy} label="Longest Streak" value={`${displayProfile.longest_streak} days`} />
              <StatItem icon={Mic} label="Interviews" value={displayProfile.interviews_taken} />
              <StatItem icon={Code2} label="Problems Solved" value={displayProfile.problems_solved} />
              <StatItem icon={Calendar} label="Member Since" value={displayProfile.joined} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.04] bg-white/[0.01]">
      <div className="w-7 h-7 rounded bg-white/[0.05] flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-white/40" />
      </div>
      <div>
        <p className="text-[11px] text-white/30">{label}</p>
        <p className="text-xs font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-lg border border-white/[0.04] bg-white/[0.01]">
      <div className="flex items-center gap-2.5">
        <Icon className="w-3.5 h-3.5 text-[#d4684b]" />
        <span className="text-xs text-white/40">{label}</span>
      </div>
      <span className="text-xs font-medium text-white">{value}</span>
    </div>
  );
}
