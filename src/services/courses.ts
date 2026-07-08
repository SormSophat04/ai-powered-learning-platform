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
    api.get<CourseSummary[]>('/api/courses').then(r => r.data),

  getCourseDetail: (id: number) =>
    api.get<CourseDetail>(`/api/courses/${id}`).then(r => r.data),

  enroll: (courseId: number) =>
    api.post<void>(`/api/courses/${courseId}/enroll`).then(r => r.data),

  createCourse: (data: { title: string; description?: string; category?: string; difficulty?: string; imageUrl?: string }) =>
    api.post<CourseDetail>('/api/courses', data).then(r => r.data),

  updateProgress: (courseId: number, progress: number) =>
    api.put(`/api/courses/${courseId}/progress`, { progress }).then(r => r.data),

  completeLesson: (courseId: number, lessonId: number) =>
    api.put(`/api/courses/${courseId}/lessons/${lessonId}/complete`).then(r => r.data),
};
