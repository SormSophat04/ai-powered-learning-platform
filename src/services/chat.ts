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
    api.get<ChatConversation[]>('/api/chat/conversations').then(r => r.data),

  createConversation: (title: string) =>
    api.post<ChatConversation>('/api/chat/conversations', { title }).then(r => r.data),

  getMessages: (conversationId: number) =>
    api.get<ChatMessage[]>(`/api/chat/conversations/${conversationId}`).then(r => r.data),

  sendMessage: (conversationId: number, message: string) =>
    api.post<ChatMessage>(`/api/chat/conversations/${conversationId}/messages`, { message }).then(r => r.data),
};
