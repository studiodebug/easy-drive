"use client";

import { CreditDisplay } from "@/components/blocks/CreditDisplay";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Text } from "@/components/retroui/Text";
import { getStatusBadge } from "@/lib/badge-utils";
import type { ScheduledClass } from "@/types/scheduled-class";
import { Clock } from "lucide-react";
import { useState } from "react";
import {
  formatDateAsDDMM,
  getDayOfWeekInPortuguese,
} from "../utils/date-utils";
import { ScheduledClassDetailsModal } from "./ScheduledClassDetailsModal";

interface ScheduledClassCardProps {
  scheduledClass: ScheduledClass;
}

export function ScheduledClassCard({
  scheduledClass,
}: ScheduledClassCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const statusBadge = getStatusBadge(scheduledClass.status);
  const dayOfWeek = getDayOfWeekInPortuguese(scheduledClass.date);
  const formattedDate = formatDateAsDDMM(scheduledClass.date);

  return (
    <>
      <Card className="p-4 sm:p-6 flex flex-col h-full">
        {/* Date and Time */}
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <div className="space-x-2">
            <Text variant="bodyLg" as="span" className="font-bold">
              {dayOfWeek}, {formattedDate}
            </Text>
            <Text variant="bodyLg" as="span">
              às {scheduledClass.time}
            </Text>
          </div>

          <span className="ml-auto">
            <Badge className={statusBadge.className} size="sm">
              {statusBadge.text}
            </Badge>
          </span>
        </div>

        {/* Subject */}
        <div className="mb-4">
          <Text variant="h5">{scheduledClass.subject}</Text>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="h-12 w-12">
            <Avatar.Image
              src={scheduledClass.instructor.avatar}
              alt={scheduledClass.instructor.name}
            />
            <Avatar.Fallback>
              {scheduledClass.instructor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <Text variant="body">Instrutor</Text>
            <Text variant="body" className="font-semibold">
              {scheduledClass.instructor.name}
            </Text>
          </div>
        </div>

        {/* Spacer to push actions to bottom */}
        <div className="flex-1" />

        {/* Actions - Always at bottom */}
        <div className="flex items-end justify-between gap-4">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            Ver detalhes
          </Button>
          <CreditDisplay credits={scheduledClass.credits} />
        </div>
      </Card>

      <ScheduledClassDetailsModal
        scheduledClass={scheduledClass}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
