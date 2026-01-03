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
  Vehicle,
  VehicleType,
} from "./types/instructor.types";

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

// Constants
export {
  BRAZILIAN_STATES,
  INSTRUCTOR_CONSTANTS,
  VEHICLE_TYPES,
} from "./constants/instructor.constants";

// Schemas
export {
  instructorFiltersSchema,
  instructorSchema,
  updateInstructorSchema,
  vehicleSchema,
} from "./validations/instructor.schema";

export type {
  InstructorFiltersSchema,
  InstructorSchema,
  UpdateInstructorSchema,
} from "./validations/instructor.schema";
