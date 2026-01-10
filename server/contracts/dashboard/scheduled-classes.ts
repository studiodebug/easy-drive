import { fakePromises } from "@/lib/utils";
import type { ScheduledClass } from "@/types/scheduled-class";

export type GetScheduledClassesResponse = ScheduledClass[];

const getScheduledClassesResponseMock: GetScheduledClassesResponse = [
  {
    id: "1",
    subject: "Direção defensiva em vias urbanas",
    date: new Date("2026-01-09T14:00:00"),
    time: "14:00",
    language: "pt-BR",
    instructor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    status: "confirmada",
    startsInDays: 0,
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
    startsInDays: 1,
  },
  {
    id: "3",
    subject: "Conversão de marcha e controle de embreagem",
    date: new Date("2026-01-11T16:00:00"),
    time: "16:00",
    language: "pt-BR",
    instructor: {
      name: "João Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    },
    status: "confirmada",
    startsInDays: 2,
  },
  {
    id: "4",
    subject: "Direção em rodovias",
    date: new Date("2026-01-12T09:00:00"),
    time: "09:00",
    language: "pt-BR",
    instructor: {
      name: "Ana Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    status: "pendente",
    startsInDays: 3,
  },
  {
    id: "5",
    subject: "Manobras avançadas",
    date: new Date("2026-01-13T15:00:00"),
    time: "15:00",
    language: "pt-BR",
    instructor: {
      name: "Pedro Almeida",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
    status: "confirmada",
    startsInDays: 4,
  },
  {
    id: "6",
    subject: "Revisão geral para o exame",
    date: new Date("2026-01-14T11:00:00"),
    time: "11:00",
    language: "pt-BR",
    instructor: {
      name: "Julia Martins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Julia",
    },
    status: "confirmada",
    startsInDays: 5,
  },
  {
    id: "7",
    subject: "Condução noturna",
    date: new Date("2026-01-15T20:00:00"),
    time: "20:00",
    language: "pt-BR",
    instructor: {
      name: "Roberto Lima",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    status: "confirmada",
    startsInDays: 6,
  },
  {
    id: "8",
    subject: "Direção sob chuva",
    date: new Date("2026-01-16T10:00:00"),
    time: "10:00",
    language: "pt-BR",
    instructor: {
      name: "Fernanda Rocha",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernanda",
    },
    status: "confirmada",
    startsInDays: 7,
  },
  {
    id: "9",
    subject: "Estacionamento em vagas estreitas",
    date: new Date("2026-01-17T14:00:00"),
    time: "14:00",
    language: "pt-BR",
    instructor: {
      name: "Lucas Ferreira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    },
    status: "pendente",
    startsInDays: 8,
  },
  {
    id: "10",
    subject: "Direção em tráfego intenso",
    date: new Date("2026-01-18T08:00:00"),
    time: "08:00",
    language: "pt-BR",
    instructor: {
      name: "Camila Souza",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila",
    },
    status: "confirmada",
    startsInDays: 9,
  },
  {
    id: "11",
    subject: "Ultrapassagens seguras",
    date: new Date("2026-01-19T13:00:00"),
    time: "13:00",
    language: "pt-BR",
    instructor: {
      name: "Ricardo Pinto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo",
    },
    status: "confirmada",
    startsInDays: 10,
  },
  {
    id: "12",
    subject: "Simulado do exame prático",
    date: new Date("2026-01-20T10:00:00"),
    time: "10:00",
    language: "pt-BR",
    instructor: {
      name: "Patricia Dias",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia",
    },
    status: "confirmada",
    startsInDays: 11,
  },
];

export const getScheduledClasses = async (): Promise<GetScheduledClassesResponse> => {
    return await fakePromises(() => {
        return getScheduledClassesResponseMock;
    });
};