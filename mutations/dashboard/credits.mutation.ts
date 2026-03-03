import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCreditsCheckout,
  getCreditsCheckoutStatus,
  getCreditsQuote,
  type CreditsCheckoutResult,
  type CreditsCheckoutStatus,
  type CreditsQuote,
  type CreditsQuoteRequest,
  type CreditsCheckoutRequest,
} from "@/server/contracts/billing/credits";
import { CREDIT_PLANS } from "@/server/contracts/dashboard/credits-plans";

export { CREDIT_PLANS };

export const useQuoteCredits = () => {
  return useMutation<CreditsQuote, Error, CreditsQuoteRequest>({
    mutationFn: getCreditsQuote,
  });
};

export const useCreateCreditsCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation<CreditsCheckoutResult, Error, CreditsCheckoutRequest>({
    mutationFn: createCreditsCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    },
  });
};

export const useCheckoutStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<CreditsCheckoutStatus, Error, { sessionId: string }>({
    mutationFn: ({ sessionId }) => getCreditsCheckoutStatus(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["credits-history"] });
    },
  });
};
