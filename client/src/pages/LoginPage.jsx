import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
  UserPlus,
  LogIn,
  User,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Building2
} from 'lucide-react';

export default function LoginPage({ users = [], currentUser, onSelectUser }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');

  const [activeTab, setActiveTab] = useState(modeParam === 'signup' ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // Dynamic role-segregated account suggestions (includes all newly signed-up recruiters/students)
  const recruiterAccounts = users.filter((u) => u.role === 'recruiter' || u.role === 'admin');
  const studentAccounts = users.filter((u) => u.role === 'student');

  const displayRecruiters = recruiterAccounts.length > 0
    ? recruiterAccounts
    : [
        { id: 'rec-1', name: 'Priya Patel', email: 'priya.patel@techflow.io' },
        { id: 'rec-2', name: 'Marcus Vance', email: 'marcus.vance@techcorp.io' }
      ];

  const displayStudents = studentAccounts.length > 0
    ? studentAccounts
    : [
        { id: 'st-1', name: 'Kumaran123', email: 'kumaran123@gmail.com' },
        { id: 'st-2', name: 'Aarav Sharma', email: 'aarav.sharma@skillbridge.edu' }
      ];

  useEffect(() => {
    if (modeParam === 'signup') {
      setActiveTab('signup');
    } else if (modeParam === 'login') {
      setActiveTab('login');
    }
  }, [modeParam]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const cleanEmail = email.trim();

      if (activeTab === 'signup') {
        const rawName = fullName.trim() || (cleanEmail.includes('@') ? cleanEmail.split('@')[0] : cleanEmail) || 'New Member';
        const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

        const newUser = {
          id: `custom-${Date.now()}`,
          name: formattedName,
          role: selectedRole,
          email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail.toLowerCase()}@${selectedRole === 'student' ? 'campus.edu' : 'recruiter.io'}`,
          avatar: selectedRole === 'student'
            ? `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`
            : `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80`,
          xpPoints: selectedRole === 'student' ? 500 : 0,
          verifiedBadges: selectedRole === 'student' ? ['JavaScript'] : [],
          skills: selectedRole === 'student' ? ['JavaScript', 'HTML/CSS', 'React'] : [],
          college: selectedRole === 'student' ? 'National Institute of Technology' : undefined,
          company: selectedRole === 'recruiter' ? 'Nexus Talent Corp' : undefined,
          cgpa: selectedRole === 'student' ? '8.8' : undefined,
          bio: `${selectedRole === 'student' ? 'Aspiring Software Engineer' : 'Campus Talent Recruiter'}`
        };
        if (onSelectUser) {
          onSelectUser(newUser);
        }
        setIsSubmitting(false);
        navigate(selectedRole === 'recruiter' ? '/admin' : '/dashboard');
      } else {
        // Sign In tab: Check if matches any existing user with the selected role
        const matchedUser = users.find(
          (u) => (u.email?.toLowerCase() === cleanEmail.toLowerCase() ||
                  u.name?.toLowerCase() === cleanEmail.toLowerCase()) &&
                 (u.role === selectedRole || (selectedRole === 'recruiter' && u.role === 'admin'))
        ) || users.find(
          (u) => u.email?.toLowerCase() === cleanEmail.toLowerCase() ||
                 u.name?.toLowerCase() === cleanEmail.toLowerCase()
        );

        let userToLog;
        if (matchedUser) {
          userToLog = { ...matchedUser, role: selectedRole };
        } else {
          // Log in with user's OWN entered credentials!
          const rawName = cleanEmail.includes('@')
            ? cleanEmail.split('@')[0].replace(/[._-]/g, ' ')
            : cleanEmail;
          const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

          if (selectedRole === 'recruiter') {
            userToLog = {
              id: `recruiter-${Date.now()}`,
              name: formattedName || 'Recruiter Partner',
              role: 'recruiter',
              email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail.toLowerCase()}@techflow.io`,
              avatar: `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80`,
              company: 'TechFlow Innovations',
              bio: 'Campus Talent Acquisition Lead'
            };
          } else {
            userToLog = {
              id: `user-${Date.now()}`,
              name: formattedName || 'Custom Student',
              role: 'student',
              email: cleanEmail.includes('@') ? cleanEmail : `${cleanEmail.toLowerCase()}@campus.edu`,
              avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
              xpPoints: 3550,
              verifiedBadges: ['React', 'JavaScript', 'Python Certified Pro'],
              skills: ['React', 'JavaScript', 'Tailwind CSS', 'Python'],
              college: 'National Institute of Technology',
              cgpa: '9.1',
              bio: 'Verified Student Developer'
            };
          }
        }

        if (onSelectUser) {
          onSelectUser(userToLog);
        }
        setIsSubmitting(false);
        navigate(selectedRole === 'recruiter' ? '/admin' : '/dashboard');
      }
    }, 350);
  };

  const handleQuickFill = (roleType) => {
    setSelectedRole(roleType);
    if (roleType === 'student') {
      setEmail('kumaran123@gmail.com');
      setPassword('password123');
    } else {
      setEmail('priya.patel@techflow.io');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans selection:bg-[#00E699] selection:text-[#070B12] overflow-x-hidden">
      {/* Fixed Header Bar */}
      <header className="h-14 px-6 flex items-center justify-between border-b border-[#1C2638] bg-[#0B101B] shrink-0">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#00E699]/15 border border-[#00E699]/40 flex items-center justify-center text-[#00E699] shadow-[0_0_12px_rgba(0,230,153,0.3)]">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <polygon points="12,2 22,20 2,20" />
            </svg>
          </div>
          <span className="text-base font-bold tracking-tight text-white">SkillBridge</span>
        </Link>
        <Link
          to="/"
          className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </header>

      {/* Main Container - Centered, Fixed Width, Zero Shaking */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md mx-auto">
          {/* Card Surface */}
          <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-6 sm:p-8 shadow-2xl relative">
            {/* Subtle top indicator glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#00E699] to-transparent rounded-full" />

            {/* Header */}
            <div className="text-center space-y-1.5 mb-5">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B101B] border text-[10px] font-mono ${
                selectedRole === 'recruiter' ? 'border-[#3B82F6]/40 text-[#3B82F6]' : 'border-[#00E699]/40 text-[#00E699]'
              }`}>
                <ShieldCheck className="w-3 h-3" />
                {selectedRole === 'recruiter' ? 'PRIVATE RECRUITER ACCESS' : 'STUDENT CANDIDATE ACCESS'}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {activeTab === 'login'
                  ? selectedRole === 'recruiter' ? 'Recruiter Sign In' : 'Student Sign In'
                  : selectedRole === 'recruiter' ? 'Register Recruiter Account' : 'Student Registration'}
              </h2>
              <p className="text-xs text-slate-400">
                {selectedRole === 'recruiter'
                  ? 'Private talent acquisition portal to post roles, review applicants, and track pipelines.'
                  : 'Log in to track your skill benchmarks, verified XP, and tech opportunities.'}
              </p>
            </div>

            {/* Step 1: Select Access Type (Student vs Recruiter) */}
            <div className="grid grid-cols-2 p-1 bg-[#0B101B] rounded-lg border border-[#1C2638] mb-3">
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`py-2 px-3 text-xs font-mono font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'student'
                    ? 'bg-[#101726] text-[#00E699] border border-[#00E699]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Login</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('recruiter')}
                className={`py-2 px-3 text-xs font-mono font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  selectedRole === 'recruiter'
                    ? 'bg-[#101726] text-[#3B82F6] border border-[#3B82F6]/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Recruiter Login</span>
              </button>
            </div>

            {/* Step 2: Sign In / Sign Up Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#0B101B] rounded-lg border border-[#1C2638] mb-5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setSearchParams({ mode: 'login' });
                }}
                className={`py-1.5 text-xs font-mono font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'login'
                    ? selectedRole === 'recruiter'
                      ? 'bg-[#101726] text-[#3B82F6] shadow-sm border border-[#3B82F6]/30'
                      : 'bg-[#101726] text-[#00E699] shadow-sm border border-[#00E699]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setSearchParams({ mode: 'signup' });
                }}
                className={`py-1.5 text-xs font-mono font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup'
                    ? selectedRole === 'recruiter'
                      ? 'bg-[#101726] text-[#3B82F6] shadow-sm border border-[#3B82F6]/30'
                      : 'bg-[#101726] text-[#00E699] shadow-sm border border-[#00E699]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>

            {/* Standard Credential Inputs */}
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {activeTab === 'signup' && (
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    {selectedRole === 'recruiter' ? 'Recruiter / Contact Name' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-white focus:outline-none focus:border-[#00E699] transition-all font-sans"
                      placeholder={selectedRole === 'recruiter' ? 'e.g. Priya Patel' : 'e.g. Kumaran123'}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-white focus:outline-none focus:border-[#00E699] transition-all font-mono"
                    placeholder={selectedRole === 'recruiter' ? 'e.g. priya.patel@techflow.io' : 'e.g. kumaran123@gmail.com'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-white focus:outline-none focus:border-[#00E699] transition-all font-mono"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 text-[11px]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#0B101B] border-[#1C2638] text-[#00E699] focus:ring-0"
                  />
                  <span>Remember session</span>
                </label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => handleQuickFill(selectedRole)}
                    className={`text-[11px] font-mono hover:underline ${
                      selectedRole === 'recruiter' ? 'text-[#3B82F6]' : 'text-[#00E699]'
                    }`}
                  >
                    Quick Autofill
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2.5 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                  selectedRole === 'recruiter'
                    ? 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_0_16px_rgba(59,130,246,0.35)]'
                    : 'bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_16px_rgba(0,230,153,0.35)]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing {selectedRole === 'recruiter' ? 'Recruiter' : 'Student'}...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {activeTab === 'login'
                        ? selectedRole === 'recruiter' ? 'Sign In as Recruiter' : 'Sign In as Student'
                        : selectedRole === 'recruiter' ? 'Register Recruiter Account' : 'Register Student Account'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Role-Specific Recommended Accounts List */}
            <div className="mt-5 pt-4 border-t border-[#1C2638] space-y-2.5 text-[11px] font-mono">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-slate-300">
                  {selectedRole === 'recruiter' ? (
                    <>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#3B82F6]" />
                      <span>Recommended Recruiter Accounts:</span>
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-3.5 h-3.5 text-[#00E699]" />
                      <span>Recommended Student Accounts:</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] text-slate-500">
                  {selectedRole === 'recruiter' ? displayRecruiters.length : displayStudents.length} Available
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-0.5">
                {selectedRole === 'recruiter'
                  ? displayRecruiters.map((rec) => (
                      <button
                        key={rec.email || rec.id}
                        type="button"
                        onClick={() => {
                          setEmail(rec.email);
                          setPassword('password123');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#101726] hover:bg-[#162033] border border-[#1C2638] hover:border-[#3B82F6]/60 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all text-left group"
                        title={`Quick autofill as ${rec.name}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                        <span className="font-semibold text-white">{rec.name}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          ({rec.email})
                        </span>
                      </button>
                    ))
                  : displayStudents.map((st) => (
                      <button
                        key={st.email || st.id}
                        type="button"
                        onClick={() => {
                          setEmail(st.email);
                          setPassword('password123');
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#101726] hover:bg-[#162033] border border-[#1C2638] hover:border-[#00E699]/60 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all text-left group"
                        title={`Quick autofill as ${st.name}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E699] shrink-0" />
                        <span className="font-semibold text-white">{st.name}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                          ({st.email})
                        </span>
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer ribbon */}
      <footer className="h-10 border-t border-[#1C2638] bg-[#0B101B] flex items-center justify-center text-center text-xs text-slate-500 font-mono shrink-0">
        SkillBridge Portal • Deep Midnight Navy Terminal Edition • 256-Bit SSL Encrypted
      </footer>
    </div>
  );
}
