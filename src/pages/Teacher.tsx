import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, FileText, Award, Sparkles, Plus, X, Check, AlertCircle, RefreshCw } from 'lucide-react';
import { StatCard } from '../components/Cards';
import { useTeacherDashboard } from '../hooks/useTeacher';
import { useCreateCourse } from '../hooks/useCourses';
import { SkeletonStatCard, SkeletonTableRow } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';

export default function Teacher() {
  const navigate = useNavigate();
  const { data, isLoading: loading, isError, refetch } = useTeacherDashboard();
  const createCourseMutation = useCreateCourse();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseCategory, setCourseCategory] = useState('Computer Science');
  const [courseDifficulty, setCourseDifficulty] = useState('Medium');
  const [courseImageUrl, setCourseImageUrl] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);

  const resetCreateForm = () => {
    setCourseTitle('');
    setCourseDescription('');
    setCourseCategory('Computer Science');
    setCourseDifficulty('Medium');
    setCourseImageUrl('');
    setCreateSuccess(false);
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle.trim()) return;
    try {
      await createCourseMutation.mutateAsync({
        title: courseTitle,
        description: courseDescription || undefined,
        category: courseCategory,
        difficulty: courseDifficulty,
        imageUrl: courseImageUrl || undefined,
      });
      setCreateSuccess(true);
      setTimeout(() => {
        resetCreateForm();
        setShowCreateForm(false);
      }, 2000);
    } catch (err: unknown) {
      console.error('Failed to create course:', err);
    }
  };

  if (isError && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 max-w-7xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Failed to load teacher dashboard</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          Could not fetch your data. Check your connection and try again.
        </p>
        <button onClick={() => refetch()} className="flex items-center gap-2 py-2 px-4 bg-[#7C3AED] hover:bg-violet-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all">
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
            <Skeleton height={14} width={140} />
            <table className="data-table">
              <thead>
                <tr>
                  {['Name', 'Email', 'Course', 'Grade', 'Last Active'].map(h => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map(i => <SkeletonTableRow key={i} />)}
              </tbody>
            </table>
          </div>
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4 h-fit">
            <Skeleton height={14} width={140} />
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200/40 space-y-2">
                  <Skeleton height={8} width={80} />
                  <Skeleton height={11} width="90%" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
          <Skeleton height={14} width={220} />
          <table className="data-table">
            <thead>
              <tr>
                {['Student', 'Assignment', 'Course', 'Received Date', 'Action'].map(h => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(i => (
                <tr key={i}>
                  {[1, 2, 3, 4, 5].map(j => (
                    <td key={j} className="py-3"><Skeleton height={12} width={j === 4 ? 90 : j === 1 ? 100 : 120} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Header + Create Course Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white">Instructor Dashboard</h2>
        <button
          onClick={() => { setShowCreateForm(!showCreateForm); resetCreateForm(); }}
          className="py-2 px-4 bg-[#7C3AED] hover:bg-violet-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer transition-all"
        >
          {showCreateForm ? <X size={14} /> : <Plus size={14} />}
          {showCreateForm ? 'Cancel' : 'Create Course'}
        </button>
      </div>

      {/* Course Creation Form */}
      {showCreateForm && (
        <div className="glass-panel p-6 border border-[#7C3AED]/20 bg-indigo-500/5 dark:bg-indigo-400/5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-5 flex items-center gap-1.5">
            <BookOpen size={16} className="text-[#7C3AED]" /> New Course
          </h3>
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <div className="form-group">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Course Title *</label>
              <input
                type="text"
                required
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="form-input text-xs"
                placeholder="e.g. Advanced Java Programming"
              />
            </div>
            <div className="form-group">
              <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Description</label>
              <textarea
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="form-input text-xs min-h-[80px] resize-y"
                placeholder="Describe what students will learn..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group">
                <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Category</label>
                <select value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} className="form-input text-xs">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Tech">Information Technology</option>
                  <option value="Advanced Science">Advanced Science</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Difficulty</label>
                <select value={courseDifficulty} onChange={(e) => setCourseDifficulty(e.target.value)} className="form-input text-xs">
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label text-[11px] font-semibold text-slate-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={courseImageUrl}
                  onChange={(e) => setCourseImageUrl(e.target.value)}
                  className="form-input text-xs"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
            {createCourseMutation.isError && (
              <div className="text-[11px] font-semibold text-red-500 bg-red-500/10 rounded-lg p-2.5">Failed to create course. Please try again.</div>
            )}
            {createSuccess && (
              <div className="text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 rounded-lg p-2.5 flex items-center gap-2">
                <Check size={14} /> Course created successfully!
              </div>
            )}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setShowCreateForm(false); resetCreateForm(); }}
                className="py-2 px-5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createCourseMutation.isPending || !courseTitle.trim()}
                className="py-2 px-5 bg-[#7C3AED] hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/10 cursor-pointer transition-all"
              >
                {createCourseMutation.isPending ? 'Creating...' : <><Sparkles size={14} /> Create Course</>}
              </button>
            </div>
          </form>
        </div>
      )}

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
        <div className="glass-panel p-6 border border-[#7C3AED]/15 bg-indigo-500/5 dark:bg-indigo-400/5 h-fit space-y-4">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#7C3AED]" /> AI Instructor Insights
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
                      className="py-1 px-3 bg-[#7C3AED] hover:bg-violet-950 text-white rounded-md text-[10px] font-bold shadow-md shadow-indigo-500/10 cursor-pointer"
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
