"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { ToggleGroup, ToggleGroupItem } from "@/components/retroui/ToggleGroup";
import { HistoryClassCard } from "./HistoryClassCard";
import { EmptyState } from "./EmptyState";
import { History } from "lucide-react";
import { useGetHistory } from "@/queries/dashboard/history.query";

type FilterType = "all" | "completed" | "cancelled";

const ITEMS_PER_PAGE = 6;

export function HistoryTab() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [visibleItems, setVisibleItems] = useState<Record<FilterType, number>>({
    all: ITEMS_PER_PAGE,
    completed: ITEMS_PER_PAGE,
    cancelled: ITEMS_PER_PAGE,
  });

  const { data: historyClasses } = useGetHistory();

  // Filter classes based on selected filter
  const filteredClasses = useMemo(() => {
    return historyClasses?.filter((classItem) => {
      if (activeFilter === "all") return true;
      return classItem.status === activeFilter;
    }) ?? [];
  }, [activeFilter]);

  // Get visible classes for current filter
  const visibleClasses = useMemo(() => {
    return filteredClasses?.slice(0, visibleItems[activeFilter]) ?? [];
  }, [filteredClasses, visibleItems, activeFilter]);

  const hasMore = visibleClasses.length < filteredClasses.length;

  const handleLoadMore = () => {
    setVisibleItems((prev) => ({
      ...prev,
      [activeFilter]: prev[activeFilter] + ITEMS_PER_PAGE,
    }));
  };


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

  // Get counts for each filter
  const counts = useMemo(() => {
    return {
      all: historyClasses?.length ?? 0,
      completed: historyClasses?.filter((c) => c.status === "completed")
        .length ?? 0,
      cancelled: historyClasses?.filter((c) => c.status === "cancelled")
        .length ?? 0,
    };
  }, [historyClasses]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Text variant="h3">Histórico de Aulas</Text>

      {/* Filter Card */}
      <Card className="w-full p-4 sm:p-6 bg-white">
        <div className="space-y-4">
          <Text variant="body" className="font-semibold">
            Filtrar por status
          </Text>

          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <ToggleGroup
              type="single"
              value={activeFilter}
              onValueChange={(value) => {
                if (value) setActiveFilter(value as FilterType);
              }}
              className="justify-start inline-flex min-w-full sm:min-w-0"
            >
              <ToggleGroupItem value="all" aria-label="Mostrar todas as aulas">
                Todas ({counts.all})
              </ToggleGroupItem>
              <ToggleGroupItem
                value="completed"
                aria-label="Mostrar apenas aulas finalizadas"
              >
                Finalizadas ({counts.completed})
              </ToggleGroupItem>
              <ToggleGroupItem
                value="cancelled"
                aria-label="Mostrar apenas aulas canceladas"
              >
                Canceladas ({counts.cancelled})
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </Card>

      {/* Classes Grid or Empty State */}
      {visibleClasses.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleClasses.map((classItem) => (
              <HistoryClassCard key={classItem.id} historyClass={classItem} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <Button
                variant="secondary"
                size="lg"
                onClick={handleLoadMore}
                className="min-w-[200px]"
              >
                Carregar mais ({filteredClasses.length - visibleClasses.length}{" "}
                restantes)
              </Button>
            </div>
          )}

          {/* Summary */}
          <div className="text-center">
            <Text variant="bodySm" className="text-muted-foreground">
              Mostrando {visibleClasses.length} de {filteredClasses.length}{" "}
              {activeFilter === "all"
                ? "aulas"
                : activeFilter === "completed"
                ? "aulas finalizadas"
                : "aulas canceladas"}
            </Text>
          </div>
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
