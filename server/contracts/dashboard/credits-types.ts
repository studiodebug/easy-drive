export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod?: string;
}

export interface CreditPlan {
  id: string;
  credits: number;
  price: number;
  label?: string;
  popular?: boolean;
}

export interface WalletSummary {
  availableCredits: number;
  totalSpent: number;
  lastTransactionDate: string | null;
}
