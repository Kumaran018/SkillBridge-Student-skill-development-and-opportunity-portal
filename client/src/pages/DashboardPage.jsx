import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  Award,
  BookOpen,
  Trophy,
  User,
  Settings,
  Bell,
  ChevronDown,
  TrendingUp,
  Wallet,
  Target,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Cpu,
  Clock,
  Sparkles,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Search,
  LogOut
} from 'lucide-react';
import { calculateSkillMatch } from '../components/SkillMatchBadge';

export default function DashboardPage({
  currentUser,
  opportunities = [],
  quizzes = [],
  leaderboard = [],
  onSwitchUser,
  allUsers = [],
  onSelectUser,
  onSignOut
}) {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState('1M');
  const [demandTimeframe, setDemandTimeframe] = useState('1D');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hrs: '00', min: '18', sec: '24' });

  // Student-specific metrics & Live Feed events
  const studentXP = currentUser?.xpPoints || 3550;
  const verifiedBadges = currentUser?.verifiedBadges || ['React', 'JavaScript', 'Python Certified Pro'];
  const userSkills = (currentUser?.skills && currentUser.skills.length > 0)
    ? currentUser.skills
    : ['React', 'JavaScript', 'Tailwind CSS', 'Python'];

  // Applications submitted specifically by this student
  const studentApplications = opportunities.filter((o) =>
    o.applicants?.some(
      (a) =>
        a.studentId === currentUser?.id ||
        (a.studentName && currentUser?.name && a.studentName.toLowerCase() === currentUser.name.toLowerCase())
    )
  );

  // Dynamic pass rate for this student
  const studentWinRate = verifiedBadges.length > 0 ? `${Math.min(74 + verifiedBadges.length * 6, 96)}%` : '0%';

  // Top skill match among opportunities for this student
  let bestMatchedOpp = null;
  let topMatchPct = 0;
  opportunities.forEach((opp) => {
    const { percentage } = calculateSkillMatch(userSkills, opp.requiredSkills || []);
    if (percentage > topMatchPct) {
      topMatchPct = percentage;
      bestMatchedOpp = opp;
    }
  });

  // Construct Current Student's Live Feed
  const studentLiveFeed = [
    // 1. Applications submitted by this student
    ...studentApplications.map((app) => ({
      id: `app-${app.id}`,
      title: app.title,
      company: `${app.company} • Applied`,
      badge: 'Applied',
      badgeColor: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30',
      time: 'Live Application',
      link: '/opportunities'
    })),
    // 2. Verified badges & certifications earned by this student
    ...verifiedBadges.map((badge, idx) => ({
      id: `badge-${idx}`,
      title: `${badge} Benchmark`,
      company: 'SkillBridge Verification • Passed',
      badge: '+100 XP',
      badgeColor: 'text-[#00E699] bg-[#00E699]/10 border-[#00E699]/30',
      time: 'Verified Credential',
      link: '/quizzes'
    })),
    // 3. Milestone / Leaderboard standing for this student
    {
      id: 'milestone-xp',
      title: `${studentXP.toLocaleString()} XP Milestone`,
      company: `${currentUser?.college || 'National Institute of Technology'} • Campus Standing`,
      badge: 'Ranked',
      badgeColor: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30',
      time: 'Active Profile',
      link: '/leaderboard'
    },
    // 4. AI Opportunity Match signal
    ...(bestMatchedOpp ? [{
      id: 'ai-recommendation',
      title: `AI Match: ${bestMatchedOpp.title}`,
      company: `${bestMatchedOpp.company} • ${topMatchPct}% Skill Match`,
      badge: `${topMatchPct}% Fit`,
      badgeColor: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30',
      time: 'AI Radar',
      link: '/opportunities'
    }] : [])
  ];

  // Recruiter Dashboard Specific Metrics
  const isRecruiter = currentUser?.role === 'recruiter' || currentUser?.role === 'admin';
  const studentsList = allUsers.filter((u) => u.role === 'student');
  const totalTalentXP = studentsList.reduce((sum, s) => sum + (Number(s.xpPoints) || 0), 0) || 48250;

  // Flatten all applicants across opportunities
  const allApplicantsList = [];
  opportunities.forEach((opp) => {
    opp.applicants?.forEach((app) => {
      allApplicantsList.push({
        opportunity: opp,
        applicant: app
      });
    });
  });

  // Top candidates ranked by XP
  const topTalentList = [...studentsList].sort((a, b) => (Number(b.xpPoints) || 0) - (Number(a.xpPoints) || 0)).slice(0, 5);

  // Recruiter Dashboard View
  if (isRecruiter) {
    return (
      <div className="flex flex-col min-w-0 bg-[#0B101B]">
        {/* Recruiter Dashboard Canvas */}
        <main className="p-6 space-y-6 flex-1">
          {/* Header Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#101726] border border-[#1C2638] rounded-xl p-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-tight">
                  Recruiter Intelligence Dashboard
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30">
                  {currentUser?.company || 'Talent Acquisition'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Overview of campus talent pool score, candidate applications pipeline, and hiring demand analytics.
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate('/admin')}
                className="px-3.5 py-2 rounded-lg bg-[#00E699] hover:bg-[#00c985] text-[#070B12] font-bold text-xs shadow-glow-emerald transition-all"
              >
                + Post Opportunity
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="px-3.5 py-2 rounded-lg bg-[#101726] hover:bg-[#162033] border border-[#1C2638] hover:border-[#3B82F6] text-white font-semibold text-xs transition-all"
              >
                Candidate Pipeline
              </button>
            </div>
          </div>

          {/* ROW 1: 4 TOP RECRUITER KPI CARDS (showing TOTAL XP like requested!) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: TOTAL TALENT XP */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  TOTAL TALENT XP
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#00E699]/10 border border-[#00E699]/20 flex items-center justify-center text-[#00E699]">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {totalTalentXP.toLocaleString()} <span className="text-xs font-mono text-slate-400">XP</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 14L16 11L30 15L44 8L58 10L72 4L82 3" stroke="#00E699" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#00E699] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
            </div>

            {/* KPI 2: VERIFIED TALENT POOL */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  VERIFIED CANDIDATES
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {studentsList.length || 18}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 16L18 13L32 10L46 12L60 7L74 9L82 2" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#3B82F6] flex items-center gap-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                </span>
              </div>
            </div>

            {/* KPI 3: ACTIVE APPLICANTS */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  ACTIVE APPLICANTS
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {allApplicantsList.length}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 15L16 12L30 14L44 9L58 11L72 6L82 5" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#A855F7] flex items-center gap-0.5">
                  In Pipeline
                </span>
              </div>
            </div>

            {/* KPI 4: POSTED OPPORTUNITIES */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  POSTED OPPORTUNITIES
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center text-[#00E5FF]">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {opportunities.length}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 13L16 14L30 10L44 11L58 7L72 8L82 4" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#00E5FF] flex items-center gap-0.5">
                  Active Roles
                </span>
              </div>
            </div>

          </div>

          {/* ROW 2: CAMPUS SKILL DEMAND VS SUPPLY + CANDIDATE READINESS GAUGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 2/3: Skill Demand vs Supply */}
            <div className="lg:col-span-8 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
                <div>
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    CAMPUS SKILL DEMAND VS. SUPPLY ANALYTICS
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Compare industry role requirements with verified student skill inventory.
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-[#00E699]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#00E699]" /> Industry Demand
                  </span>
                  <span className="flex items-center gap-1.5 text-[#00E5FF]">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#00E5FF]" /> Student Supply
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-1">
                {[
                  { skill: 'Python', demand: 22, supply: 8, gap: true },
                  { skill: 'React', demand: 19, supply: 12, gap: true },
                  { skill: 'Docker', demand: 19, supply: 5, gap: true },
                  { skill: 'SQL', demand: 13, supply: 9, gap: false },
                  { skill: 'JavaScript', demand: 16, supply: 14, gap: false }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.skill}</span>
                        {item.gap && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 font-bold">
                            Talent Gap
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        <span className="text-[#00E699] font-bold">{item.demand} Openings</span>
                        <span className="mx-1.5">•</span>
                        <span className="text-[#00E5FF] font-bold">{item.supply} Candidates</span>
                      </div>
                    </div>
                    {/* Demand Bar */}
                    <div className="w-full h-2 bg-[#0B101B] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#00E699] rounded-full shadow-glow-emerald" style={{ width: `${Math.min(item.demand * 4, 100)}%` }} />
                    </div>
                    {/* Supply Bar */}
                    <div className="w-full h-1.5 bg-[#0B101B] rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#00E5FF] rounded-full" style={{ width: `${Math.min(item.supply * 4, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 1/3: TALENT SENTIMENT & HIRING APPETITE */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 text-center space-y-3">
                <div className="flex items-center justify-between border-b border-[#1C2638] pb-2">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    CANDIDATE AVAILABILITY
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#00E699]">92 / 100</span>
                </div>

                <div className="relative flex justify-center pt-1">
                  <svg width="180" height="90" viewBox="0 0 180 90" className="overflow-visible">
                    <defs>
                      <linearGradient id="recGaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="50%" stopColor="#00E5FF" />
                        <stop offset="100%" stopColor="#00E699" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 20 85 A 70 70 0 0 1 160 85"
                      fill="none"
                      stroke="url(#recGaugeGrad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    <g transform="translate(90, 85) rotate(65)">
                      <line x1="0" y1="0" x2="0" y2="-58" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="5" fill="#00E699" stroke="#101726" strokeWidth="2" />
                    </g>
                  </svg>
                </div>

                <div className="text-xs font-mono font-bold text-[#00E699] tracking-wider uppercase">
                  High Campus Readiness (92)
                </div>
                <p className="text-[11px] text-slate-400">
                  Abundant benchmark-verified student candidates match your company's hiring stack.
                </p>
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full py-2 px-3 rounded-lg text-xs font-mono font-bold border border-[#3B82F6] text-[#3B82F6] bg-[#0B101B] hover:bg-[#3B82F6]/10 transition-colors"
                >
                  Manage Pipeline
                </button>
              </div>

              {/* TALENT SOURCING PIE/DISTRIBUTION */}
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    TALENT SCORE ALLOCATION
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Pool: {totalTalentXP.toLocaleString()} XP</span>
                </div>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'Full-Stack & React (42%)', color: '#F97316' },
                    { label: 'Python & AI/ML (28%)', color: '#3B82F6' },
                    { label: 'Cloud & Docker (18%)', color: '#A855F7' },
                    { label: 'SQL & Database (12%)', color: '#00E699' }
                  ].map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                        <span className="text-slate-300">{s.label}</span>
                      </div>
                      <span className="text-[#00E699] font-mono font-semibold">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ROW 3: LIVE APPLICANT FEED & TOP VERIFIED CANDIDATES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 2/3: Candidate Pipeline stream */}
            <div className="lg:col-span-8 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E699] animate-ping" />
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    RECRUITER LIVE APPLICANT FEED
                  </h3>
                </div>
                <Link to="/admin" className="text-xs font-mono text-[#3B82F6] hover:underline flex items-center gap-1">
                  Full Pipeline ({allApplicantsList.length}) <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {allApplicantsList.length > 0 ? (
                  allApplicantsList.slice(0, 5).map(({ opportunity, applicant }, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate('/admin')}
                      className="p-3 rounded-lg bg-[#0B101B] border border-[#1C2638] hover:border-[#3B82F6]/50 flex items-center justify-between gap-4 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#101726] border border-[#1C2638] flex items-center justify-center font-bold text-xs text-slate-300 group-hover:border-[#3B82F6]">
                          {applicant.studentName ? applicant.studentName.substring(0, 2).toUpperCase() : 'ST'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white group-hover:text-[#3B82F6] transition-colors truncate">
                            {applicant.studentName}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Applied for {opportunity.title} • {opportunity.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          applicant.status === 'Selected'
                            ? 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/30'
                            : applicant.status === 'Shortlisted'
                            ? 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/30'
                            : 'bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30'
                        }`}>
                          {applicant.status || 'Applied'}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400 bg-[#0B101B] rounded-lg border border-[#1C2638]">
                    No applicant submissions yet. Post opportunities to start receiving verified student applications!
                  </div>
                )}
              </div>
            </div>

            {/* Right 1/3: Top Campus Talent Leaderboard Scouting */}
            <div className="lg:col-span-4 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  TOP VERIFIED CANDIDATES
                </h3>
                <Link to="/leaderboard" className="text-xs font-mono text-[#00E699] hover:underline flex items-center gap-1">
                  View All <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {topTalentList.map((cand, idx) => (
                  <div
                    key={cand.id || idx}
                    onClick={() => navigate('/leaderboard')}
                    className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] hover:border-[#00E699]/40 flex items-center justify-between gap-3 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono text-xs font-bold text-slate-500 w-4">
                        #{idx + 1}
                      </span>
                      <img
                        src={cand.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'}
                        alt={cand.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#1C2638]"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white group-hover:text-[#00E699] transition-colors truncate">
                          {cand.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {cand.college ? cand.college.split(' ')[0] : 'NIT'} • CGPA {cand.cgpa || '9.0'}
                        </div>
                      </div>
                    </div>

                    <div className="font-mono text-xs font-bold text-[#00E699] shrink-0">
                      {(cand.xpPoints || 3450).toLocaleString()} XP
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </main>

        {/* Footer */}
        <footer className="h-12 px-6 border-t border-[#1C2638] bg-[#0B101B] flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-6 divide-x divide-[#1C2638] w-full justify-between">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              RECRUITER ENTERPRISE TALENT INTELLIGENCE
            </span>
            <span className="text-slate-400 flex items-center gap-1.5 pl-6">
              TOTAL CAMPUS XP TRACKER
            </span>
            <span className="text-slate-400 flex items-center gap-1.5 pl-6">
              AUTOMATED PIPELINE WORKFLOW
            </span>
            <span className="text-slate-300 font-semibold flex items-center gap-1.5 pl-6">
              256-BIT ENCRYPTED TALENT DATA
            </span>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-w-0 bg-[#0B101B]">
      {/* Dashboard Canvas */}
      <main className="p-6 space-y-6 flex-1">
        
        {/* ========================================================
            ROW 1: 4 TOP KPI SPARKLINE CARDS
            ======================================================== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* KPI 1: VERIFIED SCORE (Green Wallet) */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  VERIFIED SCORE
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#00E699]/10 border border-[#00E699]/20 flex items-center justify-center text-[#00E699]">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {studentXP.toLocaleString()} <span className="text-xs font-mono text-slate-400">XP</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {/* Green SVG Sparkline */}
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 14L16 11L30 15L44 8L58 10L72 4L82 3" stroke="#00E699" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#00E699] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +6.21%
                </span>
              </div>
            </div>

            {/* KPI 2: 24H XP GAIN (Green Trend) */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  24H XP GAIN
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#00E699]/10 border border-[#00E699]/20 flex items-center justify-center text-[#00E699]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  + {Math.min(studentXP > 1000 ? 250 : 100, studentXP)}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {/* Green SVG Sparkline */}
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 16L18 13L32 10L46 12L60 7L74 9L82 2" stroke="#00E699" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#00E699] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +5.08%
                </span>
              </div>
            </div>

            {/* KPI 3: QUIZ WIN RATE (Purple Target) */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  QUIZ WIN RATE
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7]">
                  <Target className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {studentWinRate}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {/* Purple SVG Sparkline */}
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 15L16 12L30 14L44 9L58 11L72 6L82 5" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#A855F7] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" /> {verifiedBadges.length} Badges
                </span>
              </div>
            </div>

            {/* KPI 4: ACTIVE APPLICATIONS (Blue Layers) */}
            <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 flex flex-col justify-between space-y-2 hover:border-[#2A3952] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-wider text-slate-400 font-semibold uppercase">
                  ACTIVE APPLICATIONS
                </span>
                <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div className="font-mono text-2xl font-bold text-white tracking-tight">
                  {studentApplications.length}
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                {/* Blue SVG Sparkline */}
                <svg width="84" height="20" viewBox="0 0 84 20" fill="none" className="shrink-0">
                  <path d="M2 13L16 14L30 10L44 11L58 7L72 8L82 4" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xs font-mono font-bold text-[#3B82F6] flex items-center gap-0.5">
                  {studentApplications.length} Active
                </span>
              </div>
            </div>

          </div>

          {/* ========================================================
              ROW 2: LEFT 2/3 AREA CHART + RIGHT 1/3 STACKED DONUT & GAUGE
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 2/3: PORTFOLIO PERFORMANCE Glowing Area Chart */}
            <div className="lg:col-span-8 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                    PORTFOLIO PERFORMANCE
                  </h2>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono text-2xl font-extrabold text-white">{studentXP.toLocaleString()} XP</span>
                    <span className="text-xs font-mono text-[#00E699] font-semibold">+12.4% this month</span>
                  </div>
                </div>

                {/* Timeframe Pills */}
                <div className="flex items-center gap-1 bg-[#0B101B] p-1 rounded-lg border border-[#1C2638]">
                  {['1H', '1D', '1W', '1M', '3M', '1Y'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-semibold transition-all ${
                        timeframe === tf
                          ? 'bg-[#00E699]/20 text-[#00E699] border border-[#00E699]/30 shadow-glow-emerald'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* Glowing Emerald Mountain Area Chart with Floating Tooltip */}
              <div className="relative pt-4">
                <svg viewBox="0 0 700 240" className="w-full h-56 overflow-visible">
                  <defs>
                    <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00E699" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#00E699" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#00E699" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="40" y1="30" x2="680" y2="30" stroke="#1C2638" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="680" y2="80" stroke="#1C2638" strokeDasharray="3 3" />
                  <line x1="40" y1="130" x2="680" y2="130" stroke="#1C2638" strokeDasharray="3 3" />
                  <line x1="40" y1="180" x2="680" y2="180" stroke="#1C2638" strokeDasharray="3 3" />

                  {/* Y-Axis Labels */}
                  <text x="10" y="34" fill="#64748B" fontSize="10" fontFamily="monospace">60K</text>
                  <text x="10" y="84" fill="#64748B" fontSize="10" fontFamily="monospace">50K</text>
                  <text x="10" y="134" fill="#64748B" fontSize="10" fontFamily="monospace">40K</text>
                  <text x="10" y="184" fill="#64748B" fontSize="10" fontFamily="monospace">30K</text>

                  {/* Area Fill */}
                  <path
                    d="M 40 180 Q 120 160 200 130 T 360 110 T 500 50 T 620 65 T 680 70 L 680 200 L 40 200 Z"
                    fill="url(#emeraldGradient)"
                  />

                  {/* Area Stroke */}
                  <path
                    d="M 40 180 Q 120 160 200 130 T 360 110 T 500 50 T 620 65 T 680 70"
                    fill="none"
                    stroke="#00E699"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="glow-emerald"
                  />

                  {/* Peak Marker Dot at May 20 */}
                  <circle cx="500" cy="50" r="5" fill="#00E699" stroke="#0B101B" strokeWidth="2" className="glow-emerald animate-ping" />
                  <circle cx="500" cy="50" r="4" fill="#FFFFFF" />

                  {/* Tooltip Box */}
                  <g transform="translate(440, 0)">
                    <rect width="120" height="34" rx="6" fill="#070B12" stroke="#1C2638" strokeWidth="1" />
                    <text x="60" y="14" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">May 20</text>
                    <text x="60" y="27" fill="#00E699" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{studentXP.toLocaleString()} XP</text>
                  </g>

                  {/* X-Axis Dates */}
                  <text x="50" y="225" fill="#64748B" fontSize="10" fontFamily="monospace">Apr 28</text>
                  <text x="190" y="225" fill="#64748B" fontSize="10" fontFamily="monospace">May 5</text>
                  <text x="340" y="225" fill="#64748B" fontSize="10" fontFamily="monospace">May 12</text>
                  <text x="490" y="225" fill="#64748B" fontSize="10" fontFamily="monospace">May 19</text>
                  <text x="640" y="225" fill="#64748B" fontSize="10" fontFamily="monospace">May 26</text>
                </svg>
              </div>
            </div>

            {/* Right 1/3: Stacked Donut + Sentiment Gauge */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* SKILL ALLOCATION Donut Chart */}
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    SKILL ALLOCATION
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Total: {studentXP.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between gap-4 pt-1">
                  {/* SVG Donut Ring */}
                  <div className="relative w-28 h-28 shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                      {/* Segment 1: Orange React 40% */}
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F97316" strokeWidth="4.5" strokeDasharray="40 60" strokeDashoffset="0" />
                      {/* Segment 2: Blue Python 25% */}
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#3B82F6" strokeWidth="4.5" strokeDasharray="25 75" strokeDashoffset="-40" />
                      {/* Segment 3: Purple JavaScript 20% */}
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#A855F7" strokeWidth="4.5" strokeDasharray="20 80" strokeDashoffset="-65" />
                      {/* Segment 4: Green Tailwind/Docker 15% */}
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#00E699" strokeWidth="4.5" strokeDasharray="15 85" strokeDashoffset="-85" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[10px] text-slate-400 font-mono">TOTAL</span>
                      <span className="text-xs font-mono font-bold text-white">{studentXP.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Dynamic Legend list based on student's actual skills */}
                  <div className="space-y-1.5 text-xs flex-1">
                    {userSkills.slice(0, 4).map((skill, sIdx) => {
                      const colors = ['#F97316', '#3B82F6', '#A855F7', '#00E699'];
                      const pcts = ['40%', '25%', '20%', '15%'];
                      return (
                        <div key={skill} className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors[sIdx] }} />
                            <span className="text-slate-300 truncate">{skill}</span>
                          </div>
                          <span className="font-mono font-bold text-white">{pcts[sIdx]}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CAMPUS SENTIMENT Rainbow Semi-Circle Gauge */}
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 text-center space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    CAMPUS SENTIMENT
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#00E699]">78 / 100</span>
                </div>

                {/* Semi-circle Gauge SVG */}
                <div className="relative flex justify-center pt-1">
                  <svg width="180" height="100" viewBox="0 0 180 100" className="overflow-visible">
                    <defs>
                      <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#EF4444" />
                        <stop offset="35%" stopColor="#F97316" />
                        <stop offset="70%" stopColor="#EAB308" />
                        <stop offset="100%" stopColor="#00E699" />
                      </linearGradient>
                    </defs>
                    {/* Semi-circle track */}
                    <path
                      d="M 20 90 A 70 70 0 0 1 160 90"
                      fill="none"
                      stroke="url(#gaugeGrad)"
                      strokeWidth="12"
                      strokeLinecap="round"
                    />
                    {/* Gauge needle at 78 degrees */}
                    <g transform="translate(90, 90) rotate(50)">
                      <line x1="0" y1="0" x2="0" y2="-62" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="0" cy="0" r="5" fill="#00E699" stroke="#101726" strokeWidth="2" />
                    </g>
                    {/* Tick labels */}
                    <text x="18" y="102" fill="#64748B" fontSize="9" fontFamily="monospace">0</text>
                    <text x="86" y="24" fill="#64748B" fontSize="9" fontFamily="monospace">50</text>
                    <text x="154" y="102" fill="#64748B" fontSize="9" fontFamily="monospace">100</text>
                  </svg>
                </div>

                <div className="text-xs font-mono font-bold text-[#00E699] tracking-wider uppercase">
                  Ready / Greed (78)
                </div>
                <p className="text-[11px] text-slate-400">
                  Campus hiring appetite for {currentUser?.name || 'Kumaran123'}’s skillset is extremely high.
                </p>
              </div>

            </div>

          </div>

          {/* ========================================================
              ROW 3: LEFT 2/3 TOP OPPORTUNITIES TABLE + RIGHT 1/3 RADAR TIMER
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 2/3: TOP OPPORTUNITIES 5-Row Table */}
            <div className="lg:col-span-8 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  TOP OPPORTUNITIES
                </h3>
                <Link to="/opportunities" className="text-xs font-mono text-[#00E699] hover:underline flex items-center gap-1">
                  View All {opportunities.length} Roles <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {(opportunities.length > 0 ? opportunities.slice(0, 5) : [
                  { title: 'AI / ML Research Fellow', company: 'Google DeepMind', stipend: '₹85,000 / mo', requiredSkills: ['Python', 'PyTorch'] },
                  { title: 'Full-Stack Systems Engineer', company: 'Stripe Payments', stipend: '₹65,000 / mo', requiredSkills: ['React', 'Node.js'] },
                  { title: 'Cloud DevOps Specialist', company: 'AWS Cloud Labs', stipend: '₹50,000 / mo', requiredSkills: ['Docker', 'AWS'] },
                  { title: 'Distributed Backend Intern', company: 'Databricks', stipend: '₹75,000 / mo', requiredSkills: ['Python', 'SQL'] },
                  { title: 'Frontend React Architect', company: 'Linear App', stipend: '₹60,000 / mo', requiredSkills: ['React', 'TypeScript'] },
                ]).map((row, idx) => {
                  const match = calculateSkillMatch(userSkills, row.requiredSkills || []);
                  const isApplied = row.applicants?.some(
                    (a) =>
                      a.studentId === currentUser?.id ||
                      (a.studentName && currentUser?.name && a.studentName.toLowerCase() === currentUser.name.toLowerCase())
                  );
                  const isHighFit = match.percentage >= 60;

                  return (
                    <div
                      key={row.id || idx}
                      onClick={() => navigate('/opportunities')}
                      className="p-3 rounded-lg bg-[#0B101B]/70 border border-[#1C2638] flex items-center justify-between gap-4 hover:border-[#00E699]/40 hover:bg-[#0B101B] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-[#101726] border border-[#1C2638] flex items-center justify-center text-slate-300 font-bold text-xs shrink-0 group-hover:border-[#00E699]/40">
                          {row.company ? row.company.substring(0, 2).toUpperCase() : 'SB'}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate group-hover:text-[#00E699] transition-colors flex items-center gap-1.5">
                            <span className="truncate">{row.title}</span>
                            {isApplied && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00E699]/10 text-[#00E699] border border-[#00E699]/30">
                                Applied
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {row.company}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <div className="font-mono text-xs font-bold text-white text-right">
                          {row.stipend || 'Competitive'}
                        </div>

                        {/* Match % Badge for current student */}
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border text-right ${
                          isHighFit
                            ? 'bg-[#00E699]/10 text-[#00E699] border-[#00E699]/20'
                            : 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20'
                        }`}>
                          {match.percentage}% match
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right 1/3: AI SKILL SIGNALS with Radar Rings & Countdown Timer */}
            <div className="lg:col-span-4 bg-[#101726] border border-[#1C2638] rounded-xl p-5 text-center space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
                <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  AI SKILL SIGNALS
                </h3>
                <span className="text-[10px] font-mono text-[#00E699] bg-[#00E699]/10 px-1.5 py-0.5 rounded">
                  ACTIVE SCAN
                </span>
              </div>

              {/* Concentric Glowing Radar Rings with Sweep */}
              <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-[#00E699]/20 animate-radar" />
                {/* Middle Ring */}
                <div className="absolute inset-3 rounded-full border border-[#00E699]/40" />
                {/* Inner Ring */}
                <div className="absolute inset-7 rounded-full border border-[#00E699]/60" />
                {/* Center Core */}
                <div className="w-12 h-12 rounded-full bg-[#00E699]/20 border border-[#00E699] flex items-center justify-center shadow-glow-emerald">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L20 18H4L12 3Z" fill="#00E699" />
                  </svg>
                </div>
              </div>

              {/* Countdown: 00 : 18 : 24 */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                  NEXT BENCHMARK SIGNAL
                </span>
                <div className="flex items-center justify-center gap-2 font-mono text-2xl font-bold text-white tracking-wider">
                  <span>{countdown.hrs}</span>
                  <span className="text-[#00E699]">:</span>
                  <span>{countdown.min}</span>
                  <span className="text-[#00E699]">:</span>
                  <span>{countdown.sec}</span>
                </div>
                <div className="flex justify-center gap-6 text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                  <span>HRS</span>
                  <span>MIN</span>
                  <span>SEC</span>
                </div>
              </div>

              {/* Outlined Emerald Button */}
              <button
                onClick={() => navigate('/quizzes')}
                className="w-full py-2 px-4 rounded-lg text-xs font-mono font-bold border border-[#00E699] text-[#00E699] bg-[#0B101B] hover:bg-[#00E699]/10 transition-colors shadow-glow-emerald"
              >
                View All Signals
              </button>
            </div>

          </div>

          {/* ========================================================
              ROW 4: LEFT 2/3 TRADING CANDLESTICK CHART + RIGHT 1/3 PERFORMANCE BARS
              ======================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left 2/3: SKILL DEMAND CHART (Candlestick chart with Moving Averages) */}
            <div className="lg:col-span-8 bg-[#101726] border border-[#1C2638] rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2638] pb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    SKILL DEMAND CHART
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#00E699]">
                    67,842.00
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-[#0B101B] p-1 rounded-lg border border-[#1C2638]">
                  {['1H', '1D', '1W', '1M'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setDemandTimeframe(tf)}
                      className={`px-2.5 py-0.5 rounded text-xs font-mono font-semibold transition-all ${
                        demandTimeframe === tf
                          ? 'bg-[#00E699]/20 text-[#00E699] border border-[#00E699]/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>

              {/* SVG Candlestick Simulation + Moving Average lines */}
              <div className="relative pt-2">
                <svg viewBox="0 0 680 200" className="w-full h-52 overflow-visible">
                  {/* Grid Lines */}
                  <line x1="20" y1="30" x2="620" y2="30" stroke="#1C2638" strokeDasharray="3 3" />
                  <line x1="20" y1="80" x2="620" y2="80" stroke="#1C2638" strokeDasharray="3 3" />
                  <line x1="20" y1="130" x2="620" y2="130" stroke="#1C2638" strokeDasharray="3 3" />

                  {/* Right Axis Prices */}
                  <text x="625" y="34" fill="#64748B" fontSize="9" fontFamily="monospace">70,000</text>
                  <text x="625" y="84" fill="#64748B" fontSize="9" fontFamily="monospace">65,000</text>
                  <text x="625" y="134" fill="#64748B" fontSize="9" fontFamily="monospace">60,000</text>

                  {/* Active Price Marker at 67,842 */}
                  <g transform="translate(620, 60)">
                    <rect width="52" height="18" rx="3" fill="#00E699" />
                    <text x="26" y="12" fill="#070B12" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      67,842
                    </text>
                  </g>

                  {/* Candlesticks (X from 40 to 600) */}
                  {[
                    { x: 50, o: 110, c: 90, h: 80, l: 120, up: true },
                    { x: 90, o: 95, c: 115, h: 90, l: 125, up: false },
                    { x: 130, o: 112, c: 100, h: 95, l: 118, up: true },
                    { x: 170, o: 100, c: 85, h: 80, l: 105, up: true },
                    { x: 210, o: 88, c: 98, h: 82, l: 102, up: false },
                    { x: 250, o: 96, c: 80, h: 74, l: 100, up: true },
                    { x: 290, o: 80, c: 70, h: 65, l: 85, up: true },
                    { x: 330, o: 72, c: 84, h: 68, l: 88, up: false },
                    { x: 370, o: 82, c: 68, h: 62, l: 86, up: true },
                    { x: 410, o: 68, c: 60, h: 54, l: 72, up: true },
                    { x: 450, o: 62, c: 75, h: 58, l: 78, up: false },
                    { x: 490, o: 74, c: 56, h: 50, l: 80, up: true },
                    { x: 530, o: 56, c: 64, h: 52, l: 68, up: false },
                    { x: 570, o: 62, c: 48, h: 42, l: 66, up: true },
                  ].map((c, i) => (
                    <g key={i}>
                      {/* High-Low Wick */}
                      <line x1={c.x} y1={c.h} x2={c.x} y2={c.l} stroke={c.up ? '#00E699' : '#EF4444'} strokeWidth="1.5" />
                      {/* Body Rect */}
                      <rect
                        x={c.x - 7}
                        y={Math.min(c.o, c.c)}
                        width="14"
                        height={Math.max(Math.abs(c.o - c.c), 4)}
                        fill={c.up ? '#00E699' : '#EF4444'}
                        rx="1"
                      />
                    </g>
                  ))}

                  {/* Moving Average Line 1: Neon Cyan (#00E5FF) */}
                  <path
                    d="M 40 120 Q 150 90 280 82 T 420 62 T 580 48"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="glow-cyan"
                  />

                  {/* Moving Average Line 2: Purple (#A855F7) */}
                  <path
                    d="M 40 100 Q 170 105 310 88 T 460 74 T 580 58"
                    fill="none"
                    stroke="#A855F7"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  {/* Bottom Volume Histogram Bars */}
                  {[20, 35, 18, 45, 22, 50, 42, 28, 60, 48, 30, 55, 38, 65].map((v, i) => (
                    <rect
                      key={i}
                      x={43 + i * 40}
                      y={180 - v}
                      width="14"
                      height={v}
                      fill={i % 2 === 0 ? 'rgba(0, 230, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)'}
                      rx="1"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Right 1/3: PERFORMANCE DUAL BARS + RECENT ACTIVITY */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* PERFORMANCE BARS */}
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    PERFORMANCE
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-mono">
                    <span className="flex items-center gap-1 text-[#00E699]">
                      <span className="w-2 h-2 rounded-sm bg-[#00E699]" /> This Week
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <span className="w-2 h-2 rounded-sm bg-[#334155]" /> Last Week
                    </span>
                  </div>
                </div>

                {/* 7 Day Vertical Bar comparison */}
                <div className="grid grid-cols-7 gap-2 items-end h-28 pt-2">
                  {[
                    { day: 'Mon', now: 60, prev: 40 },
                    { day: 'Tue', now: 80, prev: 55 },
                    { day: 'Wed', now: 70, prev: 65 },
                    { day: 'Thu', now: 90, prev: 50 },
                    { day: 'Fri', now: 100, prev: 70 },
                    { day: 'Sat', now: 45, prev: 35 },
                    { day: 'Sun', now: 65, prev: 40 },
                  ].map((bar, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full flex items-end justify-center gap-1 h-20">
                        <div className="w-2 bg-[#334155] rounded-t" style={{ height: `${bar.prev}%` }} />
                        <div className="w-2 bg-[#00E699] rounded-t shadow-glow-emerald" style={{ height: `${bar.now}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CURRENT STUDENT LIVE FEED */}
              <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#1C2638] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00E699] animate-ping" />
                    <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      STUDENT LIVE FEED
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#00E699] bg-[#00E699]/10 px-2 py-0.5 rounded border border-[#00E699]/20">
                    {currentUser?.name?.split(' ')[0] || 'My'} Feed ({studentLiveFeed.length})
                  </span>
                </div>

                <div className="space-y-2 text-xs max-h-[300px] overflow-y-auto pr-1">
                  {studentLiveFeed.length > 0 ? (
                    studentLiveFeed.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => item.link && navigate(item.link)}
                        className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] hover:border-[#00E699]/40 flex items-center justify-between gap-3 cursor-pointer transition-all group"
                      >
                        <div className="min-w-0">
                          <div className="font-bold text-white group-hover:text-[#00E699] transition-colors truncate">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
                            <span>{item.company}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end shrink-0 gap-1">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded border text-[10px] ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">
                            {item.time}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400 bg-[#0B101B] rounded-lg border border-[#1C2638]">
                      No activity yet for {currentUser?.name}. Take a quiz or apply to opportunities to populate your live feed!
                    </div>
                  )}
                </div>

                <div className="pt-1.5 text-[10px] font-mono text-slate-400 text-center border-t border-[#1C2638]/60">
                  Streaming events strictly for <span className="text-[#00E699] font-semibold">{currentUser?.name || 'Kumaran123'}</span>
                </div>
              </div>

            </div>

          </div>

        </main>

        {/* ========================================================
            BOTTOM 5-COLUMN FEATURE FOOTER BAR
            ======================================================== */}
        <footer className="h-12 px-6 border-t border-[#1C2638] bg-[#0B101B] flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-6 divide-x divide-[#1C2638] w-full justify-between">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5 pl-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E699]" />
              REAL-TIME SKILL DATA
            </span>
            <span className="text-slate-400 flex items-center gap-1.5 pl-6">
              AI POWERED ANALYTICS
            </span>
            <span className="text-slate-400 flex items-center gap-1.5 pl-6">
              SMART GAP MANAGEMENT
            </span>
            <span className="text-slate-400 flex items-center gap-1.5 pl-6">
              MULTI-ROLE SUPPORT
            </span>
            <span className="text-slate-300 font-semibold flex items-center gap-1.5 pl-6">
              256-BIT ENCRYPTED
            </span>
          </div>
        </footer>

      </div>
  );
}
