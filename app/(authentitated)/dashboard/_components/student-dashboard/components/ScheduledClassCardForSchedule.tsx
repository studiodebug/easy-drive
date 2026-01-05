"use client";

import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Popover } from "@/components/retroui/Popover";
import { MoreVertical, FileDown, User, X } from "lucide-react";
import { MyScheduleClass } from "../data/my-schedule-mock";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ScheduledClassCardForScheduleProps {
  scheduledClass: MyScheduleClass;
}

export function ScheduledClassCardForSchedule({
  scheduledClass,
}: ScheduledClassCardForScheduleProps) {
  // Format date using date-fns with Portuguese locale
  // Capitalize first letter of day name
  const formattedDate = format(scheduledClass.date, "EEE, dd 'de' MMM", {
    locale: ptBR,
  }).replace(/^./, (str) => str.toUpperCase());

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-all">
      <div className="flex flex-col gap-4">
        {/* Header: Countdown Badge and Menu */}
        <div className="flex items-center justify-between">
          <Badge
            className="bg-purple-100 text-purple-700 border-2 border-black"
            size="sm"
          >
            Começa em {scheduledClass.startsInDays} dias
          </Badge>

          <Popover>
            <Popover.Trigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-gray-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Content align="end" className="w-56 p-0">
              <div className="flex flex-col">
                <button
                  className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition-colors border-b-2 border-gray-200"
                  onClick={() => {
                    // Ver perfil do professor action
                  }}
                >
                  <User className="h-4 w-4" />
                  Ver perfil do professor
                </button>
                <button
                  className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  onClick={() => {
                    // Cancelar aula action
                  }}
                >
                  <X className="h-4 w-4" />
                  Cancelar aula
                </button>
              </div>
            </Popover.Content>
          </Popover>
        </div>

        {/* Subject */}
        <div className="flex items-start gap-3">
          <div className="text-4xl">{scheduledClass.subject.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">
              {scheduledClass.subject.name}
            </h3>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3 p-3 bg-gray-50 border-2 border-gray-200">
          <Avatar className="h-12 w-12 border-2 border-black">
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
            <p className="text-xs text-muted-foreground">Professor(a)</p>
            <p className="font-semibold text-sm">
              {scheduledClass.instructor.name}
            </p>
          </div>
        </div>

        {/* Type */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Tipo:</span>
          <Badge
            className={
              scheduledClass.type === "Aula em grupo"
                ? "bg-blue-100 text-blue-700 border-2 border-black"
                : "bg-green-100 text-green-700 border-2 border-black"
            }
            size="sm"
          >
            {scheduledClass.type}
          </Badge>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formattedDate}</span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            {scheduledClass.startTime} - {scheduledClass.endTime}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-2 border-t-2 border-gray-200">
          <Button className="w-full" size="sm">
            Entrar na sala
          </Button>
          {scheduledClass.hasMaterial && (
            <a
              href="#"
              className="text-sm text-primary font-semibold hover:underline flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Baixar material
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
