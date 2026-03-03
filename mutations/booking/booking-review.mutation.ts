import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookingReview, type BookingReviewResponse } from "@/server/contracts/booking/review";
import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().int().min(1, "Selecione uma avaliação").max(5),
  comment: z.string().max(1000, "Comentário deve ter no máximo 1000 caracteres").optional(),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export type CreateReviewInput = ReviewFormValues & { bookingId: string };

export const useCreateBookingReview = () => {
  const queryClient = useQueryClient();

  return useMutation<BookingReviewResponse, Error, CreateReviewInput>({
    mutationFn: ({ bookingId, rating, comment }) =>
      createBookingReview({ bookingId, rating, comment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
  });
};
