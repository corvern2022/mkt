import React from 'react';
import type {RoughPath} from '../rough';

/** Renders roughjs output. `draw` (0..1) animates the pen stroke. */
export const RoughSvg: React.FC<{
  paths: RoughPath[];
  color?: string;
  width?: number;
  fill?: string;
  draw?: number;
  opacity?: number;
  nonScaling?: boolean;
}> = ({paths, color, width, fill, draw = 1, opacity = 1, nonScaling}) => (
  <g opacity={opacity}>
    {paths.map((p, i) => {
      const isFill = p.stroke === 'none' && p.fill;
      return (
        <path
          key={i}
          d={p.d}
          fill={isFill ? fill ?? p.fill : 'none'}
          stroke={isFill ? 'none' : color ?? p.stroke}
          strokeWidth={width ?? p.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect={nonScaling ? 'non-scaling-stroke' : undefined}
          pathLength={draw < 1 ? 1 : undefined}
          strokeDasharray={draw < 1 ? '1 1' : undefined}
          strokeDashoffset={draw < 1 ? 1 - Math.max(0, draw) : undefined}
        />
      );
    })}
  </g>
);
