import { useQuery } from '@tanstack/react-query';
import { featureService } from '../services/features';

export function useFeatures() {
  return useQuery({
    queryKey: ['features'],
    queryFn: () => featureService.getFeatures(),
    staleTime: 300000,
  });
}
