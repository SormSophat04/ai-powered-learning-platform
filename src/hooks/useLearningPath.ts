import { useQuery } from '@tanstack/react-query';
import { learningPathService } from '../services';

export function useLearningPath() {
  return useQuery({
    queryKey: ['learning-path'],
    queryFn: () => learningPathService.getLearningPath(),
    staleTime: 120000,
  });
}

export function useRecommendation() {
  return useQuery({
    queryKey: ['learning-path', 'recommendation'],
    queryFn: () => learningPathService.getRecommendation(),
    staleTime: 300000,
  });
}
