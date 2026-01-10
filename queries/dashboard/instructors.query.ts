import { useQuery } from "@tanstack/react-query";
import { getInstructors } from "@/server/contracts/dashboard/instructors";

export const useGetInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: () => getInstructors(),
  });
};