/**
 * User [id] API Route
 * TODO: Implementar
 */

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const userDTO = {
    user,
    data,
  };

  return NextResponse.json(userDTO);
}

export async function PUT(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Update user ${id} - TODO` },
    { status: 501 }
  );
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Delete user ${id} - TODO` },
    { status: 501 }
  );
}
