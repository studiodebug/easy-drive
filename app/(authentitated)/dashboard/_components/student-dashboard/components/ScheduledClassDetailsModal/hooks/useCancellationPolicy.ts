import { CancellationPolicy } from "../types";

/**
 * Hook to calculate the cancellation policy based on how far in advance
 * the cancellation is being made.
 *
 * Cancellation Policy:
 * - More than 24h in advance: 100% refund (no fee)
 * - 4h to 24h in advance: 90% refund (10% fee)
 * - 2h to 4h in advance: 70% refund (30% fee)
 * - 1h to 2h in advance: 50% refund (50% fee)
 * - Less than 1h in advance: 0% refund (100% fee)
 *
 * @param classDate - The scheduled date and time of the class
 * @returns CancellationPolicy object with refund details
 */
export function useCancellationPolicy(classDate: Date): CancellationPolicy {
  const now = new Date();
  const classDateTime = new Date(classDate);
  const hoursUntilClass =
    (classDateTime.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntilClass > 24) {
    return {
      refundPercentage: 100,
      feePercentage: 0,
      severity: "safe",
      message: "Cancelamento gratuito",
      description: "Seus créditos serão devolvidos integralmente.",
    };
  } else if (hoursUntilClass > 4) {
    return {
      refundPercentage: 90,
      feePercentage: 10,
      severity: "low",
      message: "Taxa de cancelamento: 10%",
      description: "90% dos créditos serão devolvidos para sua conta.",
    };
  } else if (hoursUntilClass > 2) {
    return {
      refundPercentage: 70,
      feePercentage: 30,
      severity: "medium",
      message: "Taxa de cancelamento: 30%",
      description: "70% dos créditos serão devolvidos para sua conta.",
    };
  } else if (hoursUntilClass > 1) {
    return {
      refundPercentage: 50,
      feePercentage: 50,
      severity: "high",
      message: "Taxa de cancelamento: 50%",
      description: "Apenas 50% dos créditos serão devolvidos.",
    };
  } else {
    return {
      refundPercentage: 0,
      feePercentage: 100,
      severity: "critical",
      message: "Sem direito a reembolso",
      description: "Os créditos não poderão ser devolvidos.",
    };
  }
}
