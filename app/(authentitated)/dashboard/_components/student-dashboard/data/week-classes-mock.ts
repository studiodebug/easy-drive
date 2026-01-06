export interface WeekClass {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string;
  subject: string;
  instructor: {
    name: string;
    avatar: string;
  };
  status: "confirmada" | "pendente" | "cancelada";
}

/**
 * Mock data for classes scheduled on specific dates
 * This simulates an API response that returns classes for a given week
 */
export const weekClassesMock: WeekClass[] = [
  // Friday, January 10, 2026 - 3 classes
  {
    id: "1",
    date: "2026-01-10",
    time: "09:00",
    subject: "Direção defensiva em vias urbanas",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    status: "confirmada",
  },
  {
    id: "2",
    date: "2026-01-10",
    time: "14:00",
    subject: "Práticas de baliza e estacionamento",
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    status: "confirmada",
  },
  {
    id: "3",
    date: "2026-01-10",
    time: "16:30",
    subject: "Direção em rodovias",
    instructor: {
      name: "Roberto Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    status: "pendente",
  },
  // Wednesday, January 8, 2026 - 1 class
  {
    id: "4",
    date: "2026-01-08",
    time: "10:00",
    subject: "Conversão e manobras",
    instructor: {
      name: "Ana Paula Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "confirmada",
  },
  // Tuesday, January 7, 2026 - 2 classes
  {
    id: "5",
    date: "2026-01-07",
    time: "08:00",
    subject: "Primeira aula prática",
    instructor: {
      name: "Juliana Pereira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    },
    status: "confirmada",
  },
  {
    id: "6",
    date: "2026-01-07",
    time: "15:00",
    subject: "Direção noturna",
    instructor: {
      name: "Fernando Lima",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
    },
    status: "confirmada",
  },
];

/**
 * Get classes for a specific date range
 * Simulates an API call that would filter classes by date
 */
export function getClassesForWeek(startDate: Date, endDate: Date): WeekClass[] {
  const startDateStr = startDate.toISOString().split("T")[0];
  const endDateStr = endDate.toISOString().split("T")[0];

  return weekClassesMock.filter((classItem) => {
    return classItem.date >= startDateStr && classItem.date <= endDateStr;
  });
}

/**
 * Get class count for each day in a week
 * Returns a map of date strings to class counts
 */
export function getClassCountsByDate(
  startDate: Date,
  endDate: Date
): Map<string, number> {
  const classes = getClassesForWeek(startDate, endDate);
  const countMap = new Map<string, number>();

  classes.forEach((classItem) => {
    const count = countMap.get(classItem.date) || 0;
    countMap.set(classItem.date, count + 1);
  });

  return countMap;
}
