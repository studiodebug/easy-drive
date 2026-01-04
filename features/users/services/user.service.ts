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
import type { UpdateUserSchema } from "../validations/user.schema";

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

/**
 * Atualiza o perfil do usuário autenticado atual
 *
 * @param updateData - Dados validados para atualização
 * @returns Perfil atualizado do usuário
 * @throws Error se não houver usuário autenticado ou se houver falha na atualização
 */
export async function updateCurrentUser(
  updateData: UpdateUserSchema
): Promise<UserPrivateDTO> {
  const supabase = await createClient();

  // 1. Verificar autenticação
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    throw new Error("Unauthorized");
  }

  // 2. Preparar payload para upsert
  const upsertRow = {
    id: authUser.id,
    ...(updateData.name !== undefined && { name: updateData.name }),
    ...(updateData.photoUrl !== undefined && {
      photo_url: updateData.photoUrl,
    }),
    ...(updateData.documentType !== undefined && {
      document_type: updateData.documentType,
    }),
    ...(updateData.document !== undefined && { document: updateData.document }),
    ...(updateData.addressId !== undefined && {
      address_id: updateData.addressId,
    }),
    ...(updateData.instructorId !== undefined && {
      instructor_id: updateData.instructorId,
    }),
    ...(updateData.studentId !== undefined && {
      student_id: updateData.studentId,
    }),
    ...(updateData.walletId !== undefined && {
      wallet_id: updateData.walletId,
    }),
  };

  // 3. Executar upsert
  const { data: upserted, error: upsertError } = await supabase
    .from("users")
    .upsert(upsertRow, { onConflict: "id" })
    .select(
      "id, created_at, name, photo_url, document_type, document, address_id, instructor_id, student_id, wallet_id"
    )
    .single();

  if (upsertError) {
    throw new Error(`Failed to update user: ${upsertError.message}`);
  }

  if (!upserted) {
    throw new Error("Update returned no data");
  }

  // 4. Transformar para DTO
  return toUserPrivateDTO(upserted as unknown as UserEntity);
}
