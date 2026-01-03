/**
 * User Validation Schemas
 */

import { z } from "zod";

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(100),
  role: z.enum(["student", "instructor", "admin"]),
  phone: z
    .string()
    .regex(/^\d{11}$/)
    .optional(),
  cpf: z
    .string()
    .regex(/^\d{11}$/)
    .optional(),
});

export const updateUserSchema = userSchema.partial().omit({ email: true });

export type UserSchema = z.infer<typeof userSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
