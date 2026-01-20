import { fakePromises } from "@/lib/utils";
import { CREDIT_PLANS } from "@/server/contracts/dashboard/credits-plans";

export type CreditsQuoteInput = {
  planId?: string;
  customAmount?: number;
};

export type CreditsQuote = {
  quoteId: string;
  credits: number;
  bonusCredits: number;
  totalCredits: number;
  totalPrice: number;
};

export type CreditsCheckoutResult = {
  checkoutUrl: string;
  sessionId: string;
  creditsAdded: number;
};

export type CreditsCheckoutStatus = {
  status: "succeeded" | "failed" | "canceled";
  creditsAdded: number;
};

const quotes = new Map<string, CreditsQuote>();

const buildQuoteFromPlan = (planId: string) => {
  const plan = CREDIT_PLANS.find((item) => item.id === planId);
  if (!plan) {
    throw new Error("Plan not found");
  }

  const bonusCredits = plan.bonusCredits ?? 0;
  const totalCredits = plan.credits + bonusCredits;

  return {
    credits: plan.credits,
    bonusCredits,
    totalCredits,
    totalPrice: plan.price,
  };
};

const buildQuoteFromCustomAmount = (customAmount: number) => {
  const credits = customAmount;
  const bonusCredits = customAmount >= 500 ? Math.floor(customAmount * 0.05) : 0;
  const totalCredits = credits + bonusCredits;

  return {
    credits,
    bonusCredits,
    totalCredits,
    totalPrice: customAmount,
  };
};

export const getCreditsQuote = async (input: CreditsQuoteInput): Promise<CreditsQuote> => {
  return await fakePromises(() => {
    const quoteId = crypto.randomUUID();

    if (input.planId) {
      const quote = buildQuoteFromPlan(input.planId);
      const payload: CreditsQuote = { quoteId, ...quote };
      quotes.set(quoteId, payload);
      return payload;
    }

    if (input.customAmount && input.customAmount >= 10) {
      const quote = buildQuoteFromCustomAmount(input.customAmount);
      const payload: CreditsQuote = { quoteId, ...quote };
      quotes.set(quoteId, payload);
      return payload;
    }

    throw new Error("Invalid quote input");
  }, 500);
};

export const createCreditsCheckout = async (quoteId: string): Promise<CreditsCheckoutResult> => {
  return await fakePromises(() => {
    const quote = quotes.get(quoteId);
    if (!quote) {
      throw new Error("Quote not found");
    }

    const sessionId = crypto.randomUUID();
    const checkoutUrl = `/dashboard?tab=4&payment=success&creditsAdded=${quote.totalCredits}`;

    return {
      checkoutUrl,
      sessionId,
      creditsAdded: quote.totalCredits,
    };
  }, 700);
};

export const getCreditsCheckoutStatus = async (sessionId: string): Promise<CreditsCheckoutStatus> => {
  return await fakePromises(() => {
    if (!sessionId) {
      return { status: "failed", creditsAdded: 0 };
    }

    return { status: "succeeded", creditsAdded: 0 };
  }, 400);
};
