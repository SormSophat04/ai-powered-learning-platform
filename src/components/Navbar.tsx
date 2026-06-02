import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Search, Menu, X, GraduationCap, BookOpen, FileText,
  Award, TrendingUp, Brain, Users, ShieldAlert, Bell, Sun, Moon,
  LayoutDashboard, ChevronDown, LogOut, Settings, MoreHorizontal
} from 'lucide-react';
import { useStore } from '../store/useStore';

function isActivePath(location: ReturnType<typeof useLocation>, target: string) {
  if (target === '/dashboard') return location.pathname === '/dashboard';
  return location.pathname.includes(target);
}

const screenConfig: Record<string, { title: string; icon: React.ReactNode }> = {
  '/dashboard': { title: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  '/dashboard/courses': { title: 'Courses', icon: <BookOpen size={16} /> },
  '/dashboard/chat': { title: 'AI Tutor', icon: <Brain size={16} /> },
  '/dashboard/assignments': { title: 'Assignments', icon: <FileText size={16} /> },
  '/dashboard/quiz': { title: 'Quiz', icon: <Award size={16} /> },
  '/dashboard/analytics': { title: 'Analytics', icon: <TrendingUp size={16} /> },
  '/dashboard/learning-path': { title: 'Learning Path', icon: <TrendingUp size={16} /> },
  '/dashboard/teacher': { title: 'Instructor', icon: <Users size={16} /> },
  '/dashboard/admin': { title: 'Admin', icon: <ShieldAlert size={16} /> },
};

function getScreenConfig(path: string) {
  if (path === '/dashboard') return screenConfig['/dashboard'];
  for (const [key, config] of Object.entries(screenConfig)) {
    if (key !== '/dashboard' && path.includes(key)) return config;
  }
  return screenConfig['/dashboard'];
}

export default function Navbar() {
  const location = useLocation();
  const { role, theme, toggleTheme } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const { title, icon } = getScreenConfig(location.pathname);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const navLinkClass = (target: string) => {
    const active = isActivePath(location, target);
    return `flex flex-col items-center justify-center text-[10px] flex-1 transition-all relative ${
      active
        ? 'text-[#4F46E5]'
        : 'text-slate-400 dark:text-slate-500 hover:text-[#4F46E5] dark:hover:text-[#4F46E5]'
    }`;
  };

  const navLinkInnerClass = (target: string) => {
    const active = isActivePath(location, target);
    return `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all ${
      active
        ? 'bg-indigo-50/80 dark:bg-indigo-900/25'
        : ''
    }`;
  };

  const dropdownLinkClass = (target: string) => {
    const active = isActivePath(location, target);
    return `w-full text-left py-3 px-4 text-sm font-semibold transition-all flex items-center gap-3.5 rounded-xl ${
      active
        ? 'bg-gradient-to-r from-indigo-50 to-indigo-50/50 dark:from-indigo-900/30 dark:to-indigo-900/10 text-[#4F46E5] dark:text-indigo-400 shadow-sm'
        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;
  };

  return (
    <>
      <header className="relative z-40">
        <div className="h-[56px] md:h-[64px] px-3 md:px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/40 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-glass transition-all">
          {/* Left: Brand + Page Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-[28px] h-[28px] rounded-lg bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-white shadow-sm shadow-[#4F46E5]/20 flex-shrink-0">
              <GraduationCap size={14} />
            </div>
            <span className="hidden md:inline font-heading font-extrabold text-[14px] bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] bg-clip-text text-transparent flex-shrink-0">
              EduMind
            </span>
            <span className="hidden md:block h-4 w-px bg-slate-300 dark:bg-slate-700 flex-shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-indigo-400 dark:text-indigo-400 flex-shrink-0 hidden md:block">
                {icon}
              </span>
              <h2 className="text-[14px] font-bold text-slate-900 dark:text-slate-100 font-heading truncate">
                {title}
              </h2>
            </div>
          </div>

          {/* Right: Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <div className={`relative flex items-center transition-all duration-200 ${searchFocused ? 'ring-2 ring-[#4F46E5]/20' : ''}`}>
              <Search size={14} className="absolute left-3 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-[220px] h-[34px] pl-9 pr-10 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 outline-none focus:border-[#4F46E5] transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Search anything..."
              />
              <kbd className="absolute right-2.5 text-[9px] font-medium text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                ⌘K
              </kbd>
            </div>

            <button className="relative w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer">
              <Bell size={14} />
              <span className="absolute -top-0.5 -right-0.5 w-[15px] h-[15px] bg-rose-500 text-white text-[7px] font-bold rounded-full flex items-center justify-center border-[1.5px] border-white dark:border-[#0F172A]">
                3
              </span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <img
                  src={role === 'student'
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    : role === 'teacher'
                      ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"}
                  className="w-[24px] h-[24px] rounded-full object-cover"
                  alt="Avatar"
                />
                <ChevronDown size={12} className="text-slate-400" />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-[40px] w-[200px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-20 py-2 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {role === 'student' ? 'Sarah Jenkins' : role === 'teacher' ? 'Dr. Foster' : 'Super Admin'}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{role.toUpperCase()}</p>
                    </div>
                    <div className="p-1.5">
                      <Link to="/dashboard" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <Settings size={14} />
                        Settings
                      </Link>
                      <Link to="/" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all">
                        <LogOut size={14} />
                        Logout
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile: Right actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="relative w-[34px] h-[34px] flex items-center justify-center rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            >
              <Bell size={16} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-[34px] h-[34px] flex items-center justify-center rounded-xl text-slate-600 dark:text-slate-300 bg-slate-100/60 dark:bg-slate-800/40 hover:bg-slate-200 dark:hover:bg-slate-700/60 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Sheet Navigation */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-x-0 bottom-0 z-50 md:hidden animate-slide-up">
            <div className="bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-glass rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col">
              {/* Handle bar */}
              <div className="flex justify-center pt-3 pb-0">
                <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>

              {/* User profile */}
              <div className="px-6 pt-4 pb-3 flex items-center gap-3">
                <img
                  src={role === 'student'
                    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    : role === 'teacher'
                      ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                      : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"}
                  className="w-[38px] h-[38px] rounded-full object-cover border-2 border-[#4F46E5]/30"
                  alt="Avatar"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {role === 'student' ? 'Sarah Jenkins' : role === 'teacher' ? 'Dr. Foster' : 'Super Admin'}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{role.toUpperCase()}</p>
                </div>
              </div>

              {/* Search */}
              <div className="px-6 pb-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    className="w-full h-[38px] pl-9 pr-4 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 outline-none focus:border-[#4F46E5] transition-all placeholder:text-slate-400"
                    placeholder="Search pages..."
                  />
                </div>
              </div>

              {/* Section label */}
              <div className="px-6 pb-1">
                <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">Navigation</p>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {role === 'student' && (
                  <div className="flex flex-col gap-0.5">
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard')}><LayoutDashboard size={17} />Dashboard</Link>
                    <Link to="/dashboard/courses" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/courses')}><BookOpen size={17} />Courses</Link>
                    <Link to="/dashboard/chat" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/chat')}><Brain size={17} />AI Tutor</Link>
                    <Link to="/dashboard/assignments" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/assignments')}><FileText size={17} />Assignments</Link>
                    <Link to="/dashboard/quiz" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/quiz')}><Award size={17} />Quiz</Link>
                    <Link to="/dashboard/analytics" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/analytics')}><TrendingUp size={17} />Analytics</Link>
                    <Link to="/dashboard/learning-path" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/learning-path')}><TrendingUp size={17} />Learning Path</Link>
                  </div>
                )}
                {role === 'teacher' && (
                  <div className="flex flex-col gap-0.5">
                    <Link to="/dashboard/teacher" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/teacher')}><Users size={17} />Teacher Dashboard</Link>
                    <Link to="/dashboard/courses" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/courses')}><BookOpen size={17} />Curriculums</Link>
                    <Link to="/dashboard/chat" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/chat')}><Brain size={17} />AI Assistant</Link>
                  </div>
                )}
                {role === 'admin' && (
                  <div className="flex flex-col gap-0.5">
                    <Link to="/dashboard/admin" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/admin')}><ShieldAlert size={17} />Admin Panel</Link>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard')}><LayoutDashboard size={17} />Student View</Link>
                    <Link to="/dashboard/teacher" onClick={() => setMobileMenuOpen(false)} className={dropdownLinkClass('/dashboard/teacher')}><Users size={17} />Teacher View</Link>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <div className="px-4 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Mobile Bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-white/90 dark:bg-[#0F172A]/90 backdrop-blur-glass border-t border-slate-200 dark:border-slate-800/60 z-30 flex items-center justify-around px-1 pb-1">
        {role === 'student' && (
          <>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              <span className={navLinkInnerClass('/dashboard')}>
                <LayoutDashboard size={20} />
                <span className="mt-1">Home</span>
              </span>
              {isActivePath(location, '/dashboard') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/courses" className={navLinkClass('/dashboard/courses')}>
              <span className={navLinkInnerClass('/dashboard/courses')}>
                <GraduationCap size={20} />
                <span className="mt-1">Courses</span>
              </span>
              {isActivePath(location, '/dashboard/courses') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/chat" className={navLinkClass('/dashboard/chat')}>
              <span className={navLinkInnerClass('/dashboard/chat')}>
                <Brain size={20} />
                <span className="mt-1">AI Tutor</span>
              </span>
              {isActivePath(location, '/dashboard/chat') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/assignments" className={navLinkClass('/dashboard/assignments')}>
              <span className={navLinkInnerClass('/dashboard/assignments')}>
                <FileText size={20} />
                <span className="mt-1">Assign</span>
              </span>
              {isActivePath(location, '/dashboard/assignments') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/quiz" className={navLinkClass('/dashboard/quiz')}>
              <span className={navLinkInnerClass('/dashboard/quiz')}>
                <Award size={20} />
                <span className="mt-1">Quiz</span>
              </span>
              {isActivePath(location, '/dashboard/quiz') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <button onClick={() => setMobileMenuOpen(true)} className={`flex flex-col items-center justify-center text-[10px] flex-1 transition-all relative ${navLinkClass('more')}`}>
              <span className="flex flex-col items-center justify-center py-1.5 px-3 rounded-xl">
                <MoreHorizontal size={20} />
                <span className="mt-1">More</span>
              </span>
            </button>
          </>
        )}
        {role === 'teacher' && (
          <>
            <Link to="/dashboard/teacher" className={navLinkClass('/dashboard/teacher')}>
              <span className={navLinkInnerClass('/dashboard/teacher')}>
                <Users size={20} />
                <span className="mt-1">Monitor</span>
              </span>
              {isActivePath(location, '/dashboard/teacher') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/courses" className={navLinkClass('/dashboard/courses')}>
              <span className={navLinkInnerClass('/dashboard/courses')}>
                <BookOpen size={20} />
                <span className="mt-1">Courses</span>
              </span>
              {isActivePath(location, '/dashboard/courses') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/chat" className={navLinkClass('/dashboard/chat')}>
              <span className={navLinkInnerClass('/dashboard/chat')}>
                <Brain size={20} />
                <span className="mt-1">AI</span>
              </span>
              {isActivePath(location, '/dashboard/chat') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
          </>
        )}
        {role === 'admin' && (
          <>
            <Link to="/dashboard/admin" className={navLinkClass('/dashboard/admin')}>
              <span className={navLinkInnerClass('/dashboard/admin')}>
                <ShieldAlert size={20} />
                <span className="mt-1">Admin</span>
              </span>
              {isActivePath(location, '/dashboard/admin') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard" className={navLinkClass('/dashboard')}>
              <span className={navLinkInnerClass('/dashboard')}>
                <LayoutDashboard size={20} />
                <span className="mt-1">Student</span>
              </span>
              {isActivePath(location, '/dashboard') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
            <Link to="/dashboard/teacher" className={navLinkClass('/dashboard/teacher')}>
              <span className={navLinkInnerClass('/dashboard/teacher')}>
                <Users size={20} />
                <span className="mt-1">Teacher</span>
              </span>
              {isActivePath(location, '/dashboard/teacher') && <span className="absolute -top-0.5 w-[16px] h-[3px] bg-[#4F46E5] rounded-full" />}
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
