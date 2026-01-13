import { useSuspenseQuery } from "@tanstack/react-query";
import { getCredits } from "@/server/contracts/dashboard/credits";
import type { GetCreditsResponse } from "@/server/contracts/dashboard/credits";

export const useGetCredits = () => {
  return useSuspenseQuery<GetCreditsResponse>({
    queryKey: ["credits"],
    queryFn: () => getCredits(),
  });
};

