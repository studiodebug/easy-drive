export interface MyScheduleClass {
  id: string;
  subject: {
    name: string;
  };
  date: Date;
  startTime: string;
  endTime: string;
  instructor: {
    name: string;
    avatar: string;
    credits: number;
  };
  startsInDays: number;
  hasMaterial: boolean;
}