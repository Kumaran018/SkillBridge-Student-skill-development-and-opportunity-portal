import React, { useState } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  DollarSign,
  ArrowRight,
  Send,
  Layers,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  FileCheck,
  SlidersHorizontal
} from 'lucide-react';
import SkillMatchBadge, { calculateSkillMatch } from '../components/SkillMatchBadge';
import SkillGapModal from '../components/SkillGapModal';
import KanbanTracker from '../components/KanbanTracker';

export default function OpportunitiesPage({
  opportunities,
  currentUser,
  onRefresh
}) {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'kanban'
  const [filterType, setFilterType] = useState('All');
  const [filterSkill, setFilterSkill] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOppForModal, setSelectedOppForModal] = useState(null);
  const [isApplying, setIsApplying] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Extract all unique skills across opportunities for filter dropdown
  const allUniqueSkills = Array.from(
    new Set(opportunities.flatMap((o) => o.requiredSkills || []))
  ).sort();

  // Filter opportunities
  const filteredOpportunities = opportunities.filter((o) => {
    const matchesType =
      filterType === 'All' || o.type.toLowerCase() === filterType.toLowerCase();
    const matchesSkill =
      filterSkill === 'All' ||
      o.requiredSkills.some((s) => s.toLowerCase() === filterSkill.toLowerCase());
    const matchesSearch =
      o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesType && matchesSkill && matchesSearch;
  });

  // Calculate my applications count
  const myApplicationsCount = opportunities.reduce((acc, opp) => {
    const hasApplied = opp.applicants?.some(
      (a) => a.studentId === currentUser?.id
    );
    return acc + (hasApplied ? 1 : 0);
  }, 0);

  // One-click Apply handler
  const handleApply = async (opportunity, matchScore) => {
    if (!currentUser) return;
    setIsApplying(true);
    try {
      const response = await fetch(`/api/opportunities/${opportunity.id}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser.id,
          studentName: currentUser.name,
          email: currentUser.email,
          matchScore: matchScore || 85
        })
      });

      const data = await response.json();
      if (response.ok) {
        setToastMessage({
          type: 'success',
          text: `Successfully applied to "${opportunity.title}". Tracking in your pipeline.`
        });
        if (onRefresh) onRefresh();
      } else {
        setToastMessage({
          type: 'error',
          text: data.error || 'Failed to submit application.'
        });
      }
    } catch (err) {
      console.error('Error applying to opportunity:', err);
      setToastMessage({
        type: 'error',
        text: 'Network error submitting application.'
      });
    } finally {
      setIsApplying(false);
      setSelectedOppForModal(null);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  // Recruiter applicant status updater
  const handleUpdateApplicantStatus = async (oppId, studentId, newStatus) => {
    try {
      const res = await fetch(`/api/opportunities/${oppId}/applicants/${studentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok && onRefresh) {
        onRefresh();
        setToastMessage({
          type: 'success',
          text: `Updated applicant status to ${newStatus}`
        });
        setTimeout(() => setToastMessage(null), 3500);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between shadow-xl transition-all ${
            toastMessage.type === 'success'
              ? 'bg-[#00E699]/15 border-[#00E699]/30 text-[#00E699]'
              : 'bg-rose-500/15 border-rose-500/30 text-rose-400'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#00E699]" />
            <span className="text-sm font-medium">{toastMessage.text}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-xs font-bold px-2 py-1 hover:bg-slate-700/50 rounded text-slate-400"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header with View Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Opportunities & Applications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Browse verified tech roles and track your active pipeline stages.
          </p>
        </div>

        {/* View Toggle (Feed vs Kanban) */}
        <div className="flex items-center p-1 rounded-xl bg-[#101726] border border-[#1C2638]">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'feed'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Feed ({opportunities.length})
          </button>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'kanban'
                ? 'bg-[#0B101B] text-[#00E699] border border-[#00E699]/40 shadow-xs font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-slate-400" />
            Pipeline ({myApplicationsCount})
          </button>
        </div>
      </div>

      {/* TAB 1: OPPORTUNITY FEED */}
      {activeTab === 'feed' && (
        <div className="space-y-5">
          
          {/* Search & Filter Toolbar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, company, or required skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 text-sm focus:outline-hidden focus:border-[#00E699] transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="md:col-span-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-200 text-sm focus:outline-hidden focus:border-[#00E699] transition-colors font-medium"
              >
                <option value="All">All Types</option>
                <option value="Internship">Internships</option>
                <option value="Micro-Gig">Micro-Gigs</option>
                <option value="Hackathon">Hackathons</option>
              </select>
            </div>

            {/* Skill Filter */}
            <div className="md:col-span-3">
              <select
                value={filterSkill}
                onChange={(e) => setFilterSkill(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-200 text-sm focus:outline-hidden focus:border-[#00E699] transition-colors font-medium"
              >
                <option value="All">All Skills</option>
                {allUniqueSkills.map((sk) => (
                  <option key={sk} value={sk}>{sk}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Stats banner for student skills */}
          {currentUser?.role === 'student' && (
            <div className="p-3.5 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-[#1C2638]"
                />
                <div>
                  <span className="font-semibold text-white">Your Profile Skills ({currentUser.skills?.length}):</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentUser.skills?.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-[#0B101B] text-slate-300 border border-[#1C2638] font-medium text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 font-medium">
                <span className="inline-flex items-center gap-1.5 text-[#00E699] bg-[#00E699]/15 px-2 py-0.5 rounded border border-[#00E699]/40 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E699]"></span>
                  &ge;75% Match
                </span>
                <span className="inline-flex items-center gap-1.5 text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/40 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  40-74%
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-400 bg-[#0B101B] px-2 py-0.5 rounded border border-[#1C2638] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                  &lt;40%
                </span>
              </div>
            </div>
          )}

          {/* Opportunities Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((opp) => {
              const { percentage } = calculateSkillMatch(
                currentUser?.skills || [],
                opp.requiredSkills || []
              );

              const hasApplied = opp.applicants?.some(
                (a) => a.studentId === currentUser?.id
              );
              const applicantRecord = opp.applicants?.find(
                (a) => a.studentId === currentUser?.id
              );

              return (
                <div
                  key={opp.id}
                  className="bg-[#101726] border border-[#1C2638] rounded-xl p-5 shadow-xl hover:border-[#2A3952] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    {/* Top Row: Company, Title, Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={opp.logo}
                          alt={opp.company}
                          className="w-11 h-11 rounded-lg border border-[#1C2638] object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <span className="truncate">{opp.company}</span>
                            <span>•</span>
                            <span className="truncate">{opp.location}</span>
                          </div>
                          <h3 className="text-base font-semibold text-white tracking-tight truncate mt-0.5">
                            {opp.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        {/* Subtle Indigo for Internship & Micro-Gig */}
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                          opp.type === 'Internship'
                            ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                            : opp.type === 'Micro-Gig'
                            ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {opp.type}
                        </span>

                        {/* Smart Skill Match Badge */}
                        <SkillMatchBadge percentage={percentage} size="sm" />
                      </div>
                    </div>

                    {/* Description snippet */}
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {opp.description}
                    </p>

                    {/* Required Skills Chips: Navy wells with green checkmark */}
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.requiredSkills?.map((skill) => {
                          const isAcquired = currentUser?.skills?.some(
                            (s) => s.toLowerCase() === skill.toLowerCase()
                          );
                          return (
                            <span
                              key={skill}
                              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-medium border ${
                                isAcquired
                                  ? 'bg-[#0B101B] text-slate-200 border-[#1C2638]'
                                  : 'bg-[#0B101B]/60 text-slate-400 border-[#1C2638]/60'
                              }`}
                            >
                              {isAcquired && <span className="text-[#00E699] font-bold">✓</span>}
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Metadata details */}
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="p-2 rounded-lg bg-[#0B101B] border border-[#1C2638] flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">Stipend</span>
                        <span className="font-mono font-bold text-[#00E699]">{opp.stipend}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[#0B101B] border border-[#1C2638] flex items-center justify-between">
                        <span className="text-slate-400 text-[11px]">Deadline</span>
                        <span className="font-mono text-slate-300 text-[11px] flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {opp.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-4 pt-3.5 border-t border-[#1C2638] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedOppForModal(opp)}
                      className="text-xs font-semibold text-slate-300 hover:text-[#00E699] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      Skill Gap Details
                    </button>

                    <div>
                      {hasApplied ? (
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded border ${
                          applicantRecord?.status === 'Selected'
                            ? 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/40'
                            : applicantRecord?.status === 'Shortlisted'
                            ? 'bg-amber-500/15 text-amber-400 border-amber-500/40'
                            : 'bg-blue-500/15 text-blue-400 border-blue-500/40'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {applicantRecord?.status || 'Applied'}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(opp, percentage)}
                          disabled={currentUser?.role !== 'student'}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all disabled:opacity-50"
                        >
                          <Send className="w-3 h-3" />
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12 p-6 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl space-y-3">
              <p className="text-sm text-slate-400">No opportunities matched your current filter criteria.</p>
              <button
                onClick={() => {
                  setFilterType('All');
                  setFilterSkill('All');
                  setSearchTerm('');
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-slate-300 hover:text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: APPLICATION KANBAN PIPELINE */}
      {activeTab === 'kanban' && (
        <KanbanTracker
          opportunities={opportunities}
          currentUser={currentUser}
          onOpenDetails={(opp) => setSelectedOppForModal(opp)}
          onUpdateStatus={handleUpdateApplicantStatus}
        />
      )}

      {/* Interactive Skill Gap Modal */}
      {selectedOppForModal && (
        <SkillGapModal
          opportunity={selectedOppForModal}
          currentUser={currentUser}
          isOpen={Boolean(selectedOppForModal)}
          onClose={() => setSelectedOppForModal(null)}
          onApply={handleApply}
          isApplying={isApplying}
        />
      )}

    </div>
  );
}
