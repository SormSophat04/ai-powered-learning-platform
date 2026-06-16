import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRoutes from './routes';
import { store } from './store';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { toggleTheme } from './store/themeSlice';
import { setRole } from './store/authSlice';
import './index.css';

const queryClient = new QueryClient();

function ThemeApplier({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(setRole(user.role?.toLowerCase() as 'student' | 'teacher' | 'admin'));
      } catch {}
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ThemeApplier>
            <AuthRestorer>
              <AppRoutes />
            </AuthRestorer>
          </ThemeApplier>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
