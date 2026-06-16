import api from './api';

export interface QuestionDto {
  id: number;
  question: string;
  options: string[];
}

export interface QuizData {
  attemptId: number;
  title: string;
  topic: string;
  difficulty: string;
  questions: QuestionDto[];
}

export interface QuestionResult {
  questionId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  yourAnswer: number;
  correct: boolean;
  explanation: string;
}

export interface QuizResult {
  attemptId: number;
  score: number;
  correctCount: number;
  totalCount: number;
  results: QuestionResult[];
}

export const quizService = {
  generate: (topic: string, difficulty: string, count: number) =>
    api.post<{ success: boolean; message: string; data: QuizData }>('/api/quiz/generate', { topic, difficulty, count }).then(r => r.data),

  submit: (attemptId: number, answersJson: string) =>
    api.post<{ success: boolean; message: string; data: QuizResult }>(`/api/quiz/${attemptId}/submit`, { attemptId, answersJson }).then(r => r.data),
};
