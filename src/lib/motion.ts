/** Motion tokens shared by every Framer Motion animation (design system §3.4). */
export const DURATION = { sm: 0.15, md: 0.3, lg: 0.6 } as const;

export const EASE_APPEAR = [0.22, 1, 0.36, 1] as const;

export const SPRING = { type: 'spring', stiffness: 300, damping: 25 } as const;
