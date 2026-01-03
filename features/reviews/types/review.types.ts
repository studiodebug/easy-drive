/**
 * Review Types
 */

export type Review = {
  id: string;
  instructorId: string;
  userId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateReviewInput = Omit<Review, "id" | "createdAt" | "updatedAt">;
export type UpdateReviewInput = Partial<
  Omit<CreateReviewInput, "instructorId" | "userId">
>;
