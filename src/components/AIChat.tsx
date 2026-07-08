import React from 'react';
import { User, Cpu, Send } from 'lucide-react';
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
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isStudent ? 'bg-indigo-600' : 'bg-gradient-to-br from-[#7C3AED] to-[#D97706]'}`}>
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
      <input 
        type="text" 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSend()}
        placeholder="Ask a question (e.g. 'Explain polymorphism' or 'recursion')..." 
        className="flex-grow bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 text-xs px-3 py-2 font-sans"
      />
      <button 
        onClick={() => onSend()}
        className="w-9 h-9 rounded-full bg-indigo-600 hover:bg-violet-950 text-white flex items-center justify-center shadow-md transition-all cursor-pointer"
      >
        <Send size={14} />
      </button>
    </div>
  );
}

// Quick actions removed — all interaction goes through the text input.
