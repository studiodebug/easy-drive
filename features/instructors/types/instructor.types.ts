/**
 * Instructor Types
 *
 * Tipos e interfaces para a feature de instrutores
 */

export type Instructor = {
  id: string;
  createdAt: string;
  driversLicense: string | null;
  rating: number | null;
  isActive: boolean | null;
  profileId: string | null;
  addressId: string | null;
};

export type CreateInstructorInput = Omit<
  Instructor,
  "id" | "createdAt" | "rating"
>;

export type UpdateInstructorInput = Partial<CreateInstructorInput>;

export type InstructorFilters = {
  isActive?: boolean;
  minRating?: number;
};
