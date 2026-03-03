import { apiInstance } from "@/lib/api";

export type InstructorAvailabilityItem = {
  slotId: number;
  startAt: string;
  endAt: string;
  status: string;
};

export type GetInstructorAvailabilityResponse = {
  items: InstructorAvailabilityItem[];
};

export const getInstructorAvailability = async (
  instructorId: string,
  weekStart: string,
  weekEnd: string
): Promise<GetInstructorAvailabilityResponse> => {
  const params = new URLSearchParams({ weekStart, weekEnd });
  const response = await apiInstance.get(
    `/instructors/${instructorId}/availability?${params}`
  );
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Erro ao buscar disponibilidade do instrutor" }));
    throw new Error(error.message || "Erro ao buscar disponibilidade do instrutor");
  }
  return response.json();
};
