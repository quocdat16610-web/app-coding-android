import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useResolvedTheme } from '@/hooks/useTheme';
import { DURATION } from '@/lib/motion';
import { useSettingsStore } from '@/store/settingsStore';

export function ThemeToggle() {
  const resolved = useResolvedTheme();
  const setTheme = useSettingsStore((s) => s.setTheme);
  const reduce = useReducedMotion();
  const isDark = resolved === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={isDark ? 'Giao diện sáng' : 'Giao diện tối'}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-btn bg-surface-2 text-lg transition-colors duration-sm hover:bg-primary-soft"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={resolved}
          aria-hidden="true"
          initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: DURATION.sm }}
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
