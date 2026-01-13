import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { cn, formatCurrency } from "@/lib/utils";
import { CreditPlan } from "@/server/contracts/dashboard/credits-types";
import { Check } from "lucide-react";

interface PlanCardProps {
  plan: CreditPlan;
  isSelected: boolean;
  onSelect: () => void;
}

export function PlanCard({
  plan,
  isSelected,
  onSelect,
}: PlanCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "relative cursor-pointer border-2 border-black p-6 transition-all duration-200 outline-none select-none",
        "bg-white text-black",
        isSelected
          ? "bg-primary shadow-none translate-x-[4px] translate-y-[4px]"
          : "shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000]"
      )}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 -right-3 rotate-3 z-10">
          <Badge
            variant="solid"
            className="bg-black text-white border-2 border-white shadow-sm rounded-none text-xs uppercase tracking-wider px-3 py-1"
          >
            Popular
          </Badge>
        </div>
      )}

      {/* Bonus Badge (if applicable) */}
      {plan.bonusCredits && plan.bonusCredits > 0 ? (
        <div className="absolute -top-3 left-4 -rotate-2 z-10">
          <Badge
            className="bg-green-400 text-black border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-bold px-2 py-1"
          >
            +{plan.bonusCredits} Bônus
          </Badge>
        </div>
      ) : null}

      <div className="flex flex-col h-full justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <Text className="text-4xl font-black tracking-tight">
              {formatCurrency(plan.price)}
            </Text>
          </div>
          
          <div className="flex flex-col gap-1 mt-3">
            <Text className="font-bold text-xl uppercase tracking-wide">
              {plan.credits} Créditos
            </Text>
            {plan.bonusCredits && plan.bonusCredits > 0 && (
              <Text className="text-xs font-medium text-green-700 mt-1">
                + {plan.bonusCredits} créditos bônus (expira em 180 dias)
              </Text>
            )}
          </div>
        </div>

        <div className="mt-2">
           <Text className="text-xs font-bold uppercase tracking-widest opacity-60">
            {plan.label}
          </Text>
        </div>

        {isSelected && (
          <div className="absolute top-4 right-4 text-black animate-in fade-in zoom-in duration-200">
            <div className="bg-black text-primary p-1 rounded-full">
               <Check className="w-4 h-4" strokeWidth={4} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
