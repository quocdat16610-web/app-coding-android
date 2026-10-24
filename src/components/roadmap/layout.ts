import type { Lesson, Stage } from '@/types/lesson';

export const MOBILE_BREAKPOINT = 640;

export interface LayoutConfig {
  isMobile: boolean;
  nodeSize: number;
  rowHeight: number;
  bannerHeight: number;
  amplitude: number;
  labelWidth: number;
}

export interface NodeLayout {
  kind: 'node';
  lesson: Lesson;
  /** Index in the whole course (0-based). */
  index: number;
  /** Center of the node circle, in px from the map's top-left corner. */
  x: number;
  y: number;
  /** Where the title label sits relative to the node. */
  labelSide: 'left' | 'right' | 'below';
}

export interface BannerLayout {
  kind: 'banner';
  stage: Stage;
  top: number;
  height: number;
}

export interface RoadmapLayout {
  config: LayoutConfig;
  items: (NodeLayout | BannerLayout)[];
  nodes: NodeLayout[];
  height: number;
}

export function layoutConfig(width: number): LayoutConfig {
  const isMobile = width < MOBILE_BREAKPOINT;
  const nodeSize = isMobile ? 60 : 72;
  // Mobile: almost straight line in the middle. Desktop: soft zig-zag.
  const amplitude = isMobile ? Math.min(14, width * 0.04) : Math.min(150, width * 0.16);
  const labelWidth = isMobile
    ? Math.min(260, width - 32)
    : Math.max(120, Math.min(220, width / 2 - amplitude - nodeSize / 2 - 24));
  return {
    isMobile,
    nodeSize,
    rowHeight: isMobile ? 176 : 148,
    bannerHeight: isMobile ? 128 : 112,
    amplitude,
    labelWidth,
  };
}

/**
 * Places stage banners and lesson nodes top to bottom. Nodes alternate left/right
 * of the center line so the connecting path forms a soft zig-zag.
 */
export function computeRoadmapLayout(lessons: Lesson[], stages: Stage[], width: number): RoadmapLayout {
  const config = layoutConfig(width);
  const center = width / 2;
  const items: RoadmapLayout['items'] = [];
  const nodes: NodeLayout[] = [];
  let y = 0;

  lessons.forEach((lesson, index) => {
    const previous = lessons[index - 1];
    if (!previous || previous.stage !== lesson.stage) {
      const stage = stages.find((s) => s.id === lesson.stage);
      if (stage) {
        y += index === 0 ? 0 : config.isMobile ? 48 : 24;
        items.push({ kind: 'banner', stage, top: y, height: config.bannerHeight });
        y += config.bannerHeight + 8;
      }
    }
    const direction = index % 2 === 0 ? -1 : 1;
    const node: NodeLayout = {
      kind: 'node',
      lesson,
      index,
      x: center + direction * config.amplitude,
      y: y + config.rowHeight / 2,
      labelSide: config.isMobile ? 'below' : direction < 0 ? 'left' : 'right',
    };
    items.push(node);
    nodes.push(node);
    y += config.rowHeight;
  });

  return { config, items, nodes, height: y + 24 };
}

/** Smooth vertical S-curve between two node centers. */
export function segmentPath(a: { x: number; y: number }, b: { x: number; y: number }): string {
  const dy = (b.y - a.y) / 2;
  return `M ${a.x} ${a.y} C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
}
