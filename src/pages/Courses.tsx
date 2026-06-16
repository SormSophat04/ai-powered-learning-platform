import React, { useState, useEffect } from 'react';
import { Play, FileText, CheckCircle2, ChevronRight, Brain, Send } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedCourse, setActiveLesson } from '../store/coursesSlice';
import { addChatMessage, setActiveChatId, setAiTyping } from '../store/chatSlice';
import type { Lesson } from '../types';
import { courseService, chatService } from '../services';
import type { CourseDetail, ModuleDto, LessonDto } from '../services';

export default function Courses() {
  const selectedCourse = useAppSelector((s) => s.courses.selectedCourse);
  const activeLesson = useAppSelector((s) => s.courses.activeLesson);
  const chatHistory = useAppSelector((s) => s.chat.chatHistory);
  const aiTyping = useAppSelector((s) => s.chat.aiTyping);
  const activeChatId = useAppSelector((s) => s.chat.activeChatId);
  const dispatch = useAppDispatch();
  const [assistantInput, setAssistantInput] = useState('');
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [_, setActiveConvId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedCourse?.id) {
      courseService.getCourseDetail(Number(selectedCourse.id)).then(res => {
        setCourseDetail(res.data);
        if (res.data.modules?.[0]?.lessons?.[0]) {
          dispatch(setActiveLesson({
            id: String(res.data.modules[0].lessons[0].id),
            title: res.data.modules[0].lessons[0].title,
            duration: res.data.modules[0].lessons[0].duration,
            type: res.data.modules[0].lessons[0].type,
          }));
        }
      }).catch(console.error);
    }
  }, [selectedCourse?.id]);

  const handleSendAssistantMessage = async () => {
    if (!assistantInput.trim()) return;
    const userText = assistantInput;
    setAssistantInput('');
    dispatch(addChatMessage({ id: Date.now(), sender: 'student', text: userText }));
    dispatch(setAiTyping(true));

    try {
      let convId = activeChatId;
      if (!convId) {
        const conv = await chatService.createConversation(userText.slice(0, 50));
        convId = conv.data.id;
        dispatch(setActiveChatId(convId));
        setActiveConvId(convId);
      }
      const res = await chatService.sendMessage(convId, userText);
      dispatch(addChatMessage({ id: res.data.id, sender: res.data.sender.toLowerCase() === 'ai' ? 'ai' : 'student', text: res.data.text }));
    } catch {
      dispatch(addChatMessage({ id: Date.now() + 1, sender: 'ai', text: 'I apologize, but I encountered an error processing your request. Please try again.' }));
    } finally {
      dispatch(setAiTyping(false));
    }
  };

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
                className="text-[#4F46E5]" 
                strokeWidth="3.5" 
                strokeDasharray="100" 
                strokeDashoffset={100 - (courseDetail?.progress ?? selectedCourse.progress)} 
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
              {courseDetail?.progress ?? selectedCourse.progress}%
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
                        onClick={() => {
                          dispatch(setActiveLesson({ id: String(les.id), title: les.title, duration: les.duration, type: les.type }));
                          courseService.completeLesson(Number(selectedCourse.id), les.id).catch(console.error);
                        }}
                        className={`flex items-center gap-2.5 px-3 py-2 text-[11px] font-bold rounded-lg text-left transition-all border cursor-pointer ${
                          isActive 
                            ? 'bg-indigo-500/10 border-indigo-500 text-[#4F46E5] dark:text-indigo-400' 
                            : 'border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-255'
                        }`}
                      >
                        {les.type === 'video' ? <Play size={11} /> : <FileText size={11} />}
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

        {/* Center: Video/Reading Workspace */}
        <div className="space-y-6">
          {activeLesson.type === 'video' ? (
            <div className="w-full aspect-video rounded-2xl bg-black border border-slate-200 dark:border-slate-850 overflow-hidden shadow-lg relative">
              <video 
                controls 
                className="w-full h-full object-cover" 
                src="https://www.w3schools.com/html/mov_bbb.mp4"
              ></video>
            </div>
          ) : (
            <div className="glass-panel p-8 min-h-[360px] border border-slate-200/60 dark:border-slate-800/40 bg-white/50 dark:bg-slate-900/30">
              <h2 className="text-xl font-heading font-bold mb-4">{activeLesson.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed mb-4">
                Abstract classes and interfaces in Java are used to achieve abstraction, allowing you to declare methods without defining their implementation details.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                An abstract class can contain instance variables, constructors, and method implementations. An interface can contain abstract methods (and default methods in newer versions) but cannot contain state variables.
              </p>
            </div>
          )}

          <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Lesson notes</h4>
            Understand the theoretical frameworks of this module before taking corresponding check quizzes. Reach out in the right panel AI tutor chat console if you have queries.
          </div>
        </div>

        {/* Right Side: AI Assistant */}
        <div className="hidden lg:flex glass-panel p-4 border border-slate-200/60 dark:border-slate-800/40 flex-col h-[calc(100vh-210px)] bg-white/40 dark:bg-[#0F172A]/40">
          <div className="pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-3.5">
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Brain size={14} className="text-[#4F46E5]" /> AI Assistant
            </h3>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 block">
              Ask about "{activeLesson.title}"
            </span>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 p-1">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 p-3 rounded-xl text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
              <strong>AI:</strong> Ask me questions regarding abstract variables, implementations, or interfaces!
            </div>
            {chatHistory.slice(-3).map((chat, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-xl text-[11px] leading-relaxed text-left ${
                  chat.sender === 'student' 
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-[#4F46E5] dark:text-indigo-400' 
                    : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/30 text-slate-800 dark:text-slate-200'
                }`}
              >
                <strong>{chat.sender === 'student' ? 'You' : 'AI'}:</strong> {chat.text}
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
              className="flex-grow h-[36px] text-[11px] rounded-lg border border-slate-250 dark:border-slate-850 bg-white dark:bg-slate-900 px-3 outline-none focus:border-[#4F46E5]"
            />
            <button 
              onClick={handleSendAssistantMessage}
              className="w-9 h-9 rounded-lg bg-[#4F46E5] hover:bg-indigo-750 text-white flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md shadow-indigo-500/10"
            >
              <Send size={12} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
