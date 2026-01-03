/**
 * Lesson Queries - TODO: Implementar
 */

import { useQuery } from "@tanstack/react-query";

export function useLessonsQuery() {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => Promise.resolve([]),
  });
}

export function useLessonQuery(id: string) {
  return useQuery({
    queryKey: ["lessons", id],
    queryFn: () => Promise.resolve(null),
    enabled: !!id,
  });
}
