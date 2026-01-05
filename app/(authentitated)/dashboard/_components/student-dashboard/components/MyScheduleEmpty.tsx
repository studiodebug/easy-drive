import { Card } from "@/components/retroui/Card";
import { CalendarX } from "lucide-react";
import Link from "next/link";

export function MyScheduleEmpty() {
  return (
    <Card className="w-full p-12 bg-white">
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Purple calendar icon with exclamation */}
        <div className="relative">
          <div className="w-20 h-20 bg-purple-100 border-2 border-black flex items-center justify-center">
            <CalendarX
              className="w-10 h-10 text-purple-600"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-foreground">
          Você tem apenas uma sessão agendada
        </h3>

        <p className="text-muted-foreground text-center max-w-2xl">
          Confira os seus créditos disponíveis e planeje suas sessões agora
          mesmo.
        </p>

        <Link
          href="/dashboard"
          className="text-primary font-semibold hover:underline mt-2"
        >
          Ir para página inicial
        </Link>
      </div>
    </Card>
  );
}
