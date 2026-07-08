import React from 'react';
import { Brain, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
import { PerformanceChart, SubjectStrengthRadar, StudyHoursBar } from '../components/Charts';
import { usePerformance, useSubjectStrengths, useStudyHours, useGradePrediction } from '../hooks/useAnalytics';
import { SkeletonChart } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';

export default function Analytics() {
  const role = useAppSelector((s) => s.auth.role);
  const { data: perfData, isLoading: perfLoading, isError: perfError, refetch: refetchPerf } = usePerformance();
  const { data: strengthData, isLoading: strengthLoading } = useSubjectStrengths();
  const { data: hoursData, isLoading: hoursLoading } = useStudyHours();
  const { data: predictionData, isLoading: predictionLoading } = useGradePrediction();

  const loading = perfLoading || strengthLoading || hoursLoading || predictionLoading;

  if (perfError && !loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 max-w-7xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center">
          <AlertCircle size={24} className="text-red-500" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Failed to load analytics</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          Could not fetch your learning data. Check your connection and try again.
        </p>
        <button onClick={() => refetchPerf()} className="flex items-center gap-2 py-2 px-4 bg-[#7C3AED] hover:bg-violet-700 text-white rounded-lg text-xs font-bold cursor-pointer transition-all">
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <Skeleton height={24} width={320} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonChart />
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
          <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-5">
            <Skeleton height={16} width={220} />
            <Skeleton height={20} width={120} borderRadius="999px" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
            <div className="flex flex-col items-center space-y-3">
              <Skeleton width={120} height={120} borderRadius="999px" />
              <Skeleton height={12} width={140} />
            </div>
            <div className="space-y-4">
              <Skeleton height={14} width={180} />
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <Skeleton width={6} height={6} borderRadius="999px" className="mt-1.5" />
                    <Skeleton height={12} width="80%" />
                  </div>
                ))}
              </div>
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
          <TrendingUp size={24} className="text-[#7C3AED]" />
        </div>
        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
          {role === 'teacher' ? 'Teacher View' : 'Admin View'}
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-[320px] text-center leading-relaxed">
          Learning analytics is a student-only feature. Switch to a student account to view performance data and AI grade predictions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white">Learning Performance Analytics</h2>
      
      {/* Visual Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Academic Score Progress
          </h3>
          <PerformanceChart data={perfData} />
        </div>

        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Syllabus Strength Radar
          </h3>
          <SubjectStrengthRadar data={strengthData} />
        </div>

        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Weekly Study Hours Allocation
          </h3>
          <StudyHoursBar data={hoursData} />
        </div>
      </div>

      {/* AI Grade Prediction Engine */}
      <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-5">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Brain size={16} className="text-[#7C3AED]" /> AI Grade Prediction & Strategy
          </h3>
          <span className="animate-pulse py-1 px-3 bg-indigo-500/10 text-[#7C3AED] text-[10px] font-bold rounded-full border border-indigo-500/20">
            Active Predictor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
          {/* Prediction Visual */}
          <div className="flex flex-col items-center">
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#7C3AED] to-[#D97706] flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-500/15">
              <span className="text-4xl font-black font-heading leading-none">{predictionData?.grade || 'N/A'}</span>
              <span className="text-[9px] uppercase tracking-wider font-bold opacity-80 mt-1">Predicted</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3.5 block">
              Confidence level: {predictionData?.confidence || 0}%
            </span>
          </div>

          {/* AI Strategy recommendations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Target Strategy Milestones</h4>
            <div className="space-y-3">
              {(predictionData?.insights || []).map((ins, i) => (
                <div key={i} className="flex gap-2.5 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] mt-1.5 flex-shrink-0"></div>
                  <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">{ins}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
