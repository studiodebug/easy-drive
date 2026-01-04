/**
 * Instructor [id] API Route
 *
 * GET /api/instructors/[id] - Buscar instrutor por ID
 * PUT /api/instructors/[id] - Atualizar instrutor (protegido)
 * DELETE /api/instructors/[id] - Deletar instrutor (protegido)
 */

import { toInstructorPublicDTO } from "@/shared/dtos/instructor.dto";
import { instructorService } from "@/shared/services/instructor.service";
import { updateInstructorSchema } from "@/shared/validations/instructor";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * GET /api/instructors/[id]
 * Buscar instrutor por ID
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const instructor = await instructorService.findById(id);

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    const dto = toInstructorPublicDTO(instructor);

    return NextResponse.json(dto);
  } catch (error) {
    console.error("Error fetching instructor:", error);

    return NextResponse.json(
      { error: "Failed to fetch instructor" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/instructors/[id]
 * Atualizar instrutor
 * TODO: Adicionar autenticação e verificar ownership
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Validar dados
    const validatedData = updateInstructorSchema.parse(body);

    // Atualizar instrutor
    const instructor = await instructorService.update(id, validatedData);

    const dto = toInstructorPublicDTO(instructor);

    return NextResponse.json(dto);
  } catch (error) {
    console.error("Error updating instructor:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to update instructor" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/instructors/[id]
 * Deletar instrutor
 * TODO: Adicionar autenticação admin
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    await instructorService.delete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting instructor:", error);

    return NextResponse.json(
      { error: "Failed to delete instructor" },
      { status: 500 }
    );
  }
}
