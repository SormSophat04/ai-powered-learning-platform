import React, { useEffect, useState } from 'react';
import { Upload, FileCheck, Sparkles, FileText } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setActiveAssignmentId, setUploadedFile, setUploadProgress } from '../store/assignmentsSlice';
import { useAssignments, useSubmitAssignment } from '../hooks/useAssignments';
import type { FeedbackDto } from '../services';
import { SkeletonAssignmentCard } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';

function formatStatus(status: string): string {
  return status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase() : 'Pending';
}

export default function Assignments() {
  const activeAssignmentId = useAppSelector((s) => s.assignments.activeAssignmentId);
  const uploadedFile = useAppSelector((s) => s.assignments.uploadedFile);
  const role = useAppSelector((s) => s.auth.role);
  const dispatch = useAppDispatch();
  const [aiFeedback, setAiFeedback] = useState<FeedbackDto | null>(null);
  const submitAssignmentMutation = useSubmitAssignment();
  const { data: assignmentsData, isLoading: loading, error: fetchError } = useAssignments();

  const assignments = (assignmentsData ?? []).map(a => ({
    id: String(a.id),
    title: a.title,
    course: a.courseName,
    dueDate: a.dueDate,
    status: formatStatus(a.status),
    score: a.score,
    feedback: a.feedback,
    file: a.fileUrl,
  }));

  useEffect(() => {
    if (assignments.length > 0 && !activeAssignmentId) {
      dispatch(setActiveAssignmentId(assignments[0].id));
    }
  }, [assignmentsData]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileName = file ? file.name : 'report.pdf';
    
    dispatch(setUploadedFile(fileName));
    dispatch(setUploadProgress(10));
    setAiFeedback(null);

    try {
      const res = await submitAssignmentMutation.mutateAsync({ id: Number(activeAssignmentId), file: file! });
      dispatch(setUploadProgress(100));
      const feedback = res.feedback;
      setAiFeedback(feedback);
    } catch (err) {
      console.error('Upload failed:', err);
      dispatch(setUploadProgress(0));
      dispatch(setUploadedFile(null));
    }
  };

  const activeAsg = assignments.find(a => a.id === activeAssignmentId) || assignments[0];

  useEffect(() => {
    if (activeAsg) {
      setAiFeedback(activeAsg.feedback);
    }
  }, [activeAsg?.id, activeAsg?.feedback]);

  if (loading) {
    return (
      <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
        <Skeleton height={24} width={280} />
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-6">
          <div className="space-y-3.5">
            {[1, 2, 3].map(i => <SkeletonAssignmentCard key={i} />)}
          </div>
          <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40 space-y-6">
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-200 dark:border-slate-800/60 mb-2">
              <div className="space-y-1">
                <Skeleton height={16} width={180} />
                <Skeleton height={10} width={100} />
              </div>
            </div>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-800/80 p-8 rounded-2xl flex flex-col items-center gap-3">
              <Skeleton width={48} height={48} borderRadius="999px" />
              <Skeleton height={12} width={200} />
              <Skeleton height={10} width={260} />
              <Skeleton height={32} width={100} borderRadius="8px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-400 text-xs">
        Failed to load assignments. Please try again later.
      </div>
    );
  }

  if (!activeAsg) {
    if (role !== 'student') {
      return (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <FileText size={24} className="text-[#7C3AED]" />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {role === 'teacher' ? 'Teacher View' : 'Admin View'}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
            Assignment submissions are managed through the student interface. Switch to a student account to view and manage assignments.
          </p>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-xs">
        No assignments found for your account.
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white">Assignment & Submissions Desk</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.9fr] gap-6">
        
        {/* Left Side: Tasks queue */}
        <div className="space-y-3.5">
          {assignments.map(asg => {
            const isActive = activeAssignmentId === asg.id;
            return (
              <div 
                key={asg.id}
                onClick={() => {
                  dispatch(setActiveAssignmentId(asg.id));
                  dispatch(setUploadedFile(asg.file));
                  dispatch(setUploadProgress(asg.file ? 100 : 0));
                  setAiFeedback(asg.feedback);
                }}
                className={`glass-card p-5 cursor-pointer text-left transition-all border border-slate-200/60 ${
                  isActive 
                    ? 'border-[#7C3AED] border-l-4 bg-gradient-to-r from-indigo-500/5 to-indigo-500/10' 
                    : 'border-slate-200 dark:border-white/5 dark:bg-slate-900/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{asg.course}</span>
                  <span className={`badge ${
                    asg.status === 'Graded' ? 'badge-success' :
                    asg.status === 'Submitted' ? 'badge-primary' : 'badge-warning'
                  } text-[8px] px-1.5 py-0.5`}>
                    {formatStatus(asg.status)}
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2 truncate">{asg.title}</h3>
                
                <div className="flex justify-between items-center text-[10px] text-slate-450 dark:text-slate-500 font-semibold mt-4">
                  <span>Due: {asg.dueDate}</span>
                  {asg.score && <strong className="text-emerald-500 text-[11px]">Score: {asg.score}%</strong>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Upload Console and Feedback details */}
        <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
          <div>
            <div className="flex justify-between items-center pb-3.5 border-b border-slate-200 dark:border-slate-800/60 mb-5">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{activeAsg.title}</h3>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{activeAsg.course}</span>
            </div>

            {/* Upload Zone */}
            {!uploadedFile ? (
              <div className="drag-drop-zone border-2 border-dashed border-slate-200 dark:border-slate-800/80 hover:border-[#7C3AED]/60 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 p-8 rounded-2xl flex flex-col items-center gap-3 cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Upload your submission report</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[280px] text-center leading-normal">
                  Drag and drop files here, or choose a file to perform a localized pre-check.
                </p>
                <label className="py-1.5 px-4 bg-[#7C3AED] hover:bg-violet-950 text-white rounded-lg text-[10px] font-bold shadow-md shadow-indigo-500/10 cursor-pointer mt-2.5">
                  Choose File
                  <input type="file" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-500/5 flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <FileCheck size={20} className="text-emerald-500" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{uploadedFile}</h4>
                    <span className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 block">File upload audit finished (100%)</span>
                  </div>
                </div>
                <button 
                  onClick={() => { dispatch(setUploadedFile(null)); setAiFeedback(null); }}
                  className="py-1 px-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] rounded-md font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* AI Feedback Module */}
            {aiFeedback && (
              <div className="p-5 rounded-2xl bg-indigo-500/5 dark:bg-indigo-400/5 border border-[#7C3AED]/15 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#7C3AED]" /> AI Review Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block mb-0.5">Grammar</span>
                    <span className="text-base font-black font-heading text-[#7C3AED] leading-none">{aiFeedback.grammar}%</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block mb-0.5">Logic</span>
                    <span className="text-base font-black font-heading text-cyan-500 leading-none">{aiFeedback.logic}%</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block mb-0.5">Completeness</span>
                    <span className="text-base font-black font-heading text-emerald-500 leading-none">{aiFeedback.completeness}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed pt-2 border-t border-slate-250 dark:border-slate-850">
                  "{aiFeedback.text}"
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
