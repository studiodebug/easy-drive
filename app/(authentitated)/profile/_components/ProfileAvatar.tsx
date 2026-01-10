"use client";

import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { Camera, Loader2 } from "lucide-react";
import { useUploadAvatar } from "@/queries/user/avatar.query";
import { useState } from "react";
import type { ProfileData } from "@/server/contracts/user/profile";

interface ProfileAvatarProps {
  profile: ProfileData;
}

export function ProfileAvatar({ profile }: ProfileAvatarProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile.photoUrl);
  const uploadAvatarMutation = useUploadAvatar();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      const result = await uploadAvatarMutation.mutateAsync({ file });
      setAvatarPreview(result.photoUrl);
    } catch (error) {
      // Error is handled by the mutation's onError
      setAvatarPreview(profile.photoUrl);
    }
  };

  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-accent border-4 border-black transform translate-x-3 translate-y-3"
      />
      <div className="relative bg-white border-4 border-black p-6">
        <div className="space-y-6">
          <div>
            <Text variant="h3" className="mb-2">
              Foto de Perfil
            </Text>
            <Text variant="caption" className="text-muted-foreground">
              Atualize sua foto de perfil. Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5MB
            </Text>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                size="lg"
                name={profile.name || "User"}
                src={avatarPreview || undefined}
                alt={profile.name || "Profile"}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-primary border-2 border-black rounded cursor-pointer shadow-md hover:shadow-xs transition-shadow"
                aria-label="Alterar foto de perfil"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                  disabled={uploadAvatarMutation.isPending}
                />
              </label>
            </div>
            <div className="flex-1">
              <Button
                type="button"
                className="max-w-fit"
                asChild
                disabled={uploadAvatarMutation.isPending}
              >
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  {uploadAvatarMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    "Alterar Foto"
                  )}
                </label>
              </Button>
              <Text variant="caption" className="block mt-2">
                Clique no botão ou na câmera para selecionar uma nova foto
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
