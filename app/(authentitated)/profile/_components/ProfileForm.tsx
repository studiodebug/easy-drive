"use client";

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Text } from "@/components/retroui/Text";
import { Select } from "@/components/retroui/Select";
import type { ProfileData } from "@/server/contracts/user/profile";

interface ProfileFormProps {
  profile: ProfileData;
  formData: {
    name: string;
    email: string;
    phone: string;
    documentType: "" | "CPF" | "RG" | "CNH";
    document: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
}

export function ProfileForm({
  profile,
  formData,
  onInputChange,
  disabled = false,
}: ProfileFormProps) {
  console.log(formData);
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="block font-medium">
                Telefone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={onInputChange}
                placeholder="(00) 00000-0000"
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentType" className="block font-medium">
                Tipo de Documento
              </Label>
              <Select
                value={formData.documentType || profile.documentType || ""}
                onValueChange={(value) => {
                  const event = {
                    target: {
                      name: "documentType",
                      value,
                    },
                    currentTarget: {
                      name: "documentType",
                      value,
                    },
                  } as React.ChangeEvent<HTMLSelectElement>;
                  onInputChange(event);
                }}
                disabled={disabled}
              >
                <Select.Trigger id="documentType" className="w-full">
                  <Select.Value placeholder="Selecione" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="CPF">CPF</Select.Item>
                  <Select.Item value="RG">RG</Select.Item>
                  <Select.Item value="CNH">CNH</Select.Item>
                </Select.Content>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="document" className="block font-medium">
                Número do Documento
              </Label>
              <Input
                id="document"
                name="document"
                value={formData.document}
                onChange={onInputChange}
                placeholder="Digite o número do documento"
                disabled={disabled}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
