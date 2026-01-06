import { Card } from "@/components/retroui/Card";
import { InstructorsFiltersContent } from "./InstructorsFiltersContent";

interface InstructorsFiltersProps {
  selectedDate?: Date | null;
}

export function InstructorsFilters({ selectedDate }: InstructorsFiltersProps) {
  return (
    <Card className="p-6 bg-white h-fit sticky top-4">
      <h3 className="text-lg font-bold mb-6">Filtros</h3>
      <InstructorsFiltersContent selectedDate={selectedDate} />
    </Card>
  );
}
