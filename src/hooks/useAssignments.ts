import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { assignmentService } from '../services';

export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentService.getAssignments(),
    staleTime: 5000,
    refetchInterval: (query) => {
      const data = query?.state?.data;
      if (Array.isArray(data) && data.some(a => a.status === 'SUBMITTED')) {
        return 2000;
      }
      return false;
    }
  });
}

export function useSubmitAssignment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) =>
      assignmentService.submitAssignment(id, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}
