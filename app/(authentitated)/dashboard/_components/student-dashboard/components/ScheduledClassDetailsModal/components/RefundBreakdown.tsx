import { Text } from "@/components/retroui/Text";

interface RefundBreakdownProps {
  refundPercentage: number;
  feePercentage: number;
}

export function RefundBreakdown({
  refundPercentage,
  feePercentage,
}: RefundBreakdownProps) {
  return (
    <div className="space-y-2 pt-2 border-t-2">
      <div className="flex justify-between items-center">
        <Text variant="bodySm">Créditos devolvidos</Text>
        <Text variant="body" className="font-bold text-green-600">
          {refundPercentage}%
        </Text>
      </div>
      <div className="flex justify-between items-center">
        <Text variant="bodySm">Taxa de cancelamento</Text>
        <Text variant="body" className="font-bold text-red-600">
          {feePercentage}%
        </Text>
      </div>
    </div>
  );
}
