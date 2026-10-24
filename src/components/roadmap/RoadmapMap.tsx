import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/common/Toast';
import { stages } from '@/data/stages';
import { useElementWidth } from '@/hooks/useElementWidth';
import { findCurrentLessonId, getLessonStatuses } from '@/lib/lessonStatus';
import { useProgressStore } from '@/store/progressStore';
import type { Lesson } from '@/types/lesson';
import { computeRoadmapLayout } from './layout';
import { PathLine } from './PathLine';
import { RoadmapNode } from './RoadmapNode';
import { StageBanner } from './StageBanner';

interface RoadmapMapProps {
  lessons: Lesson[];
}

export function RoadmapMap({ lessons }: RoadmapMapProps) {
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const completed = useProgressStore((s) => s.completedLessons);
  const unlockAll = useProgressStore((s) => s.devUnlockAll);
  const [containerRef, width] = useElementWidth<HTMLDivElement>();
  const nodeRefs = useRef(new Map<number, HTMLButtonElement>());

  const ids = useMemo(() => lessons.map((l) => l.id), [lessons]);
  const statuses = useMemo(() => getLessonStatuses(ids, completed, unlockAll), [ids, completed, unlockAll]);
  const layout = useMemo(() => computeRoadmapLayout(lessons, stages, width), [lessons, width]);
  const currentId = findCurrentLessonId(ids, completed);

  // Bring the current station into view when the map opens.
  useEffect(() => {
    if (currentId === null || currentId === 1) return;
    const el = nodeRefs.current.get(currentId);
    el?.scrollIntoView?.({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
    // Only on first mount: later progress changes get their own unlock animation.
  }, []);

  const stageProgress = (stageId: number) => {
    const inStage = lessons.filter((l) => l.stage === stageId);
    return { done: inStage.filter((l) => completed[l.id]).length, total: inStage.length };
  };

  const { config } = layout;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-3xl" style={{ height: layout.height }}>
      <PathLine
        nodes={layout.nodes}
        width={width}
        height={layout.height}
        isTravelled={(id) => Boolean(completed[id])}
      />
      <ol className="contents" aria-label="Lộ trình 16 bài học">
        {layout.items.map((item) => {
          if (item.kind === 'banner') {
            const { done, total } = stageProgress(item.stage.id);
            return (
              <li key={`stage-${item.stage.id}`} className="contents">
                <StageBanner
                  stage={item.stage}
                  completed={done}
                  total={total}
                  style={{ top: item.top, minHeight: item.height - 16 }}
                />
              </li>
            );
          }
          const { lesson } = item;
          return (
            <li
              key={lesson.id}
              // Raise the hovered/focused node so its tooltip stays above neighbours
              className="absolute z-10 hover:z-30 focus-within:z-30"
              style={{ left: item.x - config.nodeSize / 2, top: item.y - config.nodeSize / 2 }}
            >
              <RoadmapNode
                ref={(el) => {
                  if (el) nodeRefs.current.set(lesson.id, el);
                  else nodeRefs.current.delete(lesson.id);
                }}
                lesson={lesson}
                status={statuses[lesson.id] ?? 'locked'}
                stars={completed[lesson.id]?.stars}
                size={config.nodeSize}
                labelSide={item.labelSide}
                labelWidth={config.labelWidth}
                onOpen={(l) => navigate(`/lesson/${l.id}`)}
                onLockedClick={() => toast('Hoàn thành bài trước để mở khoá nhé!', 'warning')}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
