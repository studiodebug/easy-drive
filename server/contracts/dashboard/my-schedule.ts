import { fakePromises } from "@/lib/utils";
import type { MyScheduleClass } from "@/types/my-schedule";

export type GetMyScheduleResponse = MyScheduleClass[];

const getMyScheduleResponseMock: GetMyScheduleResponse = [
  {
    id: "1",
    subject: {
      name: "Direção defensiva em vias urbanas",
    },
    date: new Date("2026-01-09T15:00:00"),
    startTime: "15:00",
    endTime: "16:00",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      credits: 85,
    },
    startsInDays: 0,
    hasMaterial: true,
  },
  {
    id: "2",
    subject: {
      name: "Práticas de estacionamento",
    },
    date: new Date("2026-01-09T17:00:00"),
    startTime: "17:00",
    endTime: "18:00",
    instructor: {
      name: "Ana Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
      credits: 75,
    },
    startsInDays: 0,
    hasMaterial: false,
  },
  {
    id: "3",
    subject: {
      name: "Baliza e manobras",
    },
    date: new Date("2026-01-10T09:00:00"),
    startTime: "09:00",
    endTime: "10:30",
    instructor: {
      name: "João Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
      credits: 95,
    },
    startsInDays: 1,
    hasMaterial: true,
  },
  {
    id: "4",
    subject: {
      name: "Direção noturna",
    },
    date: new Date("2026-01-10T19:00:00"),
    startTime: "19:00",
    endTime: "20:00",
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
      credits: 90,
    },
    startsInDays: 1,
    hasMaterial: false,
  },
  {
    id: "5",
    subject: {
      name: "Condução em rodovias",
    },
    date: new Date("2026-01-12T14:30:00"),
    startTime: "14:30",
    endTime: "15:30",
    instructor: {
      name: "Pedro Lima",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
      credits: 100,
    },
    startsInDays: 3,
    hasMaterial: true,
  },
  {
    id: "6",
    subject: {
      name: "Direção em chuva",
    },
    date: new Date("2026-01-15T10:00:00"),
    startTime: "10:00",
    endTime: "11:30",
    instructor: {
      name: "Sofia Mendes",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia",
      credits: 110,
    },
    startsInDays: 6,
    hasMaterial: true,
  },
  {
    id: "7",
    subject: {
      name: "Revisão para prova",
    },
    date: new Date("2026-01-18T08:00:00"),
    startTime: "08:00",
    endTime: "10:00",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
      credits: 150,
    },
    startsInDays: 9,
    hasMaterial: true,
  },
];

export const getMySchedule = async (): Promise<GetMyScheduleResponse> => {
  return await fakePromises(() => {
    return getMyScheduleResponseMock;
  });
};
