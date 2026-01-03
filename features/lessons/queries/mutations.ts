/**
 * Lesson Mutations - TODO: Implementar
 */

import { useMutation } from "@tanstack/react-query";

export function useCreateLessonMutation() {
  return useMutation({
    mutationFn: (_data: unknown) =>
      Promise.reject(new Error("Not implemented")),
  });
}

export function useUpdateLessonMutation() {
  return useMutation({
    mutationFn: (_params: { id: string; data: unknown }) =>
      Promise.reject(new Error("Not implemented")),
  });
}
