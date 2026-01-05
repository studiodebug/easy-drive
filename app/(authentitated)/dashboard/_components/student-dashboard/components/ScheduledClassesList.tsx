import { ScheduledClassCard } from "./ScheduledClassCard";
import { ScheduledClass } from "../data/scheduled-classes-mock";
import { getCurrentWeekRange, formatDateAsDDMM } from "../utils/date-utils";

interface ScheduledClassesListProps {
  scheduledClasses: ScheduledClass[];
}

export function ScheduledClassesList({
  scheduledClasses,
}: ScheduledClassesListProps) {
  const { startDate, endDate } = getCurrentWeekRange();
  const startDateFormatted = formatDateAsDDMM(startDate);
  const endDateFormatted = formatDateAsDDMM(endDate);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Aulas agendadas</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Entre os dias {startDateFormatted} a {endDateFormatted}. Para ver outras
        datas, avance para a próxima semana ou acesse{" "}
        <a href="#" className="text-primary underline font-semibold">
          minhas aulas
        </a>
        .
      </p>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {scheduledClasses.map((scheduledClass) => (
          <ScheduledClassCard
            key={scheduledClass.id}
            scheduledClass={scheduledClass}
          />
        ))}
      </div>
    </div>
  );
}
