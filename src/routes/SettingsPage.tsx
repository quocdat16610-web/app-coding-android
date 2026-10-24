import { Card } from '@/components/common/Card';
import { useSettingsStore, type ThemePreference } from '@/store/settingsStore';

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Theo hệ thống' },
  { value: 'light', label: 'Sáng' },
  { value: 'dark', label: 'Tối' },
];

export default function SettingsPage() {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  return (
    <div className="mx-auto mt-10 max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Cài đặt</h1>
      <Card>
        <fieldset>
          <legend className="mb-3 text-lg font-semibold">Giao diện</legend>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Chọn giao diện">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={theme === opt.value}
                onClick={() => setTheme(opt.value)}
                className={`chip border transition-colors duration-sm ${
                  theme === opt.value
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-surface-2 bg-surface-2 text-text hover:bg-primary-soft'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-6 text-sm text-muted">
          Cài đặt giọng đọc, tốc độ và nút xoá tiến độ sẽ được bổ sung ở Giai đoạn 4 và 8.
        </p>
      </Card>
    </div>
  );
}
