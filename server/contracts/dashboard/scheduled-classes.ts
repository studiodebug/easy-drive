import { apiInstance } from "@/lib/api";
import type { ScheduledClass } from "@/types/scheduled-class";

export type GetScheduledClassesResponse = ScheduledClass[];

type BackendScheduledClass = {
  id: string;
  status: string;
  creditsRequired?: number;
  slot?: {
    date?: string;
    startTime?: string;
    endTime?: string;
    instructor?: {
      name?: string;
      avatarUrl?: string;
    };
  };
  instructor?: {
    name?: string;
    avatarUrl?: string;
  };
  subject?: string;
  date?: string;
  time?: string;
};

type BackendScheduledClassesResponse = {
  items: BackendScheduledClass[];
};

const mapStatus = (
  status: string
): "confirmada" | "pendente" | "cancelada" => {
  if (status === "CONFIRMED") return "confirmada";
  if (status === "CANCELLED") return "cancelada";
  return "pendente";
};

const getDaysUntil = (dateStr: string): number => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, diff);
};

const mapToScheduledClass = (item: BackendScheduledClass): ScheduledClass => {
  const slotDate = item.slot?.date ?? item.date ?? new Date().toISOString();
  const slotTime = item.slot?.startTime ?? item.time ?? "00:00";
  const instructorName =
    item.slot?.instructor?.name ?? item.instructor?.name ?? "Instrutor";
  const instructorAvatar =
    item.slot?.instructor?.avatarUrl ??
    item.instructor?.avatarUrl ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${instructorName}`;

  return {
    id: item.id,
    subject: item.subject ?? "Aula prática",
    date: new Date(slotDate),
    time: slotTime,
    language: "pt-BR",
    instructor: {
      name: instructorName,
      avatar: instructorAvatar,
    },
    status: mapStatus(item.status),
    startsInDays: getDaysUntil(slotDate),
    credits: item.creditsRequired ?? 2,
  };
};

export const getScheduledClasses = async (): Promise<GetScheduledClassesResponse> => {
  const response = await apiInstance.get("/dashboard/scheduled-classes");
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar aulas agendadas" }));
    throw new Error(error.message || "Erro ao buscar aulas agendadas");
  }
  const data: BackendScheduledClassesResponse = await response.json();
  return (data.items ?? []).map(mapToScheduledClass);
};
