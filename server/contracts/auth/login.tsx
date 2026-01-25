import { fakePromises } from "@/lib/utils";

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

export type confirmEmailRequest = {
    token_hash: string;
};

export type confirmEmailResponse = {
    user: {
        id: string;
        email: string;
        name: string;
        avatar_url: string;
    };
    access_token: string;
    refresh_token: string;
};

const confirmEmailResponseMock: confirmEmailResponse = {
    user: {
        id: '123',
        email: 'test@test.com',
        name: 'Test',
        avatar_url: 'https://test.com/avatar.png',
    },
    access_token: '123',
    refresh_token: '123',
};

export const confirmEmail = async (req: confirmEmailRequest) => {
    return await fakePromises(() => {
        return confirmEmailResponseMock;
    });
}

export type signOutRequest = {
    access_token: string;
};

export type signOutResponse = {
    message: string;
};

const signOutResponseMock: signOutResponse = {
    message: 'Signed out successfully',
};

export const signOut = async (req: signOutRequest) => {
    return await fakePromises(() => {
        return signOutResponseMock;
    });
}