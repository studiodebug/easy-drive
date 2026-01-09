"use client";

import { useMemo } from "react";
import { Text } from "@/components/retroui/Text";
import { Card } from "@/components/retroui/Card";
import { CalendarClock } from "lucide-react";
import { myScheduleMock } from "../data/my-schedule-mock";
import { MyScheduleEmpty } from "./MyScheduleEmpty";
import { MyScheduleClassCard } from "./MyScheduleClassCard";
import { EmptyState } from "./EmptyState";

export function MyScheduleTab() {
  const scheduledClasses = myScheduleMock;
  const hasClasses = scheduledClasses && scheduledClasses.length > 0;

  // Agrupar aulas por período
  const groupedClasses = useMemo(() => {
    const today = scheduledClasses.filter((c) => c.startsInDays === 0);
    const tomorrow = scheduledClasses.filter((c) => c.startsInDays === 1);
    const upcoming = scheduledClasses.filter((c) => c.startsInDays > 1);

    return { today, tomorrow, upcoming };
  }, [scheduledClasses]);

  const hasAnyClasses =
    groupedClasses.today.length > 0 ||
    groupedClasses.tomorrow.length > 0 ||
    groupedClasses.upcoming.length > 0;

  if (!hasAnyClasses) {
    return (
      <div className="space-y-6">
        <Text variant="h3">Minha Agenda</Text>

        <EmptyState
          icon={
            <div className="w-20 h-20 bg-purple-100 border-2 border-black flex items-center justify-center">
              <CalendarClock
                className="w-10 h-10 text-purple-600"
                strokeWidth={2.5}
              />
            </div>
          }
          title="Nenhuma aula agendada"
          description="Você ainda não possui aulas agendadas. Confira os instrutores disponíveis e agende sua próxima aula."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Text variant="h3">Minha Agenda</Text>

      {/* Aulas Hoje */}
      {groupedClasses.today.length > 0 && (
        <div className="space-y-4">
          <Card className="w-full p-4 sm:p-6 bg-white">
            <Text variant="body" className="font-semibold">
              Aulas Hoje
            </Text>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groupedClasses.today.map((scheduledClass) => (
              <MyScheduleClassCard
                key={scheduledClass.id}
                scheduledClass={scheduledClass}
              />
            ))}
          </div>
        </div>
      )}

      {/* Aulas Amanhã */}
      {groupedClasses.tomorrow.length > 0 && (
        <div className="space-y-4">
          <Card className="w-full p-4 sm:p-6 bg-white">
            <Text variant="body" className="font-semibold">
              Aulas Amanhã
            </Text>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groupedClasses.tomorrow.map((scheduledClass) => (
              <MyScheduleClassCard
                key={scheduledClass.id}
                scheduledClass={scheduledClass}
              />
            ))}
          </div>
        </div>
      )}

      {/* Próximas Aulas */}
      {groupedClasses.upcoming.length > 0 && (
        <div className="space-y-4">
          <Card className="w-full p-4 sm:p-6 bg-white">
            <Text variant="body" className="font-semibold">
              Próximas Aulas
            </Text>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {groupedClasses.upcoming.map((scheduledClass) => (
              <MyScheduleClassCard
                key={scheduledClass.id}
                scheduledClass={scheduledClass}
              />
            ))}
          </div>
        </div>
      )}

      {/* Resumo */}
      <div className="text-center pt-4">
        <Text variant="bodySm" className="text-muted-foreground">
          Total de {scheduledClasses.length}{" "}
          {scheduledClasses.length === 1 ? "aula agendada" : "aulas agendadas"}
        </Text>
      </div>
    </div>
  );
}
