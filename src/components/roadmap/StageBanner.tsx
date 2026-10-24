import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, EASE_APPEAR } from '@/lib/motion';
import type { Stage } from '@/types/lesson';

interface StageBannerProps {
  stage: Stage;
  completed: number;
  total: number;
  style?: React.CSSProperties;
}

export function StageBanner({ stage, completed, total, style }: StageBannerProps) {
  const reduce = useReducedMotion();
  const done = completed === total;

  return (
    <motion.section
      aria-label={`Chặng ${stage.id}: ${stage.title}, đã xong ${completed} trên ${total} bài`}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: DURATION.lg, ease: EASE_APPEAR }}
      style={style}
      className="absolute inset-x-0 flex items-center gap-4 rounded-card border border-surface-2 bg-surface p-4 shadow-card sm:p-5"
    >
      <div
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-card bg-primary-soft text-2xl sm:h-16 sm:w-16 sm:text-3xl"
      >
        {stage.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Chặng {stage.id}</p>
        <h2 className="text-lg font-bold leading-tight sm:text-xl">{stage.title}</h2>
        <p className="mt-1 text-sm text-muted">{stage.description}</p>
      </div>
      <span
        className={`chip hidden shrink-0 sm:inline-flex ${done ? 'bg-accent-soft text-text' : 'bg-surface-2 text-muted'}`}
      >
        {done ? '✓ ' : ''}
        {completed}/{total}
      </span>
    </motion.section>
  );
}
