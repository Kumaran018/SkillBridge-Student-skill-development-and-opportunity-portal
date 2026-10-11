import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  DollarSign,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Users,
  ChevronRight,
  Award
} from 'lucide-react';
import SkillMatchBadge from './SkillMatchBadge';
import CertificateModal from './CertificateModal';

const COLUMNS = [
  {
    id: 'Applied',
    title: 'Applied',
    subtitle: 'Under initial review',
    badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    dot: 'bg-indigo-500'
  },
  {
    id: 'Shortlisted',
    title: 'Shortlisted',
    subtitle: 'Selected for interview',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    dot: 'bg-amber-500'
  },
  {
    id: 'Selected',
    title: 'Selected',
    subtitle: 'Offer / Project confirmed',
    badge: 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/40',
    dot: 'bg-[#00E699]'
  }
];

export default function KanbanTracker({
  opportunities,
  currentUser,
  onOpenDetails,
  onUpdateStatus
}) {
  const [selectedCertData, setSelectedCertData] = useState(null);
  const isStudent = currentUser?.role === 'student';

  // Build items grouped by column
  const getApplicationsForColumn = (status) => {
    const list = [];
    opportunities.forEach((opp) => {
      opp.applicants?.forEach((applicant) => {
        if (applicant.status === status) {
          if (isStudent && applicant.studentId === currentUser?.id) {
            list.push({ opportunity: opp, applicant });
          } else if (!isStudent) {
            list.push({ opportunity: opp, applicant });
          }
        }
      });
    });
    return list;
  };

  const totalApplications = opportunities.reduce((acc, opp) => {
    const count = opp.applicants?.filter(a => !isStudent || a.studentId === currentUser?.id).length || 0;
    return acc + count;
  }, 0);

  return (
    <div className="space-y-5">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[#00E699]" />
              Pipeline & Application Tracker
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#1C2638] font-bold">
              {totalApplications} Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {isStudent
              ? `Real-time stages for applications submitted by ${currentUser?.name}. Selected roles unlock verifiable Proof-of-Work credentials.`
              : `Reviewing pipeline for all student applicants (${currentUser?.role} mode).`}
          </p>
        </div>

        {!isStudent && (
          <div className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-medium font-mono">
            Recruiter Mode: Move applicants across columns directly.
          </div>
        )}
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const items = getApplicationsForColumn(col.id);

          return (
            <div
              key={col.id}
              className="rounded-xl border border-[#1C2638] bg-[#0B101B]/60 flex flex-col min-h-[460px] p-3 space-y-3"
            >
              {/* Column Header */}
              <div className="p-2.5 rounded-lg bg-[#101726] border border-[#1C2638] flex items-center justify-between shadow-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                    <h3 className="font-semibold text-xs text-white">{col.title}</h3>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{col.subtitle}</div>
                </div>
                <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border ${col.badge}`}>
                  {items.length}
                </span>
              </div>

              {/* Column Items */}
              <div className="flex-1 space-y-2.5 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="h-36 border border-dashed border-[#1C2638] rounded-lg flex flex-col items-center justify-center p-4 text-center">
                    <p className="text-xs text-slate-500">No applications in this stage</p>
                  </div>
                ) : (
                  items.map(({ opportunity, applicant }) => (
                    <div
                      key={`${opportunity.id}-${applicant.studentId}`}
                      className="bg-[#101726] border border-[#1C2638] rounded-lg p-3 space-y-2.5 shadow-lg hover:border-[#2A3952] transition-all group"
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={opportunity.logo}
                            alt={opportunity.company}
                            className="w-8 h-8 rounded-md border border-[#1C2638] object-cover shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">
                              {opportunity.title}
                            </h4>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                              <Building2 className="w-3 h-3 text-slate-500" />
                              {opportunity.company}
                            </div>
                          </div>
                        </div>

                        <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${
                          opportunity.type === 'Internship'
                            ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                            : opportunity.type === 'Micro-Gig'
                            ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30'
                            : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        }`}>
                          {opportunity.type}
                        </span>
                      </div>

                      {/* Recruiter view applicant name */}
                      {!isStudent && (
                        <div className="p-1.5 rounded bg-[#0B101B] border border-[#1C2638] text-xs flex items-center justify-between">
                          <span className="font-medium text-white">{applicant.studentName}</span>
                          <span className="text-[11px] text-slate-400">{applicant.email}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs pt-0.5">
                        <span className="font-mono font-bold text-[#00E699]">{opportunity.stipend}</span>
                        <SkillMatchBadge percentage={applicant.matchScore || 85} size="sm" />
                      </div>

                      {/* Certificate Button for Selected Column */}
                      {col.id === 'Selected' && (
                        <button
                          onClick={() => setSelectedCertData({ opportunity, applicant })}
                          className="w-full flex items-center justify-center gap-1.5 py-1 px-2.5 rounded-md bg-[#00E699]/15 hover:bg-[#00E699]/25 text-[#00E699] border border-[#00E699]/40 text-[11px] font-semibold transition-all shadow-xs"
                        >
                          <Award className="w-3.5 h-3.5 text-[#00E699]" />
                          View Offer / Certificate
                        </button>
                      )}

                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-[#1C2638] font-mono">
                        <span>{applicant.appliedDate}</span>
                        <button
                          onClick={() => onOpenDetails(opportunity)}
                          className="text-slate-300 hover:text-[#00E699] font-sans font-medium flex items-center gap-0.5 transition-colors"
                        >
                          Details <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>

                      {/* Recruiter Stage Mover Select */}
                      {!isStudent && onUpdateStatus && (
                        <div className="pt-1 border-t border-[#1C2638] flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Move Stage:</span>
                          <select
                            value={col.id}
                            onChange={(e) => onUpdateStatus(opportunity.id, applicant.studentId, e.target.value)}
                            className="bg-[#0B101B] border border-[#1C2638] rounded px-1.5 py-0.5 text-slate-200 text-[11px] focus:outline-hidden focus:border-[#00E699]"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Selected">Selected</option>
                          </select>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Modal */}
      {selectedCertData && (
        <CertificateModal
          isOpen={Boolean(selectedCertData)}
          onClose={() => setSelectedCertData(null)}
          student={currentUser}
          opportunity={selectedCertData.opportunity}
        />
      )}

    </div>
  );
}
