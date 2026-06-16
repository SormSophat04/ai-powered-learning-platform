import api from './api';

export interface TeacherDashboardData {
  widgets: {
    totalStudents: number;
    totalCourses: number;
    assignmentsPendingReview: number;
    averageGrade: string;
  };
  aiInsights: {
    id: number;
    text: string;
    severity: string;
  }[];
  students: {
    id: string;
    name: string;
    email: string;
    course: string;
    grade: string;
    progress: number;
    lastActive: string;
  }[];
  submissionQueue: {
    id: string;
    studentName: string;
    assignmentTitle: string;
    courseName: string;
    date: string;
    status: string;
  }[];
}

export const teacherService = {
  getDashboard: () =>
    api.get<{ success: boolean; message: string; data: TeacherDashboardData }>('/api/teacher/dashboard').then(r => r.data),
};
