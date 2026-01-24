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
    id: string;
    email: string;
    name: string;
};
const signUpResponseMock: SignUpResponse = {
    id: '123',
    email: 'test@test.com',
    name: 'Test',

};

export const signUp = async (req: SignUpRequest) => {
    return await fakePromises(() => {
        return signUpResponseMock;
    });
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