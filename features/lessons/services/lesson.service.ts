/**
 * Lesson Service - TODO: Implementar com Supabase
 */

import type {
  CreateLessonInput,
  Lesson,
  LessonFilters,
  UpdateLessonInput,
} from "../types/lesson.types";

export const lessonService = {
  async findAll(filters?: LessonFilters): Promise<Lesson[]> {
    console.log("Finding lessons with filters:", filters);
    return [];
  },

  async findById(id: string): Promise<Lesson | null> {
    console.log("Finding lesson by id:", id);
    return null;
  },

  async create(data: CreateLessonInput): Promise<Lesson> {
    console.log("Creating lesson:", data);
    throw new Error("Not implemented");
  },

  async update(id: string, data: UpdateLessonInput): Promise<Lesson> {
    console.log("Updating lesson:", id, data);
    throw new Error("Not implemented");
  },

  async delete(id: string): Promise<void> {
    console.log("Deleting lesson:", id);
    throw new Error("Not implemented");
  },

  async updateStatus(id: string, status: string): Promise<Lesson> {
    console.log("Updating lesson status:", id, status);
    throw new Error("Not implemented");
  },
};
