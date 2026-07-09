import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { setUser } from './store/authSlice';
import { useGetMe } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider, useToast } from './components/Toast';
import { setToastError } from './services/api';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

function ToastErrorWire() {
  const { toast } = useToast();
  const wired = useRef(false);
  useEffect(() => {
    if (!wired.current) {
      wired.current = true;
      setToastError((msg: string) => toast(msg, 'error'));
    }
  }, [toast]);
  return null;
}

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((s) => s.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
}

function AuthRestorer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMe();

  useEffect(() => {
    if (userData) {
      dispatch(setUser({
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role?.toLowerCase() as 'student' | 'teacher' | 'admin',
        userId: userData.id,
      }));
    } else {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          dispatch(setUser({
            name: user.name || '',
            email: user.email || '',
            role: user.role?.toLowerCase() as 'student' | 'teacher' | 'admin',
            userId: user.userId || user.id,
          }));
        } catch (e) { console.warn('Failed to parse stored user:', e); }
      }
    }
  }, [userData, dispatch]);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeApplier>
            <AuthRestorer>
              <ErrorBoundary>
                <ToastProvider>
                  <ToastErrorWire />
                  <AppRoutes />
                </ToastProvider>
              </ErrorBoundary>
            </AuthRestorer>
          </ThemeApplier>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
