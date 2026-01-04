/**
 * API Route: /api/users/me
 *
 * Retorna dados completos do usuário autenticado com dados de instrutor (se aplicável)
 */

import { toAddressPublicDTO } from "@/shared/dtos/address.dto";
import { toInstructorProfilePublicDTO } from "@/shared/dtos/instructor-profile.dto";
import { toInstructorPublicDTO } from "@/shared/dtos/instructor.dto";
import { toUserPrivateDTO } from "@/shared/dtos/user.dto";
import { createClient } from "@/shared/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // 1. Verificar autenticação
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // 2. Buscar dados do usuário com endereço
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*, addresses(*)")
      .eq("id", authUser.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // 3. Converter endereço para DTO (se existir)
    const addressDTO = userData.addresses
      ? toAddressPublicDTO(userData.addresses)
      : null;

    // 4. Converter usuário para DTO privado
    const userDTO = toUserPrivateDTO(userData, { address: addressDTO });

    // 5. Verificar se o usuário é instrutor
    let instructorDTO = null;

    if (userData.instructor_id) {
      const { data: instructorData, error: instructorError } = await supabase
        .from("instructors")
        .select("*, instructor_profiles(*), addresses(*)")
        .eq("id", userData.instructor_id)
        .single();

      if (!instructorError && instructorData) {
        // Converter dados relacionados para DTOs
        const instructorProfileDTO = instructorData.instructor_profiles
          ? toInstructorProfilePublicDTO(instructorData.instructor_profiles)
          : null;

        const instructorAddressDTO = instructorData.addresses
          ? toAddressPublicDTO(instructorData.addresses)
          : null;

        // Converter instrutor para DTO
        instructorDTO = toInstructorPublicDTO(instructorData, {
          profile: instructorProfileDTO,
          address: instructorAddressDTO,
        });
      }
    }

    // 6. Retornar resposta
    return NextResponse.json({
      user: userDTO,
      instructor: instructorDTO,
    });
  } catch (error) {
    console.error("Error in /api/users/me:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
