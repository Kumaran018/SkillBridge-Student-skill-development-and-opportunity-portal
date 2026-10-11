import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  X,
  Send,
  Filter
} from 'lucide-react';
import SkillMatchBadge from '../components/SkillMatchBadge';

export default function RecruiterAdminDashboard({
  opportunities,
  users,
  currentUser,
  onRefresh
}) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [oppFilter, setOppFilter] = useState('All');
  const [submittingOpp, setSubmittingOpp] = useState(false);

  // New Opportunity Form State
  const [newOpp, setNewOpp] = useState({
    title: '',
    company: currentUser?.company || 'Acme Tech Labs',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    type: 'Internship',
    requiredSkills: 'React, TypeScript, Tailwind CSS',
    stipend: '₹35,000 / month',
    location: 'Bengaluru (Hybrid)',
    duration: '6 Months',
    deadline: '2026-11-30',
    description: ''
  });

  // Calculate Campus Skill Demand vs Supply
  const studentUsers = users.filter((u) => u.role === 'student');

  const skillMetrics = {};

  // Aggregate Demand (Required skills in opportunities)
  opportunities.forEach((opp) => {
    opp.requiredSkills?.forEach((skill) => {
      const s = skill.trim();
      if (!skillMetrics[s]) {
        skillMetrics[s] = { skill: s, demand: 0, supply: 0 };
      }
      skillMetrics[s].demand += 1;
    });
  });

  // Aggregate Supply (Skills held by students)
  studentUsers.forEach((student) => {
    student.skills?.forEach((skill) => {
      const s = skill.trim();
      if (!skillMetrics[s]) {
        skillMetrics[s] = { skill: s, demand: 0, supply: 0 };
      }
      skillMetrics[s].supply += 1;
    });
  });

  const chartData = Object.values(skillMetrics).sort(
    (a, b) => b.demand + b.supply - (a.demand + a.supply)
  );

  const maxVal = Math.max(
    ...chartData.map((d) => Math.max(d.demand, d.supply)),
    5
  );

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

  const filteredApplicants = allApplicantsList.filter(({ opportunity, applicant }) => {
    const matchesStatus = statusFilter === 'All' || applicant.status === statusFilter;
    const matchesOpp = oppFilter === 'All' || opportunity.id === oppFilter;
    return matchesStatus && matchesOpp;
  });

  // Handler to post new opportunity
  const handleCreateOpportunity = async (e) => {
    e.preventDefault();
    setSubmittingOpp(true);
    try {
      const skillsArray = newOpp.requiredSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        ...newOpp,
        requiredSkills: skillsArray
      };

      const res = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setShowPostModal(false);
        setNewOpp({
          title: '',
          company: currentUser?.company || 'Acme Tech Labs',
          logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
          type: 'Internship',
          requiredSkills: 'React, TypeScript, Tailwind CSS',
          stipend: '₹35,000 / month',
          location: 'Bengaluru (Hybrid)',
          duration: '6 Months',
          deadline: '2026-11-30',
          description: ''
        });
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      console.error('Failed to create opportunity:', err);
    } finally {
      setSubmittingOpp(false);
    }
  };

  // Status changer for applicants
  const handleUpdateStatus = async (oppId, studentId, status) => {
    try {
      await fetch(`/api/opportunities/${oppId}/applicants/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Error changing applicant status:', err);
    }
  };

  const [resettingDemo, setResettingDemo] = useState(false);

  const handleResetDemoData = async () => {
    if (!window.confirm('Reset all SkillBridge data back to clean initial demo seed?')) return;
    setResettingDemo(true);
    try {
      await fetch('/api/seed/reset', { method: 'POST' });
      if (onRefresh) onRefresh();
      alert('SkillBridge demo database has been reset to initial clean seed!');
    } catch (err) {
      console.error('Failed to reset demo data:', err);
    } finally {
      setResettingDemo(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              Recruiter & Admin Portal
            </h1>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider bg-[#101726] text-[#00E699] border border-[#1C2638]">
              {currentUser?.role}
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Post verified tech roles, review candidate pipeline status, and track campus skill supply vs demand.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDemoData}
            disabled={resettingDemo}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs bg-[#101726] hover:bg-[#162033] text-slate-300 border border-[#1C2638] transition-all shadow-md"
            title="Reset database back to clean initial state"
          >
            {resettingDemo ? 'Resetting...' : 'Reset Demo Seed'}
          </button>

          <button
            onClick={() => setShowPostModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Post Opportunity
          </button>
        </div>
      </div>

      {/* SECTION 1: Campus Skill Demand vs Supply Visual Bar Chart */}
      <div className="bg-[#101726] p-5 sm:p-6 rounded-xl border border-[#1C2638] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2638] pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">
              <BarChart3 className="w-4 h-4 text-[#00E699]" />
              Campus Skill Demand vs. Supply Analytics
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparing Industry Requirement Openings (Demand) vs Verified Student Profiles (Supply)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#00E699]" />
              <span className="text-slate-300 font-mono">Industry Demand</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-[#00E5FF]" />
              <span className="text-slate-300 font-mono">Student Supply</span>
            </div>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-3 pt-1">
          {chartData.slice(0, 8).map((item) => {
            const demandWidth = Math.round((item.demand / maxVal) * 100);
            const supplyWidth = Math.round((item.supply / maxVal) * 100);
            const isShortage = item.demand > item.supply;

            return (
              <div key={item.skill} className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638] space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-white">
                    <span>{item.skill}</span>
                    {isShortage && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 font-mono font-medium">
                        Talent Gap
                      </span>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                    <span className="text-[#00E699] font-bold">{item.demand} Openings</span>
                    <span>•</span>
                    <span className="text-[#00E5FF] font-bold">{item.supply} Candidates</span>
                  </div>
                </div>

                {/* Comparative Double Bars */}
                <div className="space-y-1">
                  {/* Demand Bar */}
                  <div className="flex items-center gap-2.5 text-[11px]">
                    <span className="w-14 text-slate-400 text-right shrink-0 font-mono">Demand</span>
                    <div className="flex-1 h-2 bg-[#101726] rounded-full overflow-hidden border border-[#1C2638]">
                      <div
                        className="h-full bg-[#00E699] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(0,230,153,0.5)]"
                        style={{ width: `${demandWidth}%` }}
                      />
                    </div>
                    <span className="w-5 font-mono text-[#00E699] font-bold text-right">{item.demand}</span>
                  </div>

                  {/* Supply Bar */}
                  <div className="flex items-center gap-2.5 text-[11px]">
                    <span className="w-14 text-slate-400 text-right shrink-0 font-mono">Supply</span>
                    <div className="flex-1 h-2 bg-[#101726] rounded-full overflow-hidden border border-[#1C2638]">
                      <div
                        className="h-full bg-[#00E5FF] rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                        style={{ width: `${supplyWidth}%` }}
                      />
                    </div>
                    <span className="w-5 font-mono text-[#00E5FF] font-bold text-right">{item.supply}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Applicant Review Pipeline */}
      <div className="bg-[#101726] p-5 sm:p-6 rounded-xl border border-[#1C2638] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2638] pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2 tracking-tight">
              <Users className="w-4 h-4 text-[#00E699]" />
              Candidate Applicant Review
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update candidate stages and evaluate verified match scores.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-slate-200 focus:outline-hidden focus:border-[#00E699] font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              value={oppFilter}
              onChange={(e) => setOppFilter(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-slate-200 focus:outline-hidden focus:border-[#00E699] font-medium max-w-[200px] truncate"
            >
              <option value="All">All Opportunities</option>
              {opportunities.map((o) => (
                <option key={o.id} value={o.id}>{o.title}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Applicants Table */}
        <div className="rounded-lg overflow-hidden border border-[#1C2638] overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-200 min-w-[620px]">
            <thead className="bg-[#0B101B] text-slate-400 uppercase text-[11px] font-mono font-semibold border-b border-[#1C2638]">
              <tr>
                <th className="px-3.5 py-2.5">Applicant</th>
                <th className="px-3.5 py-2.5">Target Role</th>
                <th className="px-3.5 py-2.5">Skill Match</th>
                <th className="px-3.5 py-2.5">Status</th>
                <th className="px-3.5 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2638]/70">
              {filteredApplicants.map(({ opportunity, applicant }) => (
                <tr key={`${opportunity.id}-${applicant.studentId}`} className="hover:bg-[#162033] transition-colors">
                  <td className="px-3.5 py-3">
                    <div>
                      <div className="font-semibold text-white">{applicant.studentName}</div>
                      <div className="text-[11px] text-slate-400">{applicant.email}</div>
                    </div>
                  </td>

                  <td className="px-3.5 py-3">
                    <div className="font-medium text-slate-200 line-clamp-1">{opportunity.title}</div>
                    <div className="text-[11px] text-slate-400">{opportunity.company} • {opportunity.type}</div>
                  </td>

                  <td className="px-3.5 py-3">
                    <SkillMatchBadge percentage={applicant.matchScore || 85} size="sm" />
                  </td>

                  <td className="px-3.5 py-3">
                    <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded border ${
                      applicant.status === 'Selected'
                        ? 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/40'
                        : applicant.status === 'Shortlisted'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                        : applicant.status === 'Rejected'
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/40'
                        : 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    }`}>
                      {applicant.status}
                    </span>
                  </td>

                  <td className="px-3.5 py-3 text-right space-x-1">
                    {applicant.status !== 'Shortlisted' && (
                      <button
                        onClick={() => handleUpdateStatus(opportunity.id, applicant.studentId, 'Shortlisted')}
                        className="text-[10px] px-2 py-1 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/40 font-medium"
                      >
                        Shortlist
                      </button>
                    )}
                    {applicant.status !== 'Selected' && (
                      <button
                        onClick={() => handleUpdateStatus(opportunity.id, applicant.studentId, 'Selected')}
                        className="text-[10px] px-2 py-1 rounded bg-[#00E699]/15 hover:bg-[#00E699]/25 text-[#00E699] border border-[#00E699]/40 font-medium"
                      >
                        Select
                      </button>
                    )}
                    {applicant.status !== 'Rejected' && (
                      <button
                        onClick={() => handleUpdateStatus(opportunity.id, applicant.studentId, 'Rejected')}
                        className="text-[10px] px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/40 font-medium"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Post New Opportunity */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#101726] border border-[#1C2638] rounded-xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1C2638] pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-[#00E699]" />
                Post New Opportunity
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fullstack React & Node.js Developer Intern"
                  value={newOpp.title}
                  onChange={(e) => setNewOpp({ ...newOpp, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    value={newOpp.company}
                    onChange={(e) => setNewOpp({ ...newOpp, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Opportunity Type</label>
                  <select
                    value={newOpp.type}
                    onChange={(e) => setNewOpp({ ...newOpp, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Micro-Gig">Micro-Gig</option>
                    <option value="Hackathon">Hackathon</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Required Skills (comma separated)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. React, TypeScript, Docker, SQL"
                  value={newOpp.requiredSkills}
                  onChange={(e) => setNewOpp({ ...newOpp, requiredSkills: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Stipend / Prize</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹40,000 / month"
                    value={newOpp.stipend}
                    onChange={(e) => setNewOpp({ ...newOpp, stipend: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 6 Months"
                    value={newOpp.duration}
                    onChange={(e) => setNewOpp({ ...newOpp, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Location Mode</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Remote / Bengaluru"
                    value={newOpp.location}
                    onChange={(e) => setNewOpp({ ...newOpp, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Application Deadline</label>
                  <input
                    type="date"
                    required
                    value={newOpp.deadline}
                    onChange={(e) => setNewOpp({ ...newOpp, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white focus:outline-hidden focus:border-[#00E699]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Role Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide an overview of responsibilities..."
                  value={newOpp.description}
                  onChange={(e) => setNewOpp({ ...newOpp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 focus:outline-hidden focus:border-[#00E699]"
                />
              </div>

              <div className="pt-3 border-t border-[#1C2638] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0B101B] text-slate-300 hover:text-white text-xs font-semibold border border-[#1C2638]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingOpp}
                  className="px-4 py-1.5 rounded-lg bg-[#00E699] hover:bg-[#00c985] text-[#070B12] font-bold text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
                >
                  <Send className="w-3 h-3" />
                  {submittingOpp ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
