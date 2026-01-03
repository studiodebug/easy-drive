/**
 * User Types
 */

export type UserRole = "student" | "instructor" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  cpf?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt">;
export type UpdateUserInput = Partial<Omit<CreateUserInput, "email">>;
