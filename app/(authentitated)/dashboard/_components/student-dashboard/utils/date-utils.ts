/**
 * Get the start and end dates of the current week
 * Week starts on Sunday (0) and ends on Saturday (6)
 */
export function getCurrentWeekRange(): { startDate: Date; endDate: Date } {
  const now = new Date();
  const dayOfWeek = now.getDay();

  // Calculate start of week (Sunday)
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - dayOfWeek);
  startDate.setHours(0, 0, 0, 0);

  // Calculate end of week (Saturday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  return { startDate, endDate };
}

/**
 * Format a date as DD/MM for display
 */
export function formatDateAsDDMM(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

/**
 * Format a date as DD/MM/YYYY for display
 */
export function formatDateAsDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
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
 * Calculate the number of days between two dates
 */
export function getDaysBetween(date1: Date, date2: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
  const diffInTime = date2.getTime() - date1.getTime();
  return Math.ceil(diffInTime / oneDay);
}
