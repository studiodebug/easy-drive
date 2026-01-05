import { Card } from "@/components/retroui/Card";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Users, User, Star } from "lucide-react";
import { HistoryClass } from "../data/history-mock";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HistoryClassCardProps {
  historyClass: HistoryClass;
}

export function HistoryClassCard({ historyClass }: HistoryClassCardProps) {
  // Format date in Portuguese: "Sáb, 29 de mar | 09:00 - 10:00"
  const formattedDate = format(historyClass.date, "EEE, dd 'de' MMM", {
    locale: ptBR,
  });

  const timeRange = `${historyClass.startTime} - ${historyClass.endTime}`;

  // Render star rating
  const renderRating = () => {
    if (historyClass.status !== "completed" || !historyClass.rating) {
      return null;
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= historyClass.rating!
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-sm font-semibold text-foreground">
          {historyClass.rating}.0
        </span>
      </div>
    );
  };

  return (
    <Card className="p-6 bg-white hover:shadow-lg transition-all">
      <div className="flex flex-col gap-4">
        {/* Professor Info */}
        <div className="flex items-center gap-3">
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
            <p className="text-sm text-muted-foreground">Professor(a)</p>
            <p className="font-semibold">{historyClass.professor.name}</p>
          </div>
        </div>

        {/* Subject and Type Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">
              {historyClass.subject.icon}
            </span>
            <h3 className="text-lg font-bold">{historyClass.subject.name}</h3>
          </div>
          <Badge
            className={
              historyClass.type === "group"
                ? "bg-blue-100 text-blue-700 border-2 border-black"
                : "bg-purple-100 text-purple-700 border-2 border-black"
            }
            size="sm"
          >
            {historyClass.type === "group" ? (
              <>
                <Users className="w-3 h-3 inline-block mr-1" />
                Aula em grupo
              </>
            ) : (
              <>
                <User className="w-3 h-3 inline-block mr-1" />
                Aula individual
              </>
            )}
          </Badge>
        </div>

        {/* Date and Time */}
        <div className="text-sm text-muted-foreground">
          <time dateTime={historyClass.date.toISOString()}>
            {formattedDate} | {timeRange}
          </time>
        </div>

        {/* Rating (only for completed) */}
        {historyClass.status === "completed" && (
          <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200">
            <div
              role="img"
              aria-label={`Avaliação: ${historyClass.rating} de 5 estrelas`}
            >
              {renderRating()}
            </div>
            <a
              href="#"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Ver detalhes
            </a>
          </div>
        )}

        {/* For cancelled classes, just show the link */}
        {historyClass.status === "cancelled" && (
          <div className="pt-2 border-t-2 border-gray-200 text-right">
            <a
              href="#"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Ver detalhes
            </a>
          </div>
        )}
      </div>
    </Card>
  );
}
