import { useQuery } from "@tanstack/react-query";
import { fakePromises } from "@/lib/utils";
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

const getBookingQuote = async (draft: BookingDraft): Promise<BookingQuote> => {
  return await fakePromises(() => {
    const priceBreakdown = draft.slots.map((slot) => ({
      slot,
      credits: draft.creditsPerLesson,
    }));

    return {
      requiredCredits: draft.creditsPerLesson * draft.slots.length,
      availabilityStatus: "available",
      priceBreakdown,
    };
  }, 300);
};

export const useBookingQuote = (draft: BookingDraft | null) => {
  const slotsSignature = draft ? buildSlotSignature(draft.slots) : "";

  return useQuery<BookingQuote>({
    queryKey: ["booking-quote", draft?.instructorId, draft?.draftId, slotsSignature],
    queryFn: () => getBookingQuote(draft as BookingDraft),
    enabled: Boolean(draft && draft.slots.length > 0),
  });
};

