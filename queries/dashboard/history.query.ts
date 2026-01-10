import { useQuery } from "@tanstack/react-query";
import { getHistory } from "@/server/contracts/dashboard/history";

export const useGetHistory = () => {
  return useQuery({
    queryKey: ["history"],
    queryFn: () => getHistory(),
  });
};