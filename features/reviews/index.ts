/**
 * Reviews Feature - Barrel Export
 * TODO: Implementar exports quando os módulos estiverem prontos
 */

// Types
export type {
  CreateReviewInput,
  Review,
  UpdateReviewInput,
} from "./types/review.types";

// Schemas
export { reviewSchema } from "./validations/review.schema";
export type { ReviewSchema } from "./validations/review.schema";
