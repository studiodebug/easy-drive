export interface ScheduledClass {
  id: string;
  subject: string;
  date: Date;
  time: string;
  language?: "pt-BR" | "en-US" | "es-ES";
  instructor: {
    name: string;
    avatar: string;
  };
  status: "confirmada" | "pendente" | "cancelada";
  startsInDays: number;
}