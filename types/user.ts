export type User = {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
};

export type AuthUser = {
    user: User;
    access_token: string;
    refresh_token: string;
};