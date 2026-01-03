/**
 * Instructor Types
 *
 * Tipos e interfaces para a feature de instrutores
 */

export type VehicleType = "manual" | "automatic";

export type Vehicle = {
  type: VehicleType;
  model: string;
  year: number;
};

export type Instructor = {
  id: string;
  userId: string;
  bio: string;
  phone: string;
  cpf: string;
  city: string;
  state: string;
  verified: boolean;
  pricePerHour: number;
  rating: number;
  totalLessons: number;
  vehicle: Vehicle;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateInstructorInput = Omit<
  Instructor,
  "id" | "verified" | "rating" | "totalLessons" | "createdAt" | "updatedAt"
>;

export type UpdateInstructorInput = Partial<CreateInstructorInput>;

export type InstructorFilters = {
  city?: string;
  state?: string;
  vehicleType?: VehicleType;
  minRating?: number;
  maxPrice?: number;
  verified?: boolean;
};
