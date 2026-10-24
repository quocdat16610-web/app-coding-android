import { ContinueButton } from '@/components/roadmap/ContinueButton';
import { RoadmapMap } from '@/components/roadmap/RoadmapMap';
import { lessons } from '@/data/lessons';
import { findCurrentLessonId } from '@/lib/lessonStatus';
import { useProgressStore } from '@/store/progressStore';

export default function RoadmapPage() {
  const completed = useProgressStore((s) => s.completedLessons);
  const streak = useProgressStore((s) => s.streak.count);
  const currentId = findCurrentLessonId(
    lessons.map((l) => l.id),
    completed,
  );
  const doneCount = Object.keys(completed).length;

  return (
    <div className="pb-24 pt-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Bản đồ lộ trình</h1>
        <p className="lesson-prose mx-auto mt-2 max-w-xl text-muted">
          {currentId === null
            ? 'Em đã hoàn thành cả khoá học. Thầy tự hào về em lắm! 🏆'
            : doneCount === 0
              ? 'Mỗi trạm là một bài học nhỏ. Bắt đầu từ trạm số 1 nhé!'
              : `Em đã đi qua ${doneCount} trạm. Cố lên, trạm tiếp theo đang chờ!`}
        </p>
        {streak > 0 && (
          <p className="chip mt-3 bg-warning/20 text-text" aria-label={`Chuỗi ${streak} ngày học liên tiếp`}>
            🔥 {streak} ngày liên tiếp
          </p>
        )}
      </div>

      <RoadmapMap lessons={lessons} />

      {currentId !== null && <ContinueButton lessonId={currentId} />}
    </div>
  );
}
