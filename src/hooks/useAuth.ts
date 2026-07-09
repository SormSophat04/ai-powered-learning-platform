import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../services';

export function useLogin() {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) => authService.login(data),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; password: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN' }) => authService.register(data),
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => authService.getMe(),
    enabled: !!localStorage.getItem('token'),
    staleTime: 300000,
    retry: false,
  });
}
