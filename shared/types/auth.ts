export type User = {
  id: string;
  email: string;
  email_confirmed_at?: string;
  created_at: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type UpdatePasswordInput = {
  password: string;
  confirmPassword?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};
