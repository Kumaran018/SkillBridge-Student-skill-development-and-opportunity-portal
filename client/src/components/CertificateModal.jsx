import React from 'react';
import {
  X,
  Award,
  CheckCircle2,
  Printer,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';

export default function CertificateModal({
  isOpen,
  onClose,
  student,
  opportunity
}) {
  if (!isOpen || !student || !opportunity) return null;

  const certId = `SB-CERT-${opportunity.id?.replace('opp_', '')}-${student.id?.replace('usr_student_', '')}-${new Date().getFullYear()}`;
  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#101726] border border-[#1C2638] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar (Hidden on print) */}
        <div className="print:hidden p-3.5 bg-[#0B101B] border-b border-[#1C2638] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#00E699]" />
            <span className="text-xs font-bold text-white tracking-tight">Proof-of-Work & Selection Certificate</span>
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

        {/* Certificate Body (Visible on screen and optimized for print) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex items-center justify-center bg-[#070B12] print:bg-white print:p-0">
          
          <div className="w-full max-w-2xl bg-white print:bg-white border-2 border-slate-300 print:border-slate-800 rounded-xl p-8 sm:p-10 relative shadow-2xl space-y-6 text-center">
            
            {/* Certificate Header */}
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#E4E1DA] text-zinc-700 text-[10px] font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                SkillBridge Verification Authority
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#18181B] uppercase">
                Certificate of Selection
              </h1>
              <p className="text-xs text-zinc-500 font-medium tracking-wide uppercase">
                Verified Technical Competency & Industry Selection
              </p>
            </div>

            {/* Recipient Presentation */}
            <div className="space-y-1.5 pt-1">
              <p className="text-xs text-zinc-500 italic">
                This credential is proud to certify that
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                {student.name}
              </h2>
              <p className="text-xs text-zinc-500">
                from <strong className="text-zinc-800">{student.college || 'Engineering Institute'}</strong>
              </p>
            </div>

            {/* Selection Text */}
            <div className="p-4 rounded-lg bg-[#FAF9F5] border border-[#E4E1DA] text-xs text-zinc-700 leading-relaxed max-w-lg mx-auto">
              has demonstrated technical proficiency across verified skill benchmarks and has been officially selected for the role of
              <div className="text-sm font-bold text-[#18181B] mt-1">
                {opportunity.title}
              </div>
              <div className="text-xs text-zinc-600 font-medium mt-0.5">
                at {opportunity.company} ({opportunity.type})
              </div>
            </div>

            {/* Verified Skills Demonstrated */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                Validated Competencies
              </span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {opportunity.requiredSkills?.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-[#F5F4F0] text-zinc-800 border border-[#E4E1DA] font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Signatures & Seal */}
            <div className="pt-6 border-t border-[#E4E1DA] grid grid-cols-2 gap-6 items-end text-xs">
              <div className="text-left space-y-0.5">
                <div className="font-serif italic text-base text-zinc-800">
                  Dr. Evelyn Reed
                </div>
                <div className="h-px bg-[#E4E1DA] w-32" />
                <div className="text-[10px] text-zinc-500 font-medium uppercase">
                  Director of Partnerships
                </div>
                <div className="text-[10px] font-mono text-zinc-400">
                  Date: {issueDate}
                </div>
              </div>

              <div className="text-right space-y-0.5">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#E4E1DA] text-zinc-700 mb-0.5">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  Credential ID:
                </div>
                <div className="text-[10px] font-mono font-bold text-[#18181B]">
                  {certId}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
