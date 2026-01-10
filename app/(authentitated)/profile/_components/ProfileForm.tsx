"use client";

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import type { ProfileData } from "@/server/contracts/user/profile";

interface ProfileFormProps {
  profile: ProfileData;
  formData: {
    name: string;
    email: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function ProfileForm({
  profile,
  formData,
  onInputChange,
  disabled = false,
}: ProfileFormProps) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-accent border-4 border-black transform translate-x-3 translate-y-3"
      />
      <div className="relative bg-white border-4 border-black p-6">
        <div className="space-y-6">
          <div>
            <Text variant="h3" className="mb-2">
              Informações Pessoais
            </Text>
            <Text variant="caption" className="text-muted-foreground">
              Suas informações básicas de identificação
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="block font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                placeholder="Seu nome completo"
                required
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="block font-medium">
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted cursor-not-allowed"
                title="O e-mail não pode ser alterado"
              />
            </div>
          </div>

          {profile.documentType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="block font-medium">Tipo de Documento</Label>
                <Input
                  value={profile.documentType}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              {profile.documentMasked && (
                <div className="space-y-2">
                  <Label className="block font-medium">Documento</Label>
                  <Input
                    value={profile.documentMasked}
                    disabled
                    className="bg-muted cursor-not-allowed"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
