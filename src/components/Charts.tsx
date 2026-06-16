import React from 'react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-lg backdrop-blur-md">
        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">{label}</p>
        {payload.map((item: any, idx: number) => (
          <p key={idx} className="text-[11px] font-semibold" style={{ color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface PerformanceEntry { week: string; score: number; avg: number }
interface SubjectStrength { subject: string; score: number; limit: number }
interface StudyHourEntry { day: string; hours: number }
interface AiUsageEntry { time: string; requests: number }

export function PerformanceChart({ data }: { data?: PerformanceEntry[] }) {
  const chartData = data || [];
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
          <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Line 
            type="monotone" 
            dataKey="score" 
            name="Your Score" 
            stroke="#4F46E5" 
            strokeWidth={3} 
            activeDot={{ r: 6 }} 
            dot={{ stroke: '#4F46E5', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="avg" 
            name="Class Avg" 
            stroke="#06B6D4" 
            strokeWidth={2} 
            strokeDasharray="4 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SubjectStrengthRadar({ data }: { data?: SubjectStrength[] }) {
  const chartData = data || [];
  return (
    <div className="w-full h-[280px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
          <PolarRadiusAxis stroke="#94a3b8" fontSize={9} angle={30} domain={[0, 100]} tickLine={false} />
          <Radar 
            name="Strength" 
            dataKey="score" 
            stroke="#4F46E5" 
            fill="#4F46E5" 
            fillOpacity={0.25} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function StudyHoursBar({ data }: { data?: StudyHourEntry[] }) {
  const chartData = data || [];
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:hidden" />
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" className="hidden dark:block" />
          <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="hours" name="Study Hours" fill="#4F46E5" radius={[4, 4, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AdminApiRequests({ data }: { data?: AiUsageEntry[] }) {
  const chartData = data || [];
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={9} />
          <YAxis stroke="#94a3b8" fontSize={9} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="requests" 
            name="Requests" 
            stroke="#06B6D4" 
            strokeWidth={3} 
            activeDot={{ r: 5 }} 
            dot={{ stroke: '#06B6D4', strokeWidth: 1, r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
