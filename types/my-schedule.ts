export interface MyScheduleClass {
  id: string;
  subject: {
    name: string;
    icon: string; // emoji icon
  };
  date: Date;
  startTime: string;
  endTime: string;
  instructor: {
    name: string;
    avatar: string;
  };
  startsInDays: number;
  hasMaterial: boolean;
}