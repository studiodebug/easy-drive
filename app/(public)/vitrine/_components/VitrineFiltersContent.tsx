"use client";

import { RadioGroup } from "@/components/retroui/Radio";
import { Checkbox } from "@/components/retroui/Checkbox";
import { Label } from "@/components/retroui/Label";
import { Input } from "@/components/retroui/Input";
import { Select } from "@/components/retroui/Select";
import { brazilStates, getCitiesByState } from "./brazil-locations";
import { useState, useEffect } from "react";

interface VitrineFiltersContentProps {
  selectedState?: string;
  selectedCity?: string;
  onStateChange?: (state: string) => void;
  onCityChange?: (city: string) => void;
}

export function VitrineFiltersContent({
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}: VitrineFiltersContentProps) {
  const [localState, setLocalState] = useState(selectedState || "");
  const [localCity, setLocalCity] = useState(selectedCity || "");

  useEffect(() => {
    setLocalState(selectedState || "");
    setLocalCity(selectedCity || "");
  }, [selectedState, selectedCity]);

  const currentState = localState || selectedState || "";
  const currentCity = localCity || selectedCity || "";
  const availableCities = currentState ? getCitiesByState(currentState) : [];

  const handleStateChange = (value: string) => {
    const newState = value === "__all__" || !value ? "" : value;
    setLocalState(newState);
    setLocalCity("");
    onStateChange?.(newState);
    onCityChange?.("");
  };

  const handleCityChange = (value: string) => {
    const newCity = value === "__all__" || !value ? "" : value;
    setLocalCity(newCity);
    onCityChange?.(newCity);
  };

  return (
    <div>
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Localização</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="state" className="text-sm mb-2 block">
              Estado
            </Label>
            <Select
              value={currentState || "__all__"}
              onValueChange={handleStateChange}
            >
              <Select.Trigger id="state" className="w-full">
                <Select.Value placeholder="Todos os estados" />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="__all__">Todos os estados</Select.Item>
                {brazilStates.map((state) => (
                  <Select.Item key={state.code} value={state.code}>
                    {state.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div>
            <Label htmlFor="city" className="text-sm mb-2 block">
              Cidade
            </Label>
            <Select
              value={currentCity || "__all__"}
              onValueChange={handleCityChange}
              disabled={!currentState}
            >
              <Select.Trigger id="city" className="w-full">
                <Select.Value placeholder={currentState ? "Todas as cidades" : "Selecione primeiro o estado"} />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="__all__">Todas as cidades</Select.Item>
                {availableCities.map((city) => (
                  <Select.Item key={city.code} value={city.name}>
                    {city.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-border mb-6" />

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Disponível</h4>
        <RadioGroup defaultValue="todos">
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroup.Item value="todos" id="todos" />
            <Label htmlFor="todos" className="cursor-pointer">
              Todos
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroup.Item value="disponivel" id="disponivel" />
            <Label htmlFor="disponivel" className="cursor-pointer">
              Disponível
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroup.Item value="ocupado" id="ocupado" />
            <Label htmlFor="ocupado" className="cursor-pointer">
              Ocupado
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t-2 border-border mb-6" />

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Escolha seu horário</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="manha" />
            <Label htmlFor="manha" className="cursor-pointer">
              Manhã (6h - 12h)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="tarde" />
            <Label htmlFor="tarde" className="cursor-pointer">
              Tarde (12h - 18h)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="noite" />
            <Label htmlFor="noite" className="cursor-pointer">
              Noite (18h - 22h)
            </Label>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-border mb-6" />

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Nível</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="iniciante" />
            <Label htmlFor="iniciante" className="cursor-pointer">
              Iniciante
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="intermediario" />
            <Label htmlFor="intermediario" className="cursor-pointer">
              Intermediário
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="avancado" />
            <Label htmlFor="avancado" className="cursor-pointer">
              Avançado
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
