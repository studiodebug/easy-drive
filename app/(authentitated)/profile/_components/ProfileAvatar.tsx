"use client";

import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import type { ProfileData } from "@/server/contracts/user/profile";
import { useAuth } from "@/providers/auth/AuthProvider";

interface ProfileAvatarProps {
  profile: ProfileData;
  onPhotoChange: (file: File | null) => void;
  photoPreview: string | null;
}

export function ProfileAvatar({ profile, onPhotoChange, photoPreview }: ProfileAvatarProps) {
  const { user } = useAuth();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem (JPG, PNG, GIF ou WebP)");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 5MB");
      return;
    }

    onPhotoChange(file);
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
              Atualize sua foto de perfil. Formatos aceitos: JPG, PNG, GIF, WebP. Tamanho máximo: 5MB
            </Text>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar
                size="lg"
                name={user?.email || "User"}
                src={photoPreview ?? user?.avatar_url ?? undefined}
                alt={user?.email || "Profile"}
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
                />
              </label>
            </div>
            <div className="flex-1">
              <Button
                type="button"
                className="max-w-fit"
                asChild
              >
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  Alterar Foto
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
