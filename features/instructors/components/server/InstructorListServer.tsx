/**
 * InstructorListServer Component
 *
 * Server Component para listar instrutores
 */

import { instructorService } from "../../services/instructor.service";

export async function InstructorListServer() {
  // TODO: Buscar instrutores do banco quando o Supabase estiver configurado
  const instructors = await instructorService.findAll();

  if (instructors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Nenhum instrutor encontrado</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* {instructors.map((instructor) => (
        <InstructorCard key={instructor.id} instructor={instructor} />
      ))} */}
    </div>
  );
}
