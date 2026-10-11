import React, { useState } from 'react';
import {
  User,
  Shield,
  Bell,
  Eye,
  Lock,
  Save,
  CheckCircle2,
  Building2,
  GraduationCap,
  Sparkles,
  Smartphone,
  LogOut,
  RefreshCw,
  Camera
} from 'lucide-react';
import AvatarEditModal from '../components/AvatarEditModal';

export default function SettingsPage({
  currentUser,
  onUpdateUser
}) {
  const [activeTab, setActiveTab] = useState('account'); // 'account' | 'notifications' | 'privacy' | 'security'
  const [savedSuccess, setSavedSuccess] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleSaveAvatar = (newAvatarUrl) => {
    if (onUpdateUser && currentUser) {
      onUpdateUser({ ...currentUser, avatar: newAvatarUrl });
    }
    setSavedSuccess('Profile picture updated successfully.');
    setTimeout(() => setSavedSuccess(''), 3000);
  };
  
  const [accountForm, setAccountForm] = useState({
    name: currentUser?.name || 'Kumaran123',
    email: currentUser?.email || 'kumaran123@gmail.com',
    college: currentUser?.college || 'National Institute of Technology',
    cgpa: currentUser?.cgpa || '9.1',
    bio: currentUser?.bio || 'Verified Student Developer'
  });

  const [notifications, setNotifications] = useState({
    opportunityMatches: true,
    recruiterShortlist: true,
    benchmarkReminders: false,
    leaderboardUpdates: true
  });

  const [privacy, setPrivacy] = useState({
    recruiterDiscoverable: true,
    showBadgesPublicly: true,
    anonymizeEmailUntilMatch: false
  });

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (onUpdateUser && currentUser) {
      const updated = {
        ...currentUser,
        name: accountForm.name,
        email: accountForm.email,
        college: accountForm.college,
        cgpa: accountForm.cgpa,
        bio: accountForm.bio
      };
      onUpdateUser(updated);
    }
    setSavedSuccess('Account settings updated successfully.');
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Account & System Settings
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your personal profile, notifications, recruiter visibility preferences, and security.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#00E699]/10 border border-[#00E699]/30 text-[#00E699] flex items-center justify-between text-xs sm:text-sm font-medium animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{savedSuccess}</span>
          </div>
          <button onClick={() => setSavedSuccess('')} className="text-xs px-2 py-0.5 rounded hover:bg-[#00E699]/20">✕</button>
        </div>
      )}

      {/* Settings Grid (Sidebar Tabs + Content) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Tabs */}
        <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-2 space-y-1">
          <button
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
              activeTab === 'account'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#0B101B]/50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Account</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#0B101B]/50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
              activeTab === 'privacy'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#0B101B]/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Recruiter Visibility</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
              activeTab === 'security'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-[#0B101B]/50'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security & Auth</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 bg-[#101726] border border-[#1C2638] rounded-xl p-6 shadow-xl">
          
          {/* TAB 1: Profile & Account */}
          {activeTab === 'account' && (
            <form onSubmit={handleSaveAccount} className="space-y-5">
              <div className="border-b border-[#1C2638] pb-3">
                <h2 className="text-base font-bold text-white">Personal Profile</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage details seen across your portfolio and candidate profile.</p>
              </div>

              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#0B101B] border border-[#1C2638]">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <img
                      src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={currentUser?.name}
                      className="w-14 h-14 rounded-xl object-cover border-2 border-[#1C2638]"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Profile Photo</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Your collegiate avatar displayed to peers and recruiters.</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#101726] hover:bg-[#162033] border border-[#1C2638] hover:border-[#00E699]/50 text-xs font-semibold text-[#00E699] transition-all shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  Change Profile Picture
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Full Name / Display Name</label>
                  <input
                    type="text"
                    required
                    value={accountForm.name}
                    onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={accountForm.email}
                    onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">College / University</label>
                  <input
                    type="text"
                    value={accountForm.college}
                    onChange={(e) => setAccountForm({ ...accountForm, college: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">Current CGPA</label>
                  <input
                    type="text"
                    value={accountForm.cgpa}
                    onChange={(e) => setAccountForm({ ...accountForm, cgpa: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="block text-slate-300 font-medium mb-1.5">Professional Bio</label>
                <textarea
                  rows={3}
                  value={accountForm.bio}
                  onChange={(e) => setAccountForm({ ...accountForm, bio: e.target.value })}
                  className="w-full p-3 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699] leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E699] text-[#070B12] font-bold text-xs hover:bg-[#00E699]/90 transition-all shadow-glow-emerald"
                >
                  <Save className="w-3.5 h-3.5" />
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <div className="border-b border-[#1C2638] pb-3">
                <h2 className="text-base font-bold text-white">Notification Preferences</h2>
                <p className="text-xs text-slate-400 mt-0.5">Control email and in-app alert notifications for opportunities and benchmarks.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] cursor-pointer hover:border-[#2A3952] transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-white">Job & Internship Matches (≥75% Skill Fit)</div>
                    <div className="text-[11px] text-slate-400">Receive alerts when new postings closely match your validated skills.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.opportunityMatches}
                    onChange={(e) => setNotifications({ ...notifications, opportunityMatches: e.target.checked })}
                    className="w-4 h-4 accent-[#00E699] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] cursor-pointer hover:border-[#2A3952] transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-white">Recruiter Stage Updates & Shortlists</div>
                    <div className="text-[11px] text-slate-400">Immediate notifications when recruiters move your application stage.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.recruiterShortlist}
                    onChange={(e) => setNotifications({ ...notifications, recruiterShortlist: e.target.checked })}
                    className="w-4 h-4 accent-[#00E699] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] cursor-pointer hover:border-[#2A3952] transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-white">Campus Leaderboard Weekly Digest</div>
                    <div className="text-[11px] text-slate-400">Weekly campus ranking summary and peer benchmark updates.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.leaderboardUpdates}
                    onChange={(e) => setNotifications({ ...notifications, leaderboardUpdates: e.target.checked })}
                    className="w-4 h-4 accent-[#00E699] cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setSavedSuccess('Notification preferences saved.');
                    setTimeout(() => setSavedSuccess(''), 3000);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#00E699] text-[#070B12] font-bold text-xs hover:bg-[#00E699]/90 transition-all shadow-glow-emerald"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Recruiter Visibility */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="border-b border-[#1C2638] pb-3">
                <h2 className="text-base font-bold text-white">Recruiter Discovery & Privacy</h2>
                <p className="text-xs text-slate-400 mt-0.5">Determine how hiring managers and talent partners discover your student profile.</p>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] cursor-pointer hover:border-[#2A3952] transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-white">Allow Verified Recruiters to Discover Profile</div>
                    <div className="text-[11px] text-slate-400">Permit talent partners searching for verified skills to view your profile.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.recruiterDiscoverable}
                    onChange={(e) => setPrivacy({ ...privacy, recruiterDiscoverable: e.target.checked })}
                    className="w-4 h-4 accent-[#00E699] cursor-pointer"
                  />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] cursor-pointer hover:border-[#2A3952] transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-white">Show Benchmark Credential Badges Publicly</div>
                    <div className="text-[11px] text-slate-400">Display verified badges (React, Python, JS) on public campus searches.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={privacy.showBadgesPublicly}
                    onChange={(e) => setPrivacy({ ...privacy, showBadgesPublicly: e.target.checked })}
                    className="w-4 h-4 accent-[#00E699] cursor-pointer"
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setSavedSuccess('Privacy settings saved.');
                    setTimeout(() => setSavedSuccess(''), 3000);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#00E699] text-[#070B12] font-bold text-xs hover:bg-[#00E699]/90 transition-all shadow-glow-emerald"
                >
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Security */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              <div className="border-b border-[#1C2638] pb-3">
                <h2 className="text-base font-bold text-white">Security & Password</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage credentials, active sessions, and multi-factor verification.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">New Password</label>
                    <input
                      type="password"
                      placeholder="At least 8 characters"
                      className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Confirm New Password</label>
                    <input
                      type="password"
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => {
                    setSavedSuccess('Password updated successfully.');
                    setTimeout(() => setSavedSuccess(''), 3000);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#00E699] text-[#070B12] font-bold text-xs hover:bg-[#00E699]/90 transition-all shadow-glow-emerald"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Avatar Edit Modal */}
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
