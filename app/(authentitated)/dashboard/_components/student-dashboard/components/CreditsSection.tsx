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
          <button className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-black font-bold hover:bg-yellow-400 transition-all shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Grupo</span>
            <Badge
              variant="solid"
              className="bg-green-400 text-black border-2 border-black font-bold"
            >
              {groupCredits}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="font-semibold">Individual</span>
            <Badge
              variant="default"
              className="bg-gray-200 text-black border-2 border-black font-bold"
            >
              {individualCredits}
            </Badge>
          </div>
        </div>
      </div>

      <Button
        variant="outline"
        className="border-2 border-black text-black font-bold hover:bg-yellow-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        onClick={onUnderstandPlan}
      >
        Entender meu plano
        <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
