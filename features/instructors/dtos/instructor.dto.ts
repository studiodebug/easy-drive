/**
 * Instructor DTOs
 *
 * Data Transfer Objects para sanitizar dados de instrutores
 * NUNCA exponha entidades do banco diretamente
 */

import type { Instructor, Vehicle } from "../types/instructor.types";

/**
 * DTO Público - Dados do instrutor visíveis para todos
 */
export interface InstructorPublicDTO {
  id: string;
  userId: string;
  bio: string;
  phone: string; // Será mascarado no serviço
  city: string;
  state: string;
  verified: boolean;
  pricePerHour: number;
  rating: number;
  totalLessons: number;
  vehicle: Vehicle;
  createdAt: Date;
}

/**
 * DTO Privado - Dados completos do próprio instrutor
 */
export interface InstructorPrivateDTO extends InstructorPublicDTO {
  cpf: string; // Será mascarado mesmo no privado
  phone: string; // Telefone completo apenas para owner
}

/**
 * Converte entidade do banco para DTO público
 */
export function toInstructorPublicDTO(
  instructor: Instructor
): InstructorPublicDTO {
  return {
    id: instructor.id,
    userId: instructor.userId,
    bio: instructor.bio,
    phone: maskPhone(instructor.phone),
    city: instructor.city,
    state: instructor.state,
    verified: instructor.verified,
    pricePerHour: instructor.pricePerHour,
    rating: instructor.rating,
    totalLessons: instructor.totalLessons,
    vehicle: instructor.vehicle,
    createdAt: instructor.createdAt,
  };
}

/**
 * Converte entidade do banco para DTO privado
 */
export function toInstructorPrivateDTO(
  instructor: Instructor
): InstructorPrivateDTO {
  return {
    ...toInstructorPublicDTO(instructor),
    cpf: maskCPF(instructor.cpf),
    phone: instructor.phone, // Telefone completo para o próprio instrutor
  };
}

/**
 * Converte lista de entidades para DTOs públicos
 */
export function toInstructorPublicDTOs(
  instructors: Instructor[]
): InstructorPublicDTO[] {
  return instructors.map(toInstructorPublicDTO);
}

/**
 * Mascarar telefone: (XX) XXXXX-XXXX
 */
function maskPhone(phone: string): string {
  if (phone.length !== 11) return phone;
  return `(${phone.slice(0, 2)}) XXXXX-${phone.slice(7)}`;
}

/**
 * Mascarar CPF: XXX.XXX.XXX-XX
 */
function maskCPF(cpf: string): string {
  if (cpf.length !== 11) return cpf;
  return `XXX.XXX.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}
