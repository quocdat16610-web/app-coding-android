import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { DURATION, EASE_APPEAR } from '@/lib/motion';

interface PagePlaceholderProps {
  emoji: string;
  title: string;
  description: string;
  children?: ReactNode;
}

/** Temporary page shell used until each route is built in its own phase. */
export function PagePlaceholder({ emoji, title, description, children }: PagePlaceholderProps) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.md, ease: EASE_APPEAR }}
      className="card mx-auto mt-10 max-w-2xl p-8 text-center"
    >
      <div aria-hidden="true" className="mb-4 text-4xl">
        {emoji}
      </div>
      <h1 className="mb-2 text-2xl font-bold">{title}</h1>
      <p className="lesson-prose text-muted">{description}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </motion.section>
  );
}
