import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, FileText, Award, Sparkles } from 'lucide-react';
import { StatCard } from '../components/Cards';
import { teacherService } from '../services';
import type { TeacherDashboardData } from '../services';

export default function Teacher() {
  const navigate = useNavigate();
  const [data, setData] = useState<TeacherDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teacherService.getDashboard().then(res => {
      setData(res.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Grid stats widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students Enrolled" 
          value={data?.widgets.totalStudents ?? 0} 
          icon={<Users size={20} />} 
        />
        <StatCard 
          title="Total Active Courses" 
          value={data?.widgets.totalCourses ?? 0} 
          icon={<BookOpen size={20} />} 
          iconBgColor="bg-cyan-500/10" 
          iconColor="text-cyan-500" 
        />
        <StatCard 
          title="Assignments Pending Review" 
          value={data?.widgets.assignmentsPendingReview ?? 0} 
          icon={<FileText size={20} />} 
          iconBgColor="bg-amber-500/10" 
          iconColor="text-amber-500" 
        />
        <StatCard 
          title="Average Class Grade" 
          value={data?.widgets.averageGrade ?? 'N/A'} 
          icon={<Award size={20} />} 
          iconBgColor="bg-emerald-500/10" 
          iconColor="text-emerald-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        
        {/* Student list table */}
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Student Enrollee List
          </h3>
          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Grade</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {(data?.students || []).map(std => (
                  <tr key={std.id}>
                    <td className="font-bold">{std.name}</td>
                    <td>{std.email}</td>
                    <td>{std.course}</td>
                    <td><span className="badge badge-success text-[9px] px-2">{std.grade}</span></td>
                    <td>{std.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Classroom Insights */}
        <div className="glass-panel p-6 border border-[#4F46E5]/15 bg-indigo-500/5 dark:bg-indigo-400/5 h-fit space-y-4">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#4F46E5]" /> AI Instructor Insights
          </h3>
          <div className="space-y-3">
            {(data?.aiInsights || []).map(ins => (
              <div 
                key={ins.id}
                className={`p-3.5 rounded-xl bg-white dark:bg-slate-900/60 border-l-4 text-xs ${
                  ins.severity === 'high' ? 'border-rose-500' :
                  ins.severity === 'medium' ? 'border-amber-500' : 'border-emerald-500'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{ins.severity} priority</span>
                </div>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">{ins.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Submission Review Queue */}
      <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
          Pending Assignment Submissions Queue
        </h3>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Assignment</th>
                <th>Course</th>
                <th>Received Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(data?.submissionQueue || []).map(item => (
                <tr key={item.id}>
                  <td className="font-bold">{item.studentName}</td>
                  <td>{item.assignmentTitle}</td>
                  <td>{item.courseName}</td>
                  <td>{item.date}</td>
                  <td>
                    <button 
                      onClick={() => navigate('/dashboard/assignments')}
                      className="py-1 px-3 bg-[#4F46E5] hover:bg-indigo-750 text-white rounded-md text-[10px] font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
                    >
                      Audit with AI Assist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
