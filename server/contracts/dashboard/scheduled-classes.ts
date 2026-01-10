import { fakePromises } from "@/lib/utils";
import type { ScheduledClass } from "@/types/scheduled-class";

export type GetScheduledClassesResponse = ScheduledClass[];

const getScheduledClassesResponseMock: GetScheduledClassesResponse = [
  {
    id: "1",
    subject: "Direção defensiva em vias urbanas",
    date: new Date("2026-01-08T14:00:00"),
    time: "14:00",
    language: "pt-BR",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    status: "confirmada",
    startsInDays: 3,
  },
  {
    id: "2",
    subject: "Práticas de baliza e estacionamento",
    date: new Date("2026-01-10T10:00:00"),
    time: "10:00",
    language: "pt-BR",
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    status: "confirmada",
    startsInDays: 5,
  },
];

export const getScheduledClasses = async (): Promise<GetScheduledClassesResponse> => {
    return await fakePromises(() => {
        return getScheduledClassesResponseMock;
    });
};