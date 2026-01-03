/**
 * Availability Validation Schemas
 */

import { z } from "zod";

const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;

export const availabilitySchema = z
  .object({
    instructorId: z.string().uuid(),
    dayOfWeek: z.number().int().min(0).max(6),
    startTime: z.string().regex(timeRegex, "Formato de hora inválido (HH:mm)"),
    endTime: z.string().regex(timeRegex, "Formato de hora inválido (HH:mm)"),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "Horário final deve ser posterior ao inicial",
    path: ["endTime"],
  });

export const updateAvailabilitySchema = availabilitySchema
  .partial()
  .omit({ instructorId: true });

export type AvailabilitySchema = z.infer<typeof availabilitySchema>;
export type UpdateAvailabilitySchema = z.infer<typeof updateAvailabilitySchema>;
