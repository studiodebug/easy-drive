export interface ScheduledClass {
  id: string;
  subject: string;
  date: Date;
  time: string;
  language: "pt-BR" | "en-US" | "es-ES";
  isGroup: boolean;
  instructor: {
    name: string;
    avatar: string;
  };
  status: "confirmada" | "pendente" | "cancelada";
  startsInDays: number;
}

export const scheduledClassesMock: ScheduledClass[] = [
  {
    id: "1",
    subject: "Direção defensiva em vias urbanas",
    date: new Date("2026-01-08T14:00:00"),
    time: "14:00",
    language: "pt-BR",
    isGroup: false,
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
    isGroup: true,
    instructor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    status: "confirmada",
    startsInDays: 5,
  },
];
