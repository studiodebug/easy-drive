/**
 * User Service
 *
 * Encapsula lógica de negócio relacionada a usuários.
 * Segue arquitetura Feature-based do projeto.
 */

import { toAddressPublicDTO } from "@/features/addresses/dtos/address.dto";
import type { AddressEntity } from "@/features/addresses/entities/address.entity";
import { toInstructorProfilePublicDTO } from "@/features/instructors/dtos/instructor-profile.dto";
import type { InstructorPublicDTO } from "@/features/instructors/dtos/instructor.dto";
import { toInstructorPublicDTO } from "@/features/instructors/dtos/instructor.dto";
import type { InstructorProfileEntity } from "@/features/instructors/entities/instructor-profile.entity";
import type { InstructorEntity } from "@/features/instructors/entities/instructor.entity";
import { createClient } from "@/lib/supabase/server";
import type { UserPrivateDTO } from "../dtos/user.dto";
import { toUserPrivateDTO } from "../dtos/user.dto";
import type { UserEntity } from "../entities/user.entity";

export interface UserProfileResponse {
  user: UserPrivateDTO;
  instructor: InstructorPublicDTO | null;
}

/**
 * Busca o perfil completo do usuário autenticado atual
 *
 * @returns Perfil do usuário com dados do instrutor (se aplicável) ou null se não autenticado
 * @throws Error se houver falha na query
 */
export async function getCurrentUserProfile(): Promise<UserProfileResponse | null> {
  const supabase = await createClient();

  // 1. Verificar autenticação
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    return null;
  }

  // 2. Query OTIMIZADA com JOINs (em vez de queries sequenciais)
  // Usa nested select do PostgREST para evitar N+1 queries
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      id,
      created_at,
      name,
      photo_url,
      document_type,
      document,
      address_id,
      instructor_id,
      student_id,
      wallet_id,
      address:addresses!users_address_id_fkey (
        id,
        city,
        state,
        country
      ),
      instructor:instructors (
        id,
        created_at,
        drivers_license,
        rating,
        is_active,
        profile_id,
        address_id,
        address:addresses!instructor_address_id_fkey (
          id,
          city,
          state,
          country
        ),
        profile:instructor_profiles!instructor_profile_id_fkey (
          id,
          created_at,
          age,
          specialty,
          description,
          years_of_experience,
          is_professional,
          current_drivers_license_type
        )
      )
    `
    )
    .eq("id", authUser.id)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch user profile: ${error.message}`);
  }

  if (!data) {
    throw new Error(
      "User profile not found. This should be created automatically upon signup."
    );
  }

  // 3. Type assertions para dados aninhados
  type UserWithRelations = UserEntity & {
    address?: AddressEntity | null;
    instructor?:
      | (InstructorEntity & {
          address?: AddressEntity | null;
          profile?: InstructorProfileEntity | null;
        })
      | null;
  };

  const typedData = data as unknown as UserWithRelations;

  // 4. Transformar para DTOs (protege estrutura interna)
  const userDTO = toUserPrivateDTO(typedData, {
    address: typedData.address ? toAddressPublicDTO(typedData.address) : null,
  });

  const instructorDTO = typedData.instructor
    ? toInstructorPublicDTO(typedData.instructor, {
        address: typedData.instructor.address
          ? toAddressPublicDTO(typedData.instructor.address)
          : null,
        profile: typedData.instructor.profile
          ? toInstructorProfilePublicDTO(typedData.instructor.profile)
          : null,
      })
    : null;

  return {
    user: userDTO,
    instructor: instructorDTO,
  };
}
