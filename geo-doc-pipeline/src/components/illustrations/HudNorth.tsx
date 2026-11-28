import React from 'react';
import type {Theme} from '../../theme';

const W = 600;
const H = 290;
const CY = '#3CD2E6';
const CY_BRIGHT = '#9AF3FF';

const tree = (x: number, y: number, s: number) => {
  let d = '';
  for (let i = 0; i < 4; i++) {
    const w = (30 - i * 6) * s;
    const yy = y - i * 18 * s;
    d += `M${x - w},${yy} L${x + w},${yy} L${x},${yy - 32 * s} Z`;
  }
  return d + `M${x},${y} v${10 * s}`;
};

/** The empty north as a topographic wireframe: contour ridges, sparse spruce outlines, drifting snow dots, "0 PEOPLE" readout. */
export const HudNorth: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const drift = Math.sin(frame / 55) * 4;
  const trees: [number, number, number][] = [
    [40, 250, 1.1],
    [96, 258, 0.9],
    [150, 246, 1.2],
    [470, 254, 1.0],
    [526, 244, 1.25],
    [576, 256, 0.9],
  ];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#06182A'}}>
      <defs>
        <pattern id="hn-grid" width={20} height={20} patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={CY} strokeWidth={0.6} opacity={0.18} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#hn-grid)" />
      {/* contour ridges */}
      <g fill="none" stroke={CY} strokeWidth={1.3} transform={`translate(${drift},0)`}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-20,${200 - i * 6} L90,${92 + i * 12} L170,${156 + i * 3} L280,${48 + i * 14} L400,${168 + i * 2} L480,${102 + i * 10} L620,${204 - i * 6}`}
            opacity={0.85 - i * 0.12}
            stroke={i === 0 ? CY_BRIGHT : CY}
          />
        ))}
      </g>
      {/* frozen lake */}
      <ellipse cx={330} cy={252} rx={110} ry={16} fill="none" stroke={CY_BRIGHT} strokeWidth={1.4} />
      <ellipse cx={330} cy={252} rx={78} ry={10} fill="none" stroke={CY} strokeWidth={1} opacity={0.6} />
      <ellipse cx={330} cy={252} rx={46} ry={5} fill="none" stroke={CY} strokeWidth={1} opacity={0.4} />
      {/* spruce outlines */}
      <path d={trees.map(([x, y, s]) => tree(x, y, s)).join('')} fill="#0B3248" stroke={CY} strokeWidth={1.6} strokeLinejoin="round" />
      <line x1={0} x2={W} y1={262} y2={262} stroke={CY_BRIGHT} strokeWidth={1.4} opacity={0.8} />
      {/* snow */}
      {Array.from({length: 26}).map((_, i) => {
        const sx = (i * 89) % W;
        const sp = 0.6 + ((i * 31) % 10) / 12;
        const y = ((frame * sp * 1.3 + i * 47) % (H + 20)) - 10;
        const x = sx + Math.sin((frame + i * 17) / 20) * 7;
        return <circle key={i} cx={x} cy={y} r={1.6 + (i % 3) * 0.6} fill={CY_BRIGHT} opacity={0.75} />;
      })}
      {/* readout */}
      <g transform="translate(396,34)">
        <rect width={190} height={52} fill="#06182A" fillOpacity={0.85} stroke={CY} strokeOpacity={0.7} strokeWidth={1.2} />
        <text x={12} y={22} fontFamily={theme.monoFont} fontSize={13} fill={CY_BRIGHT} opacity={0.8}>
          DENSITY
        </text>
        <text x={12} y={42} fontFamily={theme.monoFont} fontWeight={700} fontSize={19} fill={theme.accent}>
          ≈ 0 / KM²
        </text>
      </g>
    </svg>
  );
};
