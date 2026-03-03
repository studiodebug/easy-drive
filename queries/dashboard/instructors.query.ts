import { useQuery } from "@tanstack/react-query";
import { getInstructors, getDashboardInstructors } from "@/server/contracts/dashboard/instructors";

/** Full rich instructor list — used by vitrine and booking schedule flow (mock-backed). */
export const useGetInstructors = () => {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: () => getInstructors(),
  });
};

/** Simplified instructor list from the protected backend dashboard endpoint. */
export const useGetDashboardInstructors = () => {
  return useQuery({
    queryKey: ["dashboard-instructors"],
    queryFn: () => getDashboardInstructors(),
  });
};