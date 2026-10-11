import React from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  GitBranch,
  Mail,
  GraduationCap,
  Code2
} from 'lucide-react';

export default function ResumeModal({
  isOpen,
  onClose,
  student,
  appliedOpportunities = []
}) {
  if (!isOpen || !student) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#101726] border border-[#1C2638] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Bar (Hidden during print) */}
        <div className="print:hidden p-3.5 bg-[#0B101B] border-b border-[#1C2638] flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-white tracking-tight">Verified Technical Resume</h2>
            <p className="text-[11px] text-slate-400">Formatted in standard A4 document layout ready for print or PDF export.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#162033] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="p-6 sm:p-8 overflow-y-auto bg-[#070B12] print:bg-white print:p-0 flex justify-center">
          
          <div className="w-full max-w-3xl bg-white text-[#18181B] shadow-2xl border border-slate-300 print:border-none print:shadow-none rounded-xl print:rounded-none p-8 sm:p-10 space-y-5 font-sans">
            
            {/* Resume Header */}
            <div className="border-b border-[#18181B] pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#18181B] tracking-tight">
                  {student.name}
                </h1>
                <p className="text-xs font-semibold text-zinc-700 mt-0.5">
                  Computer Science & Engineering • Full-Stack Developer
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 mt-2">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-zinc-500" />
                    {student.college} ({student.year})
                  </span>
                  <span>•</span>
                  <span>CGPA: <strong className="font-mono text-[#18181B]">{student.cgpa} / 10</strong></span>
                  <span>•</span>
                  <span className="font-mono font-medium text-emerald-700">SkillBridge XP: {student.xpPoints?.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-xs text-zinc-600 space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{student.email}</span>
                </div>
                {student.githubUrl && (
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <GitBranch className="w-3.5 h-3.5 text-zinc-400" />
                    <a href={student.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-800 hover:underline">
                      {student.githubUrl.replace('https://', '')}
                    </a>
                  </div>
                )}
                <div className="text-[10px] font-mono text-zinc-400">
                  Credential ID: {student.id}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#18181B] border-b border-[#E4E1DA] pb-1">
                Profile Summary
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {student.bio || 'Computer engineering undergraduate with practical development experience validated through SkillBridge technical benchmarks.'}
              </p>
            </div>

            {/* Verified Technical Badges & Certifications */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#18181B] border-b border-[#E4E1DA] pb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Benchmarks (&ge;80% threshold)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {student.verifiedBadges?.map((badge) => (
                  <div
                    key={badge}
                    className="p-2 rounded-md border border-[#E4E1DA] bg-[#FAF9F5] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Award className="w-3.5 h-3.5 text-zinc-700" />
                      <span className="font-medium text-zinc-800">{badge}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Inventory */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#18181B] border-b border-[#E4E1DA] pb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-zinc-700" />
                Technical Competencies
              </h2>
              <div className="flex flex-wrap gap-1">
                {student.skills?.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 rounded bg-[#F5F4F0] text-zinc-800 border border-[#E4E1DA] font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Industry Projects / Opportunities Applied */}
            <div className="space-y-1.5">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#18181B] border-b border-[#E4E1DA] pb-1">
                Active Portal Engagements
              </h2>
              <div className="space-y-2">
                {appliedOpportunities.length === 0 ? (
                  <div className="text-xs text-zinc-500 italic">
                    Active candidate with verified benchmarks in modern full-stack development and cloud systems.
                  </div>
                ) : (
                  appliedOpportunities.map((opp) => {
                    const applicantRecord = opp.applicants?.find(a => a.studentId === student.id);
                    return (
                      <div key={opp.id} className="text-xs space-y-0.5 p-2 rounded-md bg-[#FAF9F5] border border-[#E4E1DA]">
                        <div className="flex justify-between font-semibold text-[#18181B]">
                          <span>{opp.title} — {opp.company}</span>
                          <span className="text-emerald-700 font-medium">{applicantRecord?.status || 'Candidate'}</span>
                        </div>
                        <div className="text-zinc-500 text-[11px]">
                          {opp.type} • Stack: {opp.requiredSkills?.join(', ')} • Match: <span className="font-mono">{applicantRecord?.matchScore || 90}%</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Resume Footer */}
            <div className="pt-3 border-t border-[#E4E1DA] text-center text-[10px] text-zinc-400 font-mono">
              Generated via SkillBridge • Credential ID: {student.id}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
