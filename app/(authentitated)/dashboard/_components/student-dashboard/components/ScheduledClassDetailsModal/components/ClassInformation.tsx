import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { Calendar, Clock } from "lucide-react";
import { ScheduledClass } from "../../../data/scheduled-classes-mock";
import {
  formatDateAsDDMM,
  getDayOfWeekInPortuguese,
} from "../../../utils/date-utils";
import { getStatusBadge } from "@/lib/badge-utils";
import { UrgentAlert } from "./UrgentAlert";

interface ClassInformationProps {
  scheduledClass: ScheduledClass;
  canCancel: boolean;
}

export function ClassInformation({
  scheduledClass,
  canCancel,
}: ClassInformationProps) {
  const statusBadge = getStatusBadge(scheduledClass.status);
  const dayOfWeek = getDayOfWeekInPortuguese(scheduledClass.date);
  const formattedDate = formatDateAsDDMM(scheduledClass.date);
  const isUrgent = scheduledClass.startsInDays <= 1 && canCancel;

  return (
    <div className="space-y-6">
      {/* Urgent Alert */}
      {isUrgent && <UrgentAlert startsInDays={scheduledClass.startsInDays} />}

      {/* Class Details */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Text variant="h5">{scheduledClass.subject}</Text>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 shrink-0" />
                <Text variant="bodyLg" className="font-semibold">
                  {dayOfWeek}, {formattedDate}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 shrink-0" />
                <Text variant="bodyLg" className="font-semibold">
                  {scheduledClass.time}
                </Text>
              </div>
            </div>
          </div>

          <Badge className={statusBadge.className} size="lg">
            {statusBadge.text}
          </Badge>
        </div>
      </div>
    </div>
  );
}
