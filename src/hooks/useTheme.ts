import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/store/settingsStore';

const DARK_QUERY = '(prefers-color-scheme: dark)';

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && !!window.matchMedia?.(DARK_QUERY).matches;
}

/** Resolved theme ('light' | 'dark') taking the system preference into account. */
export function useResolvedTheme(): 'light' | 'dark' {
  const theme = useSettingsStore((s) => s.theme);
  const [systemDark, setSystemDark] = useState(systemPrefersDark);

  useEffect(() => {
    const mql = window.matchMedia?.(DARK_QUERY);
    if (!mql) return;
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  if (theme === 'system') return systemDark ? 'dark' : 'light';
  return theme;
}

/** Keeps <html data-theme> in sync with the user's preference. Mount once in App. */
export function useApplyTheme(): void {
  const resolved = useResolvedTheme();
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolved);
  }, [resolved]);
}
