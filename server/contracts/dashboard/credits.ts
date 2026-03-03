import { getWalletSummary } from "@/server/contracts/wallet/wallet";

export type GetCreditsResponse = {
  availableCredits: number;
};

export const getCredits = async (): Promise<GetCreditsResponse> => {
  const summary = await getWalletSummary();
  return { availableCredits: summary.balance };
};
