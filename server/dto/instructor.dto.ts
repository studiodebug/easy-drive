/**
 * Instructor DTOs
 *
 * Data Transfer Objects para sanitizar dados de instrutores (schema-based)
 * NUNCA exponha entidades do banco diretamente.
 */

import type { AddressPublicDTO } from "./address.dto";
import type { InstructorProfilePublicDTO } from "./instructor-profile.dto";

type InstructorEntity = {
  id: string;
  created_at: string;
  drivers_license: string | null;
  rating: number | null;
  is_active: boolean | null;
  profile_id: string | null;
  address_id: string | null;
};

/**
 * DTO Público - Dados do instrutor visíveis para todos
 */
export interface InstructorPublicDTO {
  id: string;
  createdAt: string;
  driversLicense: string | null;
  rating: number | null;
  isActive: boolean | null;
  profileId: string | null;
  addressId: string | null;

  /**
   * Optional joined data (if selected in queries)
   */
  profile?: InstructorProfilePublicDTO | null;
  address?: AddressPublicDTO | null;
}

/**
 * DTO Privado - Dados completos do próprio instrutor
 */
export interface InstructorPrivateDTO extends InstructorPublicDTO {
  // Reserved for future private-only fields
}

/**
 * Converte entidade do banco para DTO público
 */
export function toInstructorPublicDTO(
  instructor: InstructorEntity,
  options?: {
    profile?: InstructorProfilePublicDTO | null;
    address?: AddressPublicDTO | null;
  }
): InstructorPublicDTO {
  return {
    id: instructor.id,
    createdAt: instructor.created_at,
    driversLicense: instructor.drivers_license,
    rating: instructor.rating,
    isActive: instructor.is_active,
    profileId: instructor.profile_id,
    addressId: instructor.address_id,
    profile: options?.profile ?? undefined,
    address: options?.address ?? undefined,
  };
}

/**
 * Converte entidade do banco para DTO privado
 */
export function toInstructorPrivateDTO(
  instructor: InstructorEntity,
  options?: {
    profile?: InstructorProfilePublicDTO | null;
    address?: AddressPublicDTO | null;
  }
): InstructorPrivateDTO {
  return {
    ...toInstructorPublicDTO(instructor, options),
  };
}

/**
 * Converte lista de entidades para DTOs públicos
 */
export function toInstructorPublicDTOs(
  instructors: InstructorEntity[]
): InstructorPublicDTO[] {
  return instructors.map((instructor) => toInstructorPublicDTO(instructor));
}
