import React, { useEffect, useState } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setActiveChatId, setAiTyping, setConversations, addConversation, setMessages, addMessage, setConversationsLoading, setMessagesLoading } from '../store/chatSlice';
import { ChatMessageBubble, ChatInputConsole } from '../components/AIChat';
import { chatService } from '../services';
import type { ChatMessage } from '../types';
import Skeleton from '../components/Skeleton';

export default function AIChat() {
  const dispatch = useAppDispatch();
  const { activeChatId, aiTyping, conversations, messages, conversationsLoading, messagesLoading } = useAppSelector((s) => s.chat);
  const [chatInput, setChatInput] = useState('');
  const isNewSessionRef = React.useRef(false);

  useEffect(() => {
    dispatch(setConversationsLoading(true));
    chatService.getConversations()
      .then(data => { dispatch(setConversations(data)); dispatch(setConversationsLoading(false)); })
      .catch(() => dispatch(setConversationsLoading(false)));
  }, []);

  useEffect(() => {
    if (!activeChatId) return;
    if (isNewSessionRef.current) {
      isNewSessionRef.current = false;
      return;
    }
    dispatch(setMessagesLoading(true));
    chatService.getMessages(activeChatId)
      .then(data => { dispatch(setMessages(data)); dispatch(setMessagesLoading(false)); })
      .catch(() => dispatch(setMessagesLoading(false)));
  }, [activeChatId]);

  useEffect(() => {
    if (conversations.length > 0 && !activeChatId) {
      dispatch(setActiveChatId(conversations[0].id));
    }
  }, [conversations]);

  const handleSendChatMessage = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const tempId = Date.now();
    dispatch(addMessage({ id: tempId, sender: 'user', text, createdAt: new Date().toISOString() }));
    if (!textToSend) setChatInput('');
    dispatch(setAiTyping(true));

    try {
      let convId = activeChatId;
      if (!convId) {
        isNewSessionRef.current = true;
        const conv = await chatService.createConversation(text.slice(0, 50));
        convId = conv.id;
        dispatch(addConversation(conv));
        dispatch(setActiveChatId(convId));
      }
      await chatService.sendMessage(convId, text);
      const updated = await chatService.getMessages(convId);
      dispatch(setMessages(updated));
    } catch {
      dispatch(addMessage({ id: Date.now() + 1, sender: 'ai', text: 'I encountered an issue processing your request. Please try again.', createdAt: new Date().toISOString() }));
    } finally {
      dispatch(setAiTyping(false));
    }
  };

  if (conversationsLoading && conversations.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 min-h-[300px] md:h-[calc(100vh-180px)] max-w-7xl mx-auto font-sans">
        <div className="hidden md:flex flex-col gap-4 border-r border-slate-200/80 dark:border-slate-800/40 pr-4 text-left">
          <Skeleton height={40} borderRadius="8px" />
          <div className="mt-4 space-y-3">
            <Skeleton height={11} width={80} />
            <div className="flex flex-col gap-1.5">
              {[1, 2, 3, 4, 5].map(i => (
                <Skeleton key={i} height={36} borderRadius="8px" />
              ))}
            </div>
          </div>
        </div>
        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 flex flex-col h-full bg-white/40 dark:bg-[#0F172A]/40 min-w-0">
          <div className="flex-1 space-y-4 p-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex gap-3 max-w-[80%] ${i % 2 === 0 ? 'self-end flex-row-reverse' : 'self-start'}`}>
                <Skeleton width={32} height={32} borderRadius="999px" />
                <div className="space-y-2">
                  <Skeleton height={32} width={i % 2 === 0 ? 160 : 200} borderRadius="16px" />
                  <Skeleton height={16} width={i % 2 === 0 ? 200 : 240} borderRadius="16px" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton height={40} borderRadius="12px" className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 min-h-[300px] md:h-[calc(100vh-180px)] max-w-7xl mx-auto font-sans">

      {/* Sidebar - Chat History */}
      <div className="hidden md:flex flex-col gap-4 border-r border-slate-200/80 dark:border-slate-800/40 pr-4 text-left">
        <button
          onClick={() => { dispatch(setActiveChatId(0)); dispatch(setMessages([])); }}
          className="w-full h-[40px] text-xs font-bold bg-[#7C3AED] hover:bg-violet-950 text-white rounded-lg flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
        >
          <Plus size={14} /> New Session
        </button>

        <div className="mt-4">
          <h4 className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
            Recent chats
          </h4>
          <div className="flex flex-col gap-1.5">
            {conversations.length > 0 ? (
              conversations.map(convo => (
                <div
                  key={convo.id}
                  onClick={() => dispatch(setActiveChatId(convo.id))}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-left truncate cursor-pointer transition-all ${
                    activeChatId === convo.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-l-2 border-[#7C3AED]'
                      : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-950 dark:hover:text-slate-200'
                  }`}
                >
                  {convo.title}
                </div>
              ))
            ) : (
              !conversationsLoading && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-left px-3 py-4">
                  No conversations yet. Start a new chat!
                </p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Console */}
      <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40 flex flex-col h-full bg-white/40 dark:bg-[#0F172A]/40 min-w-0">

        {/* Mobile: New Session button */}
        <div className="md:hidden flex mb-3">
          <button
            onClick={() => { dispatch(setActiveChatId(0)); dispatch(setMessages([])); }}
            className="text-xs font-bold bg-[#7C3AED] hover:bg-violet-950 text-white rounded-lg px-4 py-2 flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer"
          >
            <Plus size={14} /> New Session
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 flex flex-col">
          {messages.length > 0 ? (
            messages.map(msg => (
              <ChatMessageBubble key={msg.id} msg={{ ...msg, sender: msg.sender.toLowerCase() === 'ai' ? 'ai' : 'student' }} />
            ))
          ) : messagesLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-spin w-6 h-6 border-2 border-[#7C3AED] border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
              <p>Send a message to start chatting with the AI tutor.</p>
            </div>
          )}

          {aiTyping && (
            <div className="flex gap-3 max-w-[80%] self-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#D97706] text-white flex items-center justify-center flex-shrink-0 text-xs">
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
