import { useMutation } from "@tanstack/react-query";
import { fakePromises } from "@/lib/utils";
import type { BookingDraft, BookingSlot } from "@/types/booking";

export type BookingConfirmErrorCode =
  | "AUTH_REQUIRED"
  | "SLOT_UNAVAILABLE"
  | "INSUFFICIENT_CREDITS";

export type BookingConfirmError = {
  code: BookingConfirmErrorCode;
  missingCredits?: number;
  unavailableSlots?: BookingSlot[];
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

const confirmBooking = async (input: ConfirmBookingInput): Promise<ConfirmBookingResult> => {
  return await fakePromises(() => {
    if (!input.isAuthenticated) {
      const error: BookingConfirmError = { code: "AUTH_REQUIRED" };
      throw error;
    }

    if (input.availableCredits < input.requiredCredits) {
      const error: BookingConfirmError = {
        code: "INSUFFICIENT_CREDITS",
        missingCredits: input.requiredCredits - input.availableCredits,
      };
      throw error;
    }

    // Placeholder: add availability checks here.
    return {
      success: true,
      bookingIds: input.draft.slots.map(() => crypto.randomUUID()),
    };
  }, 600);
};

export const useConfirmBooking = () => {
  return useMutation<ConfirmBookingResult, BookingConfirmError, ConfirmBookingInput>({
    mutationFn: confirmBooking,
  });
};

