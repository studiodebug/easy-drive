/**
 * Instructors API Route
 *
 * GET /api/instructors - Listar instrutores com filtros
 * POST /api/instructors - Criar novo instrutor (protegido)
 */

import {
  toInstructorPublicDTO,
  toInstructorPublicDTOs,
} from "@/shared/dtos/instructor.dto";
import { instructorService } from "@/shared/services/instructor.service";
import {
  instructorFiltersSchema,
  instructorSchema,
} from "@/shared/validations/instructor";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/instructors
 * Buscar instrutores com filtros opcionais
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse filters from query params
    const filters = {
      city: searchParams.get("city") || undefined,
      state: searchParams.get("state") || undefined,
      vehicleType: searchParams.get("vehicleType") as
        | "manual"
        | "automatic"
        | undefined,
      minRating: searchParams.get("minRating")
        ? Number(searchParams.get("minRating"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      verified: searchParams.get("verified") === "true" ? true : undefined,
    };

    // Validate filters
    const validatedFilters = instructorFiltersSchema.parse(filters);

    // Buscar instrutores
    const instructors = await instructorService.findAll(validatedFilters);

    // Converter para DTOs públicos
    const dtos = toInstructorPublicDTOs(instructors);

    return NextResponse.json(dtos);
  } catch (error) {
    console.error("Error fetching instructors:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/instructors
 * Criar novo instrutor
 * TODO: Adicionar autenticação quando o Supabase Auth estiver configurado
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados de entrada
    const validatedData = instructorSchema.parse(body);

    // Criar instrutor
    const instructor = await instructorService.create(validatedData);

    // Retornar DTO público
    const dto = toInstructorPublicDTO(instructor);

    return NextResponse.json(dto, { status: 201 });
  } catch (error) {
    console.error("Error creating instructor:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to create instructor" },
      { status: 500 }
    );
  }
}
