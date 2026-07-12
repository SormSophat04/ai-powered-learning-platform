import React, { useState, useMemo, useCallback } from 'react';
import { Play, FileText, CheckCircle2, ChevronRight, ChevronLeft, Brain, Send, Check, GraduationCap, Sparkles } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedCourse, setActiveLesson } from '../store/coursesSlice';
import { setActiveChatId, setAiTyping } from '../store/chatSlice';
import { useCourses, useCourseDetail, useEnrollCourse, useCompleteLesson, useUpdateProgress } from '../hooks/useCourses';
import { useCreateConversation, useSendMessage } from '../hooks/useChat';
import type { ModuleDto, LessonDto } from '../services';
import { SkeletonLessonItem } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../components/AIChat';

export default function Courses() {
  const selectedCourse = useAppSelector((s) => s.courses.selectedCourse);
  const activeLesson = useAppSelector((s) => s.courses.activeLesson);
  const aiTyping = useAppSelector((s) => s.chat.aiTyping);
  const activeChatId = useAppSelector((s) => s.chat.activeChatId);
  const dispatch = useAppDispatch();
  const [assistantInput, setAssistantInput] = useState('');
  const [localChatMessages, setLocalChatMessages] = useState<{ id: number; sender: string; text: string }[]>([]);

  const { data: coursesData } = useCourses();
  const { data: courseDetail, isLoading: loadingCourse } = useCourseDetail(selectedCourse?.id ? Number(selectedCourse.id) : undefined);
  const enrollMutation = useEnrollCourse();
  const completeMutation = useCompleteLesson();
  const updateProgressMutation = useUpdateProgress();
  const createConvMutation = useCreateConversation();
  const sendMsgMutation = useSendMessage();

  React.useEffect(() => {
    if (!selectedCourse?.id && coursesData && coursesData.length > 0) {
      dispatch(setSelectedCourse(coursesData[0] as unknown as Parameters<typeof setSelectedCourse>[0]));
    }
  }, [coursesData]);

  React.useEffect(() => {
    if (courseDetail) {
      const flat = courseDetail.modules.flatMap(m => m.lessons);
      const first = flat.find(l => !l.completed) || flat[0];
      if (first && !activeLesson.id) {
        dispatch(setActiveLesson({
          id: String(first.id),
          title: first.title,
          duration: first.duration,
          type: first.type,
        }));
      }
    }
  }, [courseDetail]);

  const allLessons = useMemo(() => courseDetail?.modules.flatMap(m => m.lessons) ?? [], [courseDetail]);
  const currentIndex = useMemo(() => allLessons.findIndex(l => String(l.id) === activeLesson.id), [allLessons, activeLesson.id]);
  const currentLesson = useMemo(() => allLessons[currentIndex] ?? null, [allLessons, currentIndex]);
  const prevLesson = useMemo(() => (currentIndex > 0 ? allLessons[currentIndex - 1] : null), [allLessons, currentIndex]);
  const nextLesson = useMemo(() => (currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null), [allLessons, currentIndex]);
  const completedCount = useMemo(() => allLessons.filter(l => l.completed).length, [allLessons]);
  const totalCount = allLessons.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isLessonCompleted = currentLesson?.completed ?? false;

  const navigateToLesson = useCallback((lesson: LessonDto) => {
    dispatch(setActiveLesson({
      id: String(lesson.id),
      title: lesson.title,
      duration: lesson.duration,
      type: lesson.type,
    }));
  }, [dispatch]);

  const handleCompleteAndNext = useCallback(async () => {
    if (!courseDetail || !currentLesson) return;
    try {
      await completeMutation.mutateAsync({ courseId: courseDetail.id, lessonId: currentLesson.id });
      const newCompletedCount = completedCount + (isLessonCompleted ? 0 : 1);
      const newProgress = totalCount > 0 ? Math.round((newCompletedCount / totalCount) * 100) : 0;
      await updateProgressMutation.mutateAsync({ courseId: courseDetail.id, progress: newProgress });
      if (nextLesson) {
        navigateToLesson(nextLesson);
      } else {
        dispatch(setActiveLesson({ id: 'complete', title: 'Course Complete!', duration: '', type: '' }));
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    }
  }, [courseDetail, currentLesson, completedCount, isLessonCompleted, totalCount, nextLesson, dispatch, navigateToLesson]);

  const handleVideoEnded = useCallback(() => {
    if (!isLessonCompleted) {
      handleCompleteAndNext();
    }
  }, [isLessonCompleted, handleCompleteAndNext]);

  const handleSendAssistantMessage = async () => {
    if (!assistantInput.trim()) return;
    const userText = assistantInput;
    setAssistantInput('');
    setLocalChatMessages(prev => [...prev, { id: Date.now(), sender: 'student', text: userText }]);
    dispatch(setAiTyping(true));

    try {
      let convId = activeChatId;
      if (!convId) {
        const conv = await createConvMutation.mutateAsync(userText.slice(0, 50));
        convId = conv.id;
        dispatch(setActiveChatId(convId));
      }
      const res = await sendMsgMutation.mutateAsync({ conversationId: convId, text: userText });
      setLocalChatMessages(prev => [...prev, { id: res.id, sender: res.sender.toLowerCase() === 'ai' ? 'ai' : 'student', text: res.text }]);
    } catch {
      setLocalChatMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: 'I apologize, but I encountered an error processing your request. Please try again.' }]);
    } finally {
      dispatch(setAiTyping(false));
    }
  };

  const isEnrolled = (courseDetail?.progress ?? 0) > 0;

  const handleEnroll = async () => {
    if (!courseDetail) return;
    try {
      await enrollMutation.mutateAsync(courseDetail.id);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Enroll failed';
      console.error('Failed to enroll:', message);
    }
  };

  const isComplete = activeLesson.id === 'complete';

  if (loadingCourse) {
    return (
      <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/20 p-5 rounded-2xl border border-slate-200/60 dark:border-white/5">
          <div className="space-y-2">
            <Skeleton height={11} width={140} />
            <Skeleton height={24} width={260} />
            <div className="flex gap-2.5 mt-2">
              <Skeleton width={80} height={20} borderRadius="999px" />
              <Skeleton width={60} height={20} borderRadius="999px" />
            </div>
          </div>
          <Skeleton width={100} height={40} borderRadius="8px" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr_300px] gap-6">
          <div className="glass-panel p-4 border border-slate-200/60 dark:border-slate-800/40">
            <Skeleton height={11} width={80} className="mb-4" />
            <div className="space-y-4">
              {[1, 2, 3].map(mod => (
                <div key={mod} className="space-y-2">
                  <Skeleton height={11} width="60%" />
                  <div className="flex flex-col gap-1.5">
                    {[1, 2, 3].map(les => <SkeletonLessonItem key={les} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="w-full aspect-video rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="flex items-center justify-between">
              <Skeleton height={36} width={160} borderRadius="8px" />
              <div className="flex gap-2">
                <Skeleton width={100} height={36} borderRadius="8px" />
                <Skeleton width={80} height={36} borderRadius="8px" />
              </div>
            </div>
          </div>
          <div className="hidden lg:flex glass-panel p-4 border border-slate-200/60 dark:border-slate-800/40 flex-col h-[calc(100vh-210px)]">
            <div className="pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-3.5 space-y-1">
              <Skeleton height={14} width={100} />
              <Skeleton height={9} width={160} />
            </div>
            <div className="flex-1 space-y-3 p-1">
              <Skeleton height={60} borderRadius="12px" />
              <Skeleton height={40} borderRadius="12px" />
              <Skeleton height={50} borderRadius="12px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">

      {/* Course Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 dark:bg-slate-900/20 p-5 rounded-2xl border border-slate-200/60 dark:border-white/5">
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Course Workspace</span>
          <h1 className="text-2xl font-heading font-black text-slate-900 dark:text-white mt-0.5">{courseDetail?.title || selectedCourse.title}</h1>
          <div className="flex gap-2.5 mt-2">
            <span className="badge badge-primary">{courseDetail?.category || selectedCourse.category}</span>
            <span className="badge badge-secondary">{courseDetail?.difficulty || selectedCourse.difficulty}</span>
          </div>
        </div>

        {/* Progress meter */}
        <div className="glass-card px-4 py-2 flex items-center gap-3 border border-slate-250 dark:border-slate-850">
          <div className="relative w-9 h-9">
            <svg viewBox="0 0 36 36" className="w-full h-full transform rotate-[-90deg]">
              <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="currentColor"
                className="text-[#7C3AED]"
                strokeWidth="3.5"
                strokeDasharray="100"
                strokeDashoffset={100 - progress}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              {progress}%
            </span>
          </div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">Progress</span>
        </div>
      </div>

      {/* Main Column Split */}
      <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr_300px] gap-6">

        {/* Left Side: Curriculum modules */}
        <div className="glass-panel p-4 border border-slate-200/60 dark:border-slate-800/40 max-h-[300px] md:max-h-[calc(100vh-210px)] overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            Curriculum
          </h3>

          <div className="space-y-4">
            {(courseDetail?.modules ?? []).map((mod: ModuleDto) => (
              <div key={mod.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-[11px] font-extrabold text-slate-800 dark:text-slate-250 truncate">{mod.title}</h4>
                  {mod.completed && <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />}
                </div>
                <div className="flex flex-col gap-1.5">
                  {mod.lessons.map((les: LessonDto) => {
                    const isActive = activeLesson.id === String(les.id);
                    return (
                      <button
                        key={les.id}
                        onClick={() => navigateToLesson(les)}
                        className={`flex items-center gap-2.5 px-3 py-2 text-[11px] font-bold rounded-lg text-left transition-all border cursor-pointer ${
                          isActive
                            ? 'bg-indigo-500/10 border-indigo-500 text-[#7C3AED] dark:text-indigo-400'
                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-255'
                        }`}
                      >
                        {les.completed ? (
                          <CheckCircle2 size={11} className="text-emerald-500" />
                        ) : les.type?.toLowerCase() === 'video' ? (
                          <Play size={11} />
                        ) : (
                          <FileText size={11} />
                        )}
                        <span className="truncate flex-grow">{les.title}</span>
                        <span className="text-[9px] text-slate-400 font-semibold">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Lesson Workspace */}
        <div className="space-y-6">
          {!isEnrolled && courseDetail ? (
            <div className="glass-panel p-10 min-h-[360px] border border-slate-200/60 dark:border-slate-800/40 bg-white/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-500/10 dark:bg-indigo-400/10 flex items-center justify-center mb-4">
                <GraduationCap size={32} className="text-[#7C3AED]" />
              </div>
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                {courseDetail.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-2 leading-relaxed">
                {courseDetail.description}
              </p>
              <div className="flex gap-2.5 mb-6">
                <span className="badge badge-primary text-[10px] px-2.5">{courseDetail.category}</span>
                <span className="badge badge-secondary text-[10px] px-2.5">{courseDetail.difficulty}</span>
              </div>
              <button
                onClick={handleEnroll}
                disabled={enrollMutation.isPending}
                className="py-3 px-8 bg-[#7C3AED] hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-500/15 cursor-pointer transition-all"
              >
                {enrollMutation.isPending ? (
                  <>Enrolling...</>
                ) : (
                  <><Sparkles size={16} /> Enroll in Course</>
                )}
              </button>
            </div>
          ) : isComplete ? (
            <div className="glass-panel p-8 min-h-[360px] border border-slate-200/60 dark:border-slate-800/40 bg-white/50 dark:bg-slate-900/30 flex flex-col items-center justify-center text-center">
              <CheckCircle2 size={48} className="text-emerald-500 mb-4" />
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2">Course Complete!</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
                You have completed all lessons in this course. Great job!
              </p>
            </div>
          ) : currentLesson?.type?.toLowerCase() === 'video' ? (
            <div className="w-full aspect-video rounded-2xl bg-black border border-slate-200 dark:border-slate-850 overflow-hidden shadow-lg relative">
              <video
                controls
                className="w-full h-full object-cover"
                src={currentLesson?.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
                onEnded={handleVideoEnded}
              ></video>
            </div>
          ) : (
            <div className="glass-panel p-8 min-h-[360px] border border-slate-200/60 dark:border-slate-800/40 bg-white/50 dark:bg-slate-900/30">
              <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-4">{currentLesson?.title || activeLesson.title}</h2>
              <div className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                {currentLesson?.content ? (
                  <ReactMarkdown
                    components={{
                      code(props) {
                        const { children, className, node, ...rest } = props;
                        const match = /language-(\w+)/.exec(className || '');
                        const codeValue = String(children).replace(/\n$/, '');
                        const isInline = !className && !codeValue.includes('\n');

                        if (!isInline) {
                          return (
                            <CodeBlock
                              code={codeValue}
                              language={match ? match[1] : ''}
                            />
                          );
                        }

                        return (
                          <code
                            className="bg-slate-100 dark:bg-slate-900 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-mono text-[11.5px] border border-slate-200/60 dark:border-slate-800/50"
                            {...rest}
                          >
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => (
                        <p className="text-[13px] leading-relaxed mb-3.5 last:mb-0 text-slate-700 dark:text-slate-200">
                          {children}
                        </p>
                      ),
                      h1: ({ children }) => (
                        <h1 className="text-[17px] font-bold mt-4 mb-2.5 font-display text-slate-900 dark:text-white">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-[15px] font-bold mt-3.5 mb-2 font-display text-slate-900 dark:text-white">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-[14px] font-bold mt-3 mb-1.5 font-display text-slate-900 dark:text-white">
                          {children}
                        </h3>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-5 mb-3.5 space-y-1.5 text-[13px] text-slate-700 dark:text-slate-200">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5 mb-3.5 space-y-1.5 text-[13px] text-slate-700 dark:text-slate-200">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="mb-0.5 leading-relaxed">
                          {children}
                        </li>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-medium hover:opacity-85 transition-opacity text-indigo-600 dark:text-indigo-400"
                        >
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-3 pl-3 italic my-3.5 border-indigo-500/40 text-slate-500 dark:text-slate-400">
                          {children}
                        </blockquote>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-bold text-slate-900 dark:text-white">
                          {children}
                        </strong>
                      )
                    }}
                  >
                    {currentLesson.content}
                  </ReactMarkdown>
                ) : (
                  "No content available for this lesson."
                )}
              </div>
            </div>
          )}

          {!isComplete && isEnrolled && (
            <div className="flex items-center justify-between">
              <div>
                {isLessonCompleted ? (
                  <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 size={14} /> Completed
                  </span>
                ) : (
                  <button
                    onClick={handleCompleteAndNext}
                    disabled={completeMutation.isPending}
                    className="py-2 px-5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <Check size={14} />
                    {completeMutation.isPending ? 'Saving...' : nextLesson ? 'Mark Complete & Next' : 'Mark Complete'}
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {prevLesson && (
                  <button
                    onClick={() => navigateToLesson(prevLesson)}
                    className="py-2 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                )}
                {nextLesson && (
                  <button
                    onClick={() => navigateToLesson(nextLesson)}
                    className="py-2 px-4 bg-[#7C3AED] hover:bg-violet-600 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {isEnrolled && (
            <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Lesson notes</h4>
              Understand the theoretical frameworks of this module before taking corresponding check quizzes. Reach out in the right panel AI tutor chat console if you have queries.
            </div>
          )}
        </div>

        {/* Right Side: AI Assistant */}
        <div className="hidden lg:flex glass-panel p-4 border border-slate-200/60 dark:border-slate-800/40 flex-col h-[calc(100vh-210px)] bg-white/40 dark:bg-[#0F172A]/40">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-3.5">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Brain size={14} className="text-[#7C3AED]" /> AI Assistant
            </h3>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 block">
              Ask about "{currentLesson?.title || activeLesson.title}"
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-1">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-3 rounded-xl text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>AI:</strong> Ask me questions about this lesson!
            </div>
            {localChatMessages.slice(-3).map((chat, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl text-[11px] leading-relaxed text-left ${
                  chat.sender === 'student'
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-[#7C3AED] dark:text-indigo-400'
                    : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/30 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="font-bold mb-1 select-none">
                  {chat.sender === 'student' ? 'You' : 'AI'}
                </div>
                <ReactMarkdown
                  components={{
                    code(props) {
                      const { children, className, node, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || '');
                      const codeValue = String(children).replace(/\n$/, '');
                      const isInline = !className && !codeValue.includes('\n');

                      if (!isInline) {
                        return (
                          <CodeBlock
                            code={codeValue}
                            language={match ? match[1] : ''}
                          />
                        );
                      }

                      return (
                        <code
                          className={
                            chat.sender === 'student'
                              ? "bg-white/15 text-white px-1.5 py-0.5 rounded font-mono text-[10px]"
                              : "bg-slate-100 dark:bg-slate-900 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-mono text-[10px] border border-slate-200/60 dark:border-slate-800/50"
                          }
                          {...rest}
                        >
                          {children}
                        </code>
                      );
                    },
                    p: ({ children }) => (
                      <p className={`text-[11px] leading-relaxed mb-1.5 last:mb-0 ${chat.sender === 'student' ? 'text-indigo-900/90 dark:text-indigo-200/90' : 'text-slate-700 dark:text-slate-200'}`}>
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-[12px] font-bold mt-2 mb-1 font-display">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-[11.5px] font-bold mt-2 mb-1 font-display">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-[11px] font-bold mt-1.5 mb-1 font-display">
                        {children}
                      </h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-4 mb-2 space-y-0.5 text-[11px]">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-4 mb-2 space-y-0.5 text-[11px]">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="mb-0.5 leading-relaxed">
                        {children}
                      </li>
                    ),
                    a: ({ children, href }) => (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`underline font-medium hover:opacity-85 transition-opacity ${chat.sender === 'student' ? 'text-indigo-900/90 dark:text-indigo-250/90' : 'text-indigo-600 dark:text-indigo-400'}`}
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className={`border-l-2 pl-2 italic my-1.5 ${chat.sender === 'student' ? 'border-indigo-600/40 text-indigo-900/90 dark:text-indigo-200/90' : 'border-indigo-500/40 text-slate-500 dark:text-slate-400'}`}>
                        {children}
                      </blockquote>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold">
                        {children}
                      </strong>
                    )
                  }}
                >
                  {chat.text}
                </ReactMarkdown>
              </div>
            ))}

            {aiTyping && (
              <div className="flex gap-1.5 items-center p-2">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/60">
            <input
              type="text"
              placeholder="Ask anything..."
              value={assistantInput}
              onChange={(e) => setAssistantInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendAssistantMessage()}
              className="flex-grow h-[36px] text-[11px] rounded-lg border border-slate-250 dark:border-slate-850 bg-white dark:bg-slate-900 px-3 outline-none focus:border-[#7C3AED]"
            />
            <button
              onClick={handleSendAssistantMessage}
              className="w-9 h-9 rounded-lg bg-[#7C3AED] hover:bg-violet-950 text-white flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md shadow-indigo-500/10"
            >
              <Send size={12} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
