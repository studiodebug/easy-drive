import { fakePromises } from "@/lib/utils";
import type { WeekClass } from "@/types/week-class";

export type GetWeekClassesResponse = WeekClass[];

/**
 * Mock data for classes scheduled on specific dates
 * This simulates an API response that returns classes for a given week
 */
const getWeekClassesResponseMock: GetWeekClassesResponse = [
  // Friday, January 10, 2026 - 3 classes
  {
    id: "1",
    date: "2026-01-10",
    time: "09:00",
    subject: "Direção defensiva em vias urbanas",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    status: "confirmada",
  },
  {
    id: "2",
    date: "2026-01-10",
    time: "14:00",
    subject: "Práticas de baliza e estacionamento",
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    status: "confirmada",
  },
  {
    id: "3",
    date: "2026-01-10",
    time: "16:30",
    subject: "Direção em rodovias",
    instructor: {
      name: "Roberto Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    status: "pendente",
  },
  // Wednesday, January 8, 2026 - 1 class
  {
    id: "4",
    date: "2026-01-08",
    time: "10:00",
    subject: "Conversão e manobras",
    instructor: {
      name: "Ana Paula Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "confirmada",
  },
  // Tuesday, January 7, 2026 - 2 classes
  {
    id: "5",
    date: "2026-01-07",
    time: "08:00",
    subject: "Primeira aula prática",
    instructor: {
      name: "Juliana Pereira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    },
    status: "confirmada",
  },
  {
    id: "6",
    date: "2026-01-07",
    time: "15:00",
    subject: "Direção noturna",
    instructor: {
      name: "Fernando Lima",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
    },
    status: "confirmada",
  },
];

export const getWeekClasses = async (): Promise<GetWeekClassesResponse> => {
    return await fakePromises(() => {
        return getWeekClassesResponseMock;
    });
};