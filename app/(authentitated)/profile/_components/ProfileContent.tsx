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
import { uploadAvatar } from "@/server/contracts/user/avatar";
import { toast } from "sonner";

export function ProfileContent() {
  const { data: profile, isLoading, error } = useGetProfile();
  const updateProfileMutation = useUpdateProfile();

  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    documentType: "" as "" | "CPF" | "RG" | "CNH",
    document: "",
    photoUrl: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    zipcode: "",
    city: "",
    state: "",
    country: "Brasil",
    targetLicenseType: "" as "" | "A" | "B" | "C" | "D" | "E" | "ACC" | "AB",
  });

  useEffect(() => {
    if (profile) {
      console.log(profile, "profile");
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        documentType: (profile.documentType as "CPF" | "RG" | "CNH") || "",
        document: profile.documentMasked || "",
        photoUrl: profile.photoUrl || "",
        street: profile.address?.street || "",
        number: profile.address?.number || "",
        complement: profile.address?.complement || "",
        neighborhood: profile.address?.neighborhood || "",
        zipcode: profile.address?.zipcode || "",
        city: profile.address?.city || "",
        state: profile.address?.state || "",
        country: profile.address?.country || "Brasil",
        targetLicenseType: (profile.targetLicenseType as "A" | "B" | "C" | "D" | "E" | "ACC" | "AB") || "",
      });
      setSelectedState(profile.address?.state || "");
      setSelectedCity(profile.address?.city || "");
      setPhotoPreview(profile.photoUrl);
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(formData.photoUrl || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }

    try {
      let photoUrl = formData.photoUrl;

      // Step 1: Upload photo if a new one was selected
      if (photoFile) {
        toast.info("Enviando foto...");
        const uploadResult = await uploadAvatar({ file: photoFile });
        photoUrl = uploadResult.photoUrl;
      }

      // Step 2: Update profile with all data
      const updateData: UpdateProfileRequest = {
        name: formData.name,
        photoUrl: photoUrl || undefined,
        phone: formData.phone || undefined,
        documentType: formData.documentType || undefined,
        document: formData.document || undefined,
        street: formData.street || undefined,
        number: formData.number || undefined,
        complement: formData.complement || undefined,
        neighborhood: formData.neighborhood || undefined,
        zipcode: formData.zipcode || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        country: formData.country || undefined,
        targetLicenseType: formData.targetLicenseType || undefined,
      };

      await updateProfileMutation.mutateAsync(updateData);
      setPhotoFile(null); // Clear photo file after successful upload
    } catch (error) {
      console.error("Error updating profile:", error);
      // Error toast will be shown by the mutation's onError
    }
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileAvatar 
          profile={profile} 
          onPhotoChange={handlePhotoChange}
          photoPreview={photoPreview}
        />

        <ProfileForm
          profile={profile}
          formData={formData}
          onInputChange={handleInputChange}
          disabled={updateProfileMutation.isPending}
        />

        <ProfileAddress
          profile={profile}
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
                      phone: profile.phone || "",
                      documentType: (profile.documentType as "CPF" | "RG" | "CNH") || "",
                      document: profile.documentMasked || "",
                      photoUrl: profile.photoUrl || "",
                      street: profile.address?.street || "",
                      number: profile.address?.number || "",
                      complement: profile.address?.complement || "",
                      neighborhood: profile.address?.neighborhood || "",
                      zipcode: profile.address?.zipcode || "",
                      city: profile.address?.city || "",
                      state: profile.address?.state || "",
                      country: profile.address?.country || "Brasil",
                      targetLicenseType: (profile.targetLicenseType as "A" | "B" | "C" | "D" | "E" | "ACC" | "AB") || "",
                    });
                    setSelectedState(profile.address?.state || "");
                    setSelectedCity(profile.address?.city || "");
                    setPhotoFile(null);
                    setPhotoPreview(profile.photoUrl);
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
