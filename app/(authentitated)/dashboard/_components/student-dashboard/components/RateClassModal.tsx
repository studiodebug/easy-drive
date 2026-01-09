"use client";

import { useState } from "react";
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Avatar } from "@/components/retroui/Avatar";
import { Calendar, Clock } from "lucide-react";
import { HistoryClass } from "../data/history-mock";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReviewForm } from "./ReviewForm";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formattedDate = format(
    historyClass.date,
    "EEEE, dd 'de' MMMM 'de' yyyy",
    {
      locale: ptBR,
    }
  );
  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;

  const handleReviewSubmit = async (rating: number, comment: string) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Review submitted:", { rating, comment });
    setIsSubmitting(false);
    onOpenChange(false);
    onSubmitSuccess?.();
    // TODO: Implement actual review submission logic
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
            isSubmitting={isSubmitting}
          />
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
