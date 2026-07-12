import React, { useState } from 'react';
import { User, Cpu, Send, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { ChatMessage } from '../types';

interface ChatMessageBubbleProps {
  msg: ChatMessage;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="my-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-100/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800/80">
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 lowercase select-none">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer select-none"
        >
          {copied ? (
            <>
              <Check size={11} className="text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-3.5 text-[11.5px] font-mono text-teal-400 dark:text-teal-400 overflow-x-auto leading-relaxed select-text">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function ChatMessageBubble({ msg }: ChatMessageBubbleProps) {
  const isStudent = msg.sender === 'student';

  return (
    <div className={`flex gap-3 max-w-[85%] animate-fade-in ${isStudent ? 'self-end flex-row-reverse' : 'self-start'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${isStudent ? 'bg-indigo-600' : 'bg-gradient-to-br from-[#7C3AED] to-[#D97706]'}`}>
        {isStudent ? <User size={14} /> : <Cpu size={14} />}
      </div>
      <div className={`p-3.5 rounded-2xl text-left leading-relaxed ${isStudent ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-850/60 text-slate-800 dark:text-slate-100 rounded-tl-none shadow-sm'}`}>
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
                    isStudent
                      ? "bg-white/15 text-white px-1.5 py-0.5 rounded font-mono text-[11.5px]"
                      : "bg-slate-100 dark:bg-slate-900 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-mono text-[11.5px] border border-slate-200/60 dark:border-slate-800/50"
                  }
                  {...rest}
                >
                  {children}
                </code>
              );
            },
            p: ({ children }) => (
              <p className={`text-[13px] leading-relaxed mb-2.5 last:mb-0 ${isStudent ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                {children}
              </p>
            ),
            h1: ({ children }) => (
              <h1 className={`text-[15px] font-bold mt-3 mb-2 font-display ${isStudent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className={`text-[14px] font-bold mt-2.5 mb-1.5 font-display ${isStudent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className={`text-[13px] font-bold mt-2 mb-1.5 font-display ${isStudent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {children}
              </h3>
            ),
            ul: ({ children }) => (
              <ul className={`list-disc pl-5 mb-2.5 space-y-1 text-[13px] ${isStudent ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className={`list-decimal pl-5 mb-2.5 space-y-1 text-[13px] ${isStudent ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
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
                className={`underline font-medium hover:opacity-85 transition-opacity ${isStudent ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className={`border-l-3 pl-3 italic my-2 ${isStudent ? 'border-white/40 text-white/90' : 'border-indigo-500/40 text-slate-500 dark:text-slate-400'}`}>
                {children}
              </blockquote>
            ),
            strong: ({ children }) => (
              <strong className={`font-bold ${isStudent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {children}
              </strong>
            )
          }}
        >
          {msg.text}
        </ReactMarkdown>
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
