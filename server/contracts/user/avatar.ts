import { apiInstance } from "@/lib/api";

export interface UploadAvatarRequest {
  file: File;
  userId?: string;
}

export interface UploadAvatarResponse {
  photoUrl: string;
  message: string;
}

export const uploadAvatar = async (
  data: UploadAvatarRequest
): Promise<UploadAvatarResponse> => {
  const url = "/files/images/upload";

  const formData = new FormData();
  formData.append("file", data.file);
  if (data.userId != null && data.userId !== "") {
    formData.append("userId", data.userId);
  }

  const response = await apiInstance.post(url, formData);
  if (!response.ok) throw new Error("Erro ao fazer upload da foto");

  const result = (await response.json()) as {
    optimizedUrl?: string;
    thumbnailUrl?: string;
    secureUrl?: string;
    url?: string;
  };

  const photoUrl =
    result.thumbnailUrl ?? result.optimizedUrl ?? result.secureUrl ?? result.url ?? "";

  if (!photoUrl) {
    throw new Error("Resposta do servidor não contém URL da imagem");
  }

  return {
    photoUrl,
    message: "Foto de perfil atualizada com sucesso",
  };
};
