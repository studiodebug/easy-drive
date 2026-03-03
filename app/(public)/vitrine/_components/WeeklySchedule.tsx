"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/retroui/Button";
import { useBookingDraft } from "@/providers/booking/BookingDraftProvider";
import type { BookingSlot } from "@/types/booking";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getInstructorSchedule } from "@/server/contracts/booking/schedule";
import { getInstructorAvailability } from "@/server/contracts/booking/availability";

interface WeeklyScheduleProps {
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  creditsPerLesson: number;
}

interface SelectedSlot {
  dateKey: string;
  dayNumber: number;
  date: Date;
  time: string;
}

const DAY_ABBREVIATIONS: Record<number, string> = {
  0: "DOM",
  1: "SEG",
  2: "TER",
  3: "QUA",
  4: "QUI",
  5: "SEX",
  6: "SÁB",
};

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

function getWeekMonday(offset: number): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(today);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() + diff + offset * 7);
  return monday;
}

function getWeekSunday(monday: Date): Date {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);
  return sunday;
}

export function WeeklySchedule({
  instructorId,
  instructorName,
  instructorAvatar,
  creditsPerLesson,
}: WeeklyScheduleProps) {
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const { draft, setSlots, openSummary } = useBookingDraft();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: scheduleData } = useQuery({
    queryKey: ["instructor-schedule", instructorId],
    queryFn: () => getInstructorSchedule(instructorId),
    enabled: Boolean(instructorId),
  });

  const weekMonday = useMemo(() => (isMounted ? getWeekMonday(weekOffset) : null), [weekOffset, isMounted]);
  const weekEnd = useMemo(() => (weekMonday ? getWeekSunday(weekMonday) : null), [weekMonday]);

  const { data: bookedData } = useQuery({
    queryKey: ["instructor-availability", instructorId, weekMonday?.toISOString(), weekEnd?.toISOString()],
    queryFn: () => getInstructorAvailability(instructorId, weekMonday!.toISOString(), weekEnd!.toISOString()),
    enabled: Boolean(instructorId) && Boolean(weekMonday) && Boolean(weekEnd),
  });

  const bookedKeys = useMemo(() => {
    const keys = new Set<string>();
    if (!bookedData?.items) return keys;
    for (const item of bookedData.items) {
      const d = new Date(item.startAt);
      keys.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    }
    return keys;
  }, [bookedData]);

  const scheduleByDay = useMemo(() => {
    const map = new Map<number, { startTime: string; endTime: string }[]>();
    if (!scheduleData?.items) return map;
    for (const item of scheduleData.items) {
      const existing = map.get(item.dayOfWeek) ?? [];
      existing.push({ startTime: item.startTime, endTime: item.endTime });
      map.set(item.dayOfWeek, existing);
    }
    return map;
  }, [scheduleData]);

  useEffect(() => {
    if (!draft || draft.instructorId !== instructorId) {
      setSelectedSlots([]);
      return;
    }
    const draftSlots: SelectedSlot[] = draft.slots.map((slot) => {
      const date = new Date(slot.date);
      return {
        dateKey: `${date.getDay()}-${date.getDate()}-${date.getMonth()}`,
        dayNumber: date.getDay(),
        date,
        time: slot.startTime,
      };
    });
    setSelectedSlots(draftSlots);
  }, [draft, instructorId]);

  const getDateForDay = (dayNumber: number) => {
    if (!weekMonday) return new Date(0);
    const offsetFromMonday = dayNumber === 0 ? 6 : dayNumber - 1;
    const target = new Date(weekMonday);
    target.setDate(weekMonday.getDate() + offsetFromMonday);
    return target;
  };

  const updateDraftSlots = (nextSlots: SelectedSlot[]) => {
    setSelectedSlots(nextSlots);
    const bookingSlots: BookingSlot[] = nextSlots.map((slot) => {
      const [hours, minutes] = slot.time.split(":").map(Number);
      const endDate = new Date(slot.date);
      endDate.setHours(hours + 1, minutes);
      const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;
      return {
        date: slot.date.toISOString(),
        startTime: slot.time,
        endTime,
      };
    });
    setSlots({ instructorId, instructorName, instructorAvatar, creditsPerLesson }, bookingSlots);
  };

  const handleTimeSelect = (dayNumber: number, time: string) => {
    const date = getDateForDay(dayNumber);
    const dateKey = `${dayNumber}-${date.getDate()}-${date.getMonth()}`;
    const slotKey = `${dateKey}-${time}`;
    const isAlreadySelected = selectedSlots.some((s) => `${s.dateKey}-${s.time}` === slotKey);

    if (isAlreadySelected) {
      updateDraftSlots(selectedSlots.filter((s) => `${s.dateKey}-${s.time}` !== slotKey));
    } else {
      updateDraftSlots([...selectedSlots, { dateKey, dayNumber, date, time }]);
    }
  };

  const removeSlot = (slotToRemove: SelectedSlot) => {
    updateDraftSlots(
      selectedSlots.filter((s) => `${s.dateKey}-${s.time}` !== `${slotToRemove.dateKey}-${slotToRemove.time}`)
    );
  };

  const handleSchedule = async () => {
    if (selectedSlots.length === 0) return;
    try {
      openSummary();
      toast.success("Resumo do agendamento atualizado");
    } catch {
      toast.error("Erro ao agendar horário");
    }
  };

  const formatDateDisplay = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  // Mon(1) through Sat(6) for display
  const weekdays = [1, 2, 3, 4, 5, 6];

  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Carregando agenda...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => setWeekOffset(weekOffset - 1)}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-yellow-200 hover:bg-yellow-300"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setWeekOffset(weekOffset + 1)}
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-yellow-200 hover:bg-yellow-300"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-4 overflow-x-auto">
        {weekdays.map((dayNumber) => {
          const date = getDateForDay(dayNumber);
          const dateKey = `${dayNumber}-${date.getDate()}-${date.getMonth()}`;
          const hasSelectedSlots = selectedSlots.some((slot) => slot.dateKey === dateKey);
          const daySlots = scheduleByDay.get(dayNumber) ?? [];

          return (
            <div key={dayNumber} className="flex flex-col">
              <div
                className={cn(
                  "border-2 border-black p-3 text-center bg-white rounded-t-lg",
                  hasSelectedSlots && "bg-primary"
                )}
              >
                <div className="text-xs text-muted-foreground font-medium">
                  {DAY_ABBREVIATIONS[dayNumber]}
                </div>
                <div className="text-xl font-black text-black">
                  {date.getDate().toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {MONTHS[date.getMonth()]}
                </div>
              </div>

              <div className="border-2 border-t-0 border-black p-3 bg-white rounded-b-lg h-80 overflow-y-auto">
                <div className="space-y-2">
                  {daySlots.map((slot) => {
                    const timeStr = slot.startTime;
                    const slotKey = `${dateKey}-${timeStr}`;
                    const isTimeSelected = selectedSlots.some(
                      (s) => `${s.dateKey}-${s.time}` === slotKey
                    );
                    const [h, m] = timeStr.split(":").map(Number);
                    const lookupKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${h}:${String(m).padStart(2, "0")}`;
                    const isBooked = bookedKeys.has(lookupKey);

                    if (isBooked) {
                      return (
                        <div
                          key={timeStr}
                          className="text-center text-base text-gray-400 font-medium py-3"
                        >
                          -
                        </div>
                      );
                    }

                    return (
                      <button
                        key={timeStr}
                        onClick={() => handleTimeSelect(dayNumber, timeStr)}
                        className={cn(
                          "w-full py-3 px-4 text-base font-bold border-2 rounded-lg transition-all min-h-[44px] flex items-center justify-center relative",
                          isTimeSelected
                            ? "bg-primary text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            : "bg-white text-black border-black hover:bg-purple-100 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:translate-x-px"
                        )}
                      >
                        {timeStr}
                        {isTimeSelected && (
                          <span className="absolute top-1 right-1 text-xs">✓</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-black">
        {selectedSlots.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-bold text-black mb-2">
              Horários selecionados ({selectedSlots.length}):
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSlots.map((slot, index) => (
                <div
                  key={`${slot.dateKey}-${slot.time}-${index}`}
                  className="flex items-center gap-2 bg-primary px-3 py-2 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="text-sm font-bold text-black">
                    {formatDateDisplay(slot.date)} às {slot.time}
                  </span>
                  <button
                    onClick={() => removeSlot(slot)}
                    className="hover:bg-black/10 rounded p-1 transition-colors"
                    aria-label="Remover horário"
                  >
                    <X className="h-3 w-3 text-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground font-medium">
            {selectedSlots.length === 0 ? (
              "Selecione uma ou mais datas"
            ) : (
              <span className="text-black font-bold">
                {selectedSlots.length} horário{selectedSlots.length !== 1 ? "s" : ""} selecionado{selectedSlots.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {selectedSlots.length > 0 && (
              <Button
                onClick={() => updateDraftSlots([])}
                variant="outline"
                size="sm"
                className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:translate-x-px transition-all"
              >
                Limpar
              </Button>
            )}
            <Button
              onClick={handleSchedule}
              disabled={selectedSlots.length === 0}
              className="font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-px active:translate-x-px transition-all bg-yellow-200 text-black hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] disabled:hover:translate-y-0 disabled:hover:translate-x-0"
            >
              Revisar agendamento {selectedSlots.length > 0 && `(${selectedSlots.length})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
