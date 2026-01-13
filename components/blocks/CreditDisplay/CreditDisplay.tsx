"use client";

import { Coins, HelpCircle } from "lucide-react";
import { Text } from "@/components/retroui/Text";
import { Tooltip } from "@/components/retroui/Tooltip";
import { cn } from "@/lib/utils";

interface CreditDisplayProps {
  credits: number;
  className?: string;
}

export function CreditDisplay({ credits, className = "" }: CreditDisplayProps) {
  const formattedCredits = credits.toLocaleString("pt-BR");
  const formattedCurrency = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(credits);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Coins className="w-4 h-4" strokeWidth={2.5} />
      <Text variant="bodySm" className="font-bold text-black">
        {formattedCredits} {credits === 1 ? "crédito" : "créditos"}
      </Text>

      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger asChild>
            <button aria-label="Informações sobre créditos">
              <HelpCircle className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content variant="solid" className=" p-4 text-white">
            <div className="space-y-2">
              <Text variant="body" className="font-bold text-white">
                Como funcionam os créditos?
              </Text>
              <Text variant="bodySm" className="text-white">
                Cada crédito equivale a R$ 1,00. Esta aula custa{" "}
                <span className="font-bold">{formattedCurrency}</span>.
              </Text>
            </div>
          </Tooltip.Content>
        </Tooltip>
      </Tooltip.Provider>
    </div>
  );
}
