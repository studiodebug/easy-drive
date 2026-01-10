import { useQuery } from "@tanstack/react-query";
import { getScheduledClasses } from "@/server/contracts/dashboard/scheduled-classes";

export const useGetScheduledClasses = () => {
  return useQuery({
    queryKey: ["scheduled-classes"],
    queryFn: () => getScheduledClasses(),
  });
};