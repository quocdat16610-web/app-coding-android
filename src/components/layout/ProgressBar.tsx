import { motion, useReducedMotion } from 'framer-motion';
import { DURATION, EASE_APPEAR } from '@/lib/motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  className?: string;
  showText?: boolean;
}

export function ProgressBar({ value, max, label = 'Tiến độ', className = '', showText = true }: ProgressBarProps) {
  const reduce = useReducedMotion();
  const percent = max > 0 ? Math.round((Math.min(value, max) / max) * 100) : 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value}/${max} bài, ${percent}%`}
        className="h-2.5 flex-1 overflow-hidden rounded-chip bg-surface-2"
      >
        <motion.div
          className="h-full rounded-chip bg-accent"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={reduce ? { duration: 0 } : { duration: DURATION.lg, ease: EASE_APPEAR }}
        />
      </div>
      {showText && (
        <span className="whitespace-nowrap text-sm font-medium text-muted">
          {value}/{max} · {percent}%
        </span>
      )}
    </div>
  );
}
