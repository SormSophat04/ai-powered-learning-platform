import React, { useState, useEffect } from 'react';
import { Plus, Cpu } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { addChatMessage, setChatHistory, setChatConversations, setActiveChatId, setAiTyping } from '../store/chatSlice';
import { ChatMessageBubble, ChatInputConsole, QuickActionsBar } from '../components/AIChat';
import { chatService } from '../services';

export default function AIChat() {
  const chatHistory = useAppSelector((s) => s.chat.chatHistory);
  const chatConversations = useAppSelector((s) => s.chat.chatConversations);
  const activeChatId = useAppSelector((s) => s.chat.activeChatId);
  const aiTyping = useAppSelector((s) => s.chat.aiTyping);
  const dispatch = useAppDispatch();
  const [chatInput, setChatInput] = useState('');
  const [loadingConvos, setLoadingConvos] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const convosRes = await chatService.getConversations();
        const convos = (convosRes.data || []).map(c => ({ id: c.id, title: c.title }));
        dispatch(setChatConversations(convos));
        if (convos.length > 0) {
          dispatch(setActiveChatId(convos[0].id));
          const msgsRes = await chatService.getMessages(convos[0].id);
          dispatch(setChatHistory((msgsRes.data || []).map(m => ({
            id: m.id,
            sender: m.sender.toLowerCase() === 'ai' ? 'ai' : 'student',
            text: m.text,
          }))));
        }
      } catch (err) {
        console.error('Failed to load conversations:', err);
      } finally {
        setLoadingConvos(false);
      }
    })();
  }, []);

  const handleSendChatMessage = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    dispatch(addChatMessage({ id: Date.now(), sender: 'student', text }));
    if (!textToSend) setChatInput('');
    dispatch(setAiTyping(true));

    try {
      let convId = activeChatId;
      if (!convId) {
        const conv = await chatService.createConversation(text.slice(0, 50));
        convId = conv.data.id;
        dispatch(setActiveChatId(convId));
        dispatch(setChatConversations([...chatConversations, { id: convId, title: conv.data.title }]));
      }
      const res = await chatService.sendMessage(convId, text);
      dispatch(addChatMessage({ id: res.data.id, sender: res.data.sender.toLowerCase() === 'ai' ? 'ai' : 'student', text: res.data.text }));
    } catch {
      dispatch(addChatMessage({ id: Date.now() + 1, sender: 'ai', text: 'I encountered an issue processing your request. Please try again.' }));
    } finally {
      dispatch(setAiTyping(false));
    }
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
            {chatConversations && chatConversations.length > 0 ? (
              chatConversations.map(convo => (
                <div
                  key={convo.id}
                  onClick={async () => {
                    dispatch(setActiveChatId(convo.id));
                    dispatch(setAiTyping(true));
                    try {
                      const res = await chatService.getMessages(convo.id);
                      dispatch(setChatHistory((res.data || []).map(m => ({
                        id: m.id,
                        sender: m.sender.toLowerCase() === 'ai' ? 'ai' : 'student',
                        text: m.text,
                      }))));
                    } catch {}
                    dispatch(setAiTyping(false));
                  }}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold text-left truncate cursor-pointer transition-all ${
                    activeChatId === convo.id
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-bold border-l-2 border-[#4F46E5]'
                      : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-950 dark:hover:text-slate-200'
                  }`}
                >
                  {convo.title}
                </div>
              ))
            ) : (
              !loadingConvos && (
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

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 p-2 flex flex-col">
          {chatHistory && chatHistory.length > 0 ? (
            chatHistory.map(msg => (
              <ChatMessageBubble key={msg.id} msg={msg} />
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
              <p>Send a message to start chatting with the AI tutor.</p>
            </div>
          )}

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
