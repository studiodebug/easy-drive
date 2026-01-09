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
  rating?: number; // 1-5, only for completed classes
  comment?: string; // Optional review comment
}

export const historyClassesMock: HistoryClass[] = [
  {
    id: "1",
    subject: {
      name: "Direção defensiva em vias urbanas",
      icon: "🚗",
    },
    professor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    date: new Date("2026-03-29T09:00:00"),
    startTime: "09:00",
    endTime: "10:00",
    status: "completed",
    rating: 5,
    comment: "Excelente instrutor! Muito paciente e didático.",
  },
  {
    id: "2",
    subject: {
      name: "Práticas de baliza e estacionamento",
      icon: "🅿️",
    },
    professor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    date: new Date("2026-03-25T14:00:00"),
    startTime: "14:00",
    endTime: "15:30",
    status: "completed",
    rating: 4,
  },
  {
    id: "3",
    subject: {
      name: "Condução em rodovias e estradas",
      icon: "🛣️",
    },
    professor: {
      name: "Roberto Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    date: new Date("2026-03-20T10:00:00"),
    startTime: "10:00",
    endTime: "11:00",
    status: "cancelled",
  },
  {
    id: "4",
    subject: {
      name: "Mecânica básica e manutenção preventiva",
      icon: "🔧",
    },
    professor: {
      name: "Ana Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    date: new Date("2026-03-15T16:00:00"),
    startTime: "16:00",
    endTime: "17:30",
    status: "completed",
    rating: 5,
  },
  {
    id: "5",
    subject: {
      name: "Direção noturna e condições adversas",
      icon: "🌙",
    },
    professor: {
      name: "Pedro Almeida",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
    date: new Date("2026-03-10T19:00:00"),
    startTime: "19:00",
    endTime: "20:00",
    status: "cancelled",
  },
  {
    id: "6",
    subject: {
      name: "Direção em vias expressas",
      icon: "🚙",
    },
    professor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    date: new Date("2026-03-08T10:00:00"),
    startTime: "10:00",
    endTime: "11:00",
    status: "completed",
    // No rating - can be reviewed
  },
  {
    id: "7",
    subject: {
      name: "Ultrapassagens e conversões",
      icon: "↪️",
    },
    professor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    date: new Date("2026-03-05T15:00:00"),
    startTime: "15:00",
    endTime: "16:30",
    status: "completed",
    rating: 5,
  },
  {
    id: "8",
    subject: {
      name: "Direção em chuva e neblina",
      icon: "🌧️",
    },
    professor: {
      name: "Roberto Santos",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    },
    date: new Date("2026-03-01T09:00:00"),
    startTime: "09:00",
    endTime: "10:00",
    status: "completed",
    rating: 4,
  },
  {
    id: "9",
    subject: {
      name: "Primeiros socorros no trânsito",
      icon: "🚑",
    },
    professor: {
      name: "Ana Costa",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    },
    date: new Date("2026-02-25T14:00:00"),
    startTime: "14:00",
    endTime: "15:30",
    status: "completed",
  },
  {
    id: "10",
    subject: {
      name: "Manobras em locais estreitos",
      icon: "🔀",
    },
    professor: {
      name: "Pedro Almeida",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    },
    date: new Date("2026-02-20T11:00:00"),
    startTime: "11:00",
    endTime: "12:00",
    status: "cancelled",
  },
  {
    id: "11",
    subject: {
      name: "Direção econômica e sustentável",
      icon: "♻️",
    },
    professor: {
      name: "Carlos Silva",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
    date: new Date("2026-02-15T16:00:00"),
    startTime: "16:00",
    endTime: "17:00",
    status: "completed",
    rating: 5,
  },
  {
    id: "12",
    subject: {
      name: "Práticas de direção em montanhas",
      icon: "⛰️",
    },
    professor: {
      name: "Mariana Oliveira",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    },
    date: new Date("2026-02-10T08:00:00"),
    startTime: "08:00",
    endTime: "10:00",
    status: "completed",
    rating: 4,
  },
];
