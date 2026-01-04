/**
 * Instructors Feature - Barrel Export
 *
 * Exporta os módulos públicos da feature de instrutores
 */

// Components
export { InstructorCard } from "./components/client/InstructorCard";
export { InstructorListServer } from "./components/server/InstructorListServer";

// Queries e Mutations
export { useInstructorQuery, useInstructorsQuery } from "./queries/queries";

export {
  useCreateInstructorMutation,
  useDeleteInstructorMutation,
  useUpdateInstructorMutation,
  useVerifyInstructorMutation,
} from "./queries/mutations";

// Types
export type {
  CreateInstructorInput,
  Instructor,
  InstructorFilters,
  UpdateInstructorInput,
} from "./types/instructor.types";

// Entities
export type {
  InstructorEntity,
  InstructorInsertEntity,
  InstructorUpdateEntity,
} from "./entities/instructor.entity";
export type {
  InstructorProfileEntity,
  InstructorProfileInsertEntity,
  InstructorProfileUpdateEntity,
} from "./entities/instructor-profile.entity";

// DTOs
export type {
  InstructorPrivateDTO,
  InstructorPublicDTO,
} from "./dtos/instructor.dto";

export {
  toInstructorPrivateDTO,
  toInstructorPublicDTO,
  toInstructorPublicDTOs,
} from "./dtos/instructor.dto";

export type {
  InstructorProfilePrivateDTO,
  InstructorProfilePublicDTO,
} from "./dtos/instructor-profile.dto";

export {
  toInstructorProfilePrivateDTO,
  toInstructorProfilePublicDTO,
  toInstructorProfilePublicDTOs,
} from "./dtos/instructor-profile.dto";

// Constants
export {
  BRAZILIAN_STATES,
  INSTRUCTOR_CONSTANTS,
} from "./constants/instructor.constants";

// Schemas
export {
  instructorFiltersSchema,
  instructorSchema,
  updateInstructorSchema,
} from "./validations/instructor.schema";

export type {
  InstructorFiltersSchema,
  InstructorSchema,
  UpdateInstructorSchema,
} from "./validations/instructor.schema";
