import { useQuery } from '@tanstack/react-query';
import { teacherService } from '../services';

export function useTeacherDashboard() {
  return useQuery({
    queryKey: ['teacher', 'dashboard'],
    queryFn: () => teacherService.getDashboard(),
    staleTime: 60000,
  });
}
