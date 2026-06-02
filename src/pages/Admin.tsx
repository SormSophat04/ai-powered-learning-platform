import React from 'react';
import { Activity, Cpu, Brain, Users } from 'lucide-react';
import { StatCard } from '../components/Cards';
import { AdminApiRequests } from '../components/Charts';
import { adminDashboardData } from '../mockData';

export default function Admin() {
  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Active Users"
          value={adminDashboardData.stats.totalActiveUsers}
          icon={<Activity size={20} />}
        />
        <StatCard
          title="CPU Uptime SLA"
          value={adminDashboardData.stats.systemUptime}
          icon={<Cpu size={20} />}
          iconBgColor="bg-cyan-500/10"
          iconColor="text-cyan-500"
        />
        <StatCard
          title="AI Requests (Today)"
          value={adminDashboardData.stats.aiRequestsToday.toLocaleString()}
          icon={<Brain size={20} />}
          iconBgColor="bg-amber-500/10"
          iconColor="text-amber-500"
        />
        <StatCard
          title="Active Servers"
          value={`${adminDashboardData.stats.activeServers} / 4`}
          icon={<Users size={20} />}
          iconBgColor="bg-emerald-500/10"
          iconColor="text-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">

        {/* Role Distribution */}
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-6 uppercase tracking-wider">
            User Role Distribution
          </h3>
          <div className="space-y-5">
            {adminDashboardData.roleDistribution.map(rd => (
              <div key={rd.role} className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-100">{rd.role}s</span>
                  <span className="text-slate-400 dark:text-slate-500 font-semibold">{rd.count} users</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(rd.count / 1850) * 100}%`, backgroundColor: rd.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* API Usage Statistics */}
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            API Usage Statistics (Requests / Hour)
          </h3>
          <AdminApiRequests />
        </div>
      </div>

      {/* Activity Logs */}
      <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
          System Activity Logs
        </h3>
        <div className="space-y-0">
          {adminDashboardData.activityLogs.map(log => (
            <div
              key={log.id}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr_120px] gap-3 md:gap-6 items-center py-3.5 px-2 border-b border-slate-200/60 dark:border-slate-800/40 last:border-b-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors rounded-lg"
            >
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{log.user}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{log.action}</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold md:text-right">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
