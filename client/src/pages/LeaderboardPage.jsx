import React, { useState } from 'react';
import {
  Trophy,
  Medal,
  Award,
  Search,
  ShieldCheck,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

export default function LeaderboardPage({ leaderboard, currentUser }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = leaderboard.filter((student) => {
    const q = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(q) ||
      student.college?.toLowerCase().includes(q) ||
      student.skills?.some(s => s.toLowerCase().includes(q)) ||
      student.verifiedBadges?.some(b => b.toLowerCase().includes(q))
    );
  });

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Campus XP & Skill Leaderboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Student technical benchmark rankings across universities, sorted by verified XP and credentials.
          </p>
        </div>

        {currentUser?.role === 'student' && (
          <div className="p-2.5 px-3.5 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>Your Rank:</span>
              <span className="font-mono font-bold text-[#00E699] px-1.5 py-0.5 rounded bg-[#0B101B] border border-[#1C2638]">
                #{(() => {
                  const r = leaderboard.findIndex(
                    s => s.id === currentUser.id || (s.name && currentUser.name && s.name.toLowerCase() === currentUser.name.toLowerCase())
                  );
                  return r >= 0 ? r + 1 : 1;
                })()}
              </span>
            </div>
            <div className="h-3.5 w-px bg-[#1C2638]" />
            <div className="font-mono font-bold text-[#00E699]">{currentUser.xpPoints?.toLocaleString()} XP</div>
          </div>
        )}
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        
        {/* Silver - Rank 2 */}
        {top3[1] && (
          <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-5 shadow-xl flex flex-col justify-between items-center text-center space-y-3.5 order-2 md:order-1 mt-0 md:mt-4 hover:border-[#2A3952] transition-all">
            <div className="w-7 h-7 rounded-full bg-[#0B101B] text-slate-300 font-mono font-bold text-xs flex items-center justify-center border border-[#1C2638]">
              2
            </div>
            <div className="relative">
              <img
                src={top3[1].avatar}
                alt={top3[1].name}
                className="w-18 h-18 rounded-full object-cover border-2 border-slate-500 shadow-md"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">{top3[1].name}</h3>
              <p className="text-xs text-slate-400">{top3[1].college}</p>
            </div>
            <div className="w-full pt-3 border-t border-[#1C2638] flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">Badges</span>
                <span className="font-mono font-semibold text-slate-200">{top3[1].verifiedBadges?.length || 0}</span>
              </div>
              <div className="h-5 w-px bg-[#1C2638]" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">XP</span>
                <span className="font-mono font-bold text-[#00E699]">{top3[1].xpPoints?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Gold - Rank 1 */}
        {top3[0] && (
          <div className="bg-[#101726] border-2 border-[#00E699] rounded-xl p-5 shadow-[0_0_24px_rgba(0,230,153,0.18)] flex flex-col justify-between items-center text-center space-y-3.5 order-1 md:order-2 relative">
            <div className="w-8 h-8 rounded-full bg-[#00E699] text-[#070B12] font-mono font-black text-xs flex items-center justify-center shadow-[0_0_10px_rgba(0,230,153,0.5)]">
              1
            </div>
            <div className="relative">
              <img
                src={top3[0].avatar}
                alt={top3[0].name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#00E699] shadow-lg"
              />
            </div>
            <div>
              <h3 className="font-bold text-base text-white tracking-tight">{top3[0].name}</h3>
              <p className="text-xs text-slate-300">{top3[0].college} • {top3[0].year}</p>
            </div>
            <div className="w-full pt-3 border-t border-[#1C2638] flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">Badges</span>
                <span className="font-mono font-bold text-white">{top3[0].verifiedBadges?.length || 0}</span>
              </div>
              <div className="h-5 w-px bg-[#1C2638]" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">Total XP</span>
                <span className="font-mono font-black text-[#00E699] text-sm">{top3[0].xpPoints?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bronze - Rank 3 */}
        {top3[2] && (
          <div className="bg-[#101726] border border-[#1C2638] rounded-xl p-5 shadow-xl flex flex-col justify-between items-center text-center space-y-3.5 order-3 md:order-3 mt-0 md:mt-4 hover:border-[#2A3952] transition-all">
            <div className="w-7 h-7 rounded-full bg-[#0B101B] text-amber-500 font-mono font-bold text-xs flex items-center justify-center border border-[#1C2638]">
              3
            </div>
            <div className="relative">
              <img
                src={top3[2].avatar}
                alt={top3[2].name}
                className="w-18 h-18 rounded-full object-cover border-2 border-amber-600/40 shadow-md"
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-white">{top3[2].name}</h3>
              <p className="text-xs text-slate-400">{top3[2].college}</p>
            </div>
            <div className="w-full pt-3 border-t border-[#1C2638] flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">Badges</span>
                <span className="font-mono font-semibold text-slate-200">{top3[2].verifiedBadges?.length || 0}</span>
              </div>
              <div className="h-5 w-px bg-[#1C2638]" />
              <div>
                <span className="text-slate-400 text-[10px] block uppercase font-mono font-medium">XP</span>
                <span className="font-mono font-bold text-[#00E699]">{top3[2].xpPoints?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Search Input */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Filter by name, college, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-[#0B101B] border border-[#1C2638] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-hidden focus:border-[#00E699] shadow-md transition-colors"
        />
      </div>

      {/* Comprehensive Leaderboard Table */}
      <div className="bg-[#101726] rounded-xl border border-[#1C2638] shadow-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-200 min-w-[600px]">
          <thead className="bg-[#0B101B] text-slate-400 uppercase text-[11px] font-mono font-semibold border-b border-[#1C2638]">
            <tr>
              <th className="px-4 py-3 w-16">Rank</th>
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Verified Badges</th>
              <th className="px-4 py-3 hidden md:table-cell">Top Skills</th>
              <th className="px-4 py-3">CGPA</th>
              <th className="px-4 py-3 text-right">Total XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1C2638]/70">
            {filteredStudents.map((student, idx) => {
              const isCurrent = currentUser?.id === student.id || (student.name && currentUser?.name && student.name.toLowerCase() === currentUser.name.toLowerCase());
              const badgeCount = student.verifiedBadges?.length || 0;

              return (
                <tr
                  key={student.id}
                  className={`hover:bg-[#162033] transition-colors ${
                    isCurrent ? 'bg-[#00E699]/10 font-medium' : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-semibold text-slate-400">
                      #{idx + 1}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-[#1C2638]"
                      />
                      <div>
                        <div className="font-semibold text-white flex items-center gap-1.5 text-xs sm:text-sm">
                          <span>{student.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00E699] text-[#070B12] font-black font-mono">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <span>{student.college} • {student.year}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Verified Badges Column */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-slate-300 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#00E699]" />
                        <span className="font-mono text-[#00E699] font-bold">{badgeCount}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.verifiedBadges?.slice(0, 2).map((b) => (
                          <span
                            key={b}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#00E699]/30 font-mono"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* Skills Column */}
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {student.skills?.slice(0, 3).map((s) => (
                        <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-[#0B101B] text-slate-300 border border-[#1C2638]">
                          {s}
                        </span>
                      ))}
                      {student.skills?.length > 3 && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          +{student.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 font-mono text-xs font-medium text-slate-300">
                    {student.cgpa}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-xs font-bold text-[#00E699]">
                      {student.xpPoints?.toLocaleString()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
