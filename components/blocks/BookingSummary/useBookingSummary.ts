import { useState, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth/AuthProvider";
import { useBookingDraft, markBookingResume } from "@/providers/booking/BookingDraftProvider";
import { useBookingQuote } from "@/queries/booking/booking-quote.query";
import { useConfirmBooking } from "@/mutations/booking/booking-confirm.mutation";
import { getCredits } from "@/server/contracts/dashboard/credits";
import type { BookingSlot } from "@/types/booking";

export function useBookingSummary() {
  const {
    draft,
    isSummaryOpen,
    closeSummary,
    clearDraft,
    removeSlot,
    openSummary,
  } = useBookingDraft();

  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const confirmMutation = useConfirmBooking();
  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);

  const {
    data: quote,
    isLoading: isQuoteLoading,
    refetch: refetchQuote,
  } = useBookingQuote(draft);

  const { data: creditsData } = useQuery({
    queryKey: ["credits"],
    queryFn: () => getCredits(),
    enabled: isAuthenticated,
  });

  const availableCredits = creditsData?.availableCredits ?? 0;
  const requiredCredits = quote?.requiredCredits ?? 0;
  const missingCredits = Math.max(0, requiredCredits - availableCredits);
  const hasSlots = Boolean(draft?.slots.length);

  const instructor = useMemo(() => {
    if (!draft) return null;
    return {
      name: draft.instructorName,
      avatar: draft.instructorAvatar,
      creditsPerLesson: draft.creditsPerLesson,
    };
  }, [draft]);

  const handleConfirm = () => {
    if (!draft) return;

    if (!isAuthenticated) {
      markBookingResume();
      router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (missingCredits > 0) {
      setIsAddCreditsOpen(true);
      return;
    }

    confirmMutation.mutate(
      {
        draft,
        requiredCredits,
        availableCredits,
        isAuthenticated,
      },
      {
        onSuccess: () => {
          toast.success("Agendamento confirmado!");
          clearDraft();
          closeSummary();
        },
        onError: (error) => {
          if (error.code === "AUTH_REQUIRED") {
            markBookingResume();
            router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
            return;
          }
          if (error.code === "INSUFFICIENT_CREDITS") {
            setIsAddCreditsOpen(true);
            return;
          }
          if (error.code === "SLOT_UNAVAILABLE") {
            toast.error("Alguns horários não estão mais disponíveis.");
            return;
          }
          toast.error("Não foi possível confirmar o agendamento.");
        },
      }
    );
  };

  const handleRemoveSlot = (slot: BookingSlot) => {
    removeSlot(slot);
  };

  const handleCloseAddCredits = () => {
    setIsAddCreditsOpen(false);
    void refetchQuote();
  };

  return {
    // State
    draft,
    isSummaryOpen,
    isAddCreditsOpen,
    isQuoteLoading,
    isConfirming: confirmMutation.isPending,
    isAuthenticated,
    
    // Computed
    availableCredits,
    requiredCredits,
    missingCredits,
    hasSlots,
    instructor,
    
    // Actions
    openSummary,
    closeSummary,
    clearDraft,
    handleConfirm,
    handleRemoveSlot,
    handleCloseAddCredits,
    setIsAddCreditsOpen, // Exposed if needed for direct control
  };
}
