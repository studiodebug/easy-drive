import {
  startOfWeek,
  endOfWeek,
  addWeeks as addWeeksFns,
  format,
  isSameDay,
  eachDayOfInterval,
} from "date-fns";

/**
 * Get the start and end dates of the current week
 * Week starts on Monday (1) and ends on Sunday (0)
 */
export function getCurrentWeekRange(): { startDate: Date; endDate: Date } {
  const now = new Date();
  const startDate = startOfWeek(now, { weekStartsOn: 1 });
  const endDate = endOfWeek(now, { weekStartsOn: 1 });

  return { startDate, endDate };
}

/**
 * Get the week range for a specific date
 * Week starts on Monday and ends on Sunday
 */
export function getWeekRangeForDate(date: Date): {
  startDate: Date;
  endDate: Date;
} {
  const startDate = startOfWeek(date, { weekStartsOn: 1 });
  const endDate = endOfWeek(date, { weekStartsOn: 1 });

  return { startDate, endDate };
}

/**
 * Get an array of dates for the week (Monday to Sunday)
 */
export function getWeekDates(startDate: Date): Date[] {
  const endDate = endOfWeek(startDate, { weekStartsOn: 1 });
  return eachDayOfInterval({ start: startDate, end: endDate });
}

/**
 * Add weeks to a date
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addWeeksFns(date, weeks);
}

/**
 * Format date to ISO string (YYYY-MM-DD)
 */
export function formatDateToISO(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

/**
 * Check if two dates are the same day
 */
export function isSameDayUtil(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}

/**
 * Format a date as DD/MM for display
 */
export function formatDateAsDDMM(date: Date): string {
  return format(date, "dd/MM");
}

/**
 * Format a date as DD/MM/YYYY for display
 */
export function formatDateAsDDMMYYYY(date: Date): string {
  return format(date, "dd/MM/yyyy");
}

/**
 * Get the day of the week in Portuguese
 */
export function getDayOfWeekInPortuguese(date: Date): string {
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  return daysOfWeek[date.getDay()];
}

/**
 * Get short day name in Portuguese (e.g., "Seg", "Ter")
 */
export function getShortDayInPortuguese(date: Date): string {
  const shortDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  return shortDays[date.getDay()];
}

/**
 * Calculate the number of days between two dates
 */
export function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffInTime / oneDay);
}
