/**
 * Availability Types
 */

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Domingo, 6 = Sábado

export type Availability = {
  id: string;
  instructorId: string;
  dayOfWeek: DayOfWeek;
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  reserved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAvailabilityInput = Omit<
  Availability,
  "id" | "reserved" | "createdAt" | "updatedAt"
>;
export type UpdateAvailabilityInput = Partial<
  Omit<CreateAvailabilityInput, "instructorId">
>;
