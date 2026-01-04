/**
 * Instructor Validation Schemas
 *
 * Schemas Zod para validação de dados de instrutores
 */

import { z } from "zod";

export const instructorSchema = z.object({
  id: z.string().uuid("ID inválido"),
  driversLicense: z.string().nullable().optional(),
  isActive: z.boolean().nullable().optional(),
  profileId: z.string().uuid().nullable().optional(),
  addressId: z.string().uuid().nullable().optional(),
});

export const updateInstructorSchema = instructorSchema.partial();

export const instructorFiltersSchema = z.object({
  isActive: z.boolean().optional(),
  minRating: z.number().min(0).max(5).optional(),
});

export type InstructorSchema = z.infer<typeof instructorSchema>;
export type UpdateInstructorSchema = z.infer<typeof updateInstructorSchema>;
export type InstructorFiltersSchema = z.infer<typeof instructorFiltersSchema>;
