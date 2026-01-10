export interface WeekClass {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  time: string;
  subject: string;
  instructor: {
    name: string;
    avatar: string;
  };
  status: "confirmada" | "pendente" | "cancelada";
}