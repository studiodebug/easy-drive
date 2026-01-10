"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Text } from "@/components/retroui/Text";
import { Clock, Calendar } from "lucide-react";
import type { MyScheduleClass } from "@/types/my-schedule";
import type { ScheduledClass } from "@/types/scheduled-class";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ScheduledClassDetailsModal } from "./ScheduledClassDetailsModal";

interface MyScheduleClassCardProps {
  scheduledClass: MyScheduleClass;
}

export function MyScheduleClassCard({
  scheduledClass,
}: MyScheduleClassCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Format date in Portuguese: "Sábado, 29 de mar"
  const formattedDate = format(scheduledClass.date, "EEEE, dd 'de' MMM", {
    locale: ptBR,
  });

  const timeRange = `${scheduledClass.startTime} - ${scheduledClass.endTime}`;

  // Adapt MyScheduleClass to ScheduledClass format for the modal
  const adaptedClass: ScheduledClass = useMemo(
    () => ({
      id: scheduledClass.id,
      subject: scheduledClass.subject.name,
      date: scheduledClass.date,
      time: `${scheduledClass.startTime} - ${scheduledClass.endTime}`,
      instructor: scheduledClass.instructor,
      status: "confirmada" as const,
      startsInDays: scheduledClass.startsInDays,
    }),
    [scheduledClass]
  );

  return (
    <>
      <Card className="p-4 sm:p-6 flex flex-col h-full">
        {/* Date and Time */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
            <Text variant="bodyLg" className="font-semibold capitalize">
              {formattedDate}
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            <Text variant="bodyLg" className="font-semibold">
              {timeRange}
            </Text>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* Subject */}
          <div>
            <Text variant="h5">{scheduledClass.subject.name}</Text>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <Avatar.Image
                src={scheduledClass.instructor.avatar}
                alt={scheduledClass.instructor.name}
              />
              <Avatar.Fallback>
                {scheduledClass.instructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar.Fallback>
            </Avatar>
            <div>
              <Text variant="body">Instrutor</Text>
              <Text variant="body" className="font-semibold">
                {scheduledClass.instructor.name}
              </Text>
            </div>
          </div>

          {/* Spacer to push button to bottom */}
          <div className="flex-1" />

          {/* Action - Always at bottom */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => setIsDetailsModalOpen(true)}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </Card>

      <ScheduledClassDetailsModal
        scheduledClass={adaptedClass}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
    </>
  );
}
