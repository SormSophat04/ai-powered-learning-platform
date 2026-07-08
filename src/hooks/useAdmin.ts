import { useQuery } from '@tanstack/react-query';
import { adminService } from '../services';

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => adminService.getStats(),
    staleTime: 60000,
  });
}
