import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({ title, value, icon, iconBgColor = 'bg-primary/10', iconColor = 'text-primary' }: StatCardProps) {
  return (
    <div className="glass-card p-5 flex items-center gap-4 text-left border border-slate-200/60 dark:border-slate-800/40">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-black mt-0.5 text-slate-900 dark:text-slate-100 font-heading leading-none">{value}</h3>
      </div>
    </div>
  );
}

interface ActivityCardProps {
  text: string;
  time: string;
  icon: React.ReactNode;
}

export function ActivityCard({ text, time, icon }: ActivityCardProps) {
  return (
    <div className="flex gap-4 items-start text-left">
      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-slate-800 dark:text-slate-200">{text}</p>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">{time}</span>
      </div>
    </div>
  );
}
