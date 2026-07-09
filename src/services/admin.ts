import api from './api';

export interface AiUsageEntry {
  time: string;
  requests: number;
}

export interface AdminDashboardData {
  stats: {
    totalActiveUsers: number;
    activeServers: number;
    systemUptime: string;
    cpuUsage: number;
    memoryUsage: number;
    aiRequestsToday: number;
  };
  roleDistribution: {
    role: string;
    count: number;
    color: string;
  }[];
  activityLogs: {
    id: number;
    user: string;
    action: string;
    time: string;
    type: string;
  }[];
  aiUsageStats: AiUsageEntry[];
}

export const adminService = {
  getStats: () =>
    api.get<AdminDashboardData>('/api/admin/stats').then(r => r.data),
};
