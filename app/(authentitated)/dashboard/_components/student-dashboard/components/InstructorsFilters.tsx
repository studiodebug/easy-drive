"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/retroui/Card";
import { RadioGroup } from "@/components/retroui/Radio";
import { Checkbox } from "@/components/retroui/Checkbox";
import { Label } from "@/components/retroui/Label";
import { Input } from "@/components/retroui/Input";
import {
  formatDateAsDDMMYYYY,
  getDayOfWeekInPortuguese,
} from "../utils/date-utils";

interface InstructorsFiltersProps {
  selectedDate?: Date | null;
}

export function InstructorsFilters({ selectedDate }: InstructorsFiltersProps) {
  const [dateInputValue, setDateInputValue] = useState("");

  useEffect(() => {
    if (selectedDate) {
      setDateInputValue(formatDateAsDDMMYYYY(selectedDate));
    }
  }, [selectedDate]);

  return (
    <Card className="p-6 bg-white h-fit sticky top-4">
      <h3 className="text-lg font-bold mb-6">Filtros</h3>

      {/* Selected Date Display */}
      {selectedDate && (
        <>
          <div className="mb-6 p-3 bg-accent rounded border-2 border-border">
            <h4 className="font-semibold mb-2 text-sm">Data selecionada</h4>
            <p className="text-sm text-primary">
              {getDayOfWeekInPortuguese(selectedDate)},{" "}
              {formatDateAsDDMMYYYY(selectedDate)}
            </p>
          </div>
          <div className="border-t-2 border-border mb-6" />
        </>
      )}

      {/* Date Input */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Data da aula</h4>
        <Input
          type="text"
          placeholder="DD/MM/AAAA"
          value={dateInputValue}
          onChange={(e) => setDateInputValue(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Separator */}
      <div className="border-t-2 border-border mb-6" />

      {/* Disponibilidade */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Disponibilidade</h4>
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

      {/* Separator */}
      <div className="border-t-2 border-border mb-6" />

      {/* Escolha seu horário */}
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

      {/* Separator */}
      <div className="border-t-2 border-border mb-6" />

      {/* Dias */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Dias</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="segunda" />
            <Label htmlFor="segunda" className="cursor-pointer">
              Segunda-feira
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terca" />
            <Label htmlFor="terca" className="cursor-pointer">
              Terça-feira
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="quarta" />
            <Label htmlFor="quarta" className="cursor-pointer">
              Quarta-feira
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="quinta" />
            <Label htmlFor="quinta" className="cursor-pointer">
              Quinta-feira
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sexta" />
            <Label htmlFor="sexta" className="cursor-pointer">
              Sexta-feira
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sabado" />
            <Label htmlFor="sabado" className="cursor-pointer">
              Sábado
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="domingo" />
            <Label htmlFor="domingo" className="cursor-pointer">
              Domingo
            </Label>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t-2 border-border mb-6" />

      {/* Nível */}
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
    </Card>
  );
}
