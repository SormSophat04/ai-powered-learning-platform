import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Award, Activity, AlertCircle, ChevronRight, RefreshCw } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedCourse } from '../store/coursesSlice';
import { StatCard, ActivityCard } from '../components/Cards';
import { PerformanceChart, StudyHoursBar } from '../components/Charts';
import { useDashboardStats, useRecentActivity, useCourses, usePerformance, useStudyHours } from '../hooks';
import type { CourseSummary } from '../services';
import Skeleton, { SkeletonStatCard, SkeletonChart, SkeletonCourseCard, SkeletonActivityItem } from '../components/Skeleton';

export default function Dashboard() {
  const navigate = useNavigate();
  const role = useAppSelector((s) => s.auth.role);
  const dispatch = useAppDispatch();
  const { data: stats, isLoading: statsLoading, isError: statsError, refetch: refetchStats } = useDashboardStats();
  const { data: activityData, isLoading: activityLoading, isError: activityError, refetch: refetchActivity } = useRecentActivity();
  const { data: coursesData, isLoading: coursesLoading, isError: coursesError, refetch: refetchCourses } = useCourses();
  const { data: performanceData, isLoading: performanceLoading, isError: performanceError, refetch: refetchPerformance } = usePerformance();
  const { data: studyHoursData, isLoading: studyHoursLoading, isError: studyHoursError, refetch: refetchStudyHours } = useStudyHours();

  const loading = statsLoading || activityLoading || coursesLoading || performanceLoading || studyHoursLoading;
  const hasError = statsError || activityError || coursesError || performanceError || studyHoursError;

  if (hasError && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 max-w-7xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Failed to load dashboard</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          Could not fetch your data. Check your connection and try again.
        </p>
        <button
          onClick={() => { refetchStats(); refetchActivity(); refetchCourses(); refetchPerformance(); refetchStudyHours(); }}
          className="flex items-center gap-2 py-2 px-4 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
            <Skeleton height={14} width={140} />
            <div className="space-y-3">
              {[1, 2, 3].map(i => <SkeletonCourseCard key={i} />)}
            </div>
          </div>
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
            <Skeleton height={14} width={160} />
            <div className="space-y-4">
              {[1, 2, 3].map(i => <SkeletonActivityItem key={i} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (role !== 'student') {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
          <Activity size={24} className="text-[#7C3AED]" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {role === 'teacher' ? 'Teacher View' : 'Admin View'}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          The student dashboard is only available for students. Use the navigation to access your {role === 'teacher' ? 'teacher' : 'admin'} dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Courses Enrolled" 
          value={stats?.coursesEnrolled ?? 0} 
          icon={<BookOpen size={20} />} 
        />
        <StatCard 
          title="Assignments Completed" 
          value={stats?.assignmentsCompleted ?? 0} 
          icon={<FileText size={20} />} 
          iconBgColor="bg-amber-500/10" 
          iconColor="text-amber-500" 
        />
        <StatCard 
          title="Quizzes Taken" 
          value={stats?.quizzesTaken ?? 0} 
          icon={<Award size={20} />} 
          iconBgColor="bg-cyan-500/10" 
          iconColor="text-cyan-500" 
        />
        <StatCard 
          title="Learning Streak" 
          value={`${stats?.learningStreak ?? 0} Days`} 
          icon={<Activity size={20} />} 
          iconBgColor="bg-emerald-500/10" 
          iconColor="text-emerald-500" 
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
            <TrendingUpIcon /> Performance Chart (W1-W12)
          </h3>
          <PerformanceChart data={performanceData} />
        </div>

        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
            <BarChartIcon /> Weekly Workload
          </h3>
          <StudyHoursBar data={studyHoursData} />
        </div>
      </div>

      {/* Activity & Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Navigation */}
        <div className="glass-panel p-6 text-left border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Enrolled Courses</h3>
          <div className="space-y-3.5">
            {(coursesData ?? []).map((course: CourseSummary) => (
              <div 
                key={course.id} 
                onClick={() => { dispatch(setSelectedCourse(course as unknown as Parameters<typeof setSelectedCourse>[0])); navigate('/dashboard/courses'); }}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer border border-slate-200/60 dark:border-white/5"
              >
                <img src={course.imageUrl} className="w-16 h-11 rounded-lg object-cover" alt={course.title} />
                <div className="flex-grow min-w-0">
                  <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 truncate mb-1">{course.title}</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
                      <div className="h-full bg-gradient-to-r from-[#7C3AED] to-[#D97706]" style={{ width: `${course.progress}%` }}></div>
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{course.progress}%</span>
                  </div>
                </div>
                <ChevronRight size={14} className="text-slate-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="glass-panel p-6 text-left border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Academic Activity Log</h3>
          <div className="space-y-4">
            {(activityData?.recentActivity ?? []).map(act => (
              <ActivityCard 
                key={act.id} 
                text={act.text} 
                time={act.time} 
                icon={
                  act.icon === 'Award' ? <Award size={14} /> :
                  act.icon === 'FileText' ? <FileText size={14} /> :
                  act.icon === 'BookOpen' ? <BookOpen size={14} /> : <Activity size={14} />
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline fallback mini-icons
function TrendingUpIcon() {
  return (
    <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg className="w-4 h-4 text-[#06B6D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
