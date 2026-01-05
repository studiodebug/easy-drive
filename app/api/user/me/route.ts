/**
 * API Route: /api/users/me
 *
 * Retorna dados completos do usuário autenticado
 */

import { toAddressPublicDTO } from "@/server/dto/address.dto";
import { toUserPrivateDTO } from "@/server/dto/user.dto";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Buscar dados do usuário (com endereço, se existir)
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*, addresses(*)")
      .eq("id", authUser.id)
      .single();

    if (userError) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { error: `Erro ao buscar usuário: ${userError.message}` },
        { status: 500 }
      );
    }

    if (!userData) {
      return NextResponse.json(
        { error: "Usuário não encontrado na tabela public.users" },
        { status: 404 }
      );
    }

    // Converter endereço para DTO (se existir)
    const addressDTO = userData.addresses
      ? toAddressPublicDTO(userData.addresses)
      : null;

    // Converter usuário para DTO privado
    const userDTO = toUserPrivateDTO(userData, { address: addressDTO });

    // Retornar resposta
    return NextResponse.json({
      user: userDTO,
    });
  } catch (error) {
    console.error("Error in /api/users/me:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
