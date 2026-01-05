export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  specialties: string[];
  levels: string[];
  rating: number;
  totalClasses: number;
  availability: "disponivel" | "ocupado" | "indisponivel";
  bio?: string;
}

export const instructorsMock: Instructor[] = [
  {
    id: "1",
    name: "Carlos Silva",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    specialties: ["Direção defensiva", "Baliza", "Estacionamento"],
    levels: ["Iniciante", "Intermediário"],
    rating: 4.8,
    totalClasses: 245,
    availability: "disponivel",
    bio: "Instrutor experiente com mais de 10 anos de experiência.",
  },
  {
    id: "2",
    name: "Ana Paula Costa",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    specialties: [
      "Primeira habilitação",
      "Direção urbana",
      "Ansiedade ao volante",
    ],
    levels: ["Iniciante"],
    rating: 4.9,
    totalClasses: 312,
    availability: "disponivel",
    bio: "Especialista em ensinar iniciantes com paciência e dedicação.",
  },
  {
    id: "3",
    name: "Roberto Santos",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto",
    specialties: ["Direção em rodovias", "Viagens longas", "Direção noturna"],
    levels: ["Intermediário", "Avançado"],
    rating: 4.7,
    totalClasses: 189,
    availability: "ocupado",
    bio: "Instrutor especializado em direção avançada e viagens.",
  },
  {
    id: "4",
    name: "Mariana Oliveira",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana",
    specialties: ["Baliza", "Conversão", "Manobras complexas"],
    levels: ["Iniciante", "Intermediário", "Avançado"],
    rating: 5.0,
    totalClasses: 428,
    availability: "disponivel",
    bio: "Instrutora com excelente didática e paciência.",
  },
  {
    id: "5",
    name: "Fernando Lima",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fernando",
    specialties: [
      "Direção defensiva",
      "Economia de combustível",
      "Manutenção preventiva",
    ],
    levels: ["Intermediário"],
    rating: 4.6,
    totalClasses: 156,
    availability: "disponivel",
    bio: "Foco em direção econômica e segura.",
  },
  {
    id: "6",
    name: "Juliana Pereira",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana",
    specialties: [
      "Primeira habilitação",
      "Superação do medo",
      "Direção urbana",
    ],
    levels: ["Iniciante"],
    rating: 4.9,
    totalClasses: 278,
    availability: "disponivel",
    bio: "Especialista em ajudar alunos a superar o medo de dirigir.",
  },
  {
    id: "7",
    name: "Paulo Henrique",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo",
    specialties: ["Direção esportiva", "Alta performance", "Circuitos"],
    levels: ["Avançado"],
    rating: 4.8,
    totalClasses: 201,
    availability: "indisponivel",
    bio: "Instrutor de alta performance e direção esportiva.",
  },
  {
    id: "8",
    name: "Camila Rodrigues",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Camila",
    specialties: ["Estacionamento", "Baliza", "Garagens"],
    levels: ["Iniciante", "Intermediário"],
    rating: 4.7,
    totalClasses: 193,
    availability: "disponivel",
    bio: "Especialista em manobras e estacionamento.",
  },
];
