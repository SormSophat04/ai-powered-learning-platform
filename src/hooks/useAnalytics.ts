import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '../services';

export function usePerformance() {
  return useQuery({
    queryKey: ['analytics', 'performance'],
    queryFn: () => analyticsService.getPerformance(),
    staleTime: 120000,
  });
}

export function useSubjectStrengths() {
  return useQuery({
    queryKey: ['analytics', 'strengths'],
    queryFn: () => analyticsService.getSubjectStrengths(),
    staleTime: 120000,
  });
}

export function useStudyHours() {
  return useQuery({
    queryKey: ['analytics', 'studyHours'],
    queryFn: () => analyticsService.getStudyHours(),
    staleTime: 120000,
  });
}

export function useGradePrediction() {
  return useQuery({
    queryKey: ['analytics', 'prediction'],
    queryFn: () => analyticsService.getGradePrediction(),
    staleTime: 300000,
  });
}
