/**
 * Reviews API Route
 * TODO: Implementar quando o Supabase estiver configurado
 */

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Reviews API - TODO: Implement" });
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: "Create review - TODO: Implement" },
    { status: 501 }
  );
}
