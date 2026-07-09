import { useMutation } from '@tanstack/react-query';
import { quizService } from '../services';

export function useGenerateQuiz() {
  return useMutation({
    mutationFn: ({ topic, difficulty, count }: { topic: string; difficulty: string; count: number }) =>
      quizService.generate(topic, difficulty, count),
  });
}

export function useSubmitQuiz() {
  return useMutation({
    mutationFn: ({ attemptId, answersJson }: { attemptId: number; answersJson: string }) =>
      quizService.submit(attemptId, answersJson),
  });
}
