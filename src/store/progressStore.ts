import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/lib/safeStorage';

export type Stars = 1 | 2 | 3;

export interface CompletedLesson {
  stars: Stars;
  completedAt: string;
  exerciseDone: boolean;
}

export interface Streak {
  count: number;
  lastStudyDate: string;
}

export interface ProgressData {
  version: 1;
  completedLessons: Record<number, CompletedLesson>;
  currentLessonId: number;
  lastStepByLesson: Record<number, number>;
  justCompleted: number | null;
  streak: Streak;
}

interface ProgressActions {
  /** Dev-only (?unlockAll=1): every lesson is open. Never persisted. */
  devUnlockAll: boolean;
  isUnlocked: (lessonId: number) => boolean;
  reset: () => void;
}

export type ProgressState = ProgressData & ProgressActions;

export const PROGRESS_STORAGE_KEY = 'kotlin-academy-progress-v1';
export const PROGRESS_VERSION = 1;

export const initialProgress = (): ProgressData => ({
  version: 1,
  completedLessons: {},
  currentLessonId: 1,
  lastStepByLesson: {},
  justCompleted: null,
  streak: { count: 0, lastStudyDate: '' },
});

/**
 * Upgrades persisted data from older versions. Unknown or corrupt data falls back to
 * a fresh state instead of crashing the app.
 */
export function migrateProgress(persisted: unknown, fromVersion: number): ProgressData {
  if (!persisted || typeof persisted !== 'object') return initialProgress();
  if (fromVersion === PROGRESS_VERSION) {
    return { ...initialProgress(), ...(persisted as Partial<ProgressData>), version: 1 };
  }
  return initialProgress();
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialProgress(),
      devUnlockAll: false,
      isUnlocked: (lessonId) =>
        get().devUnlockAll || lessonId === 1 || Boolean(get().completedLessons[lessonId - 1]),
      reset: () => set(initialProgress()),
    }),
    {
      name: PROGRESS_STORAGE_KEY,
      version: PROGRESS_VERSION,
      storage: createJSONStorage(() => safeStorage),
      migrate: (persisted, version) => migrateProgress(persisted, version),
      partialize: ({
        version,
        completedLessons,
        currentLessonId,
        lastStepByLesson,
        justCompleted,
        streak,
      }) => ({ version, completedLessons, currentLessonId, lastStepByLesson, justCompleted, streak }),
    },
  ),
);
