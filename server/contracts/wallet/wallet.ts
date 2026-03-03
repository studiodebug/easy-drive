import { apiInstance } from "@/lib/api";

export type WalletSummaryResponse = {
  balance: number;
  totalCreditsBought: number;
  totalCreditsUsed: number;
  currency: string;
};

export type WalletTransaction = {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
  description: string;
};

export type WalletTransactionsResponse = {
  items: WalletTransaction[];
};

export const getWalletSummary = async (): Promise<WalletSummaryResponse> => {
  const response = await apiInstance.get("/wallet/summary");
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar saldo" }));
    throw new Error(error.message || "Erro ao buscar saldo");
  }
  return response.json();
};

export const getWalletTransactions = async (
  limit = 50,
  offset = 0
): Promise<WalletTransactionsResponse> => {
  const response = await apiInstance.get(
    `/wallet/transactions?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao buscar transações" }));
    throw new Error(error.message || "Erro ao buscar transações");
  }
  return response.json();
};
