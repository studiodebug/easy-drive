import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    repeatPassword: z.string().min(1, "Repita sua senha"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Senhas não coincidem",
    path: ["repeatPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Email inválido"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    repeatPassword: z.string().min(1, "Repita sua senha"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Senhas não coincidem",
    path: ["repeatPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
