import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  Briefcase,
  Users,
  Compass,
  CheckCircle2,
  Cpu,
  BarChart3,
  Layers,
  ChevronRight,
  BookOpen,
  Trophy,
  FileText,
  Building2,
  GraduationCap,
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Target,
  Check,
  UserPlus,
  LogIn
} from 'lucide-react';

export default function HomePage({ currentUser, opportunities = [], leaderboard = [] }) {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(0);

  const topOpportunities = opportunities.slice(0, 4);

  const faqs = [
    {
      q: 'What is SkillBridge and how does it work?',
      a: 'SkillBridge is an end-to-end Student Skill Development & Campus Placement Portal. It bridges the gap between college curricula and high-demand industry requisitions by combining skill verification tests, algorithmic match scoring, personalized skill-gap analyzers, and one-click application tracking.'
    },
    {
      q: 'How does the Smart Skill Match % calculation work?',
      a: 'When viewing any opportunity, our matching engine compares the student\'s verified and unverified skills against the opportunity\'s required skill tags. If a student has 3 out of 4 required skills, their match score is 75%. Match scores >=75% receive a high-fit Green badge, 40-74% an Amber badge, and under 40% a Red badge.'
    },
    {
      q: 'How do Skill Verification Quizzes and Verified Badges work?',
      a: 'Students can take timed 5-question multiple choice benchmarks across skills like React, Python, Docker, SQL, AWS, and more. Achieving 80% or higher automatically awards a Verified Badge with a checkmark and +100 XP points, boosting the student\'s rank on the Campus Leaderboard.'
    },
    {
      q: 'Can students generate a print-ready resume?',
      a: 'Yes! The Profile section includes a built-in One-Click Printable Resume Generator that automatically pulls your verified credentials, achievements, education, and projects into a professional ATS-friendly A4 format ready for PDF export via window.print().'
    },
    {
      q: 'How do recruiters and admins evaluate applicants?',
      a: 'Recruiters have a dedicated Recruiter Hub where they can post new internships or micro-gigs, inspect applicant profiles with verified checkmarks, transition applications across Shortlisted and Selected stages, and analyze Campus Skill Demand vs Supply charts.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans selection:bg-[#00E699] selection:text-[#070B12]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#1C2638] bg-[#0B101B]">
        {/* Glow backdrop gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-[#00E699]/10 via-[#00E5FF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-24 right-10 w-96 h-96 bg-[#A855F7]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101726] border border-[#00E699]/40 text-[#00E699] text-xs font-mono shadow-[0_0_12px_rgba(0,230,153,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#00E699] animate-pulse" />
              STUDENT SKILL DEVELOPMENT & PLACEMENT PORTAL
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Bridge the Gap Between Campus Talent & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E699] via-[#00E5FF] to-white">Industry Demand</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
              SkillBridge empowers students to benchmark technical skills, analyze career gaps, and apply to vetted internships with proof-of-work credibility.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <Link
                to="/login?mode=signup"
                className="px-6 py-3 rounded-xl bg-[#00E699] hover:bg-[#00c985] text-[#070B12] font-bold text-sm shadow-[0_0_20px_rgba(0,230,153,0.4)] transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up / Register
              </Link>
              <Link
                to="/login?mode=login"
                className="px-6 py-3 rounded-xl bg-[#101726] hover:bg-[#162033] text-white border border-[#1C2638] font-semibold text-sm transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-[#00E699]" />
                Login to Portal
              </Link>
              <a
                href="#how-it-works"
                className="px-5 py-3 rounded-xl bg-[#0B101B] hover:bg-[#101726] text-slate-300 border border-[#1C2638] font-medium text-sm transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#00E5FF] group-hover:rotate-45 transition-transform" />
                How It Works & Guide
              </a>
            </div>

            {/* Platform Stats Counters */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
              <div className="p-4 rounded-xl bg-[#101726] border border-[#1C2638]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">LIVE OPPORTUNITIES</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">50+ Active</div>
                <div className="text-xs font-mono text-[#00E699] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Internships & Gigs
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#101726] border border-[#1C2638]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">VERIFIED BENCHMARKS</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">50+ Tests</div>
                <div className="text-xs font-mono text-[#A855F7] flex items-center gap-1 mt-0.5">
                  <Award className="w-3 h-3" /> Timed MCQ Tests
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#101726] border border-[#1C2638]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">LEARNING MODULES</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">50+ Courses</div>
                <div className="text-xs font-mono text-[#3B82F6] flex items-center gap-1 mt-0.5">
                  <BookOpen className="w-3 h-3" /> Curated Hub
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#101726] border border-[#1C2638]">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">MATCH ACCURACY</div>
                <div className="text-2xl font-bold font-mono text-white mt-1">94.8%</div>
                <div className="text-xs font-mono text-[#00E699] flex items-center gap-1 mt-0.5">
                  <Zap className="w-3 h-3" /> Skill-Fit Engine
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: ABOUT SKILLBRIDGE */}
      <section id="about" className="scroll-mt-14 py-20 bg-[#070B12] border-b border-[#1C2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1C2638] text-[11px] font-mono text-[#00E699] mb-3">
              <GraduationCap className="w-3.5 h-3.5" /> ABOUT THE PLATFORM
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Why SkillBridge? Solving the College-to-Career Disconnect
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Traditional campus placement depends on unverified keyword-stuffed resumes and generic grades. SkillBridge transforms student hiring into a meritocratic, transparent proof-of-work ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-4 hover:border-[#00E699]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00E699]/10 border border-[#00E699]/30 flex items-center justify-center text-[#00E699]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">The Core Problem</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Students often don't know what industry tech stacks are in demand, while recruiters waste hundreds of hours screening resumes that don't match actual coding ability.
              </p>
              <div className="pt-2 text-xs font-mono text-[#00E699] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Eliminates Guesswork
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-4 hover:border-[#00E5FF]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">The SkillBridge Solution</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Objective 5-minute timed benchmarks verify skills like React, Python, Docker, and SQL. If students score &ge;80%, they earn verified checkmarks that recruiters trust.
              </p>
              <div className="pt-2 text-xs font-mono text-[#00E5FF] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Proof-of-Work Verification
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-4 hover:border-[#A855F7]/40 transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Campus Gamification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every verified badge awards +100 XP points, promoting friendly peer competition on the public Campus Leaderboard and highlighting top talent to recruiters.
              </p>
              <div className="pt-2 text-xs font-mono text-[#A855F7] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Transparent Leaderboards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: CORE FEATURES */}
      <section id="features" className="scroll-mt-14 py-20 bg-[#0B101B] border-b border-[#1C2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1C2638] text-[11px] font-mono text-[#00E699]">
              <Sparkles className="w-3.5 h-3.5" /> PLATFORM CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Powerful Features Built for Modern Careers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything students and recruiters need to evaluate, benchmark, and secure tech placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#00E699]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00E699]/15 border border-[#00E699]/30 flex items-center justify-center text-[#00E699]">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00E699] transition-colors">
                Smart Skill Match % Algorithm
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically compares student skills with job requisitions. Displays clear color-coded indicators: Green (&ge;75%), Amber (40-74%), and Red (&lt;40%).
              </p>
              <Link to="/opportunities" className="inline-flex items-center gap-1 text-xs font-mono text-[#00E699] pt-2 hover:underline">
                Explore Feed <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#00E5FF]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                Skill-Gap Analyzer Modal
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clicking any role reveals which skills you possess (with checkmarks) and exactly which missing skills block you from 100% match, with 1-click links to learn or test.
              </p>
              <Link to="/opportunities" className="inline-flex items-center gap-1 text-xs font-mono text-[#00E5FF] pt-2 hover:underline">
                View Analyzer <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#A855F7]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#A855F7] transition-colors">
                Timed Skill Verification Quizzes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take comprehensive 5-question timed MCQs. Scoring 80%+ locks in verified credentials, adding official green checkmarks and +100 XP to your profile.
              </p>
              <Link to="/quizzes" className="inline-flex items-center gap-1 text-xs font-mono text-[#A855F7] pt-2 hover:underline">
                Take a Quiz <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#3B82F6]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#3B82F6] transition-colors">
                One-Click Apply & Kanban Tracker
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Apply in one click and track application statuses seamlessly arranged in a visual Kanban board: Applied &rarr; Shortlisted &rarr; Selected.
              </p>
              <Link to="/opportunities" className="inline-flex items-center gap-1 text-xs font-mono text-[#3B82F6] pt-2 hover:underline">
                View Kanban <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#F97316]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#F97316]/15 border border-[#F97316]/30 flex items-center justify-center text-[#F97316]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#F97316] transition-colors">
                1-Click ATS Printable Resume
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generate clean, standardized A4 printable resumes pulling student bio, CGPA, verified checkmark badges, and projects with instant PDF print trigger.
              </p>
              <Link to="/profile" className="inline-flex items-center gap-1 text-xs font-mono text-[#F97316] pt-2 hover:underline">
                Generate Resume <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] space-y-3 hover:border-[#00E699]/40 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#00E699]/15 border border-[#00E699]/30 flex items-center justify-center text-[#00E699]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#00E699] transition-colors">
                TradeVision Terminal Analytics
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-frequency candlestick market demand charts, skill allocation donut graphs, campus sentiment meters, and radar timers in the Midnight Navy dashboard.
              </p>
              <Link to="/dashboard" className="inline-flex items-center gap-1 text-xs font-mono text-[#00E699] pt-2 hover:underline">
                Launch Terminal <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section id="how-it-works" className="scroll-mt-14 py-20 bg-[#070B12] border-b border-[#1C2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1C2638] text-[11px] font-mono text-[#00E699]">
              <Compass className="w-3.5 h-3.5" /> WORKFLOW WALKTHROUGH
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How SkillBridge Works in 4 Steps
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From fresh student sign-up to landing verified internships and earning certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] relative space-y-3">
              <div className="text-2xl font-black font-mono text-[#00E699]/40">01</div>
              <h3 className="text-base font-bold text-white">Create Profile & Tag Skills</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your university, current CGPA, GitHub repository, and unverified skill tags (e.g. React, Python, SQL).
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] relative space-y-3">
              <div className="text-2xl font-black font-mono text-[#00E5FF]/40">02</div>
              <h3 className="text-base font-bold text-white">Pass Skill Verification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take standardized 5-question timed benchmarks. Score &ge;80% to earn official verified checkmarks and +100 XP.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] relative space-y-3">
              <div className="text-2xl font-black font-mono text-[#A855F7]/40">03</div>
              <h3 className="text-base font-bold text-white">Analyze Gaps & Apply</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Browse 50+ opportunities with instant % match scores. Use the Skill Gap Analyzer to identify and learn missing skills.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] relative space-y-3">
              <div className="text-2xl font-black font-mono text-[#3B82F6]/40">04</div>
              <h3 className="text-base font-bold text-white">Track Kanban & Certify</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Monitor status from Applied &rarr; Shortlisted &rarr; Selected. Selected students receive official Completion Certificates!
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: ROLE-BASED PORTALS */}
      <section id="portals" className="scroll-mt-14 py-20 bg-[#0B101B] border-b border-[#1C2638]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1C2638] text-[11px] font-mono text-[#00E699]">
              <Users className="w-3.5 h-3.5" /> MULTI-ROLE ECOSYSTEM
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Tailored Portals for Every Stakeholder
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Easily evaluate the platform from student, recruiter, or admin administrator perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Student Role */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00E699]/10 text-[#00E699] text-xs font-mono border border-[#00E699]/30">
                  <GraduationCap className="w-3.5 h-3.5" /> STUDENT PERSONA
                </div>
                <h3 className="text-xl font-bold text-white">Aarav Sharma</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "I verified my skills in React and Python, analyzed missing Docker requirements, and applied directly to TechFlow's internship with a 100% verified match."
                </p>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E699]" /> 48,250 XP & Verified Badges
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E699]" /> 1-Click Printable ATS Resume
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00E699]" /> Kanban Application Board
                  </li>
                </ul>
              </div>
              <Link
                to="/opportunities"
                className="w-full text-center py-2.5 rounded-lg bg-[#0B101B] hover:bg-[#162033] text-white border border-[#1C2638] text-xs font-semibold transition-colors"
              >
                Experience Student View
              </Link>
            </div>

            {/* Recruiter Role */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-mono border border-[#3B82F6]/30">
                  <Briefcase className="w-3.5 h-3.5" /> RECRUITER PERSONA
                </div>
                <h3 className="text-xl font-bold text-white">Priya Patel (TechFlow)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "No more unverified claims. I post micro-gigs, view applicants ranked by verified match scores, and shortlist candidates with 1-click status updates."
                </p>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" /> Post New Opportunities
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" /> Shortlist & Select Applicants
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" /> Issue Completion Certificates
                  </li>
                </ul>
              </div>
              <Link
                to="/admin"
                className="w-full text-center py-2.5 rounded-lg bg-[#0B101B] hover:bg-[#162033] text-white border border-[#1C2638] text-xs font-semibold transition-colors"
              >
                Experience Recruiter Hub
              </Link>
            </div>

            {/* Admin Role */}
            <div className="p-6 rounded-xl bg-[#101726] border border-[#1C2638] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#A855F7]/10 text-[#A855F7] text-xs font-mono border border-[#A855F7]/30">
                  <ShieldCheck className="w-3.5 h-3.5" /> ADMIN PERSONA
                </div>
                <h3 className="text-xl font-bold text-white">Dr. Vivek Rao (Placement Dean)</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "I monitor campus-wide skill supply against industry demand charts to update our computer science syllabus and track batch placement statistics."
                </p>
                <ul className="text-xs space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A855F7]" /> Demand vs Supply Bar Chart
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A855F7]" /> Campus-Wide Leaderboard
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A855F7]" /> 1-Click Mock Seed Reset
                  </li>
                </ul>
              </div>
              <Link
                to="/admin"
                className="w-full text-center py-2.5 rounded-lg bg-[#0B101B] hover:bg-[#162033] text-white border border-[#1C2638] text-xs font-semibold transition-colors"
              >
                Experience Admin View
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section id="faq" className="scroll-mt-14 py-20 bg-[#070B12] border-b border-[#1C2638]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101726] border border-[#1C2638] text-[11px] font-mono text-[#00E699]">
              <HelpCircle className="w-3.5 h-3.5" /> FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Got Questions? We've Got Answers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Clear information about verification, matching formulas, and certifications.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#101726] border border-[#1C2638] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-[#00E699] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#00E699]' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-[#1C2638]/50 pt-3 animate-in fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 bg-[#0B101B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-black text-white">
            Ready to Accelerate Your Career with Verified Skills?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Benchmark your technical skills today, unlock verified checkmarks, and get shortlisted by top engineering teams.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/dashboard"
              className="px-6 py-3 rounded-xl bg-[#00E699] hover:bg-[#00c985] text-[#070B12] font-bold text-sm shadow-[0_0_20px_rgba(0,230,153,0.4)] transition-all flex items-center gap-2"
            >
              Launch Live Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/opportunities"
              className="px-6 py-3 rounded-xl bg-[#101726] hover:bg-[#162033] text-white border border-[#1C2638] font-semibold text-sm transition-all"
            >
              Browse 50+ Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Terminal Feature Footer Ribbon */}
      <div className="bg-[#070B12] border-t border-[#1C2638] py-4 px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E699]" />
              SKILLBRIDGE PORTAL
            </span>
            <span className="hidden sm:inline">AI MATCHING</span>
            <span className="hidden md:inline">TIMED BENCHMARKS</span>
            <span className="hidden lg:inline">KANBAN APPLICANT TRACKING</span>
            <span>ATS RESUME EXPORT</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-[#00E699] hover:underline font-semibold">
              Dashboard &rarr;
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
