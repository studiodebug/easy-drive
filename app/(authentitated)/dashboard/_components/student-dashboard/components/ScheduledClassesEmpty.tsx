import { EmptyState } from "./EmptyState";

interface ScheduledClassesEmptyProps {
  startDate?: string;
  endDate?: string;
}

export function ScheduledClassesEmpty({
  startDate = "05/01",
  endDate = "11/01",
}: ScheduledClassesEmptyProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Aulas agendadas</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Entre os dias {startDate} a {endDate}. Para ver outras datas, avance
        para a próxima semana ou acesse{" "}
        <a href="#" className="text-primary underline font-semibold">
          minhas aulas
        </a>
        .
      </p>

      <EmptyState
        icon={<div className="text-6xl">🎉</div>}
        title="Você não tem aulas agendadas"
        description='As aulas agendadas aparecem aqui, clique no botão "agendar uma aula" e marque agora!'
      />
    </div>
  );
}
