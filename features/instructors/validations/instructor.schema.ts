/**
 * Instructor Validation Schemas
 *
 * Schemas Zod para validação de dados de instrutores
 */

import { z } from "zod";

export const vehicleSchema = z.object({
  type: z.enum(["manual", "automatic"], {
    message: "Tipo de veículo deve ser manual ou automático",
  }),
  model: z.string().min(1, "Modelo do veículo é obrigatório").max(100),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
});

export const instructorSchema = z.object({
  userId: z.string().uuid("ID de usuário inválido"),
  bio: z.string().min(10, "Bio deve ter no mínimo 10 caracteres").max(500),
  phone: z.string().regex(/^\d{11}$/, "Telefone deve ter 11 dígitos"),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres").max(100),
  state: z
    .string()
    .length(2, "Estado deve ter 2 caracteres (sigla)")
    .toUpperCase(),
  pricePerHour: z.number().positive("Preço por hora deve ser positivo"),
  vehicle: vehicleSchema,
});

export const updateInstructorSchema = instructorSchema.partial();

export const instructorFiltersSchema = z.object({
  city: z.string().optional(),
  state: z.string().length(2).toUpperCase().optional(),
  vehicleType: z.enum(["manual", "automatic"]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  maxPrice: z.number().positive().optional(),
  verified: z.boolean().optional(),
});

export type InstructorSchema = z.infer<typeof instructorSchema>;
export type UpdateInstructorSchema = z.infer<typeof updateInstructorSchema>;
export type InstructorFiltersSchema = z.infer<typeof instructorFiltersSchema>;
