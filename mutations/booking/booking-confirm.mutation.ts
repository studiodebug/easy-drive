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
        if (slot.slotId === undefined) {
          throw {
            code: "SLOT_UNAVAILABLE",
            message: "Slot ID não disponível. Selecione um horário válido.",
          } satisfies BookingConfirmError;
        }

        const creditsPerSlot = Math.round(input.requiredCredits / input.draft.slots.length);
        const result = await confirmBooking({
          slotId: slot.slotId,
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
    },
  });
};
