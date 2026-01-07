"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DaySchedule } from "@/app/(authentitated)/dashboard/_components/student-dashboard/data/instructors-mock";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/retroui/Button";
import { createClient } from "@/lib/supabase/client";

interface WeeklyScheduleProps {
  schedule: DaySchedule[];
}

interface SelectedSlot {
  dateKey: string;
  dayNumber: number;
  date: Date;
  time: string;
}

export function WeeklySchedule({ schedule }: WeeklyScheduleProps) {
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [weekOffset, setWeekOffset] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    checkAuth();
  }, []);

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  };

  const getDayAbbreviation = (dayName: string) => {
    const abbreviations: Record<string, string> = {
      "Domingo": "DOM",
      "Segunda-feira": "SEG",
      "Terça-feira": "TER",
      "Quarta-feira": "QUA",
      "Quinta-feira": "QUI",
      "Sexta-feira": "SEX",
      "Sábado": "SÁB",
    };
    return abbreviations[dayName] || dayName.substring(0, 3).toUpperCase();
  };

  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + weekOffset * 7);
    return today;
  };

  const getDateForDay = (dayNumber: number) => {
    const currentDate = getCurrentDate();
    const currentDay = currentDate.getDay();
    const diff = dayNumber - currentDay;
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + diff);
    return targetDate;
  };

  const getMonthAbbreviation = (date: Date) => {
    const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    return months[date.getMonth()];
  };

  const handleTimeSelect = (dayNumber: number, time: string) => {
    const date = getDateForDay(dayNumber);
    const dateKey = `${dayNumber}-${date.getDate()}-${date.getMonth()}`;
    const slotKey = `${dateKey}-${time}`;

    const isAlreadySelected = selectedSlots.some(
      (slot) => `${slot.dateKey}-${slot.time}` === slotKey
    );

    if (isAlreadySelected) {
      setSelectedSlots(selectedSlots.filter(
        (slot) => `${slot.dateKey}-${slot.time}` !== slotKey
      ));
    } else {
      setSelectedSlots([
        ...selectedSlots,
        {
          dateKey,
          dayNumber,
          date,
          time,
        },
      ]);
    }
  };

  const removeSlot = (slotToRemove: SelectedSlot) => {
    setSelectedSlots(
      selectedSlots.filter(
        (slot) => `${slot.dateKey}-${slot.time}` !== `${slotToRemove.dateKey}-${slotToRemove.time}`
      )
    );
  };

  const handleSchedule = async () => {
    if (selectedSlots.length === 0) return;

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const slotsInfo = selectedSlots.map(
      (slot) => `${slot.date.getDate()}/${slot.date.getMonth() + 1} às ${slot.time}`
    ).join(", ");
    
    alert(`Horários adicionados ao carrinho: ${slotsInfo}`);
  };

  const formatDateDisplay = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  const weekdays = schedule.filter((day) => day.dayNumber >= 1 && day.dayNumber <= 6);

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
        {weekdays.map((daySchedule) => {
          const date = getDateForDay(daySchedule.dayNumber);
          const dateKey = `${daySchedule.dayNumber}-${date.getDate()}-${date.getMonth()}`;
          const hasSelectedSlots = selectedSlots.some((slot) => slot.dateKey === dateKey);

          return (
            <div key={daySchedule.dayNumber} className="flex flex-col">
              <div
                className={cn(
                  "border-2 border-black p-3 text-center bg-white rounded-t-lg",
                  hasSelectedSlots && "bg-primary"
                )}
              >
                <div className="text-xs text-muted-foreground font-medium">
                  {getDayAbbreviation(daySchedule.day)}
                </div>
                <div className="text-xl font-black text-black">
                  {date.getDate().toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {getMonthAbbreviation(date)}
                </div>
              </div>

              <div className="border-2 border-t-0 border-black p-3 bg-white rounded-b-lg h-80 overflow-y-auto">
                <div className="space-y-2">
                  {daySchedule.slots
                    .filter((slot) => slot.minute === 0)
                    .map((slot, index) => {
                      const timeStr = formatTime(slot.hour, slot.minute);
                      const slotKey = `${dateKey}-${timeStr}`;
                      const isTimeSelected = selectedSlots.some(
                        (s) => `${s.dateKey}-${s.time}` === slotKey
                      );

                      if (!slot.available) {
                        return (
                          <div
                            key={index}
                            className="text-center text-base text-gray-400 font-medium py-3"
                          >
                            -
                          </div>
                        );
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleTimeSelect(daySchedule.dayNumber, timeStr)}
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
                onClick={() => setSelectedSlots([])}
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
              Agendar {selectedSlots.length > 0 && `(${selectedSlots.length})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
