import { fakePromises } from "@/lib/utils";
import type { CreditsSummary } from "@/types/credits";

export type GetCreditsResponse = CreditsSummary;

const getCreditsResponseMock: GetCreditsResponse = {
  availableCredits: 2,
};

// Placeholder: replace with real request (fetch/supabase) later.
export const getCredits = async (): Promise<GetCreditsResponse> => {
  return await fakePromises(() => getCreditsResponseMock, 900);
};

