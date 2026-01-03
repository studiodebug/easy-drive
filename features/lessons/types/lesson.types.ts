/**
 * Lesson Types
 *
 * Tipos e interfaces para a feature de aulas
 */

export type LessonStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type Lesson = {
  id: string;
  instructorId: string;
  studentId: string;
  startDateTime: Date;
  endDateTime: Date;
  status: LessonStatus;
  location: string;
  objectives: string[];
  notes?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateLessonInput = Omit<
  Lesson,
  "id" | "status" | "createdAt" | "updatedAt"
>;

export type UpdateLessonInput = Partial<
  Omit<CreateLessonInput, "instructorId" | "studentId">
>;

export type LessonFilters = {
  instructorId?: string;
  studentId?: string;
  status?: LessonStatus;
  startDate?: Date;
  endDate?: Date;
};
