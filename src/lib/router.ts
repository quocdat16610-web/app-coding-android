/** Opt into React Router v7 behavior early so the console stays free of future-flag warnings. */
export const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true } as const;

/** Router basename matching Vite's `base` (e.g. "/app-coding-android" on GitHub Pages). */
export const ROUTER_BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
