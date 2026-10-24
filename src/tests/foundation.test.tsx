import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { initialProgress, migrateProgress, useProgressStore } from '@/store/progressStore';
import { useSettingsStore } from '@/store/settingsStore';
import { ROUTER_FUTURE } from '@/lib/router';

beforeAll(() => {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
});

beforeEach(() => {
  act(() => {
    useSettingsStore.setState({ theme: 'system' });
    useProgressStore.getState().reset();
  });
});

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]} future={ROUTER_FUTURE}>
      <App />
    </MemoryRouter>,
  );
}

describe('foundation', () => {
  it('renders the roadmap placeholder on /', () => {
    renderAt('/');
    expect(screen.getByRole('heading', { name: 'Bản đồ lộ trình' })).toBeInTheDocument();
  });

  it('renders the 404 page for unknown routes', () => {
    renderAt('/khong-co');
    expect(screen.getByRole('heading', { name: /không tồn tại/ })).toBeInTheDocument();
  });

  it('toggles theme and applies data-theme on <html>', () => {
    renderAt('/');
    expect(document.documentElement.dataset.theme).toBe('light');
    fireEvent.click(screen.getByRole('button', { name: 'Chuyển sang giao diện tối' }));
    expect(useSettingsStore.getState().theme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('unlocks lesson 1 always and lesson N only after N-1', () => {
    const { isUnlocked } = useProgressStore.getState();
    expect(isUnlocked(1)).toBe(true);
    expect(isUnlocked(2)).toBe(false);
    act(() => {
      useProgressStore.setState({
        completedLessons: { 1: { stars: 3, completedAt: '2026-01-01', exerciseDone: false } },
      });
    });
    expect(useProgressStore.getState().isUnlocked(2)).toBe(true);
  });

  it('migrates corrupt persisted progress to a fresh state', () => {
    expect(migrateProgress(null, 0)).toEqual(initialProgress());
    expect(migrateProgress('garbage', 1)).toEqual(initialProgress());
  });
});
