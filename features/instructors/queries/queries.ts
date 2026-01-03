/**
 * Instructor Queries
 *
 * React Query hooks para buscar dados de instrutores
 */

import { useQuery } from "@tanstack/react-query";
import { instructorApi } from "../api/instructor.api";
import type { InstructorFilters } from "../types/instructor.types";

/**
 * Hook para buscar todos os instrutores
 */
export function useInstructorsQuery(filters?: InstructorFilters) {
  return useQuery({
    queryKey: ["instructors", filters],
    queryFn: () => instructorApi.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

/**
 * Hook para buscar um instrutor por ID
 */
export function useInstructorQuery(id: string) {
  return useQuery({
    queryKey: ["instructors", id],
    queryFn: () => instructorApi.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
