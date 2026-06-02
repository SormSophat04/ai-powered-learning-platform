import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Award, Activity, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { StatCard, ActivityCard } from '../components/Cards';
import { PerformanceChart, StudyHoursBar } from '../components/Charts';
import { initialStudentStats } from '../mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const { coursesList, setSelectedCourse, assignments } = useStore();

  const pendingCount = assignments.filter(a => a.status === 'Pending').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Courses Enrolled" 
          value={initialStudentStats.coursesEnrolled} 
          icon={<BookOpen size={20} />} 
        />
        <StatCard 
          title="Assignments Pending" 
          value={pendingCount} 
          icon={<FileText size={20} />} 
          iconBgColor="bg-amber-500/10" 
          iconColor="text-amber-500" 
        />
        <StatCard 
          title="Current GPA" 
          value={initialStudentStats.currentGPA} 
          icon={<Award size={20} />} 
          iconBgColor="bg-cyan-500/10" 
          iconColor="text-cyan-500" 
        />
        <StatCard 
          title="Learning Streak" 
          value={`${initialStudentStats.learningStreak} Days`} 
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
          <PerformanceChart />
        </div>

        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider flex items-center gap-2">
            <BarChartIcon /> Weekly Workload
          </h3>
          <StudyHoursBar />
        </div>
      </div>

      {/* Activity & Enrolled Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Navigation */}
        <div className="glass-panel p-6 text-left border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-[13px] font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">Enrolled Courses</h3>
          <div className="space-y-3.5">
            {coursesList.map(course => (
              <div 
                key={course.id} 
                onClick={() => { setSelectedCourse(course); navigate('/dashboard/courses'); }}
                className="glass-card p-4 flex items-center gap-4 cursor-pointer border border-slate-200/60 dark:border-white/5"
              >
                <img src={course.image} className="w-16 h-11 rounded-lg object-cover" alt={course.title} />
                <div className="flex-grow min-w-0">
                  <h4 className="text-[13px] font-bold text-slate-800 dark:text-slate-100 truncate mb-1">{course.title}</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex-shrink-0">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" style={{ width: `${course.progress}%` }}></div>
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
            {initialStudentStats.recentActivity.map(act => (
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
    <svg className="w-4 h-4 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
