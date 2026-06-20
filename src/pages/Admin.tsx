import React, { useEffect, useState } from 'react';
import { Activity, Cpu, Brain, Users } from 'lucide-react';
import { StatCard } from '../components/Cards';
import { AdminApiRequests } from '../components/Charts';
import { adminService } from '../services';
import type { AdminDashboardData } from '../services';
import { SkeletonStatCard } from '../components/Skeleton';
import Skeleton from '../components/Skeleton';

export default function Admin() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getStats().then(res => {
      setData(res.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto font-sans">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
            <Skeleton height={14} width={180} />
            <div className="space-y-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton height={12} width={80} />
                    <Skeleton height={12} width={60} />
                  </div>
                  <Skeleton height={8} borderRadius="999px" />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
            <Skeleton height={14} width={200} />
            <Skeleton height={200} borderRadius="12px" />
          </div>
        </div>
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40 space-y-4">
          <Skeleton height={14} width={140} />
          <div className="space-y-0">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[180px_1fr_120px] gap-3 md:gap-6 items-center py-3.5 px-2 border-b border-slate-200/60 dark:border-slate-800/40 last:border-b-0">
                <Skeleton height={12} width={140} />
                <Skeleton height={12} width="80%" />
                <Skeleton height={10} width={80} className="md:text-right" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto font-sans">

      {/* System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Active Users"
          value={data?.stats.totalActiveUsers ?? 0}
          icon={<Activity size={20} />}
        />
        <StatCard
          title="CPU Uptime SLA"
          value={data?.stats.systemUptime ?? 'N/A'}
          icon={<Cpu size={20} />}
          iconBgColor="bg-cyan-500/10"
          iconColor="text-cyan-500"
        />
        <StatCard
          title="AI Requests (Today)"
          value={(data?.stats.aiRequestsToday ?? 0).toLocaleString()}
          icon={<Brain size={20} />}
          iconBgColor="bg-amber-500/10"
          iconColor="text-amber-500"
        />
        <StatCard
          title="Active Servers"
          value={`${data?.stats.activeServers ?? 0} / 4`}
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
            {(data?.roleDistribution || []).map(rd => {
              const totalUsers = data?.stats.totalActiveUsers || 1;
              return (
                <div key={rd.role} className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-100">{rd.role}s</span>
                    <span className="text-slate-400 dark:text-slate-500 font-semibold">{rd.count} users</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${(rd.count / totalUsers) * 100}%`, backgroundColor: rd.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* API Usage Statistics */}
        <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            API Usage Statistics (Requests / Hour)
          </h3>
          <AdminApiRequests data={data?.aiUsageStats} />
        </div>
      </div>

      {/* Activity Logs */}
      <div className="glass-panel p-6 border border-slate-200/60 dark:border-slate-800/40">
        <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
          System Activity Logs
        </h3>
        <div className="space-y-0">
          {(data?.activityLogs || []).map(log => (
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
