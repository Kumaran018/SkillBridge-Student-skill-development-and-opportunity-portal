import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  BookOpen
} from 'lucide-react';

export default function QuizModal({
  quiz,
  currentUser,
  isOpen,
  onClose,
  onQuizCompleted
}) {
  if (!isOpen || !quiz) return null;

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitSeconds || 180);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const questions = quiz.questions || [];
  const currentQ = questions[currentQuestionIdx];

  const handleSelectOption = (optionIdx) => {
    if (isSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIdx]: optionIdx
    });
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    try {
      const answersArray = questions.map((_, idx) =>
        selectedAnswers[idx] !== undefined ? selectedAnswers[idx] : -1
      );

      const res = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentUser?.id,
          studentName: currentUser?.name,
          answers: answersArray
        })
      });

      const data = await res.json();
      setResult(data);
      setIsSubmitted(true);
      if (onQuizCompleted) {
        onQuizCompleted(data);
      }
    } catch (err) {
      console.error('Error submitting quiz:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setTimeLeft(quiz.timeLimitSeconds || 180);
    setIsSubmitted(false);
    setResult(null);
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#101726] border border-[#1C2638] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-100">
        
        {/* Modal Header */}
        <div className="p-4 bg-[#0B101B] border-b border-[#1C2638] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#101726] border border-[#1C2638] flex items-center justify-center text-[#00E699] font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                {quiz.skillName} Benchmark Assessment
              </h2>
              <div className="text-xs text-slate-400 flex items-center gap-2 font-mono">
                <span>{questions.length} Questions</span>
                <span>•</span>
                <span className="text-slate-300">80% passing</span>
                <span>•</span>
                <span className="font-bold text-[#00E699]">+100 XP</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {!isSubmitted && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-xs font-bold border ${
                  timeLeft <= 30
                    ? 'bg-rose-500/15 text-rose-400 border-rose-500/40 animate-pulse'
                    : 'bg-[#101726] text-[#00E699] border-[#1C2638]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-[#162033] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Active Quiz Question Stepper */}
          {!isSubmitted ? (
            <div className="space-y-4">
              
              {/* Stepper & Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Question {currentQuestionIdx + 1} of {questions.length}</span>
                  <span className="text-[#00E699]">{Object.keys(selectedAnswers).length} answered</span>
                </div>
                <div className="w-full h-1.5 bg-[#0B101B] border border-[#1C2638] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#00E699] transition-all duration-200 shadow-[0_0_8px_rgba(0,230,153,0.5)]"
                    style={{
                      width: `${((currentQuestionIdx + 1) / questions.length) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Current Question Box */}
              {currentQ && (
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-lg bg-[#0B101B] border border-[#1C2638] text-sm font-medium text-white leading-relaxed">
                    {currentQ.question}
                  </div>

                  {/* 4 MCQ Options */}
                  <div className="space-y-2">
                    {currentQ.options?.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(optIdx)}
                          className={`w-full p-3 rounded-lg text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 border ${
                            isSelected
                              ? 'bg-[#00E699]/15 border-[#00E699] text-[#00E699] font-semibold ring-1 ring-[#00E699]'
                              : 'bg-[#101726] border-[#1C2638] text-slate-200 hover:bg-[#162033] hover:border-[#2A3952]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded text-xs font-mono font-bold flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#00E699] text-[#070B12] border-[#00E699]'
                                : 'bg-[#0B101B] text-slate-400 border-[#1C2638]'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#00E699] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step Navigation Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1C2638]">
                <button
                  onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </button>

                {currentQuestionIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx(prev => prev + 1)}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all"
                  >
                    Next <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Evaluating...' : 'Submit Assessment'}
                  </button>
                )}
              </div>

            </div>
          ) : (
            
            /* Assessment Result Screen */
            <div className="space-y-5 text-center py-2 animate-in zoom-in-95">
              <div className="inline-flex p-3 rounded-full bg-[#0B101B] border border-[#1C2638]">
                {result?.passed ? (
                  <ShieldCheck className="w-10 h-10 text-[#00E699]" />
                ) : (
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {result?.passed ? 'Benchmark Passed' : 'Assessment Completed'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {result?.passed
                    ? `You scored ${result.percentage}% (${result.score}/${result.totalQuestions}) and met the 80% passing threshold.`
                    : `You scored ${result?.percentage}% (${result?.score}/${result?.totalQuestions}). A minimum score of 80% is required to unlock this badge.`}
                </p>
              </div>

              {/* Passed Perks Banner */}
              {result?.passed ? (
                <div className="p-4 rounded-xl bg-[#0B101B] border border-[#00E699]/40 space-y-2.5 max-w-md mx-auto text-left">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#00E699]">
                    <span>Verified Credential Awarded</span>
                    <span className="font-mono text-[11px] bg-[#00E699]/15 text-[#00E699] px-2 py-0.5 rounded border border-[#00E699]/30">
                      Passed
                    </span>
                  </div>

                  <div className="p-2.5 rounded-md bg-[#101726] border border-[#1C2638] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#00E699]" />
                      <div>
                        <div className="text-xs font-semibold text-white">{result.badgeAwarded}</div>
                        <div className="text-[11px] text-slate-400">Added to your verified profile</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#00E699] bg-[#0B101B] px-2 py-0.5 rounded border border-[#1C2638]">
                      +100 XP
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#0B101B] border border-[#1C2638] text-xs text-slate-400 max-w-md mx-auto flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>
                    Check out the Learning Hub modules to prepare for a retake.
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2.5 pt-2">
                <button
                  onClick={handleRetake}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#101726] hover:bg-[#162033] text-slate-200 border border-[#1C2638] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Retake Quiz
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg text-xs font-bold bg-[#00E699] hover:bg-[#00c985] text-[#070B12] shadow-[0_0_12px_rgba(0,230,153,0.3)] transition-colors"
                >
                  Done
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
