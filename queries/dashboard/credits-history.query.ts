import { useSuspenseQuery } from "@tanstack/react-query";
import { getWalletTransactions, type WalletTransaction } from "@/server/contracts/wallet/wallet";
import { Transaction } from "@/server/contracts/dashboard/credits-types";

const mapWalletTransaction = (tx: WalletTransaction): Transaction => ({
  id: tx.id,
  type: tx.type === "CREDIT_PURCHASE" ? "credit" : "debit",
  amount: tx.amount,
  description: tx.description,
  date: tx.createdAt,
  status: tx.status === "completed" ? "completed" : tx.status === "pending" ? "pending" : "failed",
});

export const useGetCreditsHistory = () => {
  return useSuspenseQuery({
    queryKey: ["credits-history"],
    queryFn: async (): Promise<Transaction[]> => {
      const result = await getWalletTransactions();
      return result.items.map(mapWalletTransaction);
    },
  });
};
