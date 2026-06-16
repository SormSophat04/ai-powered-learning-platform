import api from './api';

export interface LessonDto {
  id: number;
  title: string;
  type: string;
  duration: string;
  videoUrl?: string;
  content?: string;
  orderIndex: number;
  active: boolean;
  completed: boolean;
}

export interface ModuleDto {
  id: number;
  title: string;
  orderIndex: number;
  completed: boolean;
  lessons: LessonDto[];
}

export interface CourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  teacherId: number;
  progress: number;
  modules: ModuleDto[];
}

export interface CourseSummary {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  imageUrl: string;
  description: string;
  progress: number;
}

export const courseService = {
  getCourses: () =>
    api.get<{ success: boolean; message: string; data: CourseSummary[] }>('/api/courses').then(r => r.data),

  getCourseDetail: (id: number) =>
    api.get<{ success: boolean; message: string; data: CourseDetail }>(`/api/courses/${id}`).then(r => r.data),

  updateProgress: (courseId: number, progress: number) =>
    api.put(`/api/courses/${courseId}/progress`, { courseId, progress }).then(r => r.data),

  completeLesson: (courseId: number, lessonId: number) =>
    api.put(`/api/courses/${courseId}/lessons/${lessonId}/complete`).then(r => r.data),
};
