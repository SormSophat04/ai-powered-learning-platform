import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { learningPathService } from '../services';
import type { LearningPathData } from '../services';
import { SkeletonMilestone } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';

export default function LearningPath() {
  const navigate = useNavigate();
  const [data, setData] = useState<LearningPathData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      learningPathService.getLearningPath(),
      learningPathService.getRecommendation(),
    ]).then(([pathRes, recRes]) => {
      setData({
        milestones: pathRes.data.milestones,
        recommendation: recRes.data,
      });
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="space-y-1">
          <Skeleton height={11} width={200} />
          <Skeleton height={24} width={420} />
          <Skeleton height={12} width="60%" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
          <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
            <div className="timeline-container space-y-6">
              {[1, 2, 3, 4, 5].map(i => <SkeletonMilestone key={i} />)}
            </div>
          </div>
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4 h-fit">
            <Skeleton height={14} width={140} />
            <div className="p-4 rounded-xl border border-slate-200/40 space-y-2">
              <Skeleton height={12} width="80%" />
              <Skeleton height={11} width="100%" />
              <Skeleton height={11} width="90%" />
            </div>
            <Skeleton height={36} borderRadius="8px" />
          </div>
        </div>
      </div>
    );
  }

  const milestones = data?.milestones || [];

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      
      {/* Path Header */}
      <div>
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Dynamic Timeline Curriculum</span>
        <h1 className="text-2xl font-heading font-black text-slate-900 dark:text-white mt-0.5">Your AI Personalized Learning Path</h1>
        <p className="text-xs text-slate-500 dark:text-slate-455 mt-1.5 leading-relaxed">
          Dynamic milestone timelines designed automatically depending on your syllabus check performance rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        
        {/* Left Side: Timeline Cards */}
        <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {milestones.map((path, idx) => (
              <div key={path.id} className="timeline-item">
                
                {/* Timeline node icon */}
                <div className={`timeline-node ${path.status}`}>
                  {path.status === 'completed' && <Check size={11} className="text-white" />}
                </div>

                {/* Timeline content details */}
                <div className="glass-card timeline-content-card border border-slate-200/60 dark:border-white/5 dark:bg-slate-950/30">
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Milestone 0{idx + 1}</span>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 truncate">{path.title}</h3>
                    <p className="text-[11px] text-slate-450 dark:text-slate-400 mt-1 leading-normal">Focus: {path.focus}</p>
                    <div className="flex gap-4 mt-3 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                      <span>Est: <strong>{path.time}</strong></span>
                      <span>Difficulty: <strong>{path.difficulty}</strong></span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className={`badge ${
                      path.status === 'completed' ? 'badge-success' :
                      path.status === 'current' ? 'badge-primary' : 'badge-outline'
                    } text-[8px] px-1.5 py-0.5 mb-2.5`}>
                      {path.status}
                    </span>
                    {path.status !== 'locked' && (
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        Progress: {path.completion}%
                      </span>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Side: recommendations panel */}
        <div className="glass-panel p-6 border border-[#4F46E5]/15 bg-indigo-500/5 dark:bg-indigo-400/5 h-fit space-y-4">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#4F46E5]" /> AI Recommendation
          </h3>
          <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/40 dark:border-slate-850/40">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1.5">Next milestone priority: {data?.recommendation.title || 'N/A'}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {data?.recommendation.description || 'No recommendation available.'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard/courses')}
            className="w-full py-2.5 rounded-lg bg-[#4F46E5] hover:bg-indigo-750 text-white text-xs font-bold shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1 cursor-pointer"
          >
            Resume Curriculum <ChevronRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
