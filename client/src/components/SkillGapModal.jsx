import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  ShieldCheck,
  Send,
  SlidersHorizontal
} from 'lucide-react';
import SkillMatchBadge, { calculateSkillMatch } from './SkillMatchBadge';

export default function SkillGapModal({
  opportunity,
  currentUser,
  isOpen,
  onClose,
  onApply,
  isApplying
}) {
  const navigate = useNavigate();
  if (!isOpen || !opportunity) return null;

  const { percentage, matchedSkills, missingSkills } = calculateSkillMatch(
    currentUser?.skills || [],
    opportunity.requiredSkills || []
  );

  const existingApplication = opportunity.applicants?.find(
    (a) => a.studentId === currentUser?.id
  );

  const handleApplyClick = () => {
    if (!existingApplication && onApply) {
      onApply(opportunity, percentage);
    }
  };

  const handleStartQuiz = (skill) => {
    onClose();
    navigate('/quizzes', { state: { selectedSkill: skill } });
  };

  const handleViewResource = (skill) => {
    onClose();
    navigate('/resources', { state: { selectedSkill: skill } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#101726] border border-[#1C2638] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-[#1C2638] flex items-start justify-between gap-4 bg-[#0B101B]">
          <div className="flex items-start gap-3.5">
            <img
              src={opportunity.logo}
              alt={opportunity.company}
              className="w-12 h-12 rounded-lg border border-[#1C2638] object-cover shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${
                  opportunity.type === 'Internship'
                    ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    : opportunity.type === 'Micro-Gig'
                    ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  {opportunity.type}
                </span>
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  {opportunity.company}
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1 tracking-tight leading-snug">
                {opportunity.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="font-mono font-bold text-[#00E699] flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  {opportunity.stipend}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  {opportunity.location}
                </span>
                <span>•</span>
                <span className="font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {opportunity.deadline}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#162033] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">

          {/* Skill Gap Analyzer Card */}
          <div className="p-4 rounded-xl bg-[#0B101B] border border-[#1C2638] space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1C2638] pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#00E699]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Skill-Gap Analysis
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Candidate Match:</span>
                <SkillMatchBadge percentage={percentage} size="md" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">
                  {matchedSkills.length} of {opportunity.requiredSkills?.length} Required Skills Acquired
                </span>
                <span className="font-mono font-bold text-[#00E699]">{percentage}%</span>
              </div>
              <div className="w-full h-2 bg-[#101726] rounded-full overflow-hidden border border-[#1C2638]">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    percentage >= 75
                      ? 'bg-[#00E699]'
                      : percentage >= 40
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Acquired Skills vs Missing Skills Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Acquired Skills */}
              <div className="p-3 rounded-lg bg-[#101726] border border-[#1C2638] space-y-2">
                <div className="text-xs font-semibold text-[#00E699] flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E699]" />
                  Acquired Skills ({matchedSkills.length})
                </div>
                {matchedSkills.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">None currently in profile.</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#00E699]/30 font-medium"
                      >
                        <span className="text-[#00E699] font-bold">✓</span>
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Missing Skills with Direct Action Buttons */}
              <div className="p-3 rounded-lg bg-[#101726] border border-[#1C2638] space-y-2">
                <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 font-mono">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  Missing Skills ({missingSkills.length})
                </div>
                {missingSkills.length === 0 ? (
                  <p className="text-xs text-[#00E699] font-medium">
                    Profile satisfies 100% of required skills for this role.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {missingSkills.map((skill) => (
                      <div
                        key={skill}
                        className="p-1.5 px-2 rounded bg-[#0B101B] border border-[#1C2638] flex items-center justify-between gap-2"
                      >
                        <span className="text-xs font-medium text-slate-200">
                          {skill}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleStartQuiz(skill)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-[10px] font-semibold transition-colors"
                            title={`Take ${skill} Quiz`}
                          >
                            <Award className="w-3 h-3 text-amber-400" />
                            Quiz
                          </button>
                          <button
                            onClick={() => handleViewResource(skill)}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#101726] hover:bg-[#162033] text-slate-300 border border-[#1C2638] text-[10px] font-semibold transition-colors"
                            title={`Learn ${skill}`}
                          >
                            <BookOpen className="w-3 h-3 text-slate-400" />
                            Learn
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Role Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Role Details
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0B101B] p-3.5 rounded-lg border border-[#1C2638]">
              {opportunity.description}
            </p>
          </div>

          {/* Role Metadata details */}
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638]">
              <span className="text-slate-400 text-[11px] block">Duration</span>
              <span className="font-medium text-white mt-0.5 block">{opportunity.duration}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638]">
              <span className="text-slate-400 text-[11px] block">Location</span>
              <span className="font-medium text-white mt-0.5 block">{opportunity.location}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0B101B] border border-[#1C2638]">
              <span className="text-slate-400 text-[11px] block">Applicants</span>
              <span className="font-mono font-bold text-[#00E699] mt-0.5 block">
                {opportunity.applicants?.length || 0}
              </span>
            </div>
          </div>

        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="p-4 bg-[#0B101B] border-t border-[#1C2638] flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#162033] transition-colors"
          >
            Close
          </button>

          {existingApplication ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#101726] border border-[#1C2638] text-xs">
              <span className="text-slate-400">Status:</span>
              <span className={`font-semibold font-mono px-2 py-0.5 rounded text-[11px] ${
                existingApplication.status === 'Selected'
                  ? 'bg-[#00E699]/15 text-[#00E699] border border-[#00E699]/40'
                  : existingApplication.status === 'Shortlisted'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
                  : existingApplication.status === 'Rejected'
                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/40'
                  : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
              }`}>
                {existingApplication.status}
              </span>
            </div>
          ) : (
            <button
              onClick={handleApplyClick}
              disabled={isApplying || currentUser?.role !== 'student'}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all disabled:opacity-50"
            >
              {isApplying ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#070B12]/30 border-t-[#070B12] rounded-full animate-spin" />
                  Submitting...
                </>
              ) : currentUser?.role !== 'student' ? (
                'Students Only'
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Apply Now
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
