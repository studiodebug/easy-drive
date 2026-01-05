import { Card } from "@/components/retroui/Card";

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

      <Card className="w-full p-12 bg-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold text-primary">
            Você não tem aulas agendadas
          </h3>
          <p className="text-muted-foreground text-center max-w-2xl">
            As aulas agendadas aparecem aqui, clique no botão "agendar uma aula"
            e marque agora!
          </p>
        </div>
      </Card>
    </div>
  );
}
