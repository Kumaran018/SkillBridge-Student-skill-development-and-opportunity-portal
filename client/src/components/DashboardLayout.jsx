import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  ArrowUpRight,
  LogOut,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { calculateSkillMatch } from './SkillMatchBadge';

export default function DashboardLayout({
  children,
  currentUser,
  allUsers = [],
  opportunities = [],
  onSelectUser,
  onSignOut
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [countdown, setCountdown] = useState({ hrs: '00', min: '18', sec: '24' });

  // Dynamic AI Signal fit (role-aware: Talent Radar for recruiters, Skill Fit for students)
  const isRecruiterOrAdmin = currentUser?.role === 'recruiter' || currentUser?.role === 'admin';
  const studentSkills = currentUser?.skills || [];
  let bestFitPercentage = 0;
  let topOpportunity = null;

  if (isRecruiterOrAdmin) {
    bestFitPercentage = 94;
  } else if (opportunities.length > 0 && studentSkills.length > 0) {
    opportunities.forEach((opp) => {
      const match = calculateSkillMatch(studentSkills, opp.requiredSkills || []);
      if (match.percentage > bestFitPercentage) {
        bestFitPercentage = match.percentage;
        topOpportunity = opp;
      }
    });
  }

  // Dynamic fallback based on verified credentials if no specific role matched yet
  if (!isRecruiterOrAdmin && bestFitPercentage === 0) {
    const badgeBonus = (currentUser?.verifiedBadges?.length || 1) * 20;
    bestFitPercentage = Math.min(50 + badgeBonus, 92);
  }

  const fitBadgeText = isRecruiterOrAdmin
    ? 'HIGH DEMAND'
    : bestFitPercentage >= 75
    ? 'STRONG FIT'
    : bestFitPercentage >= 50
    ? 'GOOD FIT'
    : 'FAIR FIT';

  const fitColor = isRecruiterOrAdmin
    ? '#00E699'
    : bestFitPercentage >= 75
    ? '#00E699'
    : bestFitPercentage >= 50
    ? '#00E5FF'
    : '#F59E0B';

  // Countdown timer simulation for AI Radar
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let sec = parseInt(prev.sec, 10) - 1;
        let min = parseInt(prev.min, 10);
        let hrs = parseInt(prev.hrs, 10);

        if (sec < 0) {
          sec = 59;
          min -= 1;
        }
        if (min < 0) {
          min = 59;
          hrs -= 1;
        }
        if (hrs < 0) {
          hrs = 0;
          min = 18;
          sec = 24;
        }

        return {
          hrs: hrs.toString().padStart(2, '0'),
          min: min.toString().padStart(2, '0'),
          sec: sec.toString().padStart(2, '0'),
        };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Role-aware Sidebar Menu items
  const menuItems = isRecruiterOrAdmin
    ? [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          name: 'Candidate Pipeline',
          path: '/admin',
          icon: ShieldCheck,
        },
        {
          name: 'Job Postings',
          path: '/opportunities',
          icon: Briefcase,
        },
        {
          name: 'Campus Talent Pool',
          path: '/leaderboard',
          icon: Trophy,
        },
        {
          name: 'Settings',
          path: '/settings',
          icon: Settings,
        },
      ]
    : [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: LayoutDashboard,
        },
        {
          name: 'Portfolio',
          path: '/profile',
          icon: User,
        },
        {
          name: 'Opportunities',
          path: '/opportunities',
          icon: Briefcase,
        },
        {
          name: 'Signals / Quizzes',
          path: '/quizzes',
          icon: Award,
        },
        {
          name: 'Analytics / Hub',
          path: '/resources',
          icon: BookOpen,
        },
        {
          name: 'Leaderboard',
          path: '/leaderboard',
          icon: Trophy,
        },
        {
          name: 'Settings',
          path: '/settings',
          icon: Settings,
        },
      ];

  // Dynamic Page Title & Badge for Header
  const getHeaderMeta = () => {
    switch (location.pathname) {
      case '/dashboard':
        return { title: 'Dashboard', badge: 'LIVE FEED', badgeColor: 'text-[#00E699] bg-[#00E699]/10 border-[#00E699]/20' };
      case '/profile':
        return { title: 'Student Portfolio', badge: 'VERIFIED CREDENTIALS', badgeColor: 'text-[#00E699] bg-[#00E699]/10 border-[#00E699]/20' };
      case '/opportunities':
        return { title: 'Opportunities & Applications', badge: 'ACTIVE PIPELINE', badgeColor: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20' };
      case '/quizzes':
        return { title: 'Signals & Benchmarks', badge: 'SKILL VALIDATION', badgeColor: 'text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/20' };
      case '/resources':
        return { title: 'Analytics & Learning Hub', badge: 'CURATED ROADMAPS', badgeColor: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20' };
      case '/leaderboard':
        return { title: 'Campus Leaderboard', badge: 'GLOBAL RANKING', badgeColor: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20' };
      case '/admin':
        return { title: 'Recruiter & Admin Portal', badge: 'MANAGEMENT', badgeColor: 'text-[#EC4899] bg-[#EC4899]/10 border-[#EC4899]/20' };
      case '/settings':
        return { title: 'Settings', badge: 'PREFERENCES', badgeColor: 'text-[#00E699] bg-[#00E699]/10 border-[#00E699]/20' };
      default:
        return { title: 'Portal', badge: 'ACTIVE', badgeColor: 'text-[#00E699] bg-[#00E699]/10 border-[#00E699]/20' };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex font-sans selection:bg-[#00E699] selection:text-[#070B12]">
      
      {/* ========================================================
          LEFT SIDEBAR (w-56 bg-[#0B101B] border-r border-[#1C2638])
          ======================================================== */}
      <aside className="w-56 bg-[#0B101B] border-r border-[#1C2638] flex flex-col justify-between shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto z-30">
        <div className="space-y-6">
          
          {/* Top Brand Header: Glowing Teal Emblem + SkillBridge */}
          <div className="p-5 pb-2 flex items-center gap-3">
            <Link to="/login" className="flex items-center gap-2.5 group cursor-pointer" title="SkillBridge - Go to Login">
              <div className="w-8 h-8 rounded-lg bg-[#101726] border border-[#00E699]/40 flex items-center justify-center relative shadow-glow-emerald group-hover:border-[#00E699] transition-colors">
                {/* Triangular glowing teal emblem */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#00E699]">
                  <path d="M12 3L21 19H3L12 3Z" stroke="#00E699" strokeWidth="2.5" strokeLinejoin="round" fill="rgba(0, 230, 153, 0.2)" />
                  <circle cx="12" cy="14" r="2" fill="#00E699" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white leading-tight group-hover:text-[#00E699] transition-colors">
                  Skill<span className="text-[#00E699]">Bridge</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                  PRO ANALYTICS
                </span>
              </div>
            </Link>
          </div>

          {/* 7 Menu Items */}
          <nav className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'sidebar-tab-active'
                      : 'text-slate-400 hover:text-white hover:bg-[#101726]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#00E699]' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Card: AI SIGNAL (Personalized fit for currentUser) */}
        <div className="p-3">
          <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-3.5 space-y-3 relative overflow-hidden group">
            
            {/* Header: AI SIGNAL + DYNAMIC FIT BADGE */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3 text-[#00E699]" />
                AI SIGNAL
              </span>
              <span
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border transition-all"
                style={{
                  color: fitColor,
                  backgroundColor: `${fitColor}1A`,
                  borderColor: `${fitColor}4D`
                }}
              >
                {fitBadgeText}
              </span>
            </div>

            {/* Glowing Neon Cyan Wireframe Human Profile Head with Circuit Nodes */}
            <div className="py-1 flex items-center justify-center relative">
              <svg width="84" height="84" viewBox="0 0 100 100" fill="none" className="glow-cyan animate-pulse">
                {/* Outer Head Silhouette */}
                <path
                  d="M50 12C36 12 28 22 28 36C28 46 32 52 32 60C32 68 28 72 26 76H74C72 72 68 68 68 60C68 52 72 46 72 36C72 22 64 12 50 12Z"
                  stroke="#00E5FF"
                  strokeWidth="1.8"
                  strokeDasharray="3 3"
                  fill="rgba(0, 229, 255, 0.05)"
                />
                {/* Circuit Grid Lines Inside Brain */}
                <path d="M40 28H60M50 20V38M34 42H66M44 42V56M56 42V56" stroke="#00E5FF" strokeWidth="1.2" opacity="0.6" />
                {/* Circuit Nodes */}
                <circle cx="40" cy="28" r="2.5" fill="#00E699" />
                <circle cx="60" cy="28" r="2.5" fill="#00E699" />
                <circle cx="50" cy="38" r="3" fill="#00E5FF" />
                <circle cx="34" cy="42" r="2" fill="#00E5FF" />
                <circle cx="66" cy="42" r="2" fill="#00E5FF" />
                {/* Center AI Label */}
                <rect x="42" y="47" width="16" height="12" rx="2" fill="#0B101B" stroke="#00E5FF" strokeWidth="1" />
                <text x="50" y="56" fill="#00E699" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                  AI
                </text>
              </svg>
            </div>

            {/* Dynamic Metric Label + % + Progress Bar (Role-Aware) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-medium">
                  {isRecruiterOrAdmin ? 'Talent Match' : 'Confidence'}
                </span>
                <span className="font-mono font-bold text-white">{bestFitPercentage}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1C2638] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 shadow-glow-emerald"
                  style={{
                    width: `${bestFitPercentage}%`,
                    backgroundColor: fitColor
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                <span className="truncate max-w-[110px]" title={isRecruiterOrAdmin ? 'Campus Talent Pool' : (topOpportunity?.title || `${currentUser?.name}'s Fit`)}>
                  {isRecruiterOrAdmin
                    ? 'Campus Candidates'
                    : (topOpportunity ? topOpportunity.title : `${currentUser?.name || 'Student'}`)}
                </span>
                <span className="font-semibold text-slate-300 shrink-0">
                  {isRecruiterOrAdmin ? 'Verified Pool' : `${bestFitPercentage}% match`}
                </span>
              </div>
            </div>

            {/* Outlined Button: View Details */}
            <button
              onClick={() => navigate(isRecruiterOrAdmin ? '/admin' : '/opportunities')}
              className="w-full py-1.5 px-3 rounded-lg text-xs font-semibold border border-[#00E699]/50 text-[#00E699] bg-[#0B101B] hover:bg-[#00E699]/10 transition-colors text-center block"
            >
              {isRecruiterOrAdmin ? 'Review Pipeline' : 'View Fit Details'}
            </button>
          </div>
        </div>

      </aside>

      {/* ========================================================
          MAIN CONTENT AREA (Top Bar + Dynamic Child Content)
          ======================================================== */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B101B]">
        
        {/* Top Header Bar */}
        <header className="h-16 px-6 border-b border-[#1C2638] flex items-center justify-between shrink-0 bg-[#0B101B] sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {headerMeta.title}
            </h1>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded border hidden sm:inline-block ${headerMeta.badgeColor}`}>
              {headerMeta.badge}
            </span>
          </div>

          {/* Right Controls: ROLE Dropdown + Bell + Avatar + Sign Out */}
          <div className="flex items-center gap-3">
            {/* Authenticated Role Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101726] border border-[#1C2638] text-xs text-slate-300 font-semibold font-mono">
              <span className={`w-2 h-2 rounded-full ${currentUser?.role === 'recruiter' ? 'bg-[#3B82F6]' : currentUser?.role === 'admin' ? 'bg-[#A855F7]' : 'bg-[#00E699]'}`} />
              <span className="uppercase text-[11px] tracking-wide text-white">
                {currentUser?.role || 'STUDENT'}
              </span>
            </div>

            {/* Notification Bell with Green Dot */}
            <button className="relative w-9 h-9 rounded-lg bg-[#101726] border border-[#1C2638] flex items-center justify-center text-slate-300 hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00E699] shadow-glow-emerald" />
            </button>

            {/* Circular User Avatar & Name */}
            <Link to="/profile" className="flex items-center gap-2 pl-1 group" title="View Profile">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full object-cover border border-[#1C2638] ring-1 ring-[#00E699]/40 group-hover:ring-[#00E699] transition-all"
              />
              <span className="text-xs font-semibold text-white hidden md:inline truncate max-w-[100px]">
                {currentUser?.name?.split(' ')[0] || 'Aarav'}
              </span>
            </Link>

            {/* Prominent Sign Out Button */}
            <button
              onClick={onSignOut || (() => navigate('/login'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101726] border border-[#1C2638] hover:border-[#EF4444]/60 hover:bg-[#EF4444]/10 text-slate-300 hover:text-[#EF4444] text-xs font-mono font-medium transition-all"
              title="Sign Out of Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Dynamic Child Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

      </div>

    </div>
  );
}
