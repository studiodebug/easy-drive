import { apiInstance } from "@/lib/api";
import type { MyScheduleClass } from "@/types/my-schedule";

export type GetMyScheduleResponse = MyScheduleClass[];

type BackendMyScheduleItem = {
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
      creditsPerLesson?: number;
    };
  };
  subject?: string;
};

type BackendMyScheduleResponse = {
  items: BackendMyScheduleItem[];
};

const getDaysUntil = (dateStr: string): number => {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor(
    (target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, diff);
};

const mapToMyScheduleClass = (item: BackendMyScheduleItem): MyScheduleClass => {
  const slotDate = item.slot?.date ?? new Date().toISOString();
  const startTime = item.slot?.startTime ?? "00:00";
  const endTime = item.slot?.endTime ?? "01:00";
  const instructorName = item.slot?.instructor?.name ?? "Instrutor";
  const instructorAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${instructorName}`;
  const instructorCredits = item.slot?.instructor?.creditsPerLesson ?? item.creditsRequired ?? 2;

  return {
    id: item.id,
    subject: { name: item.subject ?? "Aula prática" },
    date: new Date(slotDate),
    startTime,
    endTime,
    instructor: {
      name: instructorName,
      avatar: instructorAvatar,
      credits: instructorCredits,
    },
    startsInDays: getDaysUntil(slotDate),
    hasMaterial: false,
  };
};

export const getMySchedule = async (): Promise<GetMyScheduleResponse> => {
  const response = await apiInstance.get("/dashboard/my-schedule");
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar sua agenda" }));
    throw new Error(error.message || "Erro ao buscar sua agenda");
  }
  const data: BackendMyScheduleResponse = await response.json();
  return (data.items ?? []).map(mapToMyScheduleClass);
};
