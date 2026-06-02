import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useStore } from '../store/useStore';
import { Sparkles, Sun, Moon } from 'lucide-react';

export default function DashboardLayout() {
  const { theme, toggleTheme, role, setRole } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleRoleChange = (newRole: 'student' | 'teacher' | 'admin') => {
    setRole(newRole);
    if (newRole === 'student') {
      navigate('/dashboard');
    } else if (newRole === 'teacher') {
      navigate('/dashboard/teacher');
    } else if (newRole === 'admin') {
      navigate('/dashboard/admin');
    }
  };

  const handleScreenChange = (screenPath: string) => {
    navigate(screenPath);
  };

  const getActiveKey = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'student_dashboard';
    if (path.includes('/dashboard/courses')) return 'course_learning';
    if (path.includes('/dashboard/chat')) return 'ai_tutor';
    if (path.includes('/dashboard/assignments')) return 'assignments';
    if (path.includes('/dashboard/quiz')) return 'quiz_gen';
    if (path.includes('/dashboard/analytics')) return 'analytics';
    if (path.includes('/dashboard/learning-path')) return 'learning_path';
    if (path.includes('/dashboard/teacher')) return 'teacher_dashboard';
    if (path.includes('/dashboard/admin')) return 'admin_dashboard';
    return 'student_dashboard';
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#090D1A] text-slate-800 dark:text-slate-200">
      {/* Demo Control Bar */}
      <div className="demo-control-bar text-[11px] py-1.5 px-2 sm:px-4 flex items-center justify-between gap-2 border-b border-slate-800 bg-[#0F172A] text-slate-200 z-50">
        <div className="demo-title font-bold text-cyan-400 flex items-center gap-1.5 font-heading whitespace-nowrap">
          <Sparkles size={14} className="animate-pulse" />
          <span className="hidden sm:inline">EDUMIND AI ROUTING CONTROLLER</span>
          <span className="sm:hidden">CONTROLLER</span>
        </div>
        <div className="demo-actions flex items-center gap-1.5 sm:gap-3 overflow-x-auto">
          <div className="flex items-center gap-1">
            <span className="text-slate-400 hidden sm:inline">Role:</span>
            <button 
              onClick={() => handleRoleChange('student')} 
              className={`px-1.5 sm:px-2.5 py-0.5 rounded-md font-semibold text-[9px] sm:text-[10px] transition-all cursor-pointer whitespace-nowrap ${role === 'student' ? 'bg-[#4F46E5] text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Student
            </button>
            <button 
              onClick={() => handleRoleChange('teacher')} 
              className={`px-1.5 sm:px-2.5 py-0.5 rounded-md font-semibold text-[9px] sm:text-[10px] transition-all cursor-pointer whitespace-nowrap ${role === 'teacher' ? 'bg-[#06B6D4] text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Teacher
            </button>
            <button 
              onClick={() => handleRoleChange('admin')} 
              className={`px-1.5 sm:px-2.5 py-0.5 rounded-md font-semibold text-[9px] sm:text-[10px] transition-all cursor-pointer whitespace-nowrap ${role === 'admin' ? 'bg-[#10B981] text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Admin
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-slate-400">Jump:</span>
            <select 
              className="bg-slate-800 border border-slate-700 text-slate-100 py-0.5 px-1.5 rounded-md text-[9px] outline-none cursor-pointer focus:border-cyan-500"
              value={getActiveKey()} 
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'student_dashboard') handleScreenChange('/dashboard');
                else if (val === 'course_learning') handleScreenChange('/dashboard/courses');
                else if (val === 'ai_tutor') handleScreenChange('/dashboard/chat');
                else if (val === 'assignments') handleScreenChange('/dashboard/assignments');
                else if (val === 'quiz_gen') handleScreenChange('/dashboard/quiz');
                else if (val === 'analytics') handleScreenChange('/dashboard/analytics');
                else if (val === 'learning_path') handleScreenChange('/dashboard/learning-path');
                else if (val === 'teacher_dashboard') handleScreenChange('/dashboard/teacher');
                else if (val === 'admin_dashboard') handleScreenChange('/dashboard/admin');
              }}
            >
              <option value="student_dashboard">Screen 3 — Student Dashboard</option>
              <option value="course_learning">Screen 4 — Course Learning Page</option>
              <option value="ai_tutor">Screen 5 — AI Tutor Chat</option>
              <option value="quiz_gen">Screen 6 — Quiz Generator</option>
              <option value="assignments">Screen 7 — Assignment Management</option>
              <option value="analytics">Screen 8 — Learning Analytics</option>
              <option value="learning_path">Screen 9 — AI Learning Path</option>
              <option value="teacher_dashboard">Screen 10 — Teacher Dashboard</option>
              <option value="admin_dashboard">Screen 11 — Admin Dashboard</option>
            </select>
          </div>

          <button onClick={toggleTheme} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-1.5 sm:px-2 py-0.5 rounded-md text-[9px] sm:text-[10px] text-slate-200 transition-all cursor-pointer whitespace-nowrap">
            {theme === 'dark' ? <Sun size={10} /> : <Moon size={10} />}
            <span className="hidden sm:inline">Theme</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 relative">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
