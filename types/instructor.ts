import { Address } from "./user";

export interface Review {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
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
  phone?: string;
  email?: string;
  reviews?: Review[];
}