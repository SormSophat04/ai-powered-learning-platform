import React, { useEffect } from 'react';
import { Upload, FileCheck, Sparkles, Check, FileText } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setAssignments, setActiveAssignmentId, setUploadedFile, setUploadProgress, setAiFeedback, submitAssignment } from '../store/assignmentsSlice';
import { assignmentService } from '../services';

export default function Assignments() {
  const assignments = useAppSelector((s) => s.assignments.assignments);
  const activeAssignmentId = useAppSelector((s) => s.assignments.activeAssignmentId);
  const uploadedFile = useAppSelector((s) => s.assignments.uploadedFile);
  const uploadProgress = useAppSelector((s) => s.assignments.uploadProgress);
  const aiFeedback = useAppSelector((s) => s.assignments.aiFeedback);
  const dispatch = useAppDispatch();

  useEffect(() => {
    assignmentService.getAssignments().then(res => {
      dispatch(setAssignments(res.data.map(a => ({
        id: String(a.id),
        title: a.title,
        course: a.courseName,
        dueDate: a.dueDate,
        status: a.status,
        score: a.score,
        feedback: a.feedback,
        file: a.fileUrl,
      }))));
    }).catch(console.error);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const fileName = file ? file.name : 'report.pdf';
    
    dispatch(setUploadedFile(fileName));
    dispatch(setUploadProgress(10));
    dispatch(setAiFeedback(null));

    try {
      const res = await assignmentService.submitAssignment(Number(activeAssignmentId), fileName);
      dispatch(setUploadProgress(100));
      const feedback = res.data.feedback;
      dispatch(setAiFeedback(feedback));
      dispatch(submitAssignment({ asgId: activeAssignmentId, file: fileName, feedback }));
    } catch (err) {
      console.error('Upload failed:', err);
      dispatch(setUploadProgress(0));
    }
  };

  const activeAsg = assignments.find(a => a.id === activeAssignmentId) || assignments[0];

  if (!activeAsg) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 text-xs">
        Loading assignments...
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
                  dispatch(setAiFeedback(asg.feedback));
                }}
                className={`glass-card p-5 cursor-pointer text-left transition-all border border-slate-200/60 ${
                  isActive 
                    ? 'border-[#4F46E5] border-l-4 bg-gradient-to-r from-indigo-500/5 to-indigo-500/10' 
                    : 'border-slate-200 dark:border-white/5 dark:bg-slate-900/30'
                }`}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{asg.course}</span>
                  <span className={`badge ${
                    asg.status === 'Graded' ? 'badge-success' :
                    asg.status === 'Submitted' ? 'badge-primary' : 'badge-warning'
                  } text-[8px] px-1.5 py-0.5`}>
                    {asg.status}
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
              <div className="drag-drop-zone border-2 border-dashed border-slate-200 dark:border-slate-800/80 hover:border-[#4F46E5]/60 hover:bg-slate-50/50 dark:hover:bg-slate-900/20 p-8 rounded-2xl flex flex-col items-center gap-3 cursor-pointer transition-all">
                <div className="w-12 h-12 rounded-full bg-[#4F46E5]/10 text-[#4F46E5] flex items-center justify-center">
                  <Upload size={20} />
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">Upload your submission report</h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-[280px] text-center leading-normal">
                  Drag and drop files here, or choose a file to perform a localized pre-check.
                </p>
                <label className="py-1.5 px-4 bg-[#4F46E5] hover:bg-indigo-750 text-white rounded-lg text-[10px] font-bold shadow-md shadow-indigo-500/10 cursor-pointer mt-2.5">
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
                  onClick={() => { dispatch(setUploadedFile(null)); dispatch(setAiFeedback(null)); }}
                  className="py-1 px-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] rounded-md font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* AI Feedback Module */}
            {aiFeedback && (
              <div className="p-5 rounded-2xl bg-indigo-500/5 dark:bg-indigo-400/5 border border-[#4F46E5]/15 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#4F46E5]" /> AI Review Summary
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <div className="bg-white dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200/40 dark:border-slate-800/40 text-center">
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-semibold block mb-0.5">Grammar</span>
                    <span className="text-base font-black font-heading text-[#4F46E5] leading-none">{aiFeedback.grammar}%</span>
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
