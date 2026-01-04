/**
 * Review Validation Schemas
 */

import { z } from "zod";

export const reviewSchema = z.object({
  instructorId: z.string().uuid(),
  userId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(500),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
