import React from 'react';
import { Brain } from 'lucide-react';
import { PerformanceChart, SubjectStrengthRadar, StudyHoursBar } from '../components/Charts';
import { learningAnalytics } from '../mockData';

export default function Analytics() {
  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">
      <h2 className="text-xl font-heading font-black text-slate-900 dark:text-white">Learning Performance Analytics</h2>
      
      {/* Visual Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Academic Score Progress
          </h3>
          <PerformanceChart />
        </div>

        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Syllabus Strength Radar
          </h3>
          <SubjectStrengthRadar />
        </div>

        <div className="glass-panel p-5 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Weekly Study Hours Allocation
          </h3>
          <StudyHoursBar />
        </div>
      </div>

      {/* AI Grade Prediction Engine */}
      <div className="glass-panel p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/40">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-5">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Brain size={16} className="text-[#4F46E5]" /> AI Grade Prediction & Strategy
          </h3>
          <span className="animate-pulse py-1 px-3 bg-indigo-500/10 text-[#4F46E5] text-[10px] font-bold rounded-full border border-indigo-500/20">
            Active Predictor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-center">
          {/* Prediction Visual */}
          <div className="flex flex-col items-center">
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-500/15">
              <span className="text-4xl font-black font-heading leading-none">{learningAnalytics.aiPrediction.grade}</span>
              <span className="text-[9px] uppercase tracking-wider font-bold opacity-80 mt-1">Predicted</span>
            </div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mt-3.5 block">
              Confidence level: {learningAnalytics.aiPrediction.confidence}%
            </span>
          </div>

          {/* AI Strategy recommendations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Target Strategy Milestones</h4>
            <div className="space-y-3">
              {learningAnalytics.aiPrediction.insights.map((ins, i) => (
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
