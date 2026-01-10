"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Loader2 } from "lucide-react";
import { useGetProfile, useUpdateProfile } from "@/queries/user/profile.query";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import { ProfileAddress } from "./ProfileAddress";
import type { UpdateProfileRequest } from "@/server/contracts/user/profile";

export function ProfileContent() {
  const { data: profile, isLoading, error } = useGetProfile();
  const updateProfileMutation = useUpdateProfile();

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    number: "",
    neighborhood: "",
    zipcode: "",
    city: "",
    state: "",
    country: "Brasil",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        street: profile.address?.street || "",
        number: profile.address?.number || "",
        neighborhood: profile.address?.neighborhood || "",
        zipcode: profile.address?.zipcode || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        country: profile.address?.country || "Brasil",
      });
      setSelectedState(profile.address?.state || "");
      setSelectedCity(profile.address?.city || "");
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (stateCode: string) => {
    setSelectedState(stateCode);
    setSelectedCity(""); // Reset city when state changes
    setFormData((prev) => ({ ...prev, state: stateCode, city: "" }));
  };

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    setFormData((prev) => ({ ...prev, city: cityName }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      return;
    }

    const updateData: UpdateProfileRequest = {
      name: formData.name,
      street: formData.street || undefined,
      number: formData.number || undefined,
      neighborhood: formData.neighborhood || undefined,
      zipcode: formData.zipcode || undefined,
      city: formData.city,
      state: formData.state,
      country: formData.country || undefined,
    };

    await updateProfileMutation.mutateAsync(updateData);
  };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Text variant="body" className="text-destructive">
          Erro ao carregar perfil. Por favor, tente novamente.
        </Text>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <Text variant="h1">Meu Perfil</Text>
        <Text variant="body" className="text-muted-foreground mt-2">
          Gerencie suas informações pessoais e endereço
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileAvatar profile={profile} />

        <ProfileForm
          profile={profile}
          formData={formData}
          onInputChange={handleInputChange}
          disabled={updateProfileMutation.isPending}
        />

        <ProfileAddress
          formData={formData}
          selectedState={selectedState}
          selectedCity={selectedCity}
          onInputChange={handleInputChange}
          onStateChange={handleStateChange}
          onCityChange={handleCityChange}
          disabled={updateProfileMutation.isPending}
        />

        {/* Action Buttons */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-accent border-4 border-black transform translate-x-3 translate-y-3"
          />
          <div className="relative bg-white border-4 border-black p-6">
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (profile) {
                    setFormData({
                      name: profile.name || "",
                      email: profile.email || "",
                      street: profile.address?.street || "",
                      number: profile.address?.number || "",
                      neighborhood: profile.address?.neighborhood || "",
                      zipcode: profile.address?.zipcode || "",
                      city: profile.address?.city || "",
                      state: profile.address?.state || "",
                      country: profile.address?.country || "Brasil",
                    });
                    setSelectedState(profile.address?.state || "");
                    setSelectedCity(profile.address?.city || "");
                  }
                }}
                disabled={updateProfileMutation.isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="default" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
