import { Badge } from "@/components/retroui/Badge";
import { Text } from "@/components/retroui/Text";
import { CancellationPolicy } from "../types";
import { RefundBreakdown } from "./RefundBreakdown";

interface PolicyCardProps {
  policy: CancellationPolicy;
}

export function PolicyCard({ policy }: PolicyCardProps) {
  return (
    <div className="border-2 p-6 space-y-4 text-left">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Text variant="h6">Política de cancelamento</Text>
          <Badge
            variant={
              policy.severity === "safe" || policy.severity === "low"
                ? "surface"
                : "default"
            }
            size="sm"
            className={
              policy.severity === "medium"
                ? "bg-orange-500 text-white"
                : policy.severity === "high" || policy.severity === "critical"
                ? "bg-red-500 text-white"
                : ""
            }
          >
            {policy.message}
          </Badge>
        </div>
        <Text variant="body">{policy.description}</Text>
      </div>

      {/* Refund Breakdown */}
      {policy.feePercentage > 0 && (
        <RefundBreakdown
          refundPercentage={policy.refundPercentage}
          feePercentage={policy.feePercentage}
        />
      )}
    </div>
  );
}
