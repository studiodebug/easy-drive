export interface HistoryClass {
  id: string;
  subject: {
    name: string;
    icon: string;
  };
  professor: {
    name: string;
    avatar: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  status: "completed" | "cancelled";
  credits: number;
  rating?: number; // 1-5, only for completed classes
  comment?: string; // Optional review comment
}