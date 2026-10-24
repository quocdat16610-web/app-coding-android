import { AnimatePresence, motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { STATUS_LABEL, type LessonStatus } from '@/lib/lessonStatus';
import { DURATION, EASE_APPEAR, SPRING } from '@/lib/motion';
import type { Lesson } from '@/types/lesson';
import type { Stars } from '@/store/progressStore';

interface RoadmapNodeProps {
  lesson: Lesson;
  status: LessonStatus;
  stars?: Stars;
  size: number;
  labelSide: 'left' | 'right' | 'below';
  labelWidth: number;
  onOpen: (lesson: Lesson) => void;
  onLockedClick: (lesson: Lesson) => void;
}

const CIRCLE_STYLE: Record<LessonStatus, string> = {
  completed: 'bg-accent text-text',
  current: 'bg-primary text-on-primary',
  available: 'bg-primary-soft text-primary border-2 border-primary',
  locked: 'bg-locked text-muted',
};

export function nodeAriaLabel(lesson: Lesson, status: LessonStatus, stars?: Stars): string {
  let label = `Bài ${lesson.id}: ${lesson.title} – ${STATUS_LABEL[status]}`;
  if (status === 'completed' && stars) label += `, ${stars} sao`;
  if (lesson.draft) label += ', nội dung sắp ra mắt';
  return label;
}

function StarRow({ stars }: { stars: Stars }) {
  return (
    <span aria-hidden="true" className="flex gap-0.5 text-sm leading-none">
      {[1, 2, 3].map((n) => (
        <span key={n} className={n <= stars ? 'text-warning' : 'text-locked'}>
          ★
        </span>
      ))}
    </span>
  );
}

export const RoadmapNode = forwardRef<HTMLButtonElement, RoadmapNodeProps>(function RoadmapNode(
  { lesson, status, stars, size, labelSide, labelWidth, onOpen, onLockedClick },
  ref,
) {
  const reduce = useReducedMotion();
  const shake = useAnimationControls();
  const [showTip, setShowTip] = useState(false);
  const locked = status === 'locked';

  const handleClick = () => {
    if (locked) {
      if (!reduce) void shake.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.4 } });
      onLockedClick(lesson);
      return;
    }
    onOpen(lesson);
  };

  const label = (
    <div
      className={`pointer-events-none absolute flex flex-col gap-1 ${
        labelSide === 'below'
          ? 'left-1/2 top-full mt-7 -translate-x-1/2 items-center text-center'
          : labelSide === 'right'
            ? 'left-full top-1/2 ml-4 -translate-y-1/2 items-start text-left'
            : 'right-full top-1/2 mr-4 -translate-y-1/2 items-end text-right'
      }`}
      style={{ width: labelWidth }}
    >
      <span className={`text-sm font-semibold leading-snug ${locked ? 'text-muted' : 'text-text'}`}>{lesson.title}</span>
      {lesson.draft && (
        <span className="chip bg-warning/20 px-2 py-0.5 text-[12px] font-semibold text-text">Sắp ra mắt</span>
      )}
    </div>
  );

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {status === 'current' && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-11 left-1/2 flex -translate-x-1/2 flex-col items-center"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="chip whitespace-nowrap bg-primary px-2.5 py-0.5 text-[12px] font-bold text-on-primary shadow-card">
            Học tiếp
          </span>
          <span className="-mt-0.5 h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent border-t-primary" />
        </motion.div>
      )}

      <motion.div animate={shake} className="h-full w-full">
        <motion.button
          ref={ref}
          type="button"
          data-lesson-id={lesson.id}
          data-status={status}
          aria-label={nodeAriaLabel(lesson, status, stars)}
          aria-disabled={locked || undefined}
          onClick={handleClick}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onFocus={() => setShowTip(true)}
          onBlur={() => setShowTip(false)}
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileFocus={reduce ? undefined : { scale: 1.08 }}
          whileTap={reduce || locked ? undefined : { scale: 0.95 }}
          transition={SPRING}
          className={`relative flex h-full w-full items-center justify-center rounded-full text-xl font-extrabold shadow-card ${
            CIRCLE_STYLE[status]
          } ${locked ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {status === 'current' && (
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full shadow-glow"
              animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <span aria-hidden="true" className="relative">
            {status === 'completed' ? '✓' : locked ? '🔒' : lesson.id}
          </span>
        </motion.button>
      </motion.div>

      {status === 'completed' && stars && (
        <div className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2">
          <StarRow stars={stars} />
        </div>
      )}

      {label}

      <AnimatePresence>
        {showTip && (
          <motion.div
            role="tooltip"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.sm, ease: EASE_APPEAR }}
            className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-14 w-60 -translate-x-1/2 rounded-btn bg-text p-3 text-left text-bg shadow-card"
          >
            <p className="text-sm font-bold leading-snug">
              Bài {lesson.id}: {lesson.title}
            </p>
            <p className="mt-1 text-[13px] leading-snug opacity-80">{lesson.concept}</p>
            <p className="mt-2 text-[13px] font-medium opacity-80">
              ⏱ {lesson.estimatedMinutes} phút · {locked ? '🔒 Chưa mở' : STATUS_LABEL[status]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
