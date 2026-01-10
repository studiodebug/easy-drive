import { fakePromises } from "@/lib/utils";
import type { MyScheduleClass } from "@/types/my-schedule";

export type GetMyScheduleResponse = MyScheduleClass[];

const getMyScheduleResponseMock: GetMyScheduleResponse = [
  {
    id: "1",
    subject: {
      name: "Direção defensiva em vias urbanas",
      icon: "🚗",
    },
    date: new Date("2026-01-09T07:00:00"),
    startTime: "07:00",
    endTime: "08:00",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    startsInDays: 4,
    hasMaterial: true,
  },
  {
    id: "2",
    subject: {
      name: "Práticas de baliza e estacionamento",
      icon: "🅿️",
    },
    date: new Date("2026-01-12T14:30:00"),
    startTime: "14:30",
    endTime: "15:30",
    instructor: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    startsInDays: 7,
    hasMaterial: true,
  },
  {
    id: "3",
    subject: {
      name: "Condução em rodovias",
      icon: "🛣️",
    },
    date: new Date("2026-01-15T10:00:00"),
    startTime: "10:00",
    endTime: "11:30",
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    startsInDays: 10,
    hasMaterial: false,
  },
];

export const getMySchedule = async (): Promise<GetMyScheduleResponse> => {
    return await fakePromises(() => {
        return getMyScheduleResponseMock;
    });
};