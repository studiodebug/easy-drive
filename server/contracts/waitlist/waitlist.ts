import { apiInstance } from "@/lib/api";

export type WaitlistRequest = {
  name: string;
  email: string;
  phone?: string;
  city: string;
  state: string;
  notes?: string;
};

export type WaitlistResponse = {
  waitlistId: string;
  status: string;
  name: string;
  email: string;
};

export const createInstructorWaitlist = async (
  input: WaitlistRequest
): Promise<WaitlistResponse> => {
  const response = await apiInstance.post(
    "/instructors/waitlist",
    input,
    { requireAuth: false }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao entrar na lista de espera" }));
    throw new Error(error.message || "Erro ao entrar na lista de espera");
  }

  return response.json();
};
