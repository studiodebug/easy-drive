"use client";

import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Input } from "@/components/retroui/Input";
import { Text } from "@/components/retroui/Text";
import { formatCurrency } from "@/lib/utils";
import {
  CREDIT_PLANS,
  usePurchaseCredits,
} from "@/mutations/dashboard/credits.mutation";
import {
  AlertCircle,
  ExternalLink,
  Loader2,
  Plus,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { PlanCard } from "./PlanCard";

interface AddCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCreditsModal({ isOpen, onClose }: AddCreditsModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const { mutate: purchase, isPending } = usePurchaseCredits();

  const selectedPlan = CREDIT_PLANS.find((p) => p.id === selectedPlanId);

  // Validate custom amount
  const customValue = parseInt(customAmount, 10);
  const isCustomValid = !isNaN(customValue) && customValue >= 10;

  // Calculate total price and credits based on selection
  const totalCredits = selectedPlanId
    ? selectedPlan?.credits
    : isCustomValid
    ? customValue
    : 0;
  const totalPrice = selectedPlanId
    ? selectedPlan?.price
    : isCustomValid
    ? customValue
    : 0;
  const isValidSelection = selectedPlanId !== null || isCustomValid;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setCustomAmount(""); // Clear custom amount when selecting a plan
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, ""); // Allow only numbers
    setCustomAmount(val);
    setSelectedPlanId(null); // Clear plan selection when typing
  };

  const handlePurchase = () => {
    if (!isValidSelection) return;

    // TODO: Handle custom amount purchase (requires backend support for dynamic amount)
    // For now, we only support plan IDs as per the mutation hook contract.
    // If backend supports dynamic amount, we would pass { amount: customValue } instead.
    // Assuming we use the nearest plan or a special "custom" endpoint.

    const planToPurchase = selectedPlanId || "custom";

    // MOCK: If custom, we just alert for now or need to adjust mutation to accept amount
    if (!selectedPlanId) {
      toast.error(
        "Compra de valor personalizado ainda não implementada no backend."
      );
      return;
    }

    purchase(planToPurchase, {
      onSuccess: () => {
        toast.success("Créditos adicionados com sucesso!");
        onClose();
        setSelectedPlanId(null);
        setCustomAmount("");
      },
      onError: () => {
        toast.error("Erro ao processar pagamento. Tente novamente.");
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Dialog.Content className="sm:max-w-3xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-0 gap-0 overflow-hidden rounded-none">
        {/* Header Section */}
        <div>
          <Dialog.Header className="p-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="bg-primary border-2 border-black p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <Plus className="w-6 h-6 text-black" strokeWidth={3} />
                </div>
                <div>

                <Text variant="h4">
                  Adicionar Créditos
                </Text>
              <Dialog.Description className="text-base font-medium text-muted-foreground">
                Turbine seu aprendizado. Escolha um pacote ou defina um valor.
              </Dialog.Description>
                </div>
              </div>
            </div>
          </Dialog.Header>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          {/* Preset Plans */}
          <div className="mb-6">
            <Text className="text-lg font-bold mb-3 uppercase tracking-tight">
              Pacotes Populares
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CREDIT_PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isSelected={selectedPlanId === plan.id}
                  onSelect={() => handlePlanSelect(plan.id)}
                />
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="mb-6">
            <div
              className={`
              p-6 border-2 transition-all duration-200 bg-white
              ${
                customAmount
                  ? "border-black shadow-[4px_4px_0px_0px_#000]"
                  : "border-black/20 border-dashed"
              }
            `}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <Text className="font-bold uppercase tracking-tight mb-1">
                    Outro Valor
                  </Text>
                  <Text className="text-xs text-muted-foreground">
                    Mínimo R$ 10 (1 crédito = R$ 1)
                  </Text>
                </div>

                <div className="w-full sm:w-auto flex flex-col gap-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">
                      R$
                    </span>
                    <Input
                      type="text" // using text to control regex input
                      inputMode="numeric"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Ex: 80"
                      className={`pl-9 text-lg font-bold h-12 w-full sm:w-48 rounded-none border-2 focus:ring-0 ${
                        customAmount
                          ? "border-black bg-primary/10"
                          : "border-black/20"
                      }`}
                    />
                  </div>
                  {customAmount && !isCustomValid && (
                    <Text className="text-xs text-red-500 font-bold">
                      Mínimo R$ 10
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-4 border-2 border-black/10 bg-white/50 rounded-none">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
              <Text className="text-xs text-muted-foreground leading-relaxed">
                <strong>Preço varia por instrutor.</strong> O valor base
                estimado é R$50/aula. Instrutores podem cobrar valores
                diferentes baseado em experiência, região e tipo de aula.
              </Text>
            </div>
          </div>
        </div>

        {/* Footer / Actions */}
        <div className="p-6 border-t-2 border-black bg-white">
          {/* Trust Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="flex items-start gap-2 p-3 border-2 border-black/10 bg-muted/10 rounded-none">
              <ShieldCheck className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Pagamento Seguro
                </span>
                <span className="text-xs text-muted-foreground">
                  Via Stripe Encriptado
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 border-2 border-black/10 bg-muted/10 rounded-none">
              <div className="w-5 h-5 shrink-0 mt-0.5">
                <Text className="text-lg">♾️</Text>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Não Expira
                </span>
                <span className="text-xs text-muted-foreground">
                  Créditos comprados não expiram
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 border-2 border-black/10 bg-muted/10 rounded-none">
              <div className="w-5 h-5 shrink-0 mt-0.5">
                <Text className="text-lg">↩️</Text>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground">
                  Reembolso Fácil
                </span>
                <span className="text-xs text-muted-foreground">
                  Estorno em até 7 dias sem uso
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy Link */}
          <div className="mb-6 flex justify-center">
            <Link
              href="/politica-de-cancelamento"
              target="_blank"
              className="group flex items-center gap-1 text-sm text-muted-foreground hover:text-black transition-colors"
            >
              <span className="border-b border-muted-foreground group-hover:border-black">
                Política de cancelamento de aula
              </span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:items-center gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="flex-1 sm:flex-none h-12 border-2 border-black hover:bg-red-100 hover:text-red-900 shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all"
            >
              Cancelar
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={!isValidSelection || isPending}
              className="flex-1 sm:flex-none w-full sm:w-auto min-w-[240px] h-12 text-base border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all bg-black text-white hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  {isValidSelection && totalPrice ? (
                    <span className="flex items-center gap-2 font-bold">
                      Comprar {totalCredits} créditos
                      <span className="text-primary">·</span>
                      <span className="underline decoration-primary decoration-4 underline-offset-4">
                        {formatCurrency(totalPrice)}
                      </span>
                    </span>
                  ) : (
                    <>Selecione ou digite um valor</>
                  )}
                </>
              )}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
