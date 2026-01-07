"use client";

import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Filter, X } from "lucide-react";
import { VitrineFiltersContent } from "./VitrineFiltersContent";

interface VitrineMobileFiltersProps {
  selectedState?: string;
  selectedCity?: string;
  onStateChange?: (state: string) => void;
  onCityChange?: (city: string) => void;
}

export function VitrineMobileFilters({
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}: VitrineMobileFiltersProps) {
  const hasActiveFilters = selectedState || selectedCity;

  const handleClearFilters = () => {
    onStateChange?.("");
    onCityChange?.("");
  };

  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          className="w-full mb-6 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] transition-all"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtrar Instrutores
        </Button>
      </Dialog.Trigger>
      <Dialog.Content size="md" className="max-h-[85vh] overflow-y-auto">
        <Dialog.Header className="flex items-center justify-between">
          <span className="text-xl font-black">Filtros</span>
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              size="sm"
              className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:translate-x-[1px] transition-all h-8 px-3 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar
            </Button>
          )}
        </Dialog.Header>
        <div className="p-4">
          <VitrineFiltersContent
            selectedState={selectedState}
            selectedCity={selectedCity}
            onStateChange={onStateChange}
            onCityChange={onCityChange}
          />
        </div>
        <Dialog.Footer>
          <div className="flex w-full gap-4">
            <Dialog.Trigger asChild>
              <Button
                className="flex-1 font-bold border-2 border-black"
                variant="secondary"
              >
                Cancelar
              </Button>
            </Dialog.Trigger>
            <Dialog.Trigger asChild>
              <Button className="flex-1 font-bold border-2 border-black bg-primary text-black hover:bg-yellow-500">
                Aplicar Filtros
              </Button>
            </Dialog.Trigger>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
