import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Briefcase,
  Award,
  BookOpen,
  Trophy,
  User,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Building2,
  Users,
  Search,
  Filter,
  DollarSign
} from 'lucide-react';

import Navbar from './components/Navbar';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OpportunitiesPage from './pages/OpportunitiesPage';
import QuizzesPage from './pages/QuizzesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import RecruiterAdminDashboard from './pages/RecruiterAdminDashboard';
import ProfilePage from './pages/ProfilePage';
import LearningHubPage from './pages/LearningHubPage';
import SettingsPage from './pages/SettingsPage';
import ResumeModal from './components/ResumeModal';
import SkillMatchBadge, { calculateSkillMatch } from './components/SkillMatchBadge';

export default function App() {
  const [opportunities, setOpportunities] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [resources, setResources] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiConnected, setApiConnected] = useState(false);
  const [resettingDb, setResettingDb] = useState(false);
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  // Persist user selection and sync to backend
  const handleUserSelect = async (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('skillbridge_user', JSON.stringify(user));
    } catch (e) {}

    setUsers((prev) => {
      const idx = prev.findIndex(
        (u) => u.id === user.id || (u.name && user.name && u.name.toLowerCase() === user.name.toLowerCase())
      );
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...user };
        return copy;
      }
      return [...prev, user];
    });

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
    } catch (err) {
      console.warn('User sync error:', err);
    }
  };

  // Sign out user and redirect
  const handleSignOut = () => {
    try {
      localStorage.removeItem('skillbridge_user');
    } catch (e) {}
    const defaultStudent = users.find((u) => u.role === 'student') || users[0];
    setCurrentUser(defaultStudent);
    navigate('/login');
  };

  // Fetch all initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [oppsRes, quizzesRes, usersRes, resRes, healthRes] = await Promise.all([
        fetch('/api/opportunities'),
        fetch('/api/quizzes'),
        fetch('/api/users'),
        fetch('/api/resources'),
        fetch('/api/health').catch(() => null)
      ]);

      if (!oppsRes.ok || !quizzesRes.ok || !usersRes.ok || !resRes.ok) {
        throw new Error('Failed to fetch data from SkillBridge server');
      }

      const [oppsData, quizzesData, usersData, resourcesData] = await Promise.all([
        oppsRes.json(),
        quizzesRes.json(),
        usersRes.json(),
        resRes.json()
      ]);

      setOpportunities(oppsData);
      setQuizzes(quizzesData);
      setResources(resourcesData);
      setApiConnected(Boolean(healthRes && healthRes.ok));

      // Check localStorage first
      const savedUserStr = localStorage.getItem('skillbridge_user');
      let savedUser = null;
      if (savedUserStr) {
        try {
          savedUser = JSON.parse(savedUserStr);
        } catch (e) {}
      }

      if (savedUser) {
        const dbUser = usersData.find(
          (u) => u.id === savedUser.id || (u.name && savedUser.name && u.name.toLowerCase() === savedUser.name.toLowerCase())
        );
        const mergedUser = dbUser ? { ...savedUser, ...dbUser } : savedUser;
        setCurrentUser(mergedUser);
        try {
          localStorage.setItem('skillbridge_user', JSON.stringify(mergedUser));
        } catch (e) {}

        const existingIdx = usersData.findIndex(
          (u) => u.id === mergedUser.id || (u.name && mergedUser.name && u.name.toLowerCase() === mergedUser.name.toLowerCase())
        );
        if (existingIdx !== -1) {
          usersData[existingIdx] = { ...usersData[existingIdx], ...mergedUser };
        } else {
          usersData.push(mergedUser);
        }

        // Auto-sync in background so backend also has user
        fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mergedUser)
        }).catch(() => {});
      } else if (!currentUser && usersData.length > 0) {
        const student = usersData.find((u) => u.role === 'student') || usersData[0];
        setCurrentUser(student);
      } else if (currentUser) {
        const refreshed = usersData.find((u) => u.id === currentUser.id || (u.name && currentUser.name && u.name.toLowerCase() === currentUser.name.toLowerCase()));
        if (refreshed) setCurrentUser(refreshed);
      }

      setUsers(usersData);
      setError(null);
    } catch (err) {
      console.error('SkillBridge initialization error:', err);
      setError(err.message);
      setApiConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Quick Reset Mock Seed Data trigger
  const handleResetSeed = async () => {
    if (!window.confirm('Reset all SkillBridge data back to fresh seed? This will restore 50+ opportunities, quizzes, and resources.')) return;
    setResettingDb(true);
    try {
      const res = await fetch('/api/seed/reset', { method: 'POST' });
      if (res.ok) {
        await fetchData();
        alert('Seed data reset successfully!');
      } else {
        alert('Failed to reset seed data.');
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('Error communicating with backend server.');
    } finally {
      setResettingDb(false);
    }
  };

  // Compute leaderboard sorted by XP, guaranteeing currentUser is ranked
  const studentPool = [...users.filter((u) => u.role === 'student')];
  if (currentUser && currentUser.role === 'student') {
    const existingIdx = studentPool.findIndex(
      (u) => u.id === currentUser.id || (u.name && currentUser.name && u.name.toLowerCase() === currentUser.name.toLowerCase())
    );
    if (existingIdx !== -1) {
      studentPool[existingIdx] = { ...studentPool[existingIdx], ...currentUser };
    } else {
      studentPool.push(currentUser);
    }
  }

  const leaderboard = studentPool.sort((a, b) => (Number(b.xpPoints) || 0) - (Number(a.xpPoints) || 0));

  if (loading && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B12]">
        <div className="flex flex-col items-center gap-3 p-8 rounded-xl bg-[#101726] border border-[#1C2638] shadow-[0_0_24px_rgba(0,0,0,0.5)]">
          <div className="w-7 h-7 border-2 border-[#1C2638] border-t-[#00E699] rounded-full animate-spin" />
          <p className="text-xs font-mono font-semibold text-[#00E699] tracking-wider uppercase">
            Initializing SkillBridge Engine...
          </p>
        </div>
      </div>
    );
  }

  // 1. PUBLIC HOME PAGE VIEW
  if (isHomePage) {
    return (
      <div className="min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans selection:bg-[#00E699] selection:text-[#070B12]">
        <Navbar
          currentUser={currentUser}
          onSwitchUser={() => setShowPersonaModal(true)}
          allUsers={users}
          onSelectUser={handleUserSelect}
        />
        <main className="flex-1 pt-14">
          <HomePage
            currentUser={currentUser}
            opportunities={opportunities}
            leaderboard={leaderboard}
          />
        </main>
        <footer className="border-t border-[#1C2638] bg-[#0B101B] py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-400 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">SkillBridge</span>
              <span className="text-slate-500">— Student Skill Development & Opportunity Portal</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="inline-flex items-center gap-1.5 text-slate-400">
                <span className={`w-2 h-2 rounded-full ${apiConnected ? 'bg-[#00E699]' : 'bg-[#EF4444]'}`} />
                API: {apiConnected ? 'Online (Port 5000)' : 'Offline'}
              </span>
              <button
                onClick={handleResetSeed}
                disabled={resettingDb}
                className="text-slate-400 hover:text-[#00E699] underline transition-colors"
                title="Reset database back to initial seed data"
              >
                {resettingDb ? 'Resetting...' : 'Reset Demo Seed'}
              </button>
              <span className="text-slate-600">v2.4.0</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // 2. STANDALONE AUTHENTICATION PAGE VIEW
  if (isLoginPage) {
    return (
      <LoginPage
        users={users}
        currentUser={currentUser}
        onSelectUser={handleUserSelect}
      />
    );
  }

  // 3. INTERNAL DASHBOARD & PORTAL SHELL (Sidebar NEVER hides!)
  return (
    <DashboardLayout
      currentUser={currentUser}
      allUsers={users}
      opportunities={opportunities}
      onSelectUser={handleUserSelect}
      onSignOut={handleSignOut}
    >
      <Routes>
        {/* 1:1 Pixel-Sampled Midnight Navy Dashboard */}
        <Route
          path="/dashboard"
          element={
            <DashboardPage
              currentUser={currentUser}
              opportunities={opportunities}
              quizzes={quizzes}
              leaderboard={leaderboard}
              allUsers={users}
              onSelectUser={handleUserSelect}
              onSignOut={handleSignOut}
            />
          }
        />
        {/* Student Profile & Portfolio route */}
        <Route
          path="/profile"
          element={
            <ProfilePage
              currentUser={currentUser}
              opportunities={opportunities}
              onUpdateUser={(updated) => {
                setCurrentUser(updated);
                fetchData();
              }}
            />
          }
        />
        {/* Opportunities & Kanban Pipeline route */}
        <Route
          path="/opportunities"
          element={
            <OpportunitiesPage
              opportunities={opportunities}
              currentUser={currentUser}
              onRefresh={fetchData}
            />
          }
        />
        {/* Skill Verification Quizzes & Signals route */}
        <Route
          path="/quizzes"
          element={
            <QuizzesPage
              quizzes={quizzes}
              currentUser={currentUser}
              onRefresh={fetchData}
              onUpdateUser={(updated) => {
                handleUserSelect(updated);
                fetchData();
              }}
            />
          }
        />
        {/* Learning Resources & Hub route */}
        <Route
          path="/resources"
          element={
            <LearningHubPage
              resources={resources}
              currentUser={currentUser}
            />
          }
        />
        {/* Campus XP Leaderboard route */}
        <Route
          path="/leaderboard"
          element={
            <LeaderboardPage
              leaderboard={leaderboard}
              currentUser={currentUser}
            />
          }
        />
        {/* Settings & Preferences route */}
        <Route
          path="/settings"
          element={
            <SettingsPage
              currentUser={currentUser}
              onUpdateUser={(updated) => {
                handleUserSelect(updated);
                fetchData();
              }}
            />
          }
        />
        {/* Recruiter & Admin Portal route (Strictly Private - Recruiter/Admin only) */}
        <Route
          path="/admin"
          element={
            currentUser?.role === 'recruiter' || currentUser?.role === 'admin' ? (
              <RecruiterAdminDashboard
                opportunities={opportunities}
                users={users}
                currentUser={currentUser}
                onRefresh={fetchData}
              />
            ) : (
              <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-[#101726] border border-[#1C2638] flex items-center justify-center mx-auto text-[#EF4444] shadow-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white">Private Recruiter Access Only</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  This portal is private and restricted to corporate recruiters and talent administrators. Student accounts cannot access the candidate management pipeline.
                </p>
                <div className="pt-2 flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 rounded-lg bg-[#101726] border border-[#1C2638] hover:border-[#00E699] text-[#00E699] text-xs font-semibold transition-all"
                  >
                    Return to Dashboard
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold transition-all shadow-md"
                  >
                    Sign In with Recruiter Account
                  </button>
                </div>
              </div>
            )
          }
        />
      </Routes>

      {/* Global Resume Modal */}
      {showResumeModal && (
        <ResumeModal
          isOpen={showResumeModal}
          onClose={() => setShowResumeModal(false)}
          student={currentUser}
          appliedOpportunities={opportunities.filter(o => o.applicants?.some(a => a.studentId === currentUser?.id))}
        />
      )}
    </DashboardLayout>
  );
}
