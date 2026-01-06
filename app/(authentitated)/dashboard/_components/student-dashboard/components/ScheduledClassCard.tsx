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

interface ScheduledClassCardProps {
  scheduledClass: ScheduledClass;
}

export function ScheduledClassCard({
  scheduledClass,
}: ScheduledClassCardProps) {
  const getStatusBadge = (status: string) => {
    const badges = {
      confirmada: {
        text: "Confirmada",
        className: "bg-green-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      pendente: {
        text: "Pendente",
        className: "bg-yellow-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
      cancelada: {
        text: "Cancelada",
        className: "bg-red-400 text-black border-2 border-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
      },
    };
    return badges[status as keyof typeof badges];
  };

  const getLanguageFlag = (language: string) => {
    const flags = {
      "pt-BR": "🇧🇷",
      "en-US": "🇺🇸",
      "es-ES": "🇪🇸",
    };
    return flags[language as keyof typeof flags] || "🌐";
  };

  const statusBadge = getStatusBadge(scheduledClass.status);
  const languageFlag = getLanguageFlag(scheduledClass.language);
  const dayOfWeek = getDayOfWeekInPortuguese(scheduledClass.date);
  const formattedDate = formatDateAsDDMM(scheduledClass.date);

  return (
    <Card className="p-4 sm:p-6 bg-white hover:shadow-lg transition-all">
      <div className="flex flex-col gap-4">
        {/* Header: Status Badge */}
        <Badge className={statusBadge.className} size="sm">
          {statusBadge.text}
        </Badge>

        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-muted-foreground" />
          <div className="text-sm">
            <span className="font-semibold">
              {dayOfWeek}, {formattedDate}
            </span>
            <span className="text-muted-foreground ml-2">
              às {scheduledClass.time}
            </span>
          </div>
        </div>

        {/* Subject */}
        <div>
          <h3 className="text-lg font-bold mb-1">{scheduledClass.subject}</h3>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{languageFlag}</span>
            <span className="text-sm text-muted-foreground">
              {scheduledClass.language === "pt-BR" && "Português"}
              {scheduledClass.language === "en-US" && "Inglês"}
              {scheduledClass.language === "es-ES" && "Espanhol"}
            </span>
          </div>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-3">
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
        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 border-t-2 border-gray-200 gap-3 sm:gap-0">
          <Button size="sm" variant="secondary" className="w-full sm:w-auto flex-1 sm:mr-2">
            Começa em {scheduledClass.startsInDays} dias
          </Button>
          <a
            href="#"
            className="text-sm font-bold text-black border-b-2 border-yellow-400 hover:bg-yellow-400 transition-all flex items-center justify-center gap-1 px-1 w-full sm:w-auto"
          >
            <FileText className="w-4 h-4" />
            Ver material
          </a>
        </div>
      </div>
    </Card>
  );
}
