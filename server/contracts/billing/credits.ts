import { apiInstance } from "@/lib/api";

export type CreditsQuoteRequest = {
  credits: number;
};

export type CreditsQuote = {
  quoteId: string;
  credits: number;
  bonusCredits: number;
  unitPrice: number;
  subtotal: number;
  fees: number;
  total: number;
  expiresAt: string;
};

export type CreditsCheckoutRequest = {
  credits: number;
  provider?: "stripe" | "mercadopago" | "mock";
};

export type CreditsCheckoutResult = {
  sessionId: string;
  status: string;
  credits: number;
  checkoutUrl: string;
};

export type CreditsCheckoutStatus = {
  sessionId: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
};

export const getCreditsQuote = async (input: CreditsQuoteRequest): Promise<CreditsQuote> => {
  const response = await apiInstance.post("/billing/credits/quote", {
    credits: input.credits,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao calcular cotação" }));
    throw new Error(error.message || "Erro ao calcular cotação");
  }

  return response.json();
};

export const createCreditsCheckout = async (
  input: CreditsCheckoutRequest
): Promise<CreditsCheckoutResult> => {
  const response = await apiInstance.post("/billing/credits/checkout", {
    credits: input.credits,
    provider: input.provider ?? "mock",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao iniciar pagamento" }));
    throw new Error(error.message || "Erro ao iniciar pagamento");
  }

  return response.json();
};

export const getCreditsCheckoutStatus = async (
  sessionId: string
): Promise<CreditsCheckoutStatus> => {
  const response = await apiInstance.get(`/billing/credits/checkout/${sessionId}/status`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Erro ao verificar status" }));
    throw new Error(error.message || "Erro ao verificar status");
  }

  return response.json();
};
