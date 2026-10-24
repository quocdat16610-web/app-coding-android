import { Link, NavLink } from 'react-router-dom';
import { TOTAL_LESSONS } from '@/lib/constants';
import { useProgressStore } from '@/store/progressStore';
import { ProgressBar } from './ProgressBar';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const completedCount = useProgressStore((s) => Object.keys(s.completedLessons).length);

  return (
    <header className="sticky top-0 z-30 border-b border-surface-2 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2 rounded-btn font-extrabold text-text"
          aria-label="Kotlin Academy – về bản đồ lộ trình"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary text-lg text-on-primary"
          >
            K
          </span>
          <span className="hidden text-lg sm:inline">Kotlin Academy</span>
        </Link>

        <ProgressBar
          value={completedCount}
          max={TOTAL_LESSONS}
          label="Tiến độ toàn khoá học"
          className="mx-auto w-full max-w-xs"
        />

        <nav className="flex shrink-0 items-center gap-2" aria-label="Điều hướng chính">
          <NavLink
            to="/settings"
            aria-label="Cài đặt"
            title="Cài đặt"
            className={({ isActive }) =>
              `flex h-10 w-10 items-center justify-center rounded-btn text-lg transition-colors duration-sm hover:bg-primary-soft ${
                isActive ? 'bg-primary-soft' : 'bg-surface-2'
              }`
            }
          >
            <span aria-hidden="true">⚙️</span>
          </NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
