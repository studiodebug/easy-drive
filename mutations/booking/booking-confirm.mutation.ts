import { useMutation, useQueryClient } from "@tanstack/react-query";
import { confirmBooking } from "@/server/contracts/booking/booking";
import type { BookingDraft } from "@/types/booking";

export type BookingConfirmErrorCode =
  | "AUTH_REQUIRED"
  | "SLOT_UNAVAILABLE"
  | "INSUFFICIENT_CREDITS";

export type BookingConfirmError = {
  code: BookingConfirmErrorCode;
  message?: string;
  missingCredits?: number;
};

export type ConfirmBookingInput = {
  draft: BookingDraft;
  requiredCredits: number;
  availableCredits: number;
  isAuthenticated: boolean;
};

export type ConfirmBookingResult = {
  success: true;
  bookingIds: string[];
};

export const useConfirmBooking = () => {
  const queryClient = useQueryClient();

  return useMutation<ConfirmBookingResult, BookingConfirmError, ConfirmBookingInput>({
    mutationFn: async (input) => {
      if (!input.isAuthenticated) {
        throw { code: "AUTH_REQUIRED" } satisfies BookingConfirmError;
      }

      if (input.availableCredits < input.requiredCredits) {
        throw {
          code: "INSUFFICIENT_CREDITS",
          missingCredits: input.requiredCredits - input.availableCredits,
        } satisfies BookingConfirmError;
      }

      const bookingIds: string[] = [];
      for (const slot of input.draft.slots) {
        const creditsPerSlot = Math.round(input.requiredCredits / input.draft.slots.length);

        const slotDate = new Date(slot.date);
        const dateStr = `${slotDate.getFullYear()}-${String(slotDate.getMonth() + 1).padStart(2, "0")}-${String(slotDate.getDate()).padStart(2, "0")}`;

        const result = await confirmBooking({
          instructorId: input.draft.instructorId,
          date: dateStr,
          startTime: slot.startTime,
          endTime: slot.endTime,
          creditsRequired: creditsPerSlot,
        });

        bookingIds.push(result.bookingId);
      }

      return { success: true, bookingIds };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["scheduled-classes"] });
      queryClient.invalidateQueries({ queryKey: ["my-schedule"] });
      queryClient.invalidateQueries({ queryKey: ["instructor-availability"] });
    },
  });
};
