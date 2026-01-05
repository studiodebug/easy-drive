"use client";

import { Button } from "@/components/retroui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekDay {
  name: string;
  date: string;
}

interface WeekCalendarProps {
  weekDays: WeekDay[];
  selectedDate?: string;
  onDateSelect?: (date: string) => void;
  onPreviousWeek?: () => void;
  onNextWeek?: () => void;
}

export function WeekCalendar({
  weekDays,
  selectedDate,
  onDateSelect,
  onPreviousWeek,
  onNextWeek,
}: WeekCalendarProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={onPreviousWeek}>
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex-1 grid grid-cols-6 gap-2 px-4">
        {weekDays.map((day, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <span className="text-sm font-semibold">{day.name}</span>
            <button
              onClick={() => onDateSelect?.(day.date)}
              className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold transition-all ${
                index === 0
                  ? "border-2 border-dashed border-primary text-primary"
                  : "text-primary hover:bg-accent"
              }`}
            >
              {day.date}
            </button>
          </div>
        ))}
      </div>

      <Button variant="ghost" size="icon" onClick={onNextWeek}>
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
