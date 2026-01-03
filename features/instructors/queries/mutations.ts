/**
 * Instructor Mutations
 *
 * React Query hooks para mutações de instrutores
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instructorApi } from "../api/instructor.api";
import type {
  CreateInstructorInput,
  UpdateInstructorInput,
} from "../types/instructor.types";

/**
 * Hook para criar novo instrutor
 */
export function useCreateInstructorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstructorInput) => instructorApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

/**
 * Hook para atualizar instrutor
 */
export function useUpdateInstructorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateInstructorInput }) =>
      instructorApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      queryClient.invalidateQueries({
        queryKey: ["instructors", variables.id],
      });
    },
  });
}

/**
 * Hook para deletar instrutor
 */
export function useDeleteInstructorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => instructorApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

/**
 * Hook para verificar instrutor (admin only)
 */
export function useVerifyInstructorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => instructorApi.verify(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
      queryClient.invalidateQueries({ queryKey: ["instructors", id] });
    },
  });
}
