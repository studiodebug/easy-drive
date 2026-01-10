"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/retroui/Card";
import { WeekCalendar } from "./WeekCalendar";
import { CreditsSection } from "./CreditsSection";
import { ScheduledClassesSection } from "./ScheduledClassesSection";
import { useGetScheduledClasses } from "@/queries/dashboard/scheduled-classes.query";
import { useGetWeekClasses } from "@/queries/dashboard/week-classes.query";
import {
  getCurrentWeekRange,
  getWeekRangeForDate,
  getWeekDates,
  addWeeks,
  formatDateToISO,
  getShortDayInPortuguese,
} from "../utils/date-utils";

import { Text } from "@/components/retroui/Text";
import { getClassCountsByDate } from "../utils/week-classes-utils";

interface ScheduleClassTabProps {
  onNavigateToInstructors?: (date: Date) => void;
}

export function ScheduleClassTab({
  onNavigateToInstructors,
}: ScheduleClassTabProps) {
  const { data: scheduledClasses } = useGetScheduledClasses();
  const { data: weekClasses } = useGetWeekClasses();

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    const { startDate } = getCurrentWeekRange();
    return startDate;
  });

  const [classCountsMap, setClassCountsMap] = useState<Map<string, number>>(
    new Map()
  );

  useEffect(() => {
    // Load class counts for the current week
    if (weekClasses) {
      const { startDate, endDate } = getWeekRangeForDate(currentWeekStart);
      const counts = getClassCountsByDate(weekClasses, startDate, endDate);
      setClassCountsMap(counts);
    }
  }, [currentWeekStart, weekClasses]);

  const handlePreviousWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const handleScheduleClass = (date: Date) => {
    // Navigate to the Instructors tab with the selected date
    onNavigateToInstructors?.(date);
  };

  // Generate week days data
  const weekDates = getWeekDates(currentWeekStart);
  const weekDays = weekDates.map((date) => {
    const dateISO = formatDateToISO(date);
    return {
      name: getShortDayInPortuguese(date),
      date: date.getDate(),
      fullDate: date,
      classCount: classCountsMap.get(dateISO) || 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Text variant="h3">Sua semana</Text>

      {/* Calendar Card */}
      <Card className="w-full p-6 bg-white">
        {/* Week Navigation */}
        <WeekCalendar
          weekDays={weekDays}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onScheduleClass={handleScheduleClass}
        />

        {/* Separator */}
        <div className="border-t-2 border-border my-6" />

        {/* Credits Section */}
        <CreditsSection groupCredits={2} individualCredits={0} />
      </Card>

      {/* Scheduled Classes Section */}
      <ScheduledClassesSection scheduledClasses={scheduledClasses ?? []} />
    </div>
  );
}
