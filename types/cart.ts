export interface CartItem {
  schedule: Schedule[];
  value: number;
  instructor: {
    name: string;
    avatar: string;
    id: string;
  };
  identifier: string;
}


export interface Schedule {
  date: Date;
  startTime: string;
  endTime: string;
}