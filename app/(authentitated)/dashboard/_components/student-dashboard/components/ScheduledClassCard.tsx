"use client";

import { useState } from "react";
import { Card } from "@/components/retroui/Card";
import { Button } from "@/components/retroui/Button";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Clock, FileText } from "lucide-react";
import { ScheduledClass } from "../data/scheduled-classes-mock";
import {
  formatDateAsDDMM,
  getDayOfWeekInPortuguese,
} from "../utils/date-utils";
import { getStatusBadge } from "@/lib/badge-utils";
import { Text } from "@/components/retroui/Text";
import Link from "next/link";
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
      <Card className="p-4 sm:p-6 space-y-4">
        {/* Date and Time */}
        <div className="flex items-center gap-2">
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

        <div className="space-y-4">
          {/* Subject */}
          <div>
            <Text variant="h5">{scheduledClass.subject}</Text>
          </div>

          {/* Instructor */}
          <div className="flex items-center gap-2">
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
              <p className="text-sm text-muted-foreground">Instrutor</p>
              <p className="font-semibold">{scheduledClass.instructor.name}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 gap-4">
            <Button
              size="sm"
              variant="secondary"
              className="w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Ver detalhes
            </Button>
            <Button asChild variant={"link"} className="flex w-full">
              <Link
                href="#"
                target="_blank"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Ver material
              </Link>
            </Button>
          </div>
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
