export type CancellationSeverity = "safe" | "low" | "medium" | "high" | "critical";

export interface CancellationPolicy {
  refundPercentage: number;
  feePercentage: number;
  severity: CancellationSeverity;
  message: string;
  description: string;
}
