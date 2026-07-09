import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatService } from '../services';

export function useConversations() {
  return useQuery({
    queryKey: ['chat', 'conversations'],
    queryFn: () => chatService.getConversations(),
    staleTime: 60000,
  });
}

export function useConversationMessages(conversationId: number | undefined) {
  return useQuery({
    queryKey: ['chat', 'messages', conversationId],
    queryFn: () => chatService.getMessages(conversationId!),
    enabled: !!conversationId,
    staleTime: 30000,
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => chatService.createConversation(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
    },
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, text }: { conversationId: number; text: string }) => chatService.sendMessage(conversationId, text),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', variables.conversationId] });
    },
  });
}
