import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { Alert } from "@/components/retroui/Alert";
import { AlertTriangle } from "lucide-react";
import { CancellationPolicy } from "../types";
import { PolicyCard } from "./PolicyCard";

interface CancellationOverlayProps {
  classSubject: string;
  policy: CancellationPolicy;
  isUrgent: boolean;
  isCanceling: boolean;
  onBack: () => void;
  onConfirm: () => void;
}

const getSeverityColors = (severity: CancellationPolicy["severity"]) => {
  switch (severity) {
    case "safe":
      return {
        bg: "bg-blue-100",
        border: "border-blue-200",
        icon: "text-blue-600",
      };
    case "low":
      return {
        bg: "bg-yellow-100",
        border: "border-yellow-200",
        icon: "text-yellow-600",
      };
    case "medium":
      return {
        bg: "bg-orange-100",
        border: "border-orange-200",
        icon: "text-orange-600",
      };
    default:
      return {
        bg: "bg-red-100",
        border: "border-red-200",
        icon: "text-red-600",
      };
  }
};

export function CancellationOverlay({
  classSubject,
  policy,
  isUrgent,
  isCanceling,
  onBack,
  onConfirm,
}: CancellationOverlayProps) {
  const colors = getSeverityColors(policy.severity);

  return (
    <div className="absolute inset-0 bg-background flex items-center justify-center p-6 rounded z-10 overflow-y-auto">
      <div className="max-w-lg w-full space-y-4 my-auto">
        {/* Header Icon */}
        <div className="flex justify-center">
          <div
            className={`rounded-full p-6 border-4 ${colors.bg} ${colors.border}`}
          >
            <AlertTriangle className={`w-12 h-12 ${colors.icon}`} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-center">
          <div>
            <Text variant="h4">Confirmar cancelamento?</Text>
            <Text variant="body">{classSubject}</Text>
          </div>

          {/* Policy Card */}
          <PolicyCard policy={policy} />

          {/* Warning for critical cases */}
          {policy.severity === "critical" && (
            <Alert status="error" className="text-left">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <Text variant="h6" className="mb-1">
                    Atenção: Cancelamento tardio
                  </Text>
                  <Text variant="bodySm">
                    Falta menos de 1 hora para a aula. Não será possível
                    recuperar os créditos utilizados.
                  </Text>
                </div>
              </div>
            </Alert>
          )}

          {/* Info */}
          <div>
            <Text variant="bodySm">
              {policy.severity === "safe"
                ? "Você pode reagendar esta aula a qualquer momento."
                : "Esta ação não pode ser desfeita. Os créditos serão processados automaticamente."}
            </Text>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isCanceling}
            size="lg"
          >
            Voltar
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isCanceling}
            size="lg"
          >
            {isCanceling ? "Cancelando..." : "Sim, cancelar aula"}
          </Button>
        </div>
      </div>
    </div>
  );
}
