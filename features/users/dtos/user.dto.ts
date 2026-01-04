/**
 * User DTOs
 *
 * Never expose `UserEntity` (DB row) directly.
 */

import type { Enums } from "@/types/supabase";
import type { AddressPublicDTO } from "@/features/addresses";
import type { UserEntity } from "../entities/user.entity";

type DocumentType = Enums<"document_type">;

/**
 * DTO Público - Dados mínimos do usuário visíveis para outros
 */
export interface UserPublicDTO {
  id: string;
  name: string;
  photoUrl: string | null;
}

/**
 * DTO Privado - Dados do próprio usuário (ainda sanitizados)
 */
export interface UserPrivateDTO extends UserPublicDTO {
  createdAt: string;
  documentType: DocumentType | null;
  documentMasked: string | null;
  addressId: string | null;
  instructorId: string | null;
  studentId: string | null;
  walletId: string | null;

  /**
   * Optional joined data (if you select it in queries)
   */
  address?: AddressPublicDTO | null;
}

export function toUserPublicDTO(user: UserEntity): UserPublicDTO {
  return {
    id: user.id,
    name: user.name,
    photoUrl: user.photo_url,
  };
}

export function toUserPrivateDTO(
  user: UserEntity,
  options?: { address?: AddressPublicDTO | null }
): UserPrivateDTO {
  return {
    ...toUserPublicDTO(user),
    createdAt: user.created_at,
    documentType: user.document_type,
    documentMasked: maskDocument(user.document_type, user.document),
    addressId: user.address_id,
    instructorId: user.instructor_id,
    studentId: user.student_id,
    walletId: user.wallet_id,
    address: options?.address ?? undefined,
  };
}

export function toUserPublicDTOs(users: UserEntity[]): UserPublicDTO[] {
  return users.map(toUserPublicDTO);
}

function maskDocument(type: DocumentType | null, value: string | null): string | null {
  if (!value) return null;

  // Remove non-digits for masking heuristics (keeps original value if not digit-like)
  const digits = value.replace(/\D/g, "");

  if (type === "CPF") {
    if (digits.length !== 11) return value;
    // XXX.XXX.123-45
    return `XXX.XXX.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  }

  // RG/CNH formats vary; keep last 4 visible if it looks like digits, else fallback to generic mask
  if (digits.length >= 4) {
    return `${"X".repeat(Math.max(0, digits.length - 4))}${digits.slice(-4)}`;
  }

  // Generic fallback: keep last 2 chars
  if (value.length <= 2) return "XX";
  return `${"X".repeat(value.length - 2)}${value.slice(-2)}`;
}


