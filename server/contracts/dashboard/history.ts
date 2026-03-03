import { apiInstance } from "@/lib/api";
import type { HistoryClass } from "@/types/history";

export type GetHistoryResponse = HistoryClass[];

type BackendHistoryItem = {
  id: string;
  status: string;
  creditsRequired?: number;
  rating?: number;
  comment?: string;
  slot?: {
    date?: string;
    startTime?: string;
    endTime?: string;
    instructor?: {
      name?: string;
      avatarUrl?: string;
    };
  };
  subject?: string;
};

type BackendHistoryResponse = {
  items: BackendHistoryItem[];
};

const SUBJECT_ICONS: Record<string, string> = {
  default: "🚗",
};

const mapToHistoryClass = (item: BackendHistoryItem): HistoryClass => {
  const slotDate = item.slot?.date ?? new Date().toISOString();
  const startTime = item.slot?.startTime ?? "00:00";
  const endTime = item.slot?.endTime ?? "01:00";
  const instructorName = item.slot?.instructor?.name ?? "Instrutor";
  const instructorAvatar =
    item.slot?.instructor?.avatarUrl ??
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${instructorName}`;
  const subjectName = item.subject ?? "Aula prática";

  return {
    id: item.id,
    subject: {
      name: subjectName,
      icon: SUBJECT_ICONS[subjectName] ?? SUBJECT_ICONS.default,
    },
    professor: {
      name: instructorName,
      avatar: instructorAvatar,
    },
    date: new Date(slotDate),
    startTime,
    endTime,
    status: item.status === "COMPLETED" ? "completed" : "cancelled",
    credits: item.creditsRequired ?? 2,
    rating: item.rating,
    comment: item.comment,
  };
};

export const getHistory = async (): Promise<GetHistoryResponse> => {
  const response = await apiInstance.get("/dashboard/history");
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar histórico" }));
    throw new Error(error.message || "Erro ao buscar histórico");
  }
  const data: BackendHistoryResponse = await response.json();
  return (data.items ?? []).map(mapToHistoryClass);
};
