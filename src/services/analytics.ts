import api from './api';

export interface PerformanceEntry {
  week: string;
  score: number;
  avg: number;
}

export interface SubjectStrength {
  subject: string;
  score: number;
  limit: number;
}

export interface StudyHourEntry {
  day: string;
  hours: number;
}

export interface GradePrediction {
  grade: string;
  confidence: number;
  insights: string[];
}

export const analyticsService = {
  getPerformance: () =>
    api.get<PerformanceEntry[]>('/api/analytics/performance').then(r => r.data),

  getSubjectStrengths: () =>
    api.get<SubjectStrength[]>('/api/analytics/subject-strengths').then(r => r.data),

  getStudyHours: () =>
    api.get<StudyHourEntry[]>('/api/analytics/study-hours').then(r => r.data),

  getGradePrediction: () =>
    api.get<GradePrediction>('/api/analytics/grade-prediction').then(r => r.data),
};
