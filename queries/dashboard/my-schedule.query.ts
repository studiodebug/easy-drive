import { useQuery } from "@tanstack/react-query";
import { getMySchedule } from "@/server/contracts/dashboard/my-schedule";

export const useGetMySchedule = () => {
  return useQuery({
    queryKey: ["my-schedule"],
    queryFn: () => getMySchedule(),
  });
};