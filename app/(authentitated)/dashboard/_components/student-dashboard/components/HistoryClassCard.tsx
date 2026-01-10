"use client";

import { useState } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { Clock, Calendar } from "lucide-react";
import type { HistoryClass } from "@/types/history";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StarRating } from "@/components/StarRating";
import { getStatusBadge } from "@/lib/badge-utils";
import { HistoryClassDetailsModal } from "./HistoryClassDetailsModal";
import { RateClassModal } from "./RateClassModal";

interface HistoryClassCardProps {
  historyClass: HistoryClass;
}

export function HistoryClassCard({ historyClass }: HistoryClassCardProps) {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRateModalOpen, setIsRateModalOpen] = useState(false);
  const [hasRating, setHasRating] = useState(!!historyClass.rating);

  // Format date in Portuguese: "Sábado, 29 de mar"
  const formattedDate = format(historyClass.date, "EEEE, dd 'de' MMM", {
    locale: ptBR,
  });

  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;
  const statusBadge = getStatusBadge(historyClass.status);
  const canReview = historyClass.status === "completed" && !hasRating;

  const handleRatingSuccess = () => {
    setHasRating(true);
  };

  return (
    <>
      <Card className="p-4 sm:p-6 flex flex-col h-full">
        {/* Date, Time and Status */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground shrink-0" />
              <Text variant="bodyLg" className="font-semibold capitalize">
                {formattedDate}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
              <Text variant="bodyLg" className="font-semibold">
                {timeRange}
              </Text>
            </div>
          </div>

          <Badge className={statusBadge.className} size="sm">
            {statusBadge.text}
          </Badge>
        </div>

        <div className="flex-1 flex flex-col gap-4">
          {/* Subject */}
          <div>
            <Text variant="h5">{historyClass.subject.name}</Text>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
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
            <div>
              <Text variant="body">Instrutor</Text>
              <Text variant="body" className="font-semibold">
                {historyClass.professor.name}
              </Text>
            </div>
          </div>

          {/* Rating Display */}
          {historyClass.status === "completed" && hasRating && (
            <div className="pt-2 border-t-2">
              <Text variant="bodySm" className="text-muted-foreground mb-1">
                Sua avaliação
              </Text>
              <StarRating rating={historyClass.rating || 0} showText />
            </div>
          )}

          {/* Spacer to push buttons to bottom */}
          <div className="flex-1" />

          {/* Actions - Always at bottom */}
          <div className="flex items-center gap-2 pt-2">
            {canReview && (
              <Button
                size="sm"
                variant="default"
                className="flex-1"
                onClick={() => setIsRateModalOpen(true)}
              >
                Avaliar Aula
              </Button>
            )}
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              onClick={() => setIsDetailsModalOpen(true)}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </Card>

      <HistoryClassDetailsModal
        historyClass={historyClass}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />

      <RateClassModal
        historyClass={historyClass}
        open={isRateModalOpen}
        onOpenChange={setIsRateModalOpen}
        onSubmitSuccess={handleRatingSuccess}
      />
    </>
  );
}
