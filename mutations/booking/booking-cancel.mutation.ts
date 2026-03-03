import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelBooking, type BookingCancelResponse } from "@/server/contracts/booking/booking";

export type CancelBookingInput = {
  bookingId: string;
  applyRefund?: boolean;
  reason?: string;
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<BookingCancelResponse, Error, CancelBookingInput>({
    mutationFn: (input) =>
      cancelBooking({
        bookingId: input.bookingId,
        applyRefund: input.applyRefund ?? true,
        reason: input.reason,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scheduled-classes"] });
      queryClient.invalidateQueries({ queryKey: ["my-schedule"] });
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["credits-history"] });
    },
  });
};
