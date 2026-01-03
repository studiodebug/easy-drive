/**
 * Instructor API Client
 *
 * Funções para fazer requisições HTTP para a API de instrutores
 */

import type { InstructorPublicDTO } from "../dtos/instructor.dto";
import type {
  CreateInstructorInput,
  InstructorFilters,
  UpdateInstructorInput,
} from "../types/instructor.types";

// TODO: Implementar httpClient quando a configuração de API estiver pronta
const API_BASE = "/api/instructors";

export const instructorApi = {
  /**
   * Buscar todos os instrutores
   */
  async getAll(filters?: InstructorFilters): Promise<InstructorPublicDTO[]> {
    // TODO: Implementar chamada real à API
    console.log("API: Getting all instructors with filters:", filters);
    return [];
  },

  /**
   * Buscar instrutor por ID
   */
  async getById(id: string): Promise<InstructorPublicDTO | null> {
    // TODO: Implementar chamada real à API
    console.log("API: Getting instructor by id:", id);
    return null;
  },

  /**
   * Criar novo instrutor
   */
  async create(data: CreateInstructorInput): Promise<InstructorPublicDTO> {
    // TODO: Implementar POST request
    console.log("API: Creating instructor:", data);
    throw new Error("Not implemented");
  },

  /**
   * Atualizar instrutor
   */
  async update(
    id: string,
    data: UpdateInstructorInput
  ): Promise<InstructorPublicDTO> {
    // TODO: Implementar PUT request
    console.log("API: Updating instructor:", id, data);
    throw new Error("Not implemented");
  },

  /**
   * Deletar instrutor
   */
  async delete(id: string): Promise<void> {
    // TODO: Implementar DELETE request
    console.log("API: Deleting instructor:", id);
    throw new Error("Not implemented");
  },

  /**
   * Verificar instrutor (admin only)
   */
  async verify(id: string): Promise<InstructorPublicDTO> {
    // TODO: Implementar POST request para verificação
    console.log("API: Verifying instructor:", id);
    throw new Error("Not implemented");
  },
};
