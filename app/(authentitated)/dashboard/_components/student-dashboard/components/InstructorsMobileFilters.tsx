"use client";

import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Filter } from "lucide-react";
import { InstructorsFiltersContent } from "./InstructorsFiltersContent";

interface InstructorsMobileFiltersProps {
  selectedDate?: Date | null;
}

export function InstructorsMobileFilters({
  selectedDate,
}: InstructorsMobileFiltersProps) {
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
        <Dialog.Header className="text-xl font-black">Filtros</Dialog.Header>
        <div className="p-4">
          <InstructorsFiltersContent selectedDate={selectedDate} />
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
