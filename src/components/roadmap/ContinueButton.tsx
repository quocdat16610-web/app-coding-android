import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DURATION, EASE_APPEAR } from '@/lib/motion';

interface ContinueButtonProps {
  lessonId: number;
}

/** Floating shortcut to the lesson the learner should study next. */
export function ContinueButton({ lessonId }: ContinueButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="fixed bottom-6 right-4 z-40 sm:right-6"
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.md, ease: EASE_APPEAR, delay: 0.3 }}
    >
      <Link
        to={`/lesson/${lessonId}`}
        aria-label={`Học tiếp bài ${lessonId}`}
        className="flex h-14 items-center gap-2 rounded-chip bg-primary px-6 text-base font-bold text-on-primary shadow-glow transition-transform duration-sm hover:scale-105"
      >
        <span aria-hidden="true">▶</span>
        Học tiếp bài {lessonId}
      </Link>
    </motion.div>
  );
}
