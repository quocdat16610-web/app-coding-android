import type { CompletedLesson } from '@/store/progressStore';

export type LessonStatus = 'completed' | 'current' | 'available' | 'locked';

/** First lesson that is not completed yet, or null when the course is finished. */
export function findCurrentLessonId(lessonIds: number[], completed: Record<number, CompletedLesson>): number | null {
  return lessonIds.find((id) => !completed[id]) ?? null;
}

/**
 * Status of every lesson. Lessons unlock sequentially, so everything after the current
 * lesson is locked unless the dev-only `unlockAll` flag is on (then it is "available").
 */
export function getLessonStatuses(
  lessonIds: number[],
  completed: Record<number, CompletedLesson>,
  unlockAll = false,
): Record<number, LessonStatus> {
  const current = findCurrentLessonId(lessonIds, completed);
  const result: Record<number, LessonStatus> = {};
  for (const id of lessonIds) {
    if (completed[id]) result[id] = 'completed';
    else if (id === current) result[id] = 'current';
    else result[id] = unlockAll ? 'available' : 'locked';
  }
  return result;
}

export const STATUS_LABEL: Record<LessonStatus, string> = {
  completed: 'đã hoàn thành',
  current: 'đang học',
  available: 'đã mở khoá',
  locked: 'đang khoá',
};
