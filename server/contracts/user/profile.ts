import { apiInstance } from "@/lib/api";

export interface ProfileAddress {
  street: string | null;
  number: string | null;
  complement: string | null;
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
  phone: string | null;
  address: ProfileAddress | null;
  documentType: string | null;
  documentMasked: string | null;
  targetLicenseType: string | null;
}

export type GetProfileResponse = ProfileData;

export interface UpdateProfileRequest {
  name: string;
  photoUrl?: string;
  phone?: string;
  documentType?: "CPF" | "RG" | "CNH";
  document?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  zipcode?: string;
  city?: string;
  state?: string;
  country?: string;
  targetLicenseType?: "A" | "B" | "C" | "D" | "E" | "ACC" | "AB";
}

export type UpdateProfileResponse = {
  user: {
    id: number;
    uuid: string;
    email: string;
    name: string;
    photoUrl: string | null;
    phone: string | null;
    documentType: string | null;
    document: string | null;
  };
  address: {
    id: number;
    uuid: string;
    zipcode: string | null;
    street: string | null;
    number: string | null;
    complement: string | null;
    neighborhood: string | null;
    city: string;
    state: string;
    country: string;
  } | null;
  student: {
    id: number;
    uuid: string;
    targetLicenseType: string | null;
    hasTheoreticalCompleted: boolean;
    totalPracticalHours: number;
    isActive: boolean;
  };
};

export const getProfile = async (): Promise<GetProfileResponse> => {
  const response = await apiInstance.get("/users/profile");
  
  if (!response.ok) {
    throw new Error("Erro ao carregar perfil");
  }

  const data = await response.json();
  
  // Transform backend response to frontend format
  return {
    id: data.user?.uuid || data.uuid || "",
    name: data.user?.name || data.name || "",
    email: data.user?.email || data.email || "",
    photoUrl: data.user?.photoUrl || data.photoUrl || null,
    phone: data.user?.phone || data.phone || null,
    address: data.address ? {
      street: data.address.street,
      number: data.address.number,
      complement: data.address.complement,
      neighborhood: data.address.neighborhood,
      city: data.address.city,
      state: data.address.state,
      zipcode: data.address.zipcode,
      country: data.address.country || "Brasil",
    } : null,
    documentType: data.user?.documentType || data.documentType || null,
    documentMasked: data.user?.document || data.document || null,
    targetLicenseType: data.student?.targetLicenseType || null,
  };
};

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<UpdateProfileResponse> => {
  const response = await apiInstance.put("/users/profile/student", data);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro ao atualizar perfil");
  }

  return await response.json();
};
