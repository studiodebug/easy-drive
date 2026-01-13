import { Address } from "./user";

export interface TimeSlot {
  hour: number;
  minute: number;
  available: boolean;
}

export interface DaySchedule {
  day: string;
  dayNumber: number; // 0-6 (0 = domingo, 1 = segunda, etc)
  slots: TimeSlot[];
}

export interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string; // ISO date string
}

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
  address: Address;
  credits: number;
  carPhotos: string[];
  carModel: string;
  carYear: number;
  carTransmission: "manual" | "automatico";
  schedule: DaySchedule[];
  phone?: string;
  email?: string;
  reviews?: Review[];
}