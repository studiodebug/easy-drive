import { Button } from "@/components/retroui/Button";
import { Badge } from "@/components/retroui/Badge";
import { Info, Users, User, ChevronRight } from "lucide-react";

interface CreditsSectionProps {
  groupCredits: number;
  individualCredits: number;
  onUnderstandPlan?: () => void;
}

export function CreditsSection({
  groupCredits,
  individualCredits,
  onUnderstandPlan,
}: CreditsSectionProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Créditos disponíveis</span>
          <button className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-accent transition-all">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Grupo</span>
            <Badge
              variant="solid"
              className="bg-green-500 text-white border-2 border-black"
            >
              {groupCredits}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-semibold">Individual</span>
            <Badge
              variant="default"
              className="bg-muted text-muted-foreground border-2 border-black"
            >
              {individualCredits}
            </Badge>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="border-primary"
        onClick={onUnderstandPlan}
      >
        Entender meu plano
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
