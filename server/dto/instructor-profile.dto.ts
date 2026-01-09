/**
 * Instructor Profile DTOs
 *
 * Never expose `InstructorProfileEntity` (DB row) directly.
 */

type InstructorProfileEntity = {
  id: string;
  created_at: string;
  age: number | null;
  specialty: string | null;
  description: string | null;
  years_of_experience: number | null;
  is_professional: boolean | null;
  current_drivers_license_type: string | null;
  complement: string | null;
};
type DriversLicenseType = string;

export interface InstructorProfilePublicDTO {
  id: string;
  createdAt: string;
  age: number | null;
  specialty: string | null;
  description: string | null;
  yearsOfExperience: number | null;
  isProfessional: boolean | null;
  currentDriversLicenseType: DriversLicenseType | null;
}

export interface InstructorProfilePrivateDTO
  extends InstructorProfilePublicDTO {
  complement: string | null;
}

export function toInstructorProfilePublicDTO(
  profile: InstructorProfileEntity
): InstructorProfilePublicDTO {
  return {
    id: profile.id,
    createdAt: profile.created_at,
    age: profile.age,
    specialty: profile.specialty,
    description: profile.description,
    yearsOfExperience: profile.years_of_experience,
    isProfessional: profile.is_professional,
    currentDriversLicenseType: profile.current_drivers_license_type,
  };
}

export function toInstructorProfilePrivateDTO(
  profile: InstructorProfileEntity
): InstructorProfilePrivateDTO {
  return {
    ...toInstructorProfilePublicDTO(profile),
    complement: profile.complement,
  };
}

export function toInstructorProfilePublicDTOs(
  profiles: InstructorProfileEntity[]
): InstructorProfilePublicDTO[] {
  return profiles.map(toInstructorProfilePublicDTO);
}
