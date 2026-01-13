"use client";

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import {
  CREDIT_PLANS,
  usePurchaseCredits,
} from "@/mutations/dashboard/credits.mutation";
import { Check, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/retroui/Badge";

interface AddCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCreditsModal({ isOpen, onClose }: AddCreditsModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const { mutate: purchase, isPending } = usePurchaseCredits();

  const handlePurchase = () => {
    if (!selectedPlanId) return;

    purchase(selectedPlanId, {
      onSuccess: () => {
        toast.success("Créditos adicionados com sucesso!");
        onClose();
        setSelectedPlanId(null);
      },
      onError: () => {
        toast.error("Erro ao processar pagamento. Tente novamente.");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="sm:max-w-lg bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Dialog.Header>
          <Text className="text-xl font-bold">Adicionar Créditos</Text>
          <Dialog.Description>
            Escolha um pacote de créditos para continuar agendando suas aulas.
          </Dialog.Description>
        </Dialog.Header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {CREDIT_PLANS.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlanId(plan.id)}
              className={`
                relative cursor-pointer border-2 p-4 rounded-lg transition-all
                ${
                  selectedPlanId === plan.id
                    ? "border-black bg-primary/10 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                    : "border-border hover:border-black/50"
                }
              `}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 right-2 bg-black text-white hover:bg-black/90">
                  Popular
                </Badge>
              )}
              <div className="flex flex-col gap-1">
                <Text className="font-bold text-lg">
                  {plan.credits} Créditos
                </Text>
                <Text className="text-muted-foreground text-sm">
                  {plan.label}
                </Text>
                <Text className="font-bold text-xl mt-2">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(plan.price)}
                </Text>
              </div>
              {selectedPlanId === plan.id && (
                <div className="absolute bottom-2 right-2 text-black">
                  <Check className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancelar
          </Button>
          <Button
            onClick={handlePurchase}
            disabled={!selectedPlanId || isPending}
            className="w-full sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Comprar agora
              </>
            )}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
