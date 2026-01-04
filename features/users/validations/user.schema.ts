/**
 * User Validation Schemas
 */

import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(3).max(100),
  photoUrl: z.string().url().nullable().optional(),
  documentType: z.enum(["CPF", "RG", "CNH"]).nullable().optional(),
  document: z.string().nullable().optional(),
  addressId: z.string().uuid().nullable().optional(),
  instructorId: z.string().uuid().nullable().optional(),
  studentId: z.string().uuid().nullable().optional(),
  walletId: z.string().uuid().nullable().optional(),
});

export const updateUserSchema = userSchema.partial();

export type UserSchema = z.infer<typeof userSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
