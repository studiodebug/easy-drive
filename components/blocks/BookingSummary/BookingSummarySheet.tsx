"use client";

import { AddCreditsModal } from "@/app/(authentitated)/dashboard/_components/student-dashboard/components/AddCreditsModal";
import { Avatar } from "@/components/retroui/Avatar";
import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Dialog } from "@/components/retroui/Dialog";
import { Text } from "@/components/retroui/Text";
import { cn } from "@/lib/utils";
import { AlertCircle, ClipboardList, Clock, Trash2 } from "lucide-react";
import { useBookingSummary } from "./useBookingSummary";

const formatTime = (time: string) => time.slice(0, 5);

const slotKey = (date: string, startTime: string, endTime: string) =>
  `${date}-${startTime}-${endTime}`;

const formatWeekdayShort = (date: string) =>
  new Date(date).toLocaleDateString("pt-BR", { weekday: "short" }).slice(0, 3);

const formatMonthName = (date: string) =>
  new Date(date).toLocaleDateString("pt-BR", { month: "long" });

const getDayNumber = (date: string) => new Date(date).getDate();

const buildPrimaryCtaLabel = ({
  hasSlots,
  isAuthenticated,
  missingCredits,
  isConfirming,
}: {
  hasSlots: boolean;
  isAuthenticated: boolean;
  missingCredits: number;
  isConfirming: boolean;
}) => {
  if (!hasSlots) return "Selecione horários";
  if (!isAuthenticated) return "Entrar para confirmar";
  if (missingCredits > 0) return `Comprar ${missingCredits} créditos`;
  if (isConfirming) return "Confirmando...";
  return "Confirmar agendamento";
};

export function BookingSummaryEntry() {
  const { draft, openSummary } = useBookingSummary();
  const count = draft?.slots.length ?? 0;

  return (
    <button
      type="button"
      onClick={openSummary}
      aria-label="Abrir resumo do agendamento"
      className="relative p-2 hover:bg-black/5 rounded-full transition-colors"
    >
      <ClipboardList className="h-6 w-6" />
      {count > 0 && (
        <span className="font-bold text-[10px] text-white bg-red-500 border border-white rounded-full h-4 w-4 flex items-center justify-center absolute top-1 right-1 shadow-sm">
          {count}
        </span>
      )}
    </button>
  );
}

export function BookingSummarySheet() {
  const {
    draft,
    isSummaryOpen,
    isAddCreditsOpen,
    isQuoteLoading,
    isConfirming,
    isAuthenticated,
    availableCredits,
    requiredCredits,
    missingCredits,
    hasSlots,
    instructor,
    closeSummary,
    clearDraft,
    handleConfirm,
    handleRemoveSlot,
    handleCloseAddCredits,
  } = useBookingSummary();

  const primaryCtaLabel = buildPrimaryCtaLabel({
    hasSlots,
    isAuthenticated,
    missingCredits,
    isConfirming,
  });

  return (
    <>
      <Dialog open={isSummaryOpen} onOpenChange={(open) => (open ? null : closeSummary())}>
        <Dialog.Content
          className="fixed right-0 top-0 left-auto translate-x-0 translate-y-0 h-full w-full max-w-md rounded-none border-l-4 border-black bg-white p-0 shadow-2xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md"
          overlay={{ variant: "default" }}
        >
          <Dialog.Header className="flex items-center justify-between border-b-4 border-black bg-primary px-6 py-4">
            <Text as="h3" className="text-xl font-black uppercase tracking-tight text-black">
              Resumo do Agendamento
            </Text>
          </Dialog.Header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {!hasSlots ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                <ClipboardList className="h-16 w-16 mb-4 text-black" strokeWidth={1.5} />
                <Text variant="h6" className="mb-2 font-bold">
                  Nenhum horário selecionado
                </Text>
                <Text variant="bodySm" className="text-muted-foreground max-w-[200px]">
                  Selecione horários na agenda do instrutor para revisar aqui.
                </Text>
              </div>
            ) : (
              <>
                {instructor && (
                  <div className="flex items-center gap-4 p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <Avatar
                      src={instructor.avatar}
                      name={instructor.name}
                      className="h-12 w-12 border-2 border-black"
                    />
                    <div className="flex-1">
                      <Text className="font-black text-lg leading-tight">{instructor.name}</Text>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" size="sm" className="bg-yellow-100 font-bold border-black">
                          {instructor.creditsPerLesson} créditos/aula
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Text className="font-black uppercase text-sm tracking-wide text-muted-foreground">
                      Horários ({draft?.slots.length})
                    </Text>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={clearDraft}
                    >
                      Limpar tudo
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {draft?.slots.map((slot) => (
                      <div
                        key={slotKey(slot.date, slot.startTime, slot.endTime)}
                        className="group flex items-center justify-between p-3 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 transition-transform"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/20 border-2 border-black rounded-md">
                            <Text as="span" className="text-[10px] font-black uppercase leading-none">
                              {formatWeekdayShort(slot.date)}
                            </Text>
                            <Text as="span" className="text-xl font-black leading-none">
                              {getDayNumber(slot.date)}
                            </Text>
                          </div>
                          <div>
                            <Text variant="bodySm" className="font-black">
                              {formatMonthName(slot.date)}
                            </Text>
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3 w-3" />
                              <Text variant="bodySm">
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </Text>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSlot(slot)}
                          className="p-2 text-black/40 hover:text-red-600 transition-colors"
                          aria-label="Remover horário"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <Text as="span">
                          Créditos necessários
                        </Text>
                        <Text as="span">
                          {isQuoteLoading ? "..." : requiredCredits}
                        </Text>
                      </div>
                      <div className="flex items-center justify-between">
                        <Text as="span">
                          Seu saldo atual
                        </Text>
                        <Text
                          as="span"
                          className={cn("text-lg font-bold", !isAuthenticated && "text-muted-foreground/50")}
                        >
                          {isAuthenticated ? availableCredits : "-"}
                        </Text>
                      </div>
                      <div className="h-px bg-black/10 my-2" />
                      <div className="flex items-center justify-between">
                        <Text as="span" className="font-black uppercase">
                          Saldo final
                        </Text>
                        <Badge
                          variant="surface"
                          className={cn(
                            "text-lg font-black px-3 py-1 border-2 border-black",
                            missingCredits > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                          )}
                        >
                          {isAuthenticated ? availableCredits - requiredCredits : "-"}
                        </Badge>
                      </div>
                    </div>

                    {missingCredits > 0 && isAuthenticated && (
                      <div className="flex items-start gap-2 p-3 bg-red-50 border-2 border-red-100 rounded-sm text-red-700 text-xs font-medium">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <Text as="span" variant="bodySm" className="text-red-700">
                          Você precisa de mais{" "}
                          <Text as="span" className="font-black text-red-700">
                            {missingCredits} créditos
                          </Text>{" "}
                          para confirmar este agendamento.
                        </Text>
                      </div>
                    )}
                  </div>

                  <Text
                    as="p"
                    className="text-[10px] text-center text-muted-foreground mt-3 font-medium uppercase tracking-wide"
                  >
                    A disponibilidade será confirmada ao finalizar
                  </Text>
                </div>
              </>
            )}
          </div>

          <Dialog.Footer className="bg-white p-6">
            <div className="flex flex-col w-full gap-3">
              <Button
                size="lg"
                disabled={isQuoteLoading || isConfirming}
                onClick={hasSlots ? handleConfirm : closeSummary}
              >
                {primaryCtaLabel}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={closeSummary}
              >
                Continuar escolhendo
              </Button>
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>

      <AddCreditsModal
        isOpen={isAddCreditsOpen}
        onClose={handleCloseAddCredits}
      />
    </>
  );
}
