import { CreditDisplay } from "@/components/blocks/CreditDisplay/CreditDisplay";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { ChevronRight } from "lucide-react";

interface CreditsSectionProps {}

export function CreditsSection({}: CreditsSectionProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Text variant="h5" className="font-semibold">
            Meus créditos:
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <CreditDisplay credits={2} />
        </div>
      </div>

      <Button
        variant="outline"
        // onClick={onUnderstandPlan}
      >
        Meus créditos
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
