/**
 * API Route: /api/users/me
 *
 * Gerencia dados do perfil do usuário autenticado.
 * Segue arquitetura Feature-based do projeto.
 */

import {
  getCurrentUserProfile,
  updateCurrentUser,
} from "@/features/users/services/user.service";
import { updateUserSchema } from "@/features/users/validations/user.schema";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/users/me
 *
 * Retorna o perfil completo do usuário autenticado com dados relacionados.
 * Usa Service Layer para encapsular lógica de negócio.
 */
export async function GET() {
  try {
    const profile = await getCurrentUserProfile();

    if (!profile) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("[API /users/me] Error fetching user profile:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to fetch profile", details: errorMessage },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/me
 *
 * Atualiza dados do perfil do usuário autenticado.
 */
export async function PUT(request: NextRequest) {
  try {
    // 1. Validar autenticação
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Validar input
    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error },
        { status: 400 }
      );
    }

    // 3. Executar lógica de negócio através do service
    const updatedUser = await updateCurrentUser(parsed.data);

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("[API PUT /users/me] Error updating user profile:", error);

    // Tratar erros específicos
    if (error instanceof Error) {
      if (error.message === "Unauthorized") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
