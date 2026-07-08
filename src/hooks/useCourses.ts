import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { courseService } from '../services';

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getCourses(),
    staleTime: 300000,
  });
}

export function useCourseDetail(courseId: number | undefined) {
  return useQuery({
    queryKey: ['courses', courseId],
    queryFn: () => courseService.getCourseDetail(courseId!),
    enabled: !!courseId,
    staleTime: 60000,
  });
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (courseId: number) => courseService.enroll(courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { title: string; description?: string; category?: string; difficulty?: string; imageUrl?: string }) => courseService.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, lessonId }: { courseId: number; lessonId: number }) => courseService.completeLesson(courseId, lessonId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses', variables.courseId] });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseId, progress }: { courseId: number; progress: number }) => courseService.updateProgress(courseId, progress),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['courses', variables.courseId] });
    },
  });
}
