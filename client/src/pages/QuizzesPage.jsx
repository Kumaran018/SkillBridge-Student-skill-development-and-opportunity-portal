import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Award,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import QuizModal from '../components/QuizModal';

export default function QuizzesPage({
  quizzes,
  currentUser,
  onRefresh,
  onUpdateUser
}) {
  const location = useLocation();
  const preselectedSkill = location.state?.selectedSkill;

  const [activeQuiz, setActiveQuiz] = useState(
    preselectedSkill
      ? quizzes.find(q => q.skillName.toLowerCase() === preselectedSkill.toLowerCase()) || null
      : null
  );

  const handleStartQuiz = (quiz) => {
    setActiveQuiz(quiz);
  };

  const handleQuizCompleted = (data) => {
    if (data?.user && onUpdateUser) {
      onUpdateUser(data.user);
    } else if (data?.passed && onUpdateUser && currentUser) {
      const badgeTitle = data.badgeAwarded || activeQuiz?.badgeTitle;
      const skillName = activeQuiz?.skillName;
      const updated = {
        ...currentUser,
        xpPoints: (Number(currentUser.xpPoints) || 0) + (data.xpAwarded || 100),
        verifiedBadges: currentUser.verifiedBadges?.includes(badgeTitle)
          ? currentUser.verifiedBadges
          : [...(currentUser.verifiedBadges || []), badgeTitle],
        skills: currentUser.skills?.includes(skillName)
          ? currentUser.skills
          : [...(currentUser.skills || []), skillName]
      };
      onUpdateUser(updated);
    }
    if (onRefresh) onRefresh();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2638] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Skill Benchmarks & Verifications
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Validate technical competencies through timed benchmarks. Score &ge;80% to earn official profile badges and +100 XP.
          </p>
        </div>

        {currentUser && (
          <div className="p-2.5 px-3.5 rounded-xl bg-[#101726] border border-[#1C2638] shadow-xl flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00E699]" />
              <span className="text-slate-300 font-medium">{currentUser.verifiedBadges?.length || 0} Badges Verified</span>
            </div>
            <div className="h-3.5 w-px bg-[#1C2638]" />
            <div className="font-mono text-[#00E699] font-bold">{currentUser.xpPoints?.toLocaleString()} XP</div>
          </div>
        )}
      </div>

      {/* Grid of Quizzes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => {
          const hasBadge = currentUser?.verifiedBadges?.includes(quiz.badgeTitle);

          return (
            <div
              key={quiz.id}
              className={`bg-[#101726] border rounded-xl p-5 flex flex-col justify-between shadow-xl hover:border-[#2A3952] transition-all ${
                hasBadge ? 'border-[#00E699]/40' : 'border-[#1C2638]'
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0B101B] border border-[#1C2638] flex items-center justify-center text-[#00E699] font-mono font-bold text-sm">
                      {quiz.skillName.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold text-white">
                          {quiz.skillName} Benchmark
                        </h2>
                        {hasBadge && (
                          <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-[#00E699]/15 text-[#00E699] border border-[#00E699]/40 font-mono font-semibold">
                            <ShieldCheck className="w-3 h-3 text-[#00E699]" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Badge: <span className="text-slate-200 font-medium">{quiz.badgeTitle}</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0B101B] text-[#00E699] border border-[#1C2638]">
                    +{quiz.xpReward || 100} XP
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {quiz.description}
                </p>

                {/* Benchmark Specifications */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-[#0B101B] border border-[#1C2638]">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono font-bold">Format</span>
                    <span className="font-mono font-medium text-white mt-0.5 block">{quiz.questions?.length || 5} Questions</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0B101B] border border-[#1C2638]">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono font-bold">Time Limit</span>
                    <span className="font-mono font-medium text-white mt-0.5 block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> 3m 00s
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#0B101B] border border-[#1C2638]">
                    <span className="text-slate-400 text-[10px] block uppercase font-mono font-bold">Passing</span>
                    <span className="font-mono font-bold text-[#00E699] mt-0.5 block">&ge;80% (4/5)</span>
                  </div>
                </div>
              </div>

              {/* Start Quiz Action */}
              <div className="mt-4 pt-3.5 border-t border-[#1C2638] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {hasBadge ? 'Completed & verified on profile' : 'Ready to attempt'}
                </span>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    hasBadge
                      ? 'bg-[#101726] hover:bg-[#162033] text-white border border-[#1C2638]'
                      : 'bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  {hasBadge ? 'Retake Benchmark' : 'Start Assessment'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quiz Modal */}
      <QuizModal
        quiz={activeQuiz}
        currentUser={currentUser}
        isOpen={Boolean(activeQuiz)}
        onClose={() => setActiveQuiz(null)}
        onQuizCompleted={handleQuizCompleted}
      />

    </div>
  );
}
