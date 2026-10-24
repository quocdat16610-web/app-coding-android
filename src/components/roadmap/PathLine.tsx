import { segmentPath, type NodeLayout } from './layout';

interface PathLineProps {
  nodes: NodeLayout[];
  width: number;
  height: number;
  /** Segment i connects nodes[i] → nodes[i+1]; it is "travelled" when lesson i is completed. */
  isTravelled: (fromLessonId: number) => boolean;
}

/** The road connecting lesson nodes: solid accent where travelled, dashed where still ahead. */
export function PathLine({ nodes, width, height, isTravelled }: PathLineProps) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
    >
      {nodes.slice(0, -1).map((node, i) => {
        const next = nodes[i + 1]!;
        const d = segmentPath(node, next);
        const travelled = isTravelled(node.lesson.id);
        return (
          <g key={node.lesson.id} data-segment={`${node.lesson.id}-${next.lesson.id}`}>
            {/* Soft wide underlay so the road reads as a path, not a thin line */}
            <path d={d} strokeWidth={18} strokeLinecap="round" className="stroke-surface-2" />
            <path
              d={d}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={travelled ? undefined : '2 14'}
              className={travelled ? 'stroke-accent' : 'stroke-locked'}
              data-travelled={travelled}
            />
          </g>
        );
      })}
    </svg>
  );
}
