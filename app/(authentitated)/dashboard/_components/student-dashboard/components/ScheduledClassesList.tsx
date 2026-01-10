"use client";

import { useState, useMemo } from "react";
import { ScheduledClassCard } from "./ScheduledClassCard";
import { Text } from "@/components/retroui/Text";
import { Button } from "@/components/retroui/Button";
import Link from "next/link";
import type { ScheduledClass } from "@/types/scheduled-class";
import { formatDateAsDDMM } from "../utils/date-utils";

interface ScheduledClassesListProps {
  scheduledClasses: ScheduledClass[];
}

const ITEMS_PER_PAGE = 6;

export function ScheduledClassesList({
  scheduledClasses,
}: ScheduledClassesListProps) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Filtra aulas do dia atual em diante e ordena por data
  const filteredClasses = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return scheduledClasses
      .filter((scheduledClass) => {
        const classDate = new Date(scheduledClass.date);
        classDate.setHours(0, 0, 0, 0);
        return classDate >= today;
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [scheduledClasses]);

  const visibleClasses = filteredClasses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredClasses.length;
  const remainingCount = filteredClasses.length - visibleCount;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const today = new Date();
  const todayFormatted = formatDateAsDDMM(today);

  return (
    <div className="space-y-4">
      <Text variant="h3">Aulas agendadas</Text>
      <Text>
        A partir de {todayFormatted}. Para ver todas as suas aulas, acesse{" "}
        <Button asChild variant={"link"}>
          <Link href="/dashboard?tab=2">minhas aulas</Link>
        </Button>
        .
      </Text>

      {filteredClasses.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Text>Nenhuma aula agendada a partir de hoje.</Text>
        </div>
      ) : (
        <>
          {/* Classes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleClasses.map((scheduledClass) => (
              <ScheduledClassCard
                key={scheduledClass.id}
                scheduledClass={scheduledClass}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-6">
              <Button
                onClick={handleLoadMore}
                variant="default"
                size="lg"
                className="min-w-[200px]"
              >
                Carregar mais aulas agendadas
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
