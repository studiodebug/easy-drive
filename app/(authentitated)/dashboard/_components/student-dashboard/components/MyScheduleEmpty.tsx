import { CalendarX } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "./EmptyState";

export function MyScheduleEmpty() {
  return (
    <EmptyState
      icon={
        <div className="w-20 h-20 bg-purple-100 border-2 border-black flex items-center justify-center">
          <CalendarX className="w-10 h-10 text-purple-600" strokeWidth={2.5} />
        </div>
      }
      title="Você tem apenas uma sessão agendada"
      description="Confira os seus créditos disponíveis e planeje suas sessões agora mesmo."
      actionButton={
        <Link
          href="/dashboard"
          className="text-primary font-semibold hover:underline"
        >
          Ir para página inicial
        </Link>
      }
    />
  );
}
