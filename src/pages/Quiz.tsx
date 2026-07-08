import React, { useEffect, useRef, useState } from 'react';
import { Brain, Clock, Sparkles, Check, X, Award } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  setQuizTopic, setQuizDifficulty, setQuizCount, startQuiz,
  selectQuizAnswer, nextQuizQuestion, prevQuizQuestion,
  incrementTimer, resetQuiz, finishQuiz,
} from '../store/quizSlice';
import { useGenerateQuiz, useSubmitQuiz } from '../hooks/useQuiz';
import type { QuizResult } from '../services';
import Skeleton from '../components/Skeleton';

export default function Quiz() {
  const role = useAppSelector((s) => s.auth.role);
  const quizTopic = useAppSelector((s) => s.quiz.quizTopic);
  const quizDifficulty = useAppSelector((s) => s.quiz.quizDifficulty);
  const quizCount = useAppSelector((s) => s.quiz.quizCount);
  const quizRunning = useAppSelector((s) => s.quiz.quizRunning);
  const currentQuiz = useAppSelector((s) => s.quiz.currentQuiz);
  const quizCurrentIndex = useAppSelector((s) => s.quiz.quizCurrentIndex);
  const quizSelectedAnswer = useAppSelector((s) => s.quiz.quizSelectedAnswer);
  const quizAnswersRecord = useAppSelector((s) => s.quiz.quizAnswersRecord);
  const quizTimer = useAppSelector((s) => s.quiz.quizTimer);
  const quizScore = useAppSelector((s) => s.quiz.quizScore);
  const quizCompleted = useAppSelector((s) => s.quiz.quizCompleted);
  const dispatch = useAppDispatch();
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const generateMutation = useGenerateQuiz();
  const submitMutation = useSubmitQuiz();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (quizRunning && !quizCompleted) {
      timerRef.current = setInterval(() => {
        dispatch(incrementTimer());
      }, 1000);
    } else if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current !== null) clearInterval(timerRef.current); };
  }, [quizRunning, quizCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = async () => {
    try {
      const res = await generateMutation.mutateAsync({ topic: quizTopic, difficulty: quizDifficulty, count: quizCount });
      dispatch(startQuiz(res));
    } catch (err) {
      console.error('Failed to generate quiz:', err);
    }
  };

  if (generateMutation.isPending) {
    return (
      <div className="max-w-[760px] mx-auto text-left font-sans">
        <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800/60 mb-2">
            <div className="space-y-1.5">
              <Skeleton height={16} width={160} />
              <Skeleton height={10} width={100} />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton width={60} height={24} borderRadius="6px" />
              <Skeleton width={70} height={24} borderRadius="999px" />
            </div>
          </div>
          <Skeleton height={6} borderRadius="999px" />
          <Skeleton height={18} width="90%" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3.5 p-4 rounded-xl border border-slate-200 dark:border-slate-800/80">
                <Skeleton width={24} height={24} borderRadius="999px" />
                <Skeleton height={12} width="70%" />
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-5 border-t border-slate-200 dark:border-slate-800/60">
            <Skeleton width={80} height={36} borderRadius="8px" />
            <Skeleton width={100} height={36} borderRadius="8px" />
          </div>
        </div>
      </div>
    );
  }

  if (role !== 'student') {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
          <Award size={24} className="text-[#7C3AED]" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {role === 'teacher' ? 'Teacher View' : 'Admin View'}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          AI Practice Quiz is a student-only feature. Switch to a student account to generate and take quizzes.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[760px] mx-auto text-left font-sans">
      {!quizRunning ? (
        // Quiz Configuration Forms
        <div className="glass-panel p-8 border border-slate-200/60 dark:border-slate-800/40">
          <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Brain size={22} className="text-[#7C3AED]" /> AI Practice Quiz Generator
          </h2>

          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1.5">Learning Syllabus Topic</label>
              <select 
                value={quizTopic} 
                onChange={(e) => dispatch(setQuizTopic(e.target.value))}
                className="form-input text-xs"
              >
                <option value="Java OOP">Java OOP Foundations (Polymorphism, Interfaces)</option>
                <option value="SQL JOINs">SQL Normalization & JOIN Queries</option>
                <option value="AI Networks">Neural Network Backpropagation Structures</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label text-[11px] font-semibold text-slate-400 mb-1.5">Difficulty Mode</label>
                <div className="flex gap-2">
                  {['Easy', 'Medium', 'Hard'].map(diff => (
                    <button 
                      key={diff}
                      type="button"
                      onClick={() => dispatch(setQuizDifficulty(diff))}
                      className={`flex-grow py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        quizDifficulty === diff 
                          ? 'bg-[#7C3AED] text-white border-[#7C3AED]' 
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label text-[11px] font-semibold text-slate-400 mb-1.5">Question Count</label>
                <select 
                  value={quizCount} 
                  onChange={(e) => dispatch(setQuizCount(Number(e.target.value)))}
                  className="form-input text-xs"
                >
                  <option value={5}>5 Questions (Express)</option>
                  <option value={10}>10 Questions (Standard)</option>
                  <option value={20}>20 Questions (Deep Assessment)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleStartQuiz}
              disabled={generateMutation.isPending}
              className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-violet-950 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/15 flex items-center justify-center gap-1.5 cursor-pointer mt-6"
            >
              {generateMutation.isPending ? 'Generating...' : 'Generate AI Quiz'} <Sparkles size={14} />
            </button>
          </div>
        </div>
      ) : currentQuiz ? (
        // Quiz Execution Page
        <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
          
          {/* Quiz Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-800/60 mb-5">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{currentQuiz.topic}</h3>
              <span className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold uppercase tracking-wider block mt-0.5">Difficulty: {quizDifficulty}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-md">
                <Clock size={12} /> {formatTime(quizTimer)}
              </span>
              <span className="badge badge-primary text-[10px]">
                Q {quizCurrentIndex + 1} of {currentQuiz.questions.length}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#7C3AED] to-cyan-400 transition-all duration-300"
              style={{ width: `${((quizCurrentIndex + 1) / currentQuiz.questions.length) * 100}%` }}
            ></div>
          </div>

          {!quizCompleted ? (
            // Quiz runtime question display
            <div>
              <h2 className="text-sm md:text-base font-extrabold text-slate-900 dark:text-slate-100 mb-6 leading-relaxed">
                {currentQuiz.questions[quizCurrentIndex].question}
              </h2>

              <div className="space-y-3 mb-8">
                {currentQuiz.questions[quizCurrentIndex].options.map((opt: string, idx: number) => {
                  const isSelected = quizSelectedAnswer === idx;
                  return (
                    <div 
                      key={idx}
                      onClick={() => dispatch(selectQuizAnswer(idx))}
                      className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED] dark:text-indigo-400 font-bold' 
                          : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-250 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:border-[#7C3AED]/40'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                        isSelected 
                          ? 'border-[#7C3AED] bg-[#7C3AED] text-white' 
                          : 'border-slate-400 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-xs">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center border-t border-slate-250 dark:border-slate-850 pt-5">
                <button 
                  onClick={() => dispatch(prevQuizQuestion())} 
                  disabled={quizCurrentIndex === 0}
                  className="px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button 
                    onClick={async () => {
                    if (quizCurrentIndex + 1 === currentQuiz.questions.length) {
                      const newRecord = [...quizAnswersRecord];
                      newRecord[quizCurrentIndex] = quizSelectedAnswer;
                      try {
                        const res = await submitMutation.mutateAsync({ attemptId: currentQuiz.attemptId, answersJson: JSON.stringify(newRecord) });
                        dispatch(finishQuiz({ score: res.score, answersRecord: newRecord, result: res }));
                        setQuizResult(res);
                      } catch (err) {
                        console.error('Failed to submit quiz:', err);
                      }
                    } else {
                      dispatch(nextQuizQuestion());
                    }
                  }}
                  disabled={quizSelectedAnswer === null}
                  className="px-4 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-violet-950 text-white text-xs font-bold shadow-md shadow-indigo-500/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {quizCurrentIndex + 1 === currentQuiz.questions.length ? 'Submit Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          ) : (
            // Quiz completed review board
            <div className="text-center">
              <div className={`w-[100px] h-[100px] rounded-full border-4 flex flex-col items-center justify-center mx-auto mb-6 ${
                quizScore! >= 70 
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' 
                  : 'border-rose-500 bg-rose-500/10 text-rose-500'
              }`}>
                <span className="text-3xl font-black font-heading leading-none">{quizScore}%</span>
                <span className="text-[8px] uppercase font-bold tracking-widest mt-1">Score</span>
              </div>

              <h2 className="text-xl font-heading font-black mb-2 text-slate-900 dark:text-white">
                {quizScore! >= 70 ? 'Congratulations! You Passed.' : 'Keep Practicing!'}
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mb-8 max-w-[400px] mx-auto">
                You successfully resolved {quizResult?.correctCount ?? quizAnswersRecord.filter((ans, i) => ans === currentQuiz.questions[i].answer).length} out of {quizResult?.totalCount ?? currentQuiz.questions.length} questions correctly.
              </p>

              <div className="border-b border-slate-250 dark:border-slate-850 pb-2 mb-4 text-left">
                <h4 className="text-[12px] font-bold text-slate-800 dark:text-slate-200">AI Questions Review & Insights</h4>
              </div>

              <div className="space-y-4 text-left max-h-[320px] overflow-y-auto pr-1 mb-8">
                {((quizResult?.results as import('../services').QuestionResult[]) ?? currentQuiz.questions.map((q, idx: number) => ({
                  questionId: q.id,
                  question: q.question,
                  options: q.options,
                  correctAnswer: q.answer,
                  yourAnswer: quizAnswersRecord[idx] as number,
                  correct: quizAnswersRecord[idx] === q.answer,
                  explanation: q.explanation || ''
                }))).map((r, idx: number) => {
                  const correct = r.correct;
                  const opts = r.options || [];
                  return (
                    <div 
                      key={r.questionId || idx}
                      className={`p-4 rounded-xl border bg-white dark:bg-slate-900/20 text-xs ${
                        correct 
                          ? 'border-emerald-500/30' 
                          : 'border-rose-500/30'
                      }`}
                    >
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-start gap-2 mb-2 leading-relaxed">
                        {correct ? <Check size={14} className="text-emerald-500 mt-0.5 flex-shrink-0" /> : <X size={14} className="text-rose-500 mt-0.5 flex-shrink-0" />}
                        Question {idx + 1}: {r.question}
                      </h4>
                      <p className="text-slate-500 dark:text-slate-400 mb-1">
                        Your Answer: <strong className={correct ? 'text-emerald-500' : 'text-rose-500'}>{opts[r.yourAnswer] || 'Unanswered'}</strong>
                      </p>
                      {!correct && (
                        <p className="text-slate-500 dark:text-slate-400 mb-1">
                          Correct Choice: <strong className="text-emerald-500">{opts[r.correctAnswer]}</strong>
                        </p>
                      )}
                      <p className="text-slate-500 dark:text-slate-400 italic pl-3 border-l-2 border-[#7C3AED] mt-2.5 leading-normal">
                        <strong>AI Explanation:</strong> {r.explanation}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => dispatch(resetQuiz())}
                className="px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-violet-950 text-white text-xs font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
              >
                Close & Return
              </button>
            </div>
          )}

        </div>
      ) : null}
    </div>
  );
}
