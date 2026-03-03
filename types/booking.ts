export type BookingSlot = {
  date: string;
  startTime: string;
  endTime: string;
  /** Backend database slot ID — required for confirm/cancel API calls */
  slotId?: number;
};

export type BookingDraft = {
  draftId: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  creditsPerLesson: number;
  slots: BookingSlot[];
  createdAt: string;
  updatedAt: string;
};

