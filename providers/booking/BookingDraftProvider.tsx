'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getItem, removeItem, setItem } from "@/lib/localStorage";
import type { BookingDraft, BookingSlot } from "@/types/booking";

type InstructorMeta = {
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  creditsPerLesson: number;
};

export type BookingDraftContextValue = {
  draft: BookingDraft | null;
  isSummaryOpen: boolean;
  openSummary: () => void;
  closeSummary: () => void;
  setSlots: (meta: InstructorMeta, slots: BookingSlot[]) => void;
  removeSlot: (slot: BookingSlot) => void;
  clearDraft: () => void;
};

const LOCAL_STORAGE_DRAFT_KEY = "easy-drive-booking-draft";
const LOCAL_STORAGE_RESUME_KEY = "easy-drive-booking-resume";

const BookingDraftContext = createContext<BookingDraftContextValue | null>(null);

export type BookingDraftProviderProps = {
  children: React.ReactNode;
};

const createDraft = (meta: InstructorMeta, slots: BookingSlot[]): BookingDraft => {
  const now = new Date().toISOString();
  return {
    draftId: crypto.randomUUID(),
    instructorId: meta.instructorId,
    instructorName: meta.instructorName,
    instructorAvatar: meta.instructorAvatar,
    creditsPerLesson: meta.creditsPerLesson,
    slots,
    createdAt: now,
    updatedAt: now,
  };
};

const updateDraft = (draft: BookingDraft, slots: BookingSlot[]): BookingDraft => {
  return {
    ...draft,
    slots,
    updatedAt: new Date().toISOString(),
  };
};

const slotKey = (slot: BookingSlot) => `${slot.date}-${slot.startTime}-${slot.endTime}`;

export function BookingDraftProvider({ children }: BookingDraftProviderProps) {
  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    const savedDraft = getItem<BookingDraft>(LOCAL_STORAGE_DRAFT_KEY);
    if (savedDraft) {
      setDraft(savedDraft);
    }

    const shouldResume = getItem<boolean>(LOCAL_STORAGE_RESUME_KEY);
    if (shouldResume) {
      setIsSummaryOpen(true);
      removeItem(LOCAL_STORAGE_RESUME_KEY);
    }
  }, []);

  const persistDraft = useCallback((nextDraft: BookingDraft | null) => {
    setDraft(nextDraft);
    if (nextDraft) {
      setItem(LOCAL_STORAGE_DRAFT_KEY, nextDraft);
      return;
    }
    removeItem(LOCAL_STORAGE_DRAFT_KEY);
  }, []);

  const setSlots = useCallback((meta: InstructorMeta, slots: BookingSlot[]) => {
    const normalizedSlots = slots.map((slot) => ({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    }));

    if (!normalizedSlots.length) {
      persistDraft(null);
      return;
    }

    const shouldReset = !draft || draft.instructorId !== meta.instructorId;
    const nextDraft = shouldReset
      ? createDraft(meta, normalizedSlots)
      : updateDraft(draft, normalizedSlots);

    persistDraft(nextDraft);
  }, [draft, persistDraft]);

  const removeSlot = useCallback((slot: BookingSlot) => {
    if (!draft) return;
    const nextSlots = draft.slots.filter((item) => slotKey(item) !== slotKey(slot));
    if (!nextSlots.length) {
      persistDraft(null);
      return;
    }
    persistDraft(updateDraft(draft, nextSlots));
  }, [draft, persistDraft]);

  const clearDraft = useCallback(() => {
    persistDraft(null);
  }, [persistDraft]);

  const openSummary = useCallback(() => setIsSummaryOpen(true), []);
  const closeSummary = useCallback(() => setIsSummaryOpen(false), []);

  const value = useMemo<BookingDraftContextValue>(() => ({
    draft,
    isSummaryOpen,
    openSummary,
    closeSummary,
    setSlots,
    removeSlot,
    clearDraft,
  }), [draft, isSummaryOpen, openSummary, closeSummary, setSlots, removeSlot, clearDraft]);

  return (
    <BookingDraftContext.Provider value={value}>{children}</BookingDraftContext.Provider>
  );
}

export function useBookingDraft(): BookingDraftContextValue {
  const ctx = useContext(BookingDraftContext);
  if (!ctx) {
    throw new Error("useBookingDraft must be used within a BookingDraftProvider");
  }
  return ctx;
}

export const markBookingResume = () => {
  setItem(LOCAL_STORAGE_RESUME_KEY, true);
};

