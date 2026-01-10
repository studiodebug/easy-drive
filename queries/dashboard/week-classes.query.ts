import { useQuery } from "@tanstack/react-query";
import { getWeekClasses } from "@/server/contracts/dashboard/week-classes";

export const useGetWeekClasses = () => {
  return useQuery({
    queryKey: ["week-classes"],
    queryFn: () => getWeekClasses(),
  });
};