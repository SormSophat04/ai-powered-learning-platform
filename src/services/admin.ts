import api from './api';

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
  aiUsageStats: {
    time: string;
    requests: number;
  }[];
}

export const adminService = {
  getStats: () =>
    api.get<{ success: boolean; message: string; data: AdminDashboardData }>('/api/admin/stats').then(r => r.data),
};
