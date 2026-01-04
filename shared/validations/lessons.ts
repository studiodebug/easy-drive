/**
 * Lesson Validation Schemas
 */

import { z } from "zod";

export const lessonSchema = z
  .object({
    instructorId: z.string().uuid("ID de instrutor inválido"),
    studentId: z.string().uuid("ID de aluno inválido"),
    startDateTime: z.string().datetime("Data/hora inicial inválida"),
    endDateTime: z.string().datetime("Data/hora final inválida"),
    location: z.string().min(5, "Local deve ter no mínimo 5 caracteres"),
    objectives: z
      .array(z.string())
      .min(1, "Pelo menos um objetivo é necessário"),
    notes: z.string().optional(),
    price: z.number().positive("Preço deve ser positivo"),
  })
  .refine((data) => new Date(data.endDateTime) > new Date(data.startDateTime), {
    message: "Data final deve ser posterior à data inicial",
    path: ["endDateTime"],
  });

export const updateLessonSchema = lessonSchema
  .partial()
  .omit({ instructorId: true, studentId: true });

export const lessonStatusSchema = z.enum([
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export type LessonSchema = z.infer<typeof lessonSchema>;
export type UpdateLessonSchema = z.infer<typeof updateLessonSchema>;
