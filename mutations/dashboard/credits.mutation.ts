import { CreditPlan } from "@/server/contracts/dashboard/credits-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CREDIT_PLANS: CreditPlan[] = [
  { id: "plan-1", credits: 5, price: 45.00, label: "Iniciante" },
  { id: "plan-2", credits: 10, price: 85.00, label: "Popuar", popular: true },
  { id: "plan-3", credits: 20, price: 160.00, label: "Intensivo" },
  { id: "plan-4", credits: 50, price: 350.00, label: "Profissional" },
];

const purchaseCredits = async (planId: string): Promise<{ success: boolean; newBalance: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate processing
    // Simulate randomness
    if (Math.random() < 0.05) {
        throw new Error("Payment failed");
    }
    return { success: true, newBalance: 100 }; // Fake return
}

export const usePurchaseCredits = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: purchaseCredits,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["credits"] });
            queryClient.invalidateQueries({ queryKey: ["credits-history"] });
        }
    });
}
