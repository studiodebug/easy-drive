import { useQuery } from "@tanstack/react-query";
import { getBookingQuote } from "@/server/contracts/booking/booking";
import type { BookingDraft, BookingSlot } from "@/types/booking";

export type BookingQuote = {
  requiredCredits: number;
  availabilityStatus: "available" | "unavailable";
  priceBreakdown: Array<{
    slot: BookingSlot;
    credits: number;
  }>;
};

const buildSlotSignature = (slots: BookingSlot[]) =>
  slots.map((slot) => `${slot.date}-${slot.startTime}-${slot.endTime}`).join("|");

export const useBookingQuote = (draft: BookingDraft | null) => {
  const slotsSignature = draft ? buildSlotSignature(draft.slots) : "";

  return useQuery<BookingQuote>({
    queryKey: ["booking-quote", draft?.instructorId, draft?.draftId, slotsSignature],
    queryFn: async () => {
      const result = await getBookingQuote({ slotCount: draft!.slots.length });
      const creditsPerSlot = Math.round(result.creditsRequired / result.slotCount);
      return {
        requiredCredits: result.creditsRequired,
        availabilityStatus: "available",
        priceBreakdown: draft!.slots.map((slot) => ({
          slot,
          credits: creditsPerSlot,
        })),
      };
    },
    enabled: Boolean(draft && draft.slots.length > 0),
  });
};
