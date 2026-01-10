import type { WeekClass } from "@/types/week-class";

/**
 * Get classes for a specific date range
 * Simulates an API call that would filter classes by date
 */
export function getClassesForWeek(
  classes: WeekClass[],
  startDate: Date,
  endDate: Date
): WeekClass[] {
  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  return classes.filter((classItem) => {
    return classItem.date >= startDateStr && classItem.date <= endDateStr;
  });
}

/**
 * Get class count for each day in a week
 * Returns a map of date strings to class counts
 */
export function getClassCountsByDate(
  classes: WeekClass[],
  startDate: Date,
  endDate: Date
): Map<string, number> {
  const filteredClasses = getClassesForWeek(classes, startDate, endDate);
  const countMap = new Map<string, number>();

  filteredClasses.forEach((classItem) => {
    const count = countMap.get(classItem.date) || 0;
    countMap.set(classItem.date, count + 1);
  });

  return countMap;
}