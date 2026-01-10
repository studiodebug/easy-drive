import { fakePromises } from "@/lib/utils";

export interface UploadAvatarRequest {
  file: File;
}

export interface UploadAvatarResponse {
  photoUrl: string;
  message: string;
}

export const uploadAvatar = async (
  data: UploadAvatarRequest
): Promise<UploadAvatarResponse> => {
  return await fakePromises(() => {
    // In a real implementation, you would:
    // 1) Upload file to storage (Supabase Storage, S3, etc.)
    // 2) Get public URL
    // 3) Update user record with photo_url
    // 4) Return the public URL
    
    // For now, return a mock URL
    const mockPhotoUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`;
    
    return {
      photoUrl: mockPhotoUrl,
      message: "Foto de perfil atualizada com sucesso",
    };
  });
};
