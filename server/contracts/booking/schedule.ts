import { apiInstance } from "@/lib/api";

export type InstructorScheduleItem = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};

export type GetInstructorScheduleResponse = {
  items: InstructorScheduleItem[];
};

export const getInstructorSchedule = async (
  instructorId: string
): Promise<GetInstructorScheduleResponse> => {
  const response = await apiInstance.get(`/instructors/${instructorId}/schedule`);
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar agenda do instrutor" }));
    throw new Error(error.message || "Erro ao buscar agenda do instrutor");
  }
  return response.json();
};
