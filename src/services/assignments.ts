import api from './api';

export interface FeedbackDto {
  grammar: number;
  logic: number;
  completeness: number;
  text: string;
}

export interface AssignmentData {
  id: number;
  title: string;
  courseName: string;
  dueDate: string;
  status: string;
  score: number | null;
  feedback: FeedbackDto | null;
  fileUrl: string | null;
}

export const assignmentService = {
  getAssignments: () =>
    api.get<{ success: boolean; message: string; data: AssignmentData[] }>('/api/assignments').then(r => r.data),

  getAssignmentDetail: (id: number) =>
    api.get<{ success: boolean; message: string; data: AssignmentData }>(`/api/assignments/${id}`).then(r => r.data),

  submitAssignment: (id: number, fileUrl: string) =>
    api.post<{ success: boolean; message: string; data: AssignmentData }>(`/api/assignments/${id}/submit`, null, { params: { file: fileUrl } }).then(r => r.data),

  getFeedback: (id: number) =>
    api.get<{ success: boolean; message: string; data: AssignmentData }>(`/api/assignments/${id}/feedback`).then(r => r.data),
};
