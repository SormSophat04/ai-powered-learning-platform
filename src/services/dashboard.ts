import api from './api';

export interface DashboardStats {
  coursesEnrolled: number;
  assignmentsPending: number;
  currentGpa: number;
  learningStreak: number;
}

export interface ActivityEntry {
  id: number;
  type: string;
  text: string;
  time: string;
  icon: string;
}

export interface RecentActivity {
  recentActivity: ActivityEntry[];
}

export const dashboardService = {
  getStats: () =>
    api.get<DashboardStats>('/api/dashboard/stats').then(r => r.data),

  getRecentActivity: () =>
    api.get<RecentActivity>('/api/dashboard/recent-activity').then(r => r.data),
};
