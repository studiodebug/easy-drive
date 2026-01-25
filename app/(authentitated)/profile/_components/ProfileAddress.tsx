"use client";

import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Select } from "@/components/retroui/Select";
import { Text } from "@/components/retroui/Text";
import { brazilStates } from "@/app/(public)/vitrine/_components/brazil-locations";
import { useAuth } from "@/providers/auth/AuthProvider";

interface ProfileAddressProps {
  formData: {
    street: string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: string;
    state: string;
    country: string;
  };
  selectedState: string;
  selectedCity: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStateChange: (stateCode: string) => void;
  onCityChange: (cityName: string) => void;
  disabled?: boolean;
}

export function ProfileAddress({
  formData,
  selectedState,
  selectedCity,
  onInputChange,
  onStateChange,
  onCityChange,
  disabled = false,
}: ProfileAddressProps) {
  const selectedStateData = brazilStates.find((s) => s.code === selectedState);
  const availableCities = selectedStateData?.cities || [];
  const {user} = useAuth();
  return (
    <div className="relative">
      <div
        className="absolute inset-0 bg-accent border-4 border-black transform translate-x-3 translate-y-3"
      />
      <div className="relative bg-white border-4 border-black p-6">
        <div className="space-y-6">
          <div>
            <Text variant="h3" className="mb-2">
              Endereço
            </Text>
            <Text variant="caption" className="text-muted-foreground">
              Informações do seu endereço residencial
            </Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="street" className="block font-medium">
                Rua
              </Label>
              <Input
                id="street"
                name="street"
                value={formData.street}
                onChange={onInputChange}
                placeholder="Nome da rua"
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number" className="block font-medium">
                Número
              </Label>
              <Input
                id="number"
                name="number"
                value={formData.number}
                onChange={onInputChange}
                placeholder="123"
                disabled={disabled}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="block font-medium">
                Bairro
              </Label>
              <Input
                id="neighborhood"
                name="neighborhood"
                value={formData.neighborhood}
                onChange={onInputChange}
                placeholder="Nome do bairro"
                disabled={disabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipcode" className="block font-medium">
                CEP
              </Label>
              <Input
                id="zipcode"
                name="zipcode"
                value={formData.zipcode}
                onChange={onInputChange}
                placeholder="00000-000"
                maxLength={9}
                disabled={disabled}
                onInput={(e) => {
                  const value = e.currentTarget.value.replace(/\D/g, "");
                  const formatted = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
                  onInputChange({
                    ...e,
                    currentTarget: {
                      ...e.currentTarget,
                      value: formatted,
                    },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state" className="block font-medium">
                Estado *
              </Label>
              <Select
                value={selectedState}
                onValueChange={onStateChange}
                disabled={disabled}
              >
                <Select.Trigger id="state" className="w-full">
                  <Select.Value placeholder="Selecione um estado" />
                </Select.Trigger>
                <Select.Content>
                  {brazilStates.map((state) => (
                    <Select.Item key={state.code} value={state.code}>
                      {state.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="block font-medium">
                Cidade *
              </Label>
              <Select
                value={selectedCity}
                onValueChange={onCityChange}
                disabled={disabled || !selectedState}
              >
                <Select.Trigger id="city" className="w-full">
                  <Select.Value placeholder="Selecione uma cidade" />
                </Select.Trigger>
                <Select.Content>
                  {availableCities.length > 0 ? (
                    availableCities.map((city) => (
                      <Select.Item key={city.code} value={city.name}>
                        {city.name}
                      </Select.Item>
                    ))
                  ) : (
                    <Select.Item value="none" disabled>
                      Selecione um estado primeiro
                    </Select.Item>
                  )}
                </Select.Content>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="block font-medium">
              País
            </Label>
            <Input
              id="country"
              name="country"
              value={formData.country}
              disabled
              className="bg-muted cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
