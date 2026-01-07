import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { X } from "lucide-react";
import { VitrineFiltersContent } from "./VitrineFiltersContent";

interface VitrineFiltersProps {
  selectedState?: string;
  selectedCity?: string;
  onStateChange?: (state: string) => void;
  onCityChange?: (city: string) => void;
}

export function VitrineFilters({
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}: VitrineFiltersProps) {
  const hasActiveFilters = selectedState || selectedCity;

  const handleClearFilters = () => {
    onStateChange?.("");
    onCityChange?.("");
  };

  return (
    <Card className="p-6 bg-white h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">Filtros</h3>
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
      </div>
      <VitrineFiltersContent
        selectedState={selectedState}
        selectedCity={selectedCity}
        onStateChange={onStateChange}
        onCityChange={onCityChange}
      />
    </Card>
  );
}
