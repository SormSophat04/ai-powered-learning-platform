import api from './api';

interface PerformanceEntry {
  week: string;
  score: number;
  avg: number;
}

interface SubjectStrength {
  subject: string;
  score: number;
  limit: number;
}

interface StudyHourEntry {
  day: string;
  hours: number;
}

interface GradePrediction {
  grade: string;
  confidence: number;
  insights: string[];
}

export interface AnalyticsData {
  performanceHistory: PerformanceEntry[];
  subjectStrengths: SubjectStrength[];
  studyHours: StudyHourEntry[];
  aiPrediction: GradePrediction;
}

export const analyticsService = {
  getPerformance: () =>
    api.get<{ success: boolean; message: string; data: AnalyticsData }>('/api/analytics/performance').then(r => r.data),

  getSubjectStrengths: () =>
    api.get<{ success: boolean; message: string; data: AnalyticsData }>('/api/analytics/subject-strengths').then(r => r.data),

  getStudyHours: () =>
    api.get<{ success: boolean; message: string; data: AnalyticsData }>('/api/analytics/study-hours').then(r => r.data),

  getGradePrediction: () =>
    api.get<{ success: boolean; message: string; data: AnalyticsData }>('/api/analytics/grade-prediction').then(r => r.data),
};
