"use client";

import { useState } from "react";
import { Dialog } from "@/components/retroui/Dialog";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { ScheduledClass } from "../../data/scheduled-classes-mock";
import { instructorsMock } from "../../data/instructors-mock";
import { useCancellationPolicy } from "./hooks/useCancellationPolicy";
import {
  ClassInformation,
  InstructorDetails,
  CancellationOverlay,
} from "./components";

interface ScheduledClassDetailsModalProps {
  scheduledClass: ScheduledClass;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduledClassDetailsModal({
  scheduledClass,
  open,
  onOpenChange,
}: ScheduledClassDetailsModalProps) {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  // Find instructor full details from mock data
  const instructorDetails = instructorsMock.find(
    (i) => i.name === scheduledClass.instructor.name,
  );

  // Get cancellation policy
  const cancellationPolicy = useCancellationPolicy(scheduledClass.date);

  const canCancel = scheduledClass.status !== "cancelada";
  const isUrgent = scheduledClass.startsInDays <= 1 && canCancel;

  const handleCancelClass = async () => {
    setIsCanceling(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsCanceling(false);
    setShowCancelConfirmation(false);
    onOpenChange(false);
    // TODO: Implement actual cancellation logic with policy
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Content size="2xl" className="max-h-[90vh] overflow-hidden">
        <Dialog.Header>
          <Text variant="h4">Detalhes da Aula</Text>
        </Dialog.Header>

        <div className="overflow-y-auto px-6 py-6 space-y-8">
          {/* Class Information */}
          <ClassInformation
            scheduledClass={scheduledClass}
            canCancel={canCancel}
          />

          {/* Instructor Details */}
          {instructorDetails && (
            <InstructorDetails instructor={instructorDetails} />
          )}
        </div>

        {/* Footer - Only show when not in cancellation mode */}
        {!showCancelConfirmation && (
          <Dialog.Footer className="gap-6">
            {canCancel && (
              <Button
                variant="destructive"
                onClick={() => setShowCancelConfirmation(true)}
                size="lg"
                className="order-2 md:order-1"
              >
                Cancelar Aula
              </Button>
            )}
            <Button
              variant="default"
              onClick={() => onOpenChange(false)}
              size="lg"
              className="order-1 md:order-2"
            >
              Fechar
            </Button>
          </Dialog.Footer>
        )}

        {/* Cancellation Overlay */}
        {showCancelConfirmation && (
          <CancellationOverlay
            classSubject={scheduledClass.subject}
            policy={cancellationPolicy}
            isUrgent={isUrgent}
            isCanceling={isCanceling}
            onBack={() => setShowCancelConfirmation(false)}
            onConfirm={handleCancelClass}
          />
        )}
      </Dialog.Content>
    </Dialog>
  );
}
