/**
 * Lesson [id] API Route
 * TODO: Implementar quando o Supabase estiver configurado
 */

import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Get lesson ${id} - TODO: Implement` });
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Update lesson ${id} - TODO: Implement` },
    { status: 501 }
  );
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json(
    { message: `Delete lesson ${id} - TODO: Implement` },
    { status: 501 }
  );
}
