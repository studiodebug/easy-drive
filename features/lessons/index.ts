/**
 * Lessons Feature - Barrel Export
 */

// Components
export { LessonCard } from "./components/client/LessonCard";

// Queries e Mutations
export {
  useCreateLessonMutation,
  useUpdateLessonMutation,
} from "./queries/mutations";
export { useLessonQuery, useLessonsQuery } from "./queries/queries";

// Types
export type {
  CreateLessonInput,
  Lesson,
  LessonFilters,
  LessonStatus,
  UpdateLessonInput,
} from "./types/lesson.types";

// DTOs
export { toLessonDTO, toLessonDTOs } from "./dtos/lesson.dto";
export type { LessonDTO } from "./dtos/lesson.dto";

// Constants
export { LESSON_CONSTANTS, LESSON_STATUS } from "./constants/lesson.constants";

// Schemas
export {
  lessonSchema,
  lessonStatusSchema,
  updateLessonSchema,
} from "./validations/lesson.schema";

export type {
  LessonSchema,
  UpdateLessonSchema,
} from "./validations/lesson.schema";
