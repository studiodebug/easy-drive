export type BookingSlot = {
  date: string;
  startTime: string;
  endTime: string;
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

