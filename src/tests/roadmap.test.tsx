import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ToastViewport, useToastStore } from '@/components/common/Toast';
import { computeRoadmapLayout, segmentPath } from '@/components/roadmap/layout';
import { RoadmapMap } from '@/components/roadmap/RoadmapMap';
import { lessons } from '@/data/lessons';
import { stages } from '@/data/stages';
import { getLessonStatuses } from '@/lib/lessonStatus';
import { ROUTER_FUTURE } from '@/lib/router';
import LessonPage from '@/routes/LessonPage';
import { useProgressStore, type CompletedLesson } from '@/store/progressStore';

const done = (stars: 1 | 2 | 3): CompletedLesson => ({ stars, completedAt: '2026-10-24', exerciseDone: false });

beforeEach(() => {
  act(() => {
    useProgressStore.getState().reset();
    useProgressStore.setState({ devUnlockAll: false });
    useToastStore.setState({ toasts: [] });
  });
});

describe('getLessonStatuses', () => {
  const ids = [1, 2, 3, 4];

  it('marks lesson 1 current on a fresh start, the rest locked', () => {
    expect(getLessonStatuses(ids, {})).toEqual({ 1: 'current', 2: 'locked', 3: 'locked', 4: 'locked' });
  });

  it('moves current to the first lesson not completed', () => {
    expect(getLessonStatuses(ids, { 1: done(3), 2: done(1) })).toEqual({
      1: 'completed',
      2: 'completed',
      3: 'current',
      4: 'locked',
    });
  });

  it('opens everything in dev unlockAll mode', () => {
    expect(getLessonStatuses(ids, {}, true)).toEqual({ 1: 'current', 2: 'available', 3: 'available', 4: 'available' });
  });
});

describe('computeRoadmapLayout', () => {
  it('places one banner per stage before its first lesson', () => {
    const layout = computeRoadmapLayout(lessons, stages, 1024);
    const order = layout.items.map((i) => (i.kind === 'banner' ? `S${i.stage.id}` : i.lesson.id));
    expect(order.slice(0, 6)).toEqual(['S1', 1, 2, 3, 4, 'S2']);
    expect(layout.items.filter((i) => i.kind === 'banner')).toHaveLength(4);
    expect(layout.nodes).toHaveLength(16);
  });

  it('zig-zags on desktop and stays near the center on mobile', () => {
    const desktop = computeRoadmapLayout(lessons, stages, 1024);
    expect(desktop.nodes[0]!.x).toBeLessThan(512);
    expect(desktop.nodes[1]!.x).toBeGreaterThan(512);
    expect(desktop.nodes[0]!.labelSide).toBe('left');

    const mobile = computeRoadmapLayout(lessons, stages, 375);
    expect(mobile.config.nodeSize).toBe(60);
    mobile.nodes.forEach((n) => {
      expect(Math.abs(n.x - 187.5)).toBeLessThanOrEqual(15);
      expect(n.labelSide).toBe('below');
    });
  });

  it('keeps nodes strictly top-to-bottom', () => {
    const { nodes } = computeRoadmapLayout(lessons, stages, 800);
    nodes.slice(1).forEach((n, i) => expect(n.y).toBeGreaterThan(nodes[i]!.y));
  });

  it('builds a cubic S-curve between nodes', () => {
    expect(segmentPath({ x: 0, y: 0 }, { x: 100, y: 200 })).toBe('M 0 0 C 0 100, 100 100, 100 200');
  });
});

function renderMap() {
  return render(
    <MemoryRouter future={ROUTER_FUTURE}>
      <RoadmapMap lessons={lessons} />
      <ToastViewport />
    </MemoryRouter>,
  );
}

describe('RoadmapMap', () => {
  it('labels stations with status and stars for screen readers', () => {
    act(() => useProgressStore.setState({ completedLessons: { 1: done(3), 2: done(2) } }));
    renderMap();
    expect(screen.getByRole('button', { name: 'Bài 2: Cấu trúc thư mục project – đã hoàn thành, 2 sao' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Bài 3: Kotlin cơ bản – đang học' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Bài 5: .* – đang khoá, nội dung sắp ra mắt$/ })).toBeInTheDocument();
  });

  it('colors travelled path segments only', () => {
    act(() => useProgressStore.setState({ completedLessons: { 1: done(3) } }));
    const { container } = renderMap();
    const travelled = (from: string) =>
      container.querySelector(`[data-segment="${from}"] [data-travelled]`)?.getAttribute('data-travelled');
    expect(travelled('1-2')).toBe('true');
    expect(travelled('2-3')).toBe('false');
  });

  it('shows a toast when a locked station is clicked', () => {
    renderMap();
    fireEvent.click(screen.getByRole('button', { name: /^Bài 4:/ }));
    expect(screen.getByRole('status')).toHaveTextContent('Hoàn thành bài trước để mở khoá nhé!');
  });

  it('shows a tooltip with concept and duration on focus', () => {
    renderMap();
    fireEvent.focus(screen.getByRole('button', { name: /^Bài 1:/ }));
    const tip = screen.getByRole('tooltip');
    expect(tip).toHaveTextContent('Tạo và chạy một project Android');
    expect(tip).toHaveTextContent('15 phút');
  });
});

describe('LessonPage access', () => {
  function renderAt(path: string) {
    return render(
      <MemoryRouter initialEntries={[path]} future={ROUTER_FUTURE}>
        <Routes>
          <Route path="/" element={<p>Trang bản đồ</p>} />
          <Route path="/lesson/:id" element={<LessonPage />} />
        </Routes>
        <ToastViewport />
      </MemoryRouter>,
    );
  }

  it('redirects a locked lesson to the map with a toast', () => {
    renderAt('/lesson/5');
    expect(screen.getByText('Trang bản đồ')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Hoàn thành bài trước để mở khoá nhé!');
  });

  it('opens an unlocked lesson', () => {
    renderAt('/lesson/1');
    expect(screen.getByRole('heading', { name: /Bài 1:/ })).toBeInTheDocument();
  });

  it('shows 404 for an unknown lesson id', () => {
    renderAt('/lesson/99');
    expect(screen.getByRole('heading', { name: /không tồn tại/ })).toBeInTheDocument();
  });
});
