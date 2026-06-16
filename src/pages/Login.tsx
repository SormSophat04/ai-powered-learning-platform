import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Sun, Moon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';
import { setRole } from '../store/authSlice';
import { authService } from '../services';

interface LoginProps {
  defaultTab?: 'login' | 'register';
}

export default function Login({ defaultTab = 'login' }: LoginProps) {
  const navigate = useNavigate();
  const role = useAppSelector((s) => s.auth.role);
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'register') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const res = await authService.register({
          name,
          email,
          password,
          role: role.toUpperCase() as 'STUDENT' | 'TEACHER',
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(setRole(res.data.role.toLowerCase() as 'student' | 'teacher' | 'admin'));
      } else {
        const res = await authService.login({ email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        dispatch(setRole(res.data.role.toLowerCase() as 'student' | 'teacher' | 'admin'));
      }
      navigateBasedOnRole(role);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const navigateBasedOnRole = (r: string) => {
    if (r === 'teacher') navigate('/dashboard/teacher');
    else if (r === 'admin') navigate('/dashboard/admin');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D1A] text-slate-800 dark:text-slate-200 px-6 font-sans">
      <div className="glass-panel w-full max-w-[440px] p-8 border border-slate-200 dark:border-white/5 shadow-2xl">
        
        {/* Brand logo */}
        <div className="flex justify-center items-center gap-2 mb-6 relative">
          <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white font-bold">
            <GraduationCap size={18} />
          </div>
          <span className="font-heading font-extrabold text-[22px] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
            EduMind AI
          </span>
          <button onClick={() => dispatch(toggleTheme())} className="absolute right-0 h-[34px] w-[34px] rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-xl mb-6">
          <button 
            type="button" 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'login' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          >
            Login
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'register' ? 'bg-[#4F46E5] text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'register' && (
            <div className="form-group text-left">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="form-input text-xs" placeholder="Sarah Jenkins" />
            </div>
          )}

          {activeTab === 'register' && (
            <div className="form-group text-left">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1.5">Sign in as Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="button" 
                  onClick={() => dispatch(setRole('student'))}
                  className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${role === 'student' ? 'bg-gradient-to-r from-indigo-500/10 to-[#4F46E5]/15 border-[#4F46E5] text-[#4F46E5] dark:text-indigo-400 font-extrabold' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Student
                </button>
                <button 
                  type="button" 
                  onClick={() => dispatch(setRole('teacher'))}
                  className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${role === 'teacher' ? 'bg-gradient-to-r from-cyan-500/10 to-[#06B6D4]/15 border-[#06B6D4] text-[#06B6D4] dark:text-cyan-400 font-extrabold' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Teacher
                </button>
              </div>
            </div>
          )}

          <div className="form-group text-left">
            <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="form-input text-xs" placeholder="name@domain.edu" />
          </div>

          <div className="form-group text-left">
            <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-input text-xs" placeholder="••••••••" />
          </div>

          {activeTab === 'register' && (
            <div className="form-group text-left">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input text-xs" placeholder="••••••••" />
            </div>
          )}

          {error && (
            <div className="text-[11px] font-semibold text-red-500 bg-red-500/10 rounded-lg p-2.5 text-left">{error}</div>
          )}

          

          <div className="flex justify-between items-center text-[11px] font-semibold pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-500 select-none">
              <input type="checkbox" defaultChecked className="accent-[#4F46E5]" /> Remember me
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#4F46E5] hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-[#4F46E5] hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/15 cursor-pointer transition-all mt-6">
            {loading ? 'Please wait...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <button 
            type="button" 
            onClick={() => authService.login({ email: 'student@edumind.edu', password: 'password' }).then(r => {
              localStorage.setItem('token', r.data.token);
              localStorage.setItem('user', JSON.stringify(r.data));
              dispatch(setRole(r.data.role.toLowerCase() as 'student' | 'teacher' | 'admin'));
              navigate('/dashboard');
            }).catch(() => navigate('/dashboard'))}
            className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
