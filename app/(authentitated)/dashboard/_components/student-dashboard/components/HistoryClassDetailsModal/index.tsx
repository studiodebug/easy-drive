"use client";

import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Badge } from "@/components/retroui/Badge";
import { Avatar } from "@/components/retroui/Avatar";
import { StarRating } from "@/components/StarRating";
import { Calendar, Clock, Award, Car, MapPin } from "lucide-react";
import type { HistoryClass } from "@/types/history";
import { useGetInstructors } from "@/queries/dashboard/instructors.query";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getStatusBadge } from "@/lib/badge-utils";

interface HistoryClassDetailsModalProps {
  historyClass: HistoryClass;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HistoryClassDetailsModal({
  historyClass,
  open,
  onOpenChange,
}: HistoryClassDetailsModalProps) {
  const { data: instructors } = useGetInstructors();
  
  // Find instructor full details from query data
  const instructorDetails = instructors?.find(
    (i) => i.name === historyClass.professor.name
  );

  const statusBadge = getStatusBadge(historyClass.status);
  const formattedDate = format(
    historyClass.date,
    "EEEE, dd 'de' MMMM 'de' yyyy",
    {
      locale: ptBR,
    }
  );
  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="2xl" className="max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Text variant="h4">Detalhes da Aula</Text>
        </Dialog.Header>

        <div className="overflow-y-auto px-6 py-6 space-y-8">
          {/* Class Information */}
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl" aria-hidden="true">
                    {historyClass.subject.icon}
                  </span>
                  <Text variant="h5">{historyClass.subject.name}</Text>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 shrink-0" />
                    <Text variant="bodyLg" className="font-semibold capitalize">
                      {formattedDate}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 shrink-0" />
                    <Text variant="bodyLg" className="font-semibold">
                      {timeRange}
                    </Text>
                  </div>
                </div>
              </div>

              <Badge className={statusBadge.className} size="lg">
                {statusBadge.text}
              </Badge>
            </div>

            {/* Rating Display (if already reviewed) */}
            {historyClass.rating && (
              <div className="p-4 bg-yellow-50 border-2 border-black rounded space-y-2">
                <Text variant="body" className="font-semibold">
                  Sua avaliação
                </Text>
                <StarRating rating={historyClass.rating} size={24} showText />
                {historyClass.comment && (
                  <div className="pt-2 border-t-2 border-black/10">
                    <Text variant="bodySm" className="text-muted-foreground mb-1">
                      Seu comentário
                    </Text>
                    <Text variant="body">{historyClass.comment}</Text>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Instructor Details */}
          {instructorDetails && (
            <div className="space-y-6 pt-6 border-t-2">
              <Text variant="h4">Instrutor</Text>

              <div className="flex items-start gap-6">
                <Avatar className="h-24 w-24 shrink-0">
                  <Avatar.Image
                    src={instructorDetails.avatar}
                    alt={instructorDetails.name}
                  />
                  <Avatar.Fallback>
                    {instructorDetails.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar.Fallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <Text variant="h4" className="mb-2">
                      {instructorDetails.name}
                    </Text>

                    <div className="flex items-center gap-4 flex-wrap mb-3">
                      <div className="flex items-center gap-2">
                        <StarRating rating={instructorDetails.rating} size={20} />
                        <Text variant="h6">
                          {instructorDetails.rating.toFixed(1)}
                        </Text>
                      </div>

                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        <Text variant="body">
                          {instructorDetails.totalClasses} aulas
                        </Text>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {instructorDetails.specialties.map((specialty) => (
                        <Badge key={specialty} variant="surface" size="sm">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {instructorDetails.bio && (
                    <Text variant="body">{instructorDetails.bio}</Text>
                  )}
                </div>
              </div>

              {/* Vehicle and Location Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3 rounded border-2">
                  <Car className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <Text variant="bodySm">Veículo</Text>
                    <Text variant="body" className="font-semibold">
                      {instructorDetails.carModel} {instructorDetails.carYear}
                    </Text>
                    <Text variant="body">
                      Câmbio{" "}
                      {instructorDetails.carTransmission === "manual"
                        ? "Manual"
                        : "Automático"}
                    </Text>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded border-2">
                  <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <Text variant="bodySm">Localização</Text>
                    <Text variant="body" className="font-semibold">
                      {instructorDetails.city}
                    </Text>
                    <Text variant="body">{instructorDetails.state}</Text>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <Dialog.Footer>
          <Button
            variant="default"
            onClick={() => onOpenChange(false)}
            size="lg"
          >
            Fechar
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
