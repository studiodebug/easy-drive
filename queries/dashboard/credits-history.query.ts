import { Transaction } from "@/server/contracts/dashboard/credits-types";
import { useSuspenseQuery } from "@tanstack/react-query";

// Mock Data
const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "credit",
    amount: 50,
    description: "Compra de pacote mensal",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    status: "completed",
    paymentMethod: "Cartão de Crédito **** 4242",
  },
  {
    id: "tx-2",
    type: "debit",
    amount: 1,
    description: "Agendamento de aula - João Silva",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    status: "completed",
  },
  {
    id: "tx-3",
    type: "debit",
    amount: 1,
    description: "Agendamento de aula - Maria Souza",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(), // 6 days ago
    status: "completed",
  },
  {
    id: "tx-4",
    type: "credit",
    amount: 10,
    description: "Bônus por indicação",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    status: "completed",
  },
  {
    id: "tx-5",
    type: "debit",
    amount: 1,
    description: "Agendamento de aula - Carlos Pereira",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(), // 12 days ago
    status: "failed", // Transaction failed example
  },
];

// Service function (simulated)
const getCreditsHistory = async (): Promise<Transaction[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate latency
  return MOCK_TRANSACTIONS;
};

export const useGetCreditsHistory = () => {
  return useSuspenseQuery({
    queryKey: ["credits-history"],
    queryFn: getCreditsHistory,
  });
};
