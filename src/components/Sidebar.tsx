import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Award, Cpu, FileText, Settings, User, Users, LogOut, 
  Activity, TrendingUp, Brain, GraduationCap, ShieldAlert 
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setRole } from '../store/authSlice';

export default function Sidebar() {
  const role = useAppSelector((s) => s.auth.role);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getMenuClasses = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3.5 px-4 py-3 text-xs font-semibold rounded-lg transition-all border-l-2 cursor-pointer ${
      isActive 
        ? 'bg-slate-100 dark:bg-slate-800/80 border-[#4F46E5] text-[#4F46E5] dark:text-indigo-400 font-bold' 
        : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-900 dark:hover:text-slate-100'
    }`;
  };

  return (
    <aside className="w-[260px] flex-shrink-0 hidden md:flex flex-col border-r border-slate-200/80 dark:border-slate-800/40 bg-white/70 dark:bg-[#0F172A]/75 backdrop-blur-glass sticky top-0 h-screen z-45">
      {/* Header Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/40">
        <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white shadow-md shadow-[#4F46E5]/20">
          <GraduationCap size={18} />
        </div>
        <span className="font-heading font-extrabold text-[18px] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent">
          EduMind AI
        </span>
      </div>

      {/* Nav List */}
      <ul className="flex-1 p-4 flex flex-col gap-1.5 list-none overflow-y-auto">
        {role === 'student' && (
          <>
            <li>
              <NavLink to="/dashboard" end className={getMenuClasses}>
                <Activity size={16} />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/courses" className={getMenuClasses}>
                <BookOpen size={16} />
                <span>Courses</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/chat" className={getMenuClasses}>
                <Cpu size={16} />
                <span>AI Tutor</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/assignments" className={getMenuClasses}>
                <FileText size={16} />
                <span>Assignments</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/quiz" className={getMenuClasses}>
                <Award size={16} />
                <span>Quiz</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/analytics" className={getMenuClasses}>
                <TrendingUp size={16} />
                <span>Analytics</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/learning-path" className={getMenuClasses}>
                <Brain size={16} />
                <span>Learning Path</span>
              </NavLink>
            </li>
          </>
        )}

        {role === 'teacher' && (
          <>
            <li>
              <NavLink to="/dashboard/teacher" className={getMenuClasses}>
                <Users size={16} />
                <span>Teacher Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/courses" className={getMenuClasses}>
                <BookOpen size={16} />
                <span>Curriculums</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/chat" className={getMenuClasses}>
                <Cpu size={16} />
                <span>AI Assistant</span>
              </NavLink>
            </li>
          </>
        )}

        {role === 'admin' && (
          <>
            <li>
              <NavLink to="/dashboard/admin" className={getMenuClasses}>
                <ShieldAlert size={16} />
                <span>Admin Panel</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" end className={getMenuClasses}>
                <Activity size={16} />
                <span>Student View</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/teacher" className={getMenuClasses}>
                <Users size={16} />
                <span>Teacher View</span>
              </NavLink>
            </li>
          </>
        )}

        <li className="mt-auto">
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); dispatch(setRole('student')); navigate('/'); }} className="flex items-center gap-3.5 px-4 py-3 text-xs font-semibold rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 transition-all w-full cursor-pointer">
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </li>
      </ul>

      {/* Footer Profile Info */}
      <div className="p-4 border-t border-slate-200/80 dark:border-slate-800/40">
        <div className="flex items-center gap-3 p-1.5 rounded-lg bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/20">
          <img 
            src={role === 'student' ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"} 
            className="w-9 h-9 rounded-full object-cover border border-[#4F46E5]" 
            alt="Avatar" 
          />
          <div className="flex flex-col text-left">
            <span className="text-[12px] font-bold text-slate-800 dark:text-slate-100">
              {role === 'student' ? 'Sarah Jenkins' : role === 'teacher' ? 'Dr. Foster' : 'Super Admin'}
            </span>
            <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
              {role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
