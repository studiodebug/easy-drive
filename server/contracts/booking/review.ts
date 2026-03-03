import { apiInstance } from "@/lib/api";

export type BookingReviewRequest = {
  bookingId: string;
  rating: number;
  comment?: string;
};

export type BookingReviewResponse = {
  reviewId: string;
  bookingId: string;
  rating: number;
  comment?: string;
};

export const createBookingReview = async (
  input: BookingReviewRequest
): Promise<BookingReviewResponse> => {
  const response = await apiInstance.post(`/bookings/${input.bookingId}/review`, {
    rating: input.rating,
    comment: input.comment ?? "",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao enviar avaliação" }));
    throw new Error(error.message || "Erro ao enviar avaliação");
  }

  return response.json();
};
