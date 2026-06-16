import React from 'react';
import { User, Cpu, Upload, Volume2, Send } from 'lucide-react';
import type { ChatMessage } from '../types';

interface ChatMessageBubbleProps {
  msg: ChatMessage;
}

export function ChatMessageBubble({ msg }: ChatMessageBubbleProps) {
  const isStudent = msg.sender === 'student';

  const renderContent = (text: string) => {
    if (text.includes('```')) {
      const parts = text.split('```');
      const beforeCode = parts[0];
      const codeBlock = parts[1] || '';
      const language = codeBlock.split('\n')[0] || '';
      const actualCode = codeBlock.substring(language.length).trim();
      const afterCode = parts[2] || '';

      return (
        <div>
          <p className="whitespace-pre-line text-[13px]">{beforeCode}</p>
          <pre className="bg-slate-900 text-teal-400 p-3.5 rounded-lg text-[11px] font-mono overflow-x-auto my-2 border border-slate-800">
            <code>{actualCode}</code>
          </pre>
          {afterCode && <p className="whitespace-pre-line text-[13px]">{afterCode}</p>}
        </div>
      );
    }
    return <p className="whitespace-pre-line text-[13px]">{text}</p>;
  };

  return (
    <div className={`flex gap-3 max-w-[85%] animate-fade-in ${isStudent ? 'self-end flex-row-reverse' : 'self-start'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isStudent ? 'bg-indigo-600' : 'bg-gradient-to-br from-[#4F46E5] to-[#06B6D4]'}`}>
        {isStudent ? <User size={14} /> : <Cpu size={14} />}
      </div>
      <div className={`p-3.5 rounded-2xl text-left leading-relaxed ${isStudent ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-850/60 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-sm'}`}>
        {renderContent(msg.text)}
      </div>
    </div>
  );
}

interface ChatInputConsoleProps {
  value: string;
  onChange: (val: string) => void;
  onSend: (text?: string) => void;
}

export function ChatInputConsole({ value, onChange, onSend }: ChatInputConsoleProps) {
  return (
    <div className="mt-4 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center gap-2">
      <button 
        onClick={() => onSend("Mock file uploaded. Explain its variable interfaces.")}
        className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
      >
        <Upload size={16} />
      </button>
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Ask a question (e.g. 'Explain polymorphism' or 'recursion')..." 
        className="flex-grow bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 text-xs px-3 py-2 font-sans"
      />
      <div className="flex items-center gap-1">
        <button 
          onClick={() => onSend("Explain polymorphism in detail.")}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
        >
          <Volume2 size={16} />
        </button>
        <button 
          onClick={() => onSend()}
          className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-750 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}

interface QuickActionsBarProps {
  onSelect: (topic: string) => void;
}

export function QuickActionsBar({ onSelect }: QuickActionsBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap mb-3.5">
      <button 
        onClick={() => onSelect("Summarize Java interfaces & abstract classes lesson.")} 
        className="py-1.5 px-3.5 text-[10px] font-semibold rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/5 dark:hover:bg-indigo-400/5 transition-all cursor-pointer"
      >
        Summarize Lesson
      </button>
      <button 
        onClick={() => onSelect("Explain recursion basics with coding example.")} 
        className="py-1.5 px-3.5 text-[10px] font-semibold rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:bg-indigo-500/5 dark:hover:bg-indigo-400/5 transition-all cursor-pointer"
      >
        Explain Topic
      </button>
    </div>
  );
}
