import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { create } from 'zustand';
import { DURATION, EASE_APPEAR } from '@/lib/motion';

export type ToastTone = 'info' | 'success' | 'warning';

interface ToastItem {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastState {
  toasts: ToastItem[];
  show: (message: string, tone?: ToastTone) => void;
  dismiss: (id: number) => void;
}

const TOAST_MS = 2600;
let nextId = 1;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  show: (message, tone = 'info') => {
    // Ignore an identical toast already on screen (e.g. repeated clicks, StrictMode effects)
    if (get().toasts.some((t) => t.message === message)) return;
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }));
    setTimeout(() => get().dismiss(id), TOAST_MS);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

/** Shows a short message at the bottom of the screen. */
export function toast(message: string, tone: ToastTone = 'info'): void {
  useToastStore.getState().show(message, tone);
}

const TONE_ICON: Record<ToastTone, string> = { info: '💡', success: '🎉', warning: '🔒' };

export function ToastViewport() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);
  const reduce = useReducedMotion();

  return (
    <div
      aria-live="polite"
      role="status"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => dismiss(t.id)}
            aria-label={`${t.message} (bấm để đóng)`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: DURATION.md, ease: EASE_APPEAR }}
            className="pointer-events-auto flex max-w-md items-center gap-2 rounded-btn bg-text px-4 py-3 text-left text-sm font-medium text-bg shadow-card"
          >
            <span aria-hidden="true">{TONE_ICON[t.tone]}</span>
            {t.message}
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
