export type Address = {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
};

export type User = {
    id: string;
    email: string;
    name: string;
    avatar_url: string;
    address: Address;
};

export type AuthUser = {
    user: User;
    access_token: string;
    refresh_token: string;
};