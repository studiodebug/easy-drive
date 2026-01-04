/**
 * User "me" API Route
 *
 * GET  /api/users/me - returns the authenticated user's profile (DTOs only)
 * PUT  /api/users/me - upserts the authenticated user's profile fields
 */

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";

import { toAddressPublicDTO } from "@/features/addresses/dtos/address.dto";
import type { AddressEntity } from "@/features/addresses/entities/address.entity";
import { toInstructorProfilePublicDTO } from "@/features/instructors/dtos/instructor-profile.dto";
import { toInstructorPublicDTO } from "@/features/instructors/dtos/instructor.dto";
import type { InstructorProfileEntity } from "@/features/instructors/entities/instructor-profile.entity";
import type { InstructorEntity } from "@/features/instructors/entities/instructor.entity";
import { toUserPrivateDTO } from "@/features/users/dtos/user.dto";
import type { UserEntity } from "@/features/users/entities/user.entity";

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

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: userRow, error: userError } = await supabase
    .from("users")
    .select(
      "id, created_at, name, photo_url, document_type, document, address_id, instructor_id, student_id, wallet_id"
    )
    .eq("id", user.id)
    .single();

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 });
  }

  // Optionally enrich with related data (non-blocking: only if ids exist)
  const typedUserRow = userRow as unknown as UserEntity;

  let addressDTO: ReturnType<typeof toAddressPublicDTO> | null = null;
  if (typedUserRow.address_id) {
    const { data: addressRow } = await supabase
      .from("addresses")
      .select("id, city, state, country")
      .eq("id", typedUserRow.address_id)
      .single();
    if (addressRow)
      addressDTO = toAddressPublicDTO(addressRow as unknown as AddressEntity);
  }

  let instructorDTO: ReturnType<typeof toInstructorPublicDTO> | null = null;
  if (typedUserRow.instructor_id) {
    const { data: instructorRow } = await supabase
      .from("instructors")
      .select(
        "id, created_at, drivers_license, rating, is_active, profile_id, address_id"
      )
      .eq("id", typedUserRow.instructor_id)
      .single();

    if (instructorRow) {
      const typedInstructorRow = instructorRow as unknown as InstructorEntity;

      let instructorAddressDTO: ReturnType<typeof toAddressPublicDTO> | null =
        null;
      if (typedInstructorRow.address_id) {
        const { data: instrAddressRow } = await supabase
          .from("addresses")
          .select("id, city, state, country")
          .eq("id", typedInstructorRow.address_id)
          .single();
        if (instrAddressRow) {
          instructorAddressDTO = toAddressPublicDTO(
            instrAddressRow as unknown as AddressEntity
          );
        }
      }

      let profileDTO: ReturnType<typeof toInstructorProfilePublicDTO> | null =
        null;
      if (typedInstructorRow.profile_id) {
        const { data: profileRow } = await supabase
          .from("instructor_profiles")
          .select(
            "id, created_at, age, specialty, description, years_of_experience, is_professional, current_drivers_license_type"
          )
          .eq("id", typedInstructorRow.profile_id)
          .single();
        if (profileRow) {
          profileDTO = toInstructorProfilePublicDTO(
            profileRow as unknown as InstructorProfileEntity
          );
        }
      }

      instructorDTO = toInstructorPublicDTO(typedInstructorRow, {
        address: instructorAddressDTO,
        profile: profileDTO,
      });
    }
  }

  const userDTO = toUserPrivateDTO(typedUserRow, { address: addressDTO });

  return NextResponse.json({ user: userDTO, instructor: instructorDTO });
}

export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
}
