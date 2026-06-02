import React, { useState } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ChatMessageBubble, ChatInputConsole, QuickActionsBar } from '../components/AIChat';

export default function AIChat() {
  const { 
    chatHistory, addChatMessage, chatConversations, activeChatId, 
    setActiveChatId, aiTyping, setAiTyping, selectedCourse 
  } = useStore();
  const [chatInput, setChatInput] = useState('');

  const handleSendChatMessage = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    // User Message
    addChatMessage({ id: Date.now(), sender: 'student', text });
    if (!textToSend) setChatInput('');

    // AI Typings
    setAiTyping(true);

    setTimeout(() => {
      let replyText = '';
      const query = text.toLowerCase();
      
      if (query.includes('polymorphism')) {
        replyText = "Polymorphism allows objects of different subclasses to be treated as instances of a common parent class. In Java, this is commonly implemented via method overriding. For example:\n\n```java\nAnimal myDog = new Dog();\nmyDog.makeSound(); // Dog overrides makeSound()\n```\nWould you like me to generate a practice quiz on this?";
      } else if (query.includes('summarize')) {
        replyText = "Here is the summary of Java Interfaces vs Abstract Classes:\n\n1. **Interface**: Defines a behaviors contract. Methods are implicitly abstract/public (pre-Java 8). Cannot hold state variables.\n2. **Abstract Class**: Base class that cannot be instantiated. Can contain both abstract and concrete methods. Can hold state variables.";
      } else if (query.includes('recursion')) {
        replyText = "Recursion is a technique where a method calls itself. A recursive method requires:\n1. **Base Case**: Halting condition to prevent StackOverflowError.\n2. **Recursive Step**: Method calls itself with smaller/reduced parameters.";
      } else {
        replyText = `I have analyzed your query regarding: "${text}". Focus on code efficiency and object models inside your active course, "${selectedCourse.title}". Ask me to explain abstract constructs if needed!`;
      }

      addChatMessage({ id: Date.now() + 1, sender: 'ai', text: replyText });
      setAiTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 min-h-[300px] md:h-[calc(100vh-180px)] max-w-7xl mx-auto font-sans">
      
      {/* Sidebar - Chat History */}
      <div className="hidden md:flex flex-col gap-4 border-r border-slate-200/80 dark:border-slate-800/40 pr-4 text-left">
        <button 
          onClick={() => handleSendChatMessage("Initialize a new study session.")}
          className="w-full h-[40px] text-xs font-bold bg-[#4F46E5] hover:bg-indigo-750 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
        >
          <Plus size={14} /> New Session
        </button>

        <div className="mt-4">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            Recent chats
          </h4>
          <div className="flex flex-col gap-1.5">
            {chatConversations.map(convo => (
              <div 
                key={convo.id} 
                onClick={() => { setActiveChatId(convo.id); handleSendChatMessage(`Explain ${convo.title}`); }}
                className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-left truncate cursor-pointer transition-all ${
                  activeChatId === convo.id 
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-l-2 border-[#4F46E5]' 
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-950 dark:hover:text-slate-200'
                }`}
              >
                {convo.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Console */}
      <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 flex flex-col h-full bg-white/40 dark:bg-[#0F172A]/40 min-w-0">
        
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 flex flex-col">
          {chatHistory.map(msg => (
            <ChatMessageBubble key={msg.id} msg={msg} />
          ))}

          {aiTyping && (
            <div className="flex gap-3 max-w-[80%] self-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] text-white flex items-center justify-center flex-shrink-0 text-xs">
                <Cpu size={14} />
              </div>
              <div className="bg-white dark:bg-slate-800/80 p-2 px-3 rounded-2xl rounded-tl-none border border-slate-200/60 dark:border-slate-800/60">
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick action bar */}
        <QuickActionsBar onSelect={handleSendChatMessage} />

        {/* Input area */}
        <ChatInputConsole 
          value={chatInput} 
          onChange={setChatInput} 
          onSend={handleSendChatMessage} 
        />
      </div>

    </div>
  );
}
