import type { Config } from 'tailwindcss';

/** Colors read CSS variables (RGB channels) from globals.css so light/dark switch at runtime. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    fontSize: {
      xs: ['14px', { lineHeight: '1.5' }],
      sm: ['14px', { lineHeight: '1.5' }],
      base: ['16px', { lineHeight: '1.6' }],
      lg: ['18px', { lineHeight: '1.6' }],
      xl: ['22px', { lineHeight: '1.4' }],
      '2xl': ['28px', { lineHeight: '1.3' }],
      '3xl': ['36px', { lineHeight: '1.2' }],
      '4xl': ['48px', { lineHeight: '1.1' }],
    },
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        text: token('text'),
        muted: token('text-muted'),
        primary: token('primary'),
        'primary-soft': token('primary-soft'),
        accent: token('accent'),
        'accent-soft': token('accent-soft'),
        warning: token('warning'),
        danger: token('danger'),
        locked: token('locked'),
        highlight: token('highlight'),
        'on-primary': token('on-primary'),
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      lineHeight: {
        lesson: '1.7',
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        chip: '999px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,.06)',
        glow: '0 0 0 4px rgb(var(--primary) / 0.25), 0 0 24px rgb(var(--primary) / 0.45)',
      },
      transitionDuration: {
        sm: '150ms',
        md: '300ms',
        lg: '600ms',
      },
      transitionTimingFunction: {
        appear: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
