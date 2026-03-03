"use client";

import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { Avatar } from "@/components/retroui/Avatar";
import { Calendar, Clock } from "lucide-react";
import type { HistoryClass } from "@/types/history";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReviewForm } from "./ReviewForm";
import { useCreateBookingReview, type ReviewFormValues } from "@/mutations/booking/booking-review.mutation";
import { toast } from "sonner";

interface RateClassModalProps {
  historyClass: HistoryClass;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitSuccess?: () => void;
}

export function RateClassModal({
  historyClass,
  open,
  onOpenChange,
  onSubmitSuccess,
}: RateClassModalProps) {
  const { mutate: submitReview, isPending } = useCreateBookingReview();

  const formattedDate = format(
    historyClass.date,
    "EEEE, dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );
  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;

  const handleReviewSubmit = (values: ReviewFormValues) => {
    submitReview(
      { bookingId: historyClass.id, ...values },
      {
        onSuccess: () => {
          toast.success("Avaliação enviada com sucesso!");
          onOpenChange(false);
          onSubmitSuccess?.();
        },
        onError: (error) => {
          toast.error(error.message || "Não foi possível enviar a avaliação.");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="lg" className="max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Text variant="h4">Avaliar Aula</Text>
        </Dialog.Header>

        <div className="overflow-y-auto p-6 space-y-4">
          {/* Class Summary */}
          <div className="space-y-4 pb-6 border-b-2">
            <div>
              <Text variant="eyebrow">Aula</Text>
              <Text variant="h5">{historyClass.subject.name}</Text>
            </div>

            <div className="flex items-start gap-3">
              <Avatar className="h-12 w-12 shrink-0">
                <Avatar.Image
                  src={historyClass.professor.avatar}
                  alt={historyClass.professor.name}
                />
                <Avatar.Fallback>
                  {historyClass.professor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>

              <div className="space-y-2 flex-1">
                <div>
                  <Text variant="caption">Instrutor</Text>
                  <Text variant="h6">{historyClass.professor.name}</Text>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 shrink-0" />
                    <Text variant="body">{formattedDate}</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 shrink-0" />
                    <Text variant="body">{timeRange}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          <ReviewForm
            onSubmit={handleReviewSubmit}
            isSubmitting={isPending}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
