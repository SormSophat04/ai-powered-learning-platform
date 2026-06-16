import api from './api';

interface Milestone {
  id: number;
  title: string;
  status: string;
  time: string;
  difficulty: string;
  completion: number;
  focus: string;
}

interface Recommendation {
  title: string;
  description: string;
}

export interface LearningPathData {
  milestones: Milestone[];
  recommendation: Recommendation;
}

export const learningPathService = {
  getLearningPath: () =>
    api.get<{ success: boolean; message: string; data: LearningPathData }>('/api/learning-path').then(r => r.data),

  getRecommendation: () =>
    api.get<{ success: boolean; message: string; data: Recommendation }>('/api/learning-path/recommendation').then(r => r.data),
};
