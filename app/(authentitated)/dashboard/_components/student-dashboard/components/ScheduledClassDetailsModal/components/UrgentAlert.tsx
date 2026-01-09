import { Alert } from "@/components/retroui/Alert";
import { Text } from "@/components/retroui/Text";
import { AlertTriangle } from "lucide-react";

interface UrgentAlertProps {
  startsInDays: number;
}

export function UrgentAlert({ startsInDays }: UrgentAlertProps) {
  return (
    <Alert status="warning">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white border-2 border-black p-2">
          <AlertTriangle className="w-5 h-5 text-black" />
        </div>
        <div className="flex-1">
          <Text variant="h6">
            {startsInDays === 0
              ? "A aula acontece hoje!"
              : "A aula acontece amanhã!"}
          </Text>
          <Text variant="bodySm">
            Certifique-se de estar preparado para o horário agendado
          </Text>
        </div>
      </div>
    </Alert>
  );
}
