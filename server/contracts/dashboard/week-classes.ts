import { apiInstance } from "@/lib/api";
import type { WeekClass } from "@/types/week-class";

export type GetWeekClassesResponse = WeekClass[];

type BackendWeekDay = {
  day: string;
  total: number;
  date?: string;
  classes?: Array<{
    id?: string;
    time?: string;
    subject?: string;
    status?: string;
    instructor?: { name?: string; avatarUrl?: string };
  }>;
};

type BackendWeekClassesResponse = {
  week: string;
  classes: BackendWeekDay[];
};

const DAY_NAMES: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

const getDateForDay = (dayName: string): string => {
  const today = new Date();
  const todayDay = today.getDay();
  const targetDay = DAY_NAMES[dayName] ?? 0;
  const diff = targetDay - todayDay;
  const target = new Date(today);
  target.setDate(today.getDate() + diff);
  return target.toISOString().split("T")[0];
};

const mapToWeekClasses = (dayData: BackendWeekDay): WeekClass[] => {
  const date = dayData.date ?? getDateForDay(dayData.day);

  if (dayData.classes && dayData.classes.length > 0) {
    return dayData.classes.map((cls, idx) => ({
      id: cls.id ?? `${date}-${idx}`,
      date,
      time: cls.time ?? "00:00",
      subject: cls.subject ?? "Aula prática",
      instructor: {
        name: cls.instructor?.name ?? "Instrutor",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cls.instructor?.name ?? "instructor"}`,
      },
      status: (cls.status === "CONFIRMED"
        ? "confirmada"
        : cls.status === "CANCELLED"
        ? "cancelada"
        : "pendente") as "confirmada" | "pendente" | "cancelada",
    }));
  }

  // Backend returned aggregated totals only — generate placeholder entries so
  // the existing count utilities continue to work correctly.
  return Array.from({ length: dayData.total }, (_, idx) => ({
    id: `${date}-placeholder-${idx}`,
    date,
    time: "00:00",
    subject: "Aula prática",
    instructor: { name: "Instrutor", avatar: "" },
    status: "confirmada" as const,
  }));
};

export const getWeekClasses = async (): Promise<GetWeekClassesResponse> => {
  const response = await apiInstance.get("/dashboard/week-classes");
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar aulas da semana" }));
    throw new Error(error.message || "Erro ao buscar aulas da semana");
  }
  const data: BackendWeekClassesResponse = await response.json();
  return (data.classes ?? []).flatMap(mapToWeekClasses);
};
