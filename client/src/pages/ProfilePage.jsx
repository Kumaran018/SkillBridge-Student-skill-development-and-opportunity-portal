import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Award,
  GitBranch,
  Mail,
  GraduationCap,
  Edit3,
  Plus,
  Trash2,
  Save,
  Printer,
  FileText,
  CheckCircle2,
  Clock,
  Briefcase,
  Camera
} from 'lucide-react';
import ResumeModal from '../components/ResumeModal';
import AvatarEditModal from '../components/AvatarEditModal';

export default function ProfilePage({
  currentUser,
  opportunities = [],
  onUpdateUser
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const handleSaveAvatar = async (newAvatarUrl) => {
    if (!currentUser) return;
    try {
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ avatar: newAvatarUrl })
      });
      const updated = res.ok ? await res.json() : { ...currentUser, avatar: newAvatarUrl };
      if (onUpdateUser) onUpdateUser(updated);
      setSuccessToast('Profile picture updated successfully.');
      setTimeout(() => setSuccessToast(''), 4000);
    } catch (err) {
      console.warn('Avatar update fallback:', err);
      if (onUpdateUser) onUpdateUser({ ...currentUser, avatar: newAvatarUrl });
      setSuccessToast('Profile picture updated.');
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  // Editable state
  const [formData, setFormData] = useState({
    bio: currentUser?.bio || '',
    githubUrl: currentUser?.githubUrl || '',
    cgpa: currentUser?.cgpa || 9.0,
    skills: currentUser?.skills || []
  });

  // Calculate which skills are verified by badges
  const verifiedBadgeTitles = (currentUser?.verifiedBadges || []).map(b => b.toLowerCase());
  
  const isSkillVerified = (skill) => {
    const s = skill.toLowerCase();
    return verifiedBadgeTitles.some(b => b.includes(s));
  };

  // Applications submitted by this student
  const studentApplications = opportunities.filter((o) =>
    o.applicants?.some((a) => a.studentId === currentUser?.id)
  );

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const trimmed = newSkillInput.trim();
    if (!formData.skills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, trimmed]
      });
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skillToRemove)
    });
  };

  const handleSaveProfile = async () => {
    if (!currentUser) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/users/${currentUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bio: formData.bio,
          githubUrl: formData.githubUrl,
          cgpa: Number(formData.cgpa),
          skills: formData.skills
        })
      });

      const updated = await res.json();
      if (res.ok) {
        setIsEditing(false);
        setSuccessToast('Profile updated successfully.');
        if (onUpdateUser) onUpdateUser(updated);
        setTimeout(() => setSuccessToast(''), 4000);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Toast Notification */}
      {successToast && (
        <div className="p-3.5 rounded-xl bg-[#00E699]/10 border border-[#00E699]/30 text-[#00E699] flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E699]" />
            <span className="text-xs sm:text-sm font-medium">{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-xs px-2 py-1 text-[#00E699] hover:bg-[#00E699]/20 rounded">✕</button>
        </div>
      )}

      {/* Profile Header Banner */}
      <div className="rounded-xl bg-[#101726] border border-[#1C2638] p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative shrink-0 group">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-xl object-cover border-2 border-[#1C2638] group-hover:border-[#00E699] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer shadow-lg"
                title="Change Profile Picture"
              >
                <Camera className="w-5 h-5 text-[#00E699]" />
                <span className="text-[10px] font-bold text-white mt-0.5">Edit Photo</span>
              </button>
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="absolute -bottom-1 -right-1 p-1 rounded-md bg-[#0B101B] border border-[#1C2638] hover:border-[#00E699] text-[#00E699] transition-colors shadow-md"
                title="Change Profile Picture"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#1C2638] font-mono">
                  {currentUser.role}
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                <span>{currentUser.college}</span>
                <span>•</span>
                <span>{currentUser.year}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                <span className="font-mono font-semibold px-2 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#1C2638]">
                  {currentUser.xpPoints?.toLocaleString()} XP
                </span>
                <span className="font-mono px-2 py-0.5 rounded bg-[#0B101B] text-slate-300 border border-[#1C2638]">
                  CGPA: {currentUser.cgpa}
                </span>
                {currentUser.githubUrl && (
                  <a
                    href={currentUser.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0B101B] hover:bg-[#162033] text-slate-300 border border-[#1C2638] font-medium transition-colors"
                  >
                    <GitBranch className="w-3 h-3 text-slate-400" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Profile Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs bg-[#101726] hover:bg-[#162033] text-slate-200 hover:text-white border border-[#1C2638] hover:border-[#00E699]/50 transition-all shadow-xs"
              title="Change Profile Picture"
            >
              <Camera className="w-3.5 h-3.5 text-[#00E699]" />
              Change Picture
            </button>
            <button
              onClick={() => setShowResumeModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold text-xs bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              Generate Resume
            </button>

            <button
              onClick={() => {
                if (isEditing) {
                  handleSaveProfile();
                } else {
                  setIsEditing(true);
                }
              }}
              disabled={saving}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-semibold text-xs transition-all border ${
                isEditing
                  ? 'bg-[#00E699] text-[#070B12] border-[#00E699] font-bold shadow-[0_0_12px_rgba(0,230,153,0.3)]'
                  : 'bg-[#101726] hover:bg-[#162033] text-white border-[#1C2638]'
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Saving...' : 'Save Profile'}
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bio / Summary Box */}
        <div className="pt-3.5 border-t border-[#1C2638] space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Professional Bio
          </label>
          {isEditing ? (
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white text-xs placeholder-slate-500 focus:outline-hidden focus:border-[#00E699] leading-relaxed transition-colors"
              placeholder="Write a brief overview of your technical interests..."
            />
          ) : (
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              {currentUser.bio || 'No bio provided yet.'}
            </p>
          )}

          {isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">GitHub Profile URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/username"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699] transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Current CGPA (Out of 10)</label>
                <input
                  type="number"
                  step="0.1"
                  max="10"
                  min="0"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699] font-mono transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Verified Badges & Skills Inventory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* CARD 1: Verified Badges */}
        <div className="bg-[#101726] p-5 rounded-xl border border-[#1C2638] shadow-xl space-y-4">
          <div className="border-b border-[#1C2638] pb-2.5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00E699]" />
              Verified Credentials ({currentUser.verifiedBadges?.length || 0})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Awarded through &ge;80% MCQ benchmark scores.
            </p>
          </div>

          <div className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] space-y-2">
            {currentUser.verifiedBadges?.map((badge) => (
              <div
                key={badge}
                className="p-2.5 rounded-md bg-[#101726] border border-[#1C2638] border-l-4 border-l-[#00E699] flex items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0B101B] border border-[#1C2638] flex items-center justify-center text-[#00E699]">
                    <Award className="w-4 h-4 text-[#00E699]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                      {badge}
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00E699]" />
                    </h3>
                    <div className="text-[11px] text-slate-400">Benchmark Validated</div>
                  </div>
                </div>

                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#00E699]/15 text-[#00E699] border border-[#00E699]/30 font-mono">
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CARD 2: Skills Inventory */}
        <div className="bg-[#101726] p-5 rounded-xl border border-[#1C2638] shadow-xl space-y-4">
          <div className="border-b border-[#1C2638] pb-2.5">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-slate-300" />
              Skills Portfolio
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified credentials and self-reported competencies.
            </p>
          </div>

          {/* Add New Skill Tag Form */}
          <form onSubmit={handleAddSkill} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add skill (e.g. Next.js, Redis)..."
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699] transition-colors"
            />
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E699] hover:bg-[#00c985] text-[#070B12] text-xs font-bold transition-all shadow-[0_0_8px_rgba(0,230,153,0.3)]"
            >
              <Plus className="w-3 h-3" />
              Add
            </button>
          </form>

          {/* Skills List */}
          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-slate-400">Active Profile Skills:</div>
            <div className="flex flex-wrap gap-1.5">
              {(isEditing ? formData.skills : currentUser.skills)?.map((skill) => {
                const verified = isSkillVerified(skill);
                return (
                  <span
                    key={skill}
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md font-medium border ${
                      verified
                        ? 'bg-[#0B101B] text-[#00E699] border-[#00E699]/40'
                        : 'bg-[#0B101B] text-slate-300 border-[#1C2638]'
                    }`}
                  >
                    {verified ? (
                      <CheckCircle2 className="w-3 h-3 text-[#00E699]" title="Verified Skill" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    )}
                    <span>{skill}</span>

                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-slate-400 hover:text-rose-400"
                      >
                        ✕
                      </button>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Printable Resume Modal */}
      <ResumeModal
        isOpen={showResumeModal}
        onClose={() => setShowResumeModal(false)}
        student={currentUser}
        appliedOpportunities={studentApplications}
      />

      {/* Profile Picture / Avatar Edit Modal */}
      <AvatarEditModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        currentAvatar={currentUser?.avatar}
        userName={currentUser?.name}
        onSaveAvatar={handleSaveAvatar}
      />

    </div>
  );
}
