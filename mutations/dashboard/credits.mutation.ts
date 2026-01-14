import { fakePromises } from "@/lib/utils";
import { CreditPlan } from "@/server/contracts/dashboard/credits-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CREDIT_PLANS: CreditPlan[] = [
  { id: "plan-1", credits: 50, price: 50.00, label: "Básico" },
  { id: "plan-2", credits: 250, price: 250.00, label: "Intermediário" },
  { id: "plan-3", credits: 500, price: 500.00, label: "Completo", popular: true },
];

const purchaseCredits = (planId: string): Promise<{ success: boolean; newBalance: number }> => {
    return fakePromises(() => {
        if (Math.random() < 0.05) {
            throw new Error("Payment failed");
        }
        return { success: true, newBalance: 100 };
    }); // Fake return
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
