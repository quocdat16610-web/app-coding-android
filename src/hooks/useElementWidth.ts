import { useLayoutEffect, useRef, useState } from 'react';

/** Tracks an element's width with ResizeObserver (falls back to `fallback` where unsupported). */
export function useElementWidth<T extends HTMLElement>(fallback = 768) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (el.clientWidth > 0) setWidth(el.clientWidth);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}
