/**
 * API Route: /api/users/me
 *
 * Retorna dados completos do usuário autenticado
 */

import { NextResponse } from "next/server";

export async function GET() {
  // old supabase request:
  // 1) const { data: { user } } = await supabase.auth.getUser()
  // 2) await supabase.from("users").select("*, addresses(*)").eq("id", user.id).single()
  //
  // placeholder request: integrate with your backend "me" endpoint.
  return NextResponse.json(
    { error: "Not implemented" },
    { status: 501 }
  );
}
