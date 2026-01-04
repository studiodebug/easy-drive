/**
 * User "me" API Route
 *
 * GET  /api/users/me - returns the authenticated user's profile (DTOs only)
 * PUT  /api/users/me - upserts the authenticated user's profile fields
 */

import { toUserPrivateDTO } from "@/features/users/dtos/user.dto";
import type { UserEntity } from "@/features/users/entities/user.entity";
import { getCurrentUserProfile } from "@/features/users/services/user.service";
import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const upsertMeSchema = z.object({
  name: z.string().min(3).max(100),
  photoUrl: z.string().url().nullable().optional(),
  documentType: z.enum(["CPF", "RG", "CNH"]).nullable().optional(),
  document: z.string().nullable().optional(),
  addressId: z.string().uuid().nullable().optional(),
  instructorId: z.string().uuid().nullable().optional(),
  studentId: z.string().uuid().nullable().optional(),
  walletId: z.string().uuid().nullable().optional(),
});

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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = upsertMeSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const payload = parsed.data;

    const upsertRow = {
      id: user.id,
      name: payload.name,
      photo_url: payload.photoUrl ?? null,
      document_type: payload.documentType ?? null,
      document: payload.document ?? null,
      address_id: payload.addressId ?? null,
      instructor_id: payload.instructorId ?? null,
      student_id: payload.studentId ?? null,
      wallet_id: payload.walletId ?? null,
    };

    const { data: upserted, error: upsertError } = await supabase
      .from("users")
      .upsert(upsertRow, { onConflict: "id" })
      .select(
        "id, created_at, name, photo_url, document_type, document, address_id, instructor_id, student_id, wallet_id"
      )
      .single();

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 400 });
    }

    const userDTO = toUserPrivateDTO(upserted as unknown as UserEntity);
    return NextResponse.json({ user: userDTO });
  } catch (error) {
    console.error("[API /users/me] Error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
