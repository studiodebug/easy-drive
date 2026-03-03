import { apiInstance } from "@/lib/api";

// ---------- Quote ----------

export type BookingQuoteRequest = {
  slotCount: number;
};

export type BookingQuoteResponse = {
  slotCount: number;
  creditsRequired: number;
};

export const getBookingQuote = async (
  input: BookingQuoteRequest
): Promise<BookingQuoteResponse> => {
  const response = await apiInstance.post("/bookings/quote", {
    slotCount: input.slotCount,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao calcular cotação" }));
    throw new Error(error.message || "Erro ao calcular cotação");
  }

  return response.json();
};

// ---------- Confirm ----------

export type BookingConfirmRequest = {
  slotId: number;
  creditsRequired: number;
};

export type BookingConfirmResponse = {
  bookingId: string;
  status: "CONFIRMED";
};

export type BookingConfirmApiError = {
  code: "SLOT_UNAVAILABLE" | "INSUFFICIENT_CREDITS";
  message: string;
};

export const confirmBooking = async (
  input: BookingConfirmRequest
): Promise<BookingConfirmResponse> => {
  const response = await apiInstance.post("/bookings/confirm", {
    slotId: input.slotId,
    creditsRequired: input.creditsRequired,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao confirmar agendamento" }));
    throw new Error(error.message || "Erro ao confirmar agendamento");
  }

  return response.json();
};

// ---------- Cancel ----------

export type BookingCancelRequest = {
  bookingId: string;
  applyRefund?: boolean;
  reason?: string;
};

export type BookingCancelResponse = {
  bookingId: string;
  status: "CANCELLED";
  refundApplied: boolean;
};

export const cancelBooking = async (
  input: BookingCancelRequest
): Promise<BookingCancelResponse> => {
  const response = await apiInstance.post(`/bookings/${input.bookingId}/cancel`, {
    applyRefund: input.applyRefund ?? true,
    reason: input.reason,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao cancelar aula" }));
    throw new Error(error.message || "Erro ao cancelar aula");
  }

  return response.json();
};
