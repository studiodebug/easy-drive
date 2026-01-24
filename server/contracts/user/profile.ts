import { fakePromises } from "@/lib/utils";

export interface ProfileAddress {
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  zipcode: string | null;
  country: string;
}

export interface ProfileData {
  id: string;
  name: string;
  email: string;
  photoUrl: string | null;
  address: ProfileAddress | null;
  documentType: string | null;
  documentMasked: string | null;
}

export type GetProfileResponse = ProfileData;

export interface UpdateProfileRequest {
  name: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  zipcode?: string;
  city: string;
  state: string;
  country?: string;
}

export type UpdateProfileResponse = ProfileData;

const profileDataMock: GetProfileResponse = {
  id: "123",
  name: "Usuário Teste",
  email: "user@example.com",
  photoUrl: null,
  address: {
    street: "Rua Exemplo",
    number: "123",
    neighborhood: "Centro",
    city: "Iquexique",
    state: "BA",
    zipcode: "47800-000",
    country: "Brasil",
  },
  documentType: "CPF",
  documentMasked: "XXX.XXX.123-45",
};

export const getProfile = async (): Promise<GetProfileResponse> => {
  return await fakePromises(() => {
    return profileDataMock;
  });
};

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  return await fakePromises(() => {
    return {
      ...profileDataMock,
      name: data.name,
      address: {
        street: data.street || null,
        number: data.number || null,
        neighborhood: data.neighborhood || null,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode || null,
        country: data.country || "Brasil",
      },
    };
  });
};
