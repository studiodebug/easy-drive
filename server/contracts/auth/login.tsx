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
    avatar_url: string;
  };
};

const signInResponseMock: LoginResponse = {
    access_token: '123',
    refresh_token: '123',
    user: {
        id: '123',
        email: 'test@test.com',
        name: 'Test',
        avatar_url: 'https://test.com/avatar.png',
    },
};

export const signIn = async (req: LoginRequest) => {
    return await fakePromises(() => {
        return signInResponseMock;
    });
};

export type RefreshRequest = {
    refresh_token: string;
};

export type RefreshResponse = LoginResponse;

export const refresh = async (req: RefreshRequest) => {
    return await fakePromises(() => {
        // Mock validation: in a real backend you'd verify/rotate refresh tokens.
        if (!req.refresh_token) {
            throw new Error("Missing refresh_token");
        }

        // Rotate tokens on refresh to mimic real-world behavior.
        const access_token =
            typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-access`;

        const refresh_token =
            typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-refresh`;

        return {
            access_token,
            refresh_token,
            user: signInResponseMock.user,
        };
    });
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