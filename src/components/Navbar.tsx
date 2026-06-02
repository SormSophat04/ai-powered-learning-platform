import React, { useState } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { Search, Activity, Menu, X, GraduationCap, Cpu, BookOpen, FileText, Award, TrendingUp, Brain, Users, ShieldAlert, MoreHorizontal } from 'lucide-react';
import { useStore } from '../store/useStore';

function isActivePath(location: ReturnType<typeof useLocation>, target: string) {
  if (target === '/dashboard') return location.pathname === '/dashboard';
  return location.pathname.includes(target);
}

export default function Navbar() {
  const location = useLocation();
  const { role } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getScreenTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('/dashboard/courses')) return 'Courses';
    if (path.includes('/dashboard/chat')) return 'AI Tutor';
    if (path.includes('/dashboard/assignments')) return 'Assignments';
    if (path.includes('/dashboard/quiz')) return 'Quiz';
    if (path.includes('/dashboard/analytics')) return 'Analytics';
    if (path.includes('/dashboard/learning-path')) return 'Learning Path';
    if (path.includes('/dashboard/teacher')) return 'Instructor';
    if (path.includes('/dashboard/admin')) return 'Admin';
    return 'Dashboard';
  };

  const navLinkClass = (target: string) => {
    const active = isActivePath(location, target);
    return `flex flex-col items-center justify-center text-[10px] flex-1 transition-colors ${
      active 
        ? 'text-[#4F46E5]' 
        : 'text-slate-500 dark:text-slate-400 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]'
    }`;
  };

  const dropdownLinkClass = (target: string) => {
    const active = isActivePath(location, target);
    return `w-full text-left py-2 px-3 rounded-md text-xs font-semibold transition-colors ${
      active 
        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-[#4F46E5] dark:text-indigo-400' 
        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
    }`;
  };

  return (
    <>
      <header className="h-[70px] px-4 md:px-8 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/40 bg-white/70 dark:bg-[#0F172A]/75 backdrop-blur-glass sticky top-0 z-40 transition-all">
        <div className="flex items-center gap-2 min-w-0 max-w-[60%]">
          <h2 className="text-[14px] md:text-[16px] font-extrabold tracking-wider text-slate-900 dark:text-slate-100 font-heading truncate">
            {getScreenTitle()}
          </h2>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          {/* Search bar */}
          <div className="relative flex items-center">
            <Search size={15} className="absolute left-3.5 text-slate-400 dark:text-slate-500" />
            <input 
              type="text" 
              className="w-[240px] h-[36px] pl-10 pr-4 text-xs rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 outline-none focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/15 transition-all" 
              placeholder="Search lessons, databases, AI codes..." 
            />
          </div>
          {/* Notifications */}
          <button className="w-[36px] h-[36px] flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-850 bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
            <Activity size={15} />
          </button>
        </div>

        {/* Mobile Header elements */}
        <div className="flex md:hidden items-center gap-2">
          <button className="p-2 rounded-md text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
            <Search size={17} />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-[70px] left-0 right-0 p-5 bg-white/95 dark:bg-[#0F172A]/95 border-b border-slate-200 dark:border-slate-800 shadow-xl flex flex-col gap-2.5 z-50 md:hidden animate-fade-in">
            {role === 'student' && (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard')}>Dashboard</Link>
                <Link to="/dashboard/courses" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/courses')}>Courses</Link>
                <Link to="/dashboard/chat" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/chat')}>AI Tutor</Link>
                <Link to="/dashboard/assignments" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/assignments')}>Assignments</Link>
                <Link to="/dashboard/quiz" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/quiz')}>Quiz</Link>
                <Link to="/dashboard/analytics" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/analytics')}>Analytics</Link>
                <Link to="/dashboard/learning-path" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/learning-path')}>Learning Path</Link>
              </>
            )}
            {role === 'teacher' && (
              <>
                <Link to="/dashboard/teacher" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/teacher')}>Teacher Dashboard</Link>
                <Link to="/dashboard/courses" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/courses')}>Curriculums</Link>
                <Link to="/dashboard/chat" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/chat')}>AI Assistant</Link>
              </>
            )}
            {role === 'admin' && (
              <>
                <Link to="/dashboard/admin" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/admin')}>Admin Panel</Link>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard')}>Student View</Link>
                <Link to="/dashboard/teacher" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/teacher')}>Teacher View</Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* Mobile Bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[65px] bg-white/80 dark:bg-[#0F172A]/85 backdrop-blur-glass border-t border-slate-200 dark:border-slate-800/60 z-40 flex items-center justify-around px-1">
        {role === 'student' && (
          <>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              <Activity size={18} />
              <span className="mt-1">Home</span>
            </Link>
            <Link to="/dashboard/courses" className={navLinkClass('/dashboard/courses')}>
              <GraduationCap size={18} />
              <span className="mt-1">Courses</span>
            </Link>
            <Link to="/dashboard/chat" className={navLinkClass('/dashboard/chat')}>
              <Cpu size={18} />
              <span className="mt-1">AI Tutor</span>
            </Link>
            <Link to="/dashboard/assignments" className={navLinkClass('/dashboard/assignments')}>
              <FileText size={18} />
              <span className="mt-1">Assign</span>
            </Link>
            <Link to="/dashboard/quiz" className={navLinkClass('/dashboard/quiz')}>
              <Award size={18} />
              <span className="mt-1">Quiz</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center justify-center text-[10px] text-slate-500 dark:text-slate-400 flex-1 transition-colors">
              <MoreHorizontal size={18} />
              <span className="mt-1">More</span>
            </button>
          </>
        )}
        {role === 'teacher' && (
          <>
            <Link to="/dashboard/teacher" className={navLinkClass('/dashboard/teacher')}>
              <Users size={18} />
              <span className="mt-1">Monitor</span>
            </Link>
            <Link to="/dashboard/courses" className={navLinkClass('/dashboard/courses')}>
              <BookOpen size={18} />
              <span className="mt-1">Courses</span>
            </Link>
            <Link to="/dashboard/chat" className={navLinkClass('/dashboard/chat')}>
              <Cpu size={18} />
              <span className="mt-1">AI</span>
            </Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link to="/dashboard/admin" className={navLinkClass('/dashboard/admin')}>
              <ShieldAlert size={18} />
              <span className="mt-1">Admin</span>
            </Link>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              <Activity size={18} />
              <span className="mt-1">Student</span>
            </Link>
            <Link to="/dashboard/teacher" className={navLinkClass('/dashboard/teacher')}>
              <Users size={18} />
              <span className="mt-1">Teacher</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
