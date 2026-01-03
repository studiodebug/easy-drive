/**
 * Lesson Constants
 */

export const LESSON_CONSTANTS = {
  MIN_DURATION_HOURS: 1,
  MAX_DURATION_HOURS: 4,
  DEFAULT_DURATION_HOURS: 2,
};

export const LESSON_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;
