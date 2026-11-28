import React from 'react';
import type {Theme} from '../../theme';

const W = 600;
const H = 290;
const GROUND = 222;
const CY = '#3CD2E6';
const CY_BRIGHT = '#9AF3FF';

const BUILDINGS: [number, number, number][] = [
  [20, 58, 120],
  [86, 46, 176],
  [140, 62, 132],
  [212, 40, 160],
  [340, 56, 150],
  [404, 70, 112],
  [480, 48, 186],
  [534, 60, 130],
];
const FAR: [number, number, number][] = [
  [0, 70, 96],
  [64, 52, 140],
  [120, 70, 110],
  [196, 44, 150],
  [250, 60, 120],
  [330, 70, 136],
  [404, 48, 170],
  [456, 64, 124],
  [524, 80, 104],
];

/** Toronto as a neon wireframe skyline: outline buildings, flickering lit windows, CN tower beacon, scan line. */
export const HudSkyline: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const scan = (frame * 3) % (W + 120);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#06182A'}}>
      <defs>
        <pattern id="hs-grid" width={20} height={20} patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={CY} strokeWidth={0.6} opacity={0.18} />
        </pattern>
        <linearGradient id="hs-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={CY} stopOpacity={0.22} />
          <stop offset="100%" stopColor={CY} stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#hs-grid)" />
      {/* far blocks */}
      {FAR.map(([x, w, h], i) => (
        <rect key={i} x={x} y={GROUND - h} width={w} height={h + 10} fill="#0A2A3E" stroke={CY} strokeOpacity={0.25} strokeWidth={1} />
      ))}
      {/* mid blocks + windows */}
      {BUILDINGS.map(([x, w, h], i) => (
        <g key={i}>
          <rect x={x} y={GROUND - h} width={w} height={h + 10} fill="#0B3248" stroke={CY} strokeOpacity={0.8} strokeWidth={1.6} />
          {Array.from({length: Math.floor((h - 24) / 22)}).map((_, r) => {
            const lit = (i * 3 + r + Math.floor(frame / 20)) % 5 === 0;
            return (
              <rect
                key={r}
                x={x + 8}
                y={GROUND - h + 14 + r * 22}
                width={w - 16}
                height={7}
                fill={lit ? theme.accent : CY}
                opacity={lit ? 0.95 : 0.28}
              />
            );
          })}
        </g>
      ))}
      {/* CN tower */}
      <g>
        <path d="M286,232 L293,100 L301,100 L308,232 Z" fill="#0B3248" stroke={CY_BRIGHT} strokeWidth={1.8} />
        <rect x={294} y={22} width={6} height={66} fill="#0B3248" stroke={CY_BRIGHT} strokeWidth={1.6} />
        <ellipse cx={297} cy={98} rx={24} ry={11} fill="#0B3248" stroke={CY_BRIGHT} strokeWidth={1.8} />
        <rect x={283} y={84} width={28} height={10} fill={theme.accent} opacity={0.9} />
        <circle cx={297} cy={18} r={9} fill={theme.accent} opacity={0.25} />
        <circle cx={297} cy={18} r={4} fill={Math.floor(frame / 10) % 2 ? theme.accent : '#FFD1A8'} />
      </g>
      {/* lake with reflection lines */}
      <rect x={0} y={GROUND + 8} width={W} height={H - GROUND} fill="url(#hs-water)" />
      <line x1={0} x2={W} y1={GROUND + 8} y2={GROUND + 8} stroke={CY_BRIGHT} strokeWidth={1.6} />
      {[0, 1, 2, 3].map((i) => (
        <path
          key={i}
          d={`M0,${GROUND + 22 + i * 14} Q75,${GROUND + 18 + i * 14} 150,${GROUND + 22 + i * 14} T300,${GROUND + 22 + i * 14} T450,${GROUND + 22 + i * 14} T600,${GROUND + 22 + i * 14}`}
          fill="none"
          stroke={CY}
          strokeOpacity={0.35 - i * 0.05}
          strokeWidth={1.2}
          transform={`translate(${Math.sin((frame + i * 25) / 18) * 6},0)`}
        />
      ))}
      {/* ferry */}
      <g transform={`translate(${40 + ((frame * 1.5) % 620)},${GROUND + 30})`}>
        <path d="M-28,0 L28,0 L20,12 L-20,12 Z" fill="#0B3248" stroke={theme.accent} strokeWidth={2} />
        <rect x={-12} y={-12} width={22} height={12} fill="none" stroke={CY_BRIGHT} strokeWidth={1.5} />
      </g>
      {/* scan line */}
      <rect x={scan - 120} y={0} width={120} height={H} fill={CY} opacity={0.07} />
      <line x1={scan} x2={scan} y1={0} y2={H} stroke={CY_BRIGHT} strokeWidth={1.5} opacity={0.6} />
      <text x={12} y={H - 10} fontFamily={theme.monoFont} fontSize={13} fill={CY_BRIGHT} opacity={0.75}>
        43.65°N 79.38°W · TORONTO
      </text>
    </svg>
  );
};
