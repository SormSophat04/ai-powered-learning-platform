import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Sun, Moon } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleTheme } from '../store/themeSlice';
import { setRole, setUser } from '../store/authSlice';
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
        });
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        const userRole = res.role.toLowerCase() as 'student' | 'teacher' | 'admin';
        dispatch(setUser({ name: res.name, email: res.email, role: userRole, userId: res.userId }));
        navigateBasedOnRole(userRole);
      } else {
        const res = await authService.login({ email, password });
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res));
        const userRole = res.role.toLowerCase() as 'student' | 'teacher' | 'admin';
        dispatch(setUser({ name: res.name, email: res.email, role: userRole, userId: res.userId }));
        navigateBasedOnRole(userRole);
      }
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr.response?.data?.message || 'Something went wrong');
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
          <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#D97706] flex items-center justify-center text-white font-bold">
            <GraduationCap size={18} />
          </div>
          <span className="font-heading font-extrabold text-[22px] bg-gradient-to-r from-[#7C3AED] to-[#D97706] bg-clip-text text-transparent">
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
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'login' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
          >
            Login
          </button>
          <button 
            type="button" 
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${activeTab === 'register' ? 'bg-[#7C3AED] text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
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
                  className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${role === 'student' ? 'bg-gradient-to-r from-indigo-500/10 to-[#7C3AED]/15 border-[#7C3AED] text-[#7C3AED] dark:text-indigo-400 font-extrabold' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  Student
                </button>
                <button 
                  type="button" 
                  onClick={() => dispatch(setRole('teacher'))}
                  className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${role === 'teacher' ? 'bg-gradient-to-r from-cyan-500/10 to-[#D97706]/15 border-[#D97706] text-[#D97706] dark:text-cyan-400 font-extrabold' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
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
              <input type="checkbox" defaultChecked className="accent-[#7C3AED]" /> Remember me
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#7C3AED] hover:underline">Forgot Password?</a>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-[#7C3AED] hover:bg-violet-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-500/15 cursor-pointer transition-all mt-6">
            {loading ? 'Please wait...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center pt-1">
            <p className="text-[10px] text-slate-400 dark:text-slate-500">
              Secure login powered by JWT authentication
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
