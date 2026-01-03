/**
 * Availability [id] API Route
 * TODO: Implementar
 */

import { NextRequest, NextResponse } from 'next/server';

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Get availability ${id} - TODO` });
}

export async function PUT(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Update availability ${id} - TODO` }, { status: 501 });
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return NextResponse.json({ message: `Delete availability ${id} - TODO` }, { status: 501 });
}
