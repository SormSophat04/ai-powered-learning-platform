import api from './api';

export interface ChatConversation {
  id: number;
  title: string;
  createdAt: string;
}

export interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  createdAt: string;
}

export const chatService = {
  getConversations: () =>
    api.get<{ success: boolean; message: string; data: ChatConversation[] }>('/api/chat/conversations').then(r => r.data),

  createConversation: (title: string) =>
    api.post<{ success: boolean; message: string; data: ChatConversation }>('/api/chat/conversations', { title }).then(r => r.data),

  getMessages: (conversationId: number) =>
    api.get<{ success: boolean; message: string; data: ChatMessage[] }>(`/api/chat/conversations/${conversationId}`).then(r => r.data),

  sendMessage: (conversationId: number, text: string) =>
    api.post<{ success: boolean; message: string; data: ChatMessage }>('/api/chat/send', { conversationId, text }).then(r => r.data),
};
