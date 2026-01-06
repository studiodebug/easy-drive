"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/retroui/ToggleGroup";
import { HistoryClassCard } from "./HistoryClassCard";
import { EmptyState } from "./EmptyState";
import { historyClassesMock } from "../data/history-mock";
import { History } from "lucide-react";

type FilterType = "all" | "completed" | "cancelled";

export function HistoryTab() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  // Filter classes based on selected filter
  const filteredClasses = historyClassesMock.filter((classItem) => {
    if (activeFilter === "all") return true;
    return classItem.status === activeFilter;
  });

  // Empty state messages based on filter
  const getEmptyStateMessage = () => {
    switch (activeFilter) {
      case "completed":
        return {
          title: "Nenhuma aula encontrada",
          description: "Você ainda não possui aulas finalizadas no histórico.",
        };
      case "cancelled":
        return {
          title: "Nenhuma aula encontrada",
          description: "Você ainda não possui aulas canceladas no histórico.",
        };
      default:
        return {
          title: "Nenhuma aula encontrada",
          description: "Você ainda não possui aulas no histórico.",
        };
    }
  };

  const emptyState = getEmptyStateMessage();

  return (
    <div className="w-full">
      {/* Filter Buttons */}
      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <ToggleGroup
          type="single"
          value={activeFilter}
          onValueChange={(value) => {
            if (value) setActiveFilter(value as FilterType);
          }}
          className="justify-start inline-flex min-w-full sm:min-w-0"
        >
          <ToggleGroupItem value="all" aria-label="Mostrar todas as aulas">
            Todas
          </ToggleGroupItem>
          <ToggleGroupItem
            value="completed"
            aria-label="Mostrar apenas aulas finalizadas"
          >
            Finalizada
          </ToggleGroupItem>
          <ToggleGroupItem
            value="cancelled"
            aria-label="Mostrar apenas aulas canceladas"
          >
            Cancelada
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Classes Grid or Empty State */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <HistoryClassCard key={classItem.id} historyClass={classItem} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={
            <div className="w-20 h-20 bg-purple-100 border-2 border-black flex items-center justify-center">
              <History
                className="w-10 h-10 text-purple-600"
                strokeWidth={2.5}
              />
            </div>
          }
          title={emptyState.title}
          description={emptyState.description}
        />
      )}
    </div>
  );
}
