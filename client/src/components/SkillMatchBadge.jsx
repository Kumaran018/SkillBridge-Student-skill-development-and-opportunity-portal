import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export function calculateSkillMatch(userSkills = [], requiredSkills = []) {
  if (!requiredSkills || requiredSkills.length === 0) {
    return { percentage: 100, matchedSkills: [], missingSkills: [] };
  }

  const normalizedUserSkills = (userSkills || []).map(s => s.toLowerCase().trim());
  const matchedSkills = [];
  const missingSkills = [];

  requiredSkills.forEach(skill => {
    if (normalizedUserSkills.includes(skill.toLowerCase().trim())) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const percentage = Math.round((matchedSkills.length / requiredSkills.length) * 100);
  return { percentage, matchedSkills, missingSkills };
}

export default function SkillMatchBadge({ percentage, showIcon = true, size = 'sm' }) {
  let badgeStyle = '';
  let Icon = CheckCircle2;
  let label = '';

  if (percentage >= 75) {
    badgeStyle = 'bg-[#00E699]/15 text-[#00E699] border-[#00E699]/40';
    Icon = CheckCircle2;
    label = 'Strong';
  } else if (percentage >= 40) {
    badgeStyle = 'bg-amber-500/15 text-amber-400 border-amber-500/40';
    Icon = AlertCircle;
    label = 'Partial';
  } else {
    badgeStyle = 'bg-rose-500/15 text-rose-400 border-rose-500/40';
    Icon = XCircle;
    label = 'Low';
  }

  const sizeClasses = size === 'lg'
    ? 'text-xs px-2.5 py-1 gap-1.5'
    : 'text-[11px] px-2 py-0.5 gap-1';

  return (
    <span
      className={`inline-flex items-center font-mono font-semibold rounded-md border tracking-tight ${badgeStyle} ${sizeClasses}`}
      title={`${percentage}% of required skills matched`}
    >
      {showIcon && <Icon className={size === 'lg' ? 'w-3.5 h-3.5' : 'w-3 h-3'} />}
      <span>{percentage}%</span>
      <span className="font-sans font-medium opacity-90">Match</span>
    </span>
  );
}
