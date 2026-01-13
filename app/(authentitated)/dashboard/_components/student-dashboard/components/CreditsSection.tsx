import { CreditDisplay } from "@/components/blocks/CreditDisplay/CreditDisplay";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { useGetCredits } from "@/queries/dashboard/credits.query";

interface CreditsSectionProps {
  onNavigateToCredits: () => void;
}

export function CreditsSection({ onNavigateToCredits }: CreditsSectionProps) {
  return (
    <Suspense fallback={<CreditsSectionSkeleton />}>
      <CreditsSectionContent onNavigateToCredits={onNavigateToCredits} />
    </Suspense>
  );
}

function CreditsSectionContent({ onNavigateToCredits }: CreditsSectionProps) {
  const { data } = useGetCredits();

  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Text variant="h5" className="font-semibold">
            Meus créditos:
          </Text>
        </div>

        <div className="flex items-center gap-4">
          <CreditDisplay credits={data.availableCredits} />
        </div>
      </div>

      <Button variant="outline" onClick={onNavigateToCredits}>
        Meus créditos
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

function CreditsSectionSkeleton() {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="h-5 w-28 bg-muted rounded animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-6 w-28 bg-muted rounded animate-pulse" />
        </div>
      </div>

      <div className="h-10 w-36 bg-muted rounded animate-pulse" />
    </div>
  );
}
