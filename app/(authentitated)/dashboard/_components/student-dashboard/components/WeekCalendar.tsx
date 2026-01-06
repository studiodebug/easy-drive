"use client";

import { Button } from "@/components/retroui/Button";
import { Badge } from "@/components/retroui/Badge";
import { Popover } from "@/components/retroui/Popover";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { isSameDayUtil } from "../utils/date-utils";

interface WeekDay {
  name: string;
  date: number;
  fullDate: Date;
  classCount?: number;
}

interface WeekCalendarProps {
  weekDays: WeekDay[];
  selectedDate?: string;
  onDateSelect?: (date: Date) => void;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
  onScheduleClass?: (date: Date) => void;
}

export function WeekCalendar({
  weekDays,
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
  onScheduleClass,
}: WeekCalendarProps) {
  const [openPopoverId, setOpenPopoverId] = useState<number | null>(null);
  const today = new Date();

  const handleDayClick = (day: WeekDay, index: number) => {
    setOpenPopoverId(index);
    onDateSelect?.(day.fullDate);
  };

  const handleScheduleClick = (day: WeekDay) => {
    setOpenPopoverId(null);
    onScheduleClass?.(day.fullDate);
  };

  const isToday = (date: Date): boolean => {
    return isSameDayUtil(date, today);
  };

  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={onPreviousWeek}>
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex-1 grid grid-cols-7 gap-2 px-4">
        {weekDays.map((day, index) => {
          const isTodayDate = isToday(day.fullDate);
          const hasClasses = (day.classCount ?? 0) > 0;

          return (
            <Popover
              key={index}
              open={openPopoverId === index}
              onOpenChange={(open) => setOpenPopoverId(open ? index : null)}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold">{day.name}</span>
                <Popover.Trigger asChild>
                  <button
                    onClick={() => handleDayClick(day, index)}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all border-2 ${isTodayDate
                        ? "bg-primary text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        : "border-transparent text-black hover:bg-gray-100 hover:border-black"
                      }`}
                  >
                    {day.date}
                    {hasClasses && (
                      <Badge
                        variant="solid"
                        size="sm"
                        className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white rounded-full"
                      >
                        {day.classCount}
                      </Badge>
                    )}
                  </button>
                </Popover.Trigger>
              </div>
              <Popover.Content align="center" className="w-64">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-sm">
                      {day.name}, {day.date}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {hasClasses
                        ? `${day.classCount} ${day.classCount === 1
                          ? "aula agendada"
                          : "aulas agendadas"
                        }`
                        : "Nenhuma aula agendada"}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleScheduleClick(day)}
                    className="w-full"
                  >
                    Agendar aula
                  </Button>
                </div>
              </Popover.Content>
            </Popover>
          );
        })}
      </div>

      <Button variant="ghost" size="icon" onClick={onNextWeek}>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
