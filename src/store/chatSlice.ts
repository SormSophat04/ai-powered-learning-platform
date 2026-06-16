import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatMessage } from '../types';

interface ChatState {
  chatHistory: ChatMessage[];
  chatConversations: { id: number; title: string }[];
  activeChatId: number;
  aiTyping: boolean;
}

const initialState: ChatState = {
  chatHistory: [],
  chatConversations: [],
  activeChatId: 0,
  aiTyping: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChatId(state, action: PayloadAction<number>) {
      state.activeChatId = action.payload;
    },
    setAiTyping(state, action: PayloadAction<boolean>) {
      state.aiTyping = action.payload;
    },
    addChatMessage(state, action: PayloadAction<ChatMessage>) {
      state.chatHistory.push(action.payload);
    },
    setChatHistory(state, action: PayloadAction<ChatMessage[]>) {
      state.chatHistory = action.payload;
    },
    setChatConversations(state, action: PayloadAction<{ id: number; title: string }[]>) {
      state.chatConversations = action.payload;
    },
  },
});

export const { setActiveChatId, setAiTyping, addChatMessage, setChatHistory, setChatConversations } = chatSlice.actions;
export default chatSlice.reducer;
