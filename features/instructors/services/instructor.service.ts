/**
 * Instructor Service
 *
 * Lógica de negócio para gerenciar instrutores
 */

import type {
  CreateInstructorInput,
  Instructor,
  InstructorFilters,
  UpdateInstructorInput,
} from "../types/instructor.types";

// TODO: Implementar com Supabase quando o banco estiver configurado
export const instructorService = {
  /**
   * Buscar todos os instrutores
   */
  async findAll(filters?: InstructorFilters): Promise<Instructor[]> {
    // TODO: Implementar query no Supabase com filtros
    console.log("Finding instructors with filters:", filters);
    return [];
  },

  /**
   * Buscar instrutor por ID
   */
  async findById(id: string): Promise<Instructor | null> {
    // TODO: Implementar query no Supabase
    console.log("Finding instructor by id:", id);
    return null;
  },

  /**
   * Criar novo instrutor
   */
  async create(data: CreateInstructorInput): Promise<Instructor> {
    // TODO: Implementar insert no Supabase
    console.log("Creating instructor:", data);
    throw new Error("Not implemented");
  },

  /**
   * Atualizar instrutor
   */
  async update(id: string, data: UpdateInstructorInput): Promise<Instructor> {
    // TODO: Implementar update no Supabase
    console.log("Updating instructor:", id, data);
    throw new Error("Not implemented");
  },

  /**
   * Deletar instrutor
   */
  async delete(id: string): Promise<void> {
    // TODO: Implementar delete no Supabase
    console.log("Deleting instructor:", id);
    throw new Error("Not implemented");
  },

  /**
   * Verificar instrutor (admin only)
   */
  async verify(id: string): Promise<Instructor> {
    // TODO: Implementar verificação no Supabase
    console.log("Verifying instructor:", id);
    throw new Error("Not implemented");
  },

  /**
   * Atualizar rating do instrutor
   */
  async updateRating(id: string, newRating: number): Promise<Instructor> {
    // TODO: Implementar atualização de rating
    console.log("Updating instructor rating:", id, newRating);
    throw new Error("Not implemented");
  },
};
