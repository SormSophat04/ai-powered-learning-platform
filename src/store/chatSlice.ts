import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatConversation, ChatMessage } from '../services';

interface ChatState {
  activeChatId: number;
  aiTyping: boolean;
  conversations: ChatConversation[];
  messages: ChatMessage[];
  conversationsLoading: boolean;
  messagesLoading: boolean;
}

const initialState: ChatState = {
  activeChatId: 0,
  aiTyping: false,
  conversations: [],
  messages: [],
  conversationsLoading: false,
  messagesLoading: false,
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
    setConversations(state, action: PayloadAction<ChatConversation[]>) {
      state.conversations = action.payload;
    },
    addConversation(state, action: PayloadAction<ChatConversation>) {
      state.conversations.unshift(action.payload);
    },
    setMessages(state, action: PayloadAction<ChatMessage[]>) {
      state.messages = action.payload;
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
    },
    setConversationsLoading(state, action: PayloadAction<boolean>) {
      state.conversationsLoading = action.payload;
    },
    setMessagesLoading(state, action: PayloadAction<boolean>) {
      state.messagesLoading = action.payload;
    },
  },
});

export const {
  setActiveChatId, setAiTyping, setConversations, addConversation,
  setMessages, addMessage, setConversationsLoading, setMessagesLoading,
} = chatSlice.actions;
export default chatSlice.reducer;
