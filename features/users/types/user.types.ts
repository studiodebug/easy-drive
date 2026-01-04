/**
 * User Types
 */

export type User = {
  id: string;
  name: string;
  photoUrl?: string | null;
  documentType?: "CPF" | "RG" | "CNH" | null;
  document?: string | null;
  addressId?: string | null;
  instructorId?: string | null;
  studentId?: string | null;
  walletId?: string | null;
  createdAt: string;
};

export type CreateUserInput = Omit<User, "id" | "createdAt">;
export type UpdateUserInput = Partial<Omit<CreateUserInput, never>>;
