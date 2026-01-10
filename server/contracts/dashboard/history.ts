import { fakePromises } from "@/lib/utils";
import type { HistoryClass } from "@/types/history";

export type GetHistoryResponse = HistoryClass[];

const getHistoryResponseMock: GetHistoryResponse = [
  {
    id: "1",
    subject: {
      name: "Direção defensiva em vias urbanas",
      icon: "🚗",
    },
    professor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    date: new Date("2026-03-29T09:00:00"),
    startTime: "09:00",
    endTime: "10:00",
    status: "completed",
    rating: 5,
  },
  {
    id: "2",
    subject: {
      name: "Práticas de baliza e estacionamento",
      icon: "🅿️",
    },
    professor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    date: new Date("2026-03-25T14:00:00"),
    startTime: "14:00",
    endTime: "15:30",
    status: "completed",
    rating: 4,
  },
  {
    id: "3",
    subject: {
      name: "Condução em rodovias e estradas",
      icon: "🛣️",
    },
    professor: {
      name: "Roberto Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    date: new Date("2026-03-20T10:00:00"),
    startTime: "10:00",
    endTime: "11:00",
    status: "cancelled",
  },
  {
    id: "4",
    subject: {
      name: "Mecânica básica e manutenção preventiva",
      icon: "🔧",
    },
    professor: {
      name: "Ana Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    date: new Date("2026-03-15T16:00:00"),
    startTime: "16:00",
    endTime: "17:30",
    status: "completed",
    rating: 5,
  },
  {
    id: "5",
    subject: {
      name: "Direção noturna e condições adversas",
      icon: "🌙",
    },
    professor: {
      name: "Pedro Almeida",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
    date: new Date("2026-03-10T19:00:00"),
    startTime: "19:00",
    endTime: "20:00",
    status: "cancelled",
  },
];

export const getHistory = async (): Promise<GetHistoryResponse> => {
    return await fakePromises(() => {
        return getHistoryResponseMock;
    });
};