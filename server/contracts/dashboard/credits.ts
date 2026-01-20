import { fakePromises } from "@/lib/utils";
import type { CreditsSummary } from "@/types/credits";

export type GetCreditsResponse = CreditsSummary;

const CREDITS_BALANCE_KEY = "easy-drive-credits-balance";

const getStoredBalance = () => {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CREDITS_BALANCE_KEY);
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const setStoredBalance = (balance: number) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CREDITS_BALANCE_KEY, String(balance));
};

const getCreditsResponseMock: GetCreditsResponse = {
  availableCredits: 2,
};

// Placeholder: replace with real request (fetch/supabase) later.
export const getCredits = async (): Promise<GetCreditsResponse> => {
  return await fakePromises(() => {
    const storedBalance = getStoredBalance();
    if (storedBalance !== null) {
      return { availableCredits: storedBalance };
    }
    return getCreditsResponseMock;
  }, 900);
};

export const setCreditsBalance = (balance: number) => {
  setStoredBalance(balance);
};

