export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    avatar_url: string | null;
  };
};

export const signIn = async (req: LoginRequest): Promise<LoginResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: req.email,
      password: req.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to authenticate" }));
    throw new Error(errorData.message || "Email ou senha inválidos");
  }

  const data = await response.json();
  return data;
};

export type RefreshRequest = {
    refresh_token: string;
};

export type RefreshResponse = LoginResponse;

export const refresh = async (req: RefreshRequest): Promise<RefreshResponse> => {
  if (!req.refresh_token) {
    throw new Error("Missing refresh_token");
  }

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/refresh-token`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: req.refresh_token,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to refresh token" }));
    throw new Error(errorData.message || "Invalid refresh token");
  }

  const data = await response.json();
  return data;
};

export type SignUpRequest = {
    name: string;
    email: string;
    password: string;
  };

export type SignUpResponse = {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        avatar_url: string | null;
    };
};

export const signUp = async (req: SignUpRequest): Promise<SignUpResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/signup`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: req.name,
      email: req.email,
      password: req.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Failed to create account" }));
    throw new Error(errorData.message || "Erro ao criar conta");
  }

  const data = await response.json();
  
  // Transform backend response to match SignUpResponse type (id: number -> id: string)
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: {
      id: data.user.id.toString(),
      email: data.user.email,
      name: data.user.name,
      avatar_url: data.user.avatar_url,
    },
  };
}

export type ConfirmEmailRequest = {
  token: string;
};

export type ConfirmEmailResponse = {
  user: {
    id: number;
    uuid: string;
    email: string;
    name: string;
    avatar_url: string | null;
  };
  access_token: string;
  refresh_token: string;
};

export const confirmEmail = async (req: ConfirmEmailRequest): Promise<ConfirmEmailResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/confirm-email`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: req.token }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Link de confirmação inválido ou expirado" }));
    throw new Error(errorData.message || "Link de confirmação inválido ou expirado");
  }

  return response.json();
};

export type RequestPasswordResetRequest = {
  email: string;
};

export type RequestPasswordResetResponse = {
  message: string;
};

export const requestPasswordReset = async (req: RequestPasswordResetRequest): Promise<RequestPasswordResetResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/forgot-password`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: req.email }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Não foi possível enviar o email" }));
    throw new Error(errorData.message || "Não foi possível enviar o email");
  }

  return response.json();
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type ResetPasswordResponse = {
  message: string;
};

export const resetPassword = async (req: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3333";
  const url = `${backendUrl}/users/reset-password`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: req.token, password: req.password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Link de redefinição inválido ou expirado" }));
    throw new Error(errorData.message || "Link de redefinição inválido ou expirado");
  }

  return response.json();
};

export type signOutRequest = {
  access_token: string;
};

export type signOutResponse = {
  message: string;
};

/**
 * Sign-out is handled entirely client-side by clearing auth cookies via the
 * Next.js /api/auth/logout BFF route. The backend does not expose a dedicated
 * logout endpoint, so this function delegates to that route.
 */
export const signOut = async (_req: signOutRequest): Promise<signOutResponse> => {
  const response = await fetch("/api/auth/logout", { method: "POST" });
  if (!response.ok) {
    return { message: "Signed out" };
  }
  return { message: "Signed out successfully" };
};