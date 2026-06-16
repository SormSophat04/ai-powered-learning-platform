import api from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

export interface AuthResponse {
  token: string;
  userId: number;
  name: string;
  email: string;
  role: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export const authService = {
  login: (data: LoginRequest) =>
    api.post<{ success: boolean; message: string; data: AuthResponse }>('/api/auth/login', data).then(r => r.data),

  register: (data: RegisterRequest) =>
    api.post<{ success: boolean; message: string; data: AuthResponse }>('/api/auth/register', data).then(r => r.data),

  getMe: () =>
    api.get<{ success: boolean; message: string; data: UserResponse }>('/api/users/me').then(r => r.data),
};
