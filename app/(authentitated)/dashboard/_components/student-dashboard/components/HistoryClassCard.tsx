import { Card } from "@/components/retroui/Card";
import { Avatar } from "@/components/retroui/Avatar";
import { HistoryClass } from "../data/history-mock";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StarRating } from "@/components/StarRating";
import { getStatusBadge } from "@/lib/badge-utils";

interface HistoryClassCardProps {
  historyClass: HistoryClass;
}

export function HistoryClassCard({ historyClass }: HistoryClassCardProps) {
  // Format date in Portuguese: "Sáb, 29 de mar | 09:00 - 10:00"
  const formattedDate = format(historyClass.date, "EEE, dd 'de' MMM", {
    locale: ptBR,
  });

  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;

  return (
    <Card className="p-6 bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
      <div className="flex flex-col gap-4">
        {/* Professor Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Avatar.Image
              src={historyClass.professor.avatar}
              alt={historyClass.professor.name}
            />
            <Avatar.Fallback className="bg-blue-200 text-black font-bold">
              {historyClass.professor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
          <div>
            <p className="text-xs font-bold font-mono uppercase tracking-wider text-gray-500">
              Professor(a)
            </p>
            <p className="font-black text-lg text-black">
              {historyClass.professor.name}
            </p>
          </div>
        </div>

        {/* Subject */}
        <div className="flex items-center gap-3 p-3 bg-purple-100 border-2 border-black rounded-md">
          <span className="text-2xl" aria-hidden="true">
            {historyClass.subject.icon}
          </span>
          <h3 className="text-base font-bold text-black uppercase tracking-tight">
            {historyClass.subject.name}
          </h3>
        </div>

        {/* Date and Time */}
        <div className="flex items-center gap-2 text-sm font-bold text-black bg-gray-100 p-2 border-2 border-black border-dashed rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
          <time dateTime={historyClass.date.toISOString()}>
            {formattedDate} • {timeRange}
          </time>
        </div>

        {/* Rating (only for completed) */}
        {historyClass.status === "completed" && (
          <div className="flex items-center justify-between pt-4 border-t-2 border-black">
            <div
              role="img"
              aria-label={`Avaliação: ${historyClass.rating} de 5 estrelas`}
            >
              {historyClass.rating && (
                <StarRating rating={historyClass.rating} showText />
              )}
            </div>
            <a
              href="#"
              className="text-sm font-bold text-black border-b-2 border-yellow-400 hover:bg-yellow-400 transition-all px-1"
            >
              Ver detalhes
            </a>
          </div>
        )}

        {/* For cancelled classes, just show the link */}
        {historyClass.status === "cancelled" && (
          <div className="pt-4 border-t-2 border-black flex justify-between items-center">
            <span className={getStatusBadge(historyClass.status).className}>
              {getStatusBadge(historyClass.status).text.toUpperCase()}
            </span>
            <a
              href="#"
              className="text-sm font-bold text-black border-b-2 border-yellow-400 hover:bg-yellow-400 transition-all px-1"
            >
              Ver detalhes
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
