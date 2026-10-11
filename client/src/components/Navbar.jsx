import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Briefcase,
  Award,
  BookOpen,
  Trophy,
  User,
  Building2,
  ChevronDown,
  UserCheck,
  Zap,
  Menu,
  X,
  LayoutDashboard,
  LogIn,
  UserPlus
} from 'lucide-react';

export default function Navbar({ currentUser, onSwitchUser, allUsers, onSelectUser }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const isRecruiterOrAdmin = currentUser?.role === 'recruiter' || currentUser?.role === 'admin';
  const isHomePage = location.pathname === '/';

  // Navigation specifically for Home Page
  const homeNavLinks = [
    { name: 'About SkillBridge', href: '#about' },
    { name: 'Key Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Role Portals', href: '#portals' },
    { name: 'FAQ', href: '#faq' },
  ];

  // Standard portal navigation for internal pages
  const portalNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', badge: 'LIVE' },
    { name: 'Opportunities', path: '/opportunities' },
    { name: 'Benchmarks', path: '/quizzes' },
    { name: 'Learning Hub', path: '/resources' },
    { name: 'Leaderboard', path: '/leaderboard' },
    { name: 'Profile', path: '/profile' },
  ];

  if (isRecruiterOrAdmin) {
    portalNavLinks.push({ name: 'Recruiter Hub', path: '/admin' });
  }

  const isActive = (path) => location.pathname === path;

  // Handle click on SkillBridge logo
  const handleLogoClick = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.location.hash) {
      window.history.pushState(null, '', '/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B101B]/95 backdrop-blur-md border-b border-[#1C2638] text-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Brand - Click scrolls smoothly to top */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 group cursor-pointer"
              title="SkillBridge Home (Scroll to Top)"
            >
              <div className="w-8 h-8 rounded-lg bg-[#00E699]/15 border border-[#00E699]/40 flex items-center justify-center text-[#00E699] shadow-[0_0_12px_rgba(0,230,153,0.3)] group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <polygon points="12,2 22,20 2,20" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                SkillBridge
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isHomePage ? (
              // Pill Navigation for Home Page
              <nav className="hidden md:flex items-center gap-2">
                {homeNavLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1 rounded-full text-xs font-mono text-slate-300 hover:text-white bg-[#101726] border border-[#1C2638] hover:border-[#00E699]/40 hover:bg-[#162033] transition-all"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            ) : (
              // Portal Tabs for internal app pages
              <nav className="hidden md:flex items-center gap-1 h-14">
                {portalNavLinks.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`h-full flex items-center gap-1.5 px-3 text-xs tracking-tight transition-colors border-b-2 font-mono ${
                        active
                          ? 'border-[#00E699] text-[#00E699] font-bold'
                          : 'border-transparent text-slate-400 hover:text-white font-medium'
                      }`}
                    >
                      {item.name}
                      {item.badge && (
                        <span className="text-[9px] px-1 py-0.2 rounded bg-[#00E699]/15 text-[#00E699] font-bold border border-[#00E699]/30">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Section: Home shows BOTH Login and Sign Up; internal pages show XP & Persona Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {isHomePage ? (
              <>
                <Link
                  to="/login?mode=login"
                  className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border border-[#1C2638] hover:border-[#2A3952] bg-[#101726] hover:bg-[#162033] text-slate-200 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-400" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/login?mode=signup"
                  className="text-xs font-bold font-mono px-3.5 py-1.5 rounded-lg bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <>
                {currentUser && currentUser.role === 'student' && (
                  <div className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#101726] text-[#00E699] border border-[#1C2638] flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,230,153,0.1)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E699] animate-pulse" />
                    {currentUser.xpPoints?.toLocaleString()} XP
                  </div>
                )}

                {currentUser && (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-[#1C2638] hover:border-[#2A3952] bg-[#101726] hover:bg-[#162033] transition-all text-xs font-medium text-slate-200"
                      title="Switch persona"
                    >
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-[#1C2638]"
                      />
                      <span className="font-semibold text-white">{currentUser.name?.split(' ')[0]}</span>
                      <span className="text-[10px] text-slate-400 uppercase font-mono px-1.5 py-0.5 rounded bg-[#0B101B] border border-[#1C2638]">
                        {currentUser.role}
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-1.5 w-64 bg-[#101726] border border-[#1C2638] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] p-2 z-50 animate-in fade-in space-y-1">
                        <div className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-[#1C2638] pb-1.5 mb-1 flex items-center justify-between">
                          <span>Switch Demo Persona</span>
                          <Link to="/login" onClick={() => setDropdownOpen(false)} className="text-[#00E699] hover:underline normal-case">
                            Login Page
                          </Link>
                        </div>
                        {allUsers && allUsers.map((u) => {
                          const isSelected = currentUser.id === u.id;
                          return (
                            <button
                              key={u.id}
                              onClick={() => {
                                if (onSelectUser) onSelectUser(u);
                                setDropdownOpen(false);
                              }}
                              className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                                isSelected
                                  ? 'bg-[#0B101B] text-[#00E699] font-bold border border-[#00E699]/40'
                                  : 'text-slate-300 hover:bg-[#162033] hover:text-white border border-transparent'
                              }`}
                            >
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-6 h-6 rounded-full object-cover border border-[#1C2638]"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold truncate text-white">{u.name}</div>
                                <div className="text-[10px] text-slate-400 font-mono capitalize">{u.role}</div>
                              </div>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00E699] shadow-[0_0_6px_#00E699]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                <Link
                  to="/login"
                  className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-[#1C2638] hover:border-[#2A3952] bg-[#0B101B] flex items-center gap-1 transition-colors"
                  title="Sign In / Switch Account"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-[#1C2638] text-slate-300 hover:text-white hover:bg-[#101726]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1C2638] bg-[#0B101B] px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          {isHomePage ? (
            <div className="space-y-1">
              {homeNavLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-xs font-mono text-slate-300 hover:bg-[#101726] hover:text-white"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2 border-t border-[#1C2638] grid grid-cols-2 gap-2">
                <Link
                  to="/login?mode=login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 rounded-lg bg-[#101726] border border-[#1C2638] text-slate-200 text-xs font-bold font-mono"
                >
                  Login
                </Link>
                <Link
                  to="/login?mode=signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-center py-2 rounded-lg bg-[#00E699] text-[#070B12] text-xs font-bold font-mono"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              {portalNavLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-xs font-mono font-semibold ${
                    isActive(item.path)
                      ? 'bg-[#101726] text-[#00E699] border border-[#00E699]/30'
                      : 'text-slate-300 hover:bg-[#101726] hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {currentUser && !isHomePage && (
            <div className="pt-2 border-t border-[#1C2638] flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-200">{currentUser.name} ({currentUser.role})</span>
              <span className="font-mono font-semibold text-[#00E699] bg-[#101726] px-2 py-0.5 rounded border border-[#1C2638]">
                {currentUser.xpPoints?.toLocaleString()} XP
              </span>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
