import React from 'react';
import type {Theme} from '../../theme';

const W = 600;
const H = 290;
const GROUND = 222;

const SH1 = 'drop-shadow(0px 2px 1.5px rgba(50,35,25,0.28)) drop-shadow(0px 6px 8px rgba(50,35,25,0.18))';
const SH2 = 'drop-shadow(0px 3px 2px rgba(50,35,25,0.32)) drop-shadow(0px 10px 12px rgba(50,35,25,0.22))';

const skyline = (bs: [number, number, number][]) =>
  bs.map(([x, w, h]) => `M${x},${GROUND + 10}V${GROUND - h}H${x + w}V${GROUND + 10}Z`).join('');

/** Toronto as a paper-cut diorama: stacked silhouettes, no outlines, soft layered shadows, parallax. */
export const PaperSkyline: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const par = (d: number) => Math.sin(frame / 50) * d;
  const far = skyline([
    [0, 70, 96],
    [64, 52, 140],
    [120, 70, 110],
    [196, 44, 150],
    [250, 60, 120],
    [330, 70, 136],
    [404, 48, 170],
    [456, 64, 124],
    [524, 80, 104],
  ]);
  const mid: [number, number, number][] = [
    [20, 58, 120],
    [86, 46, 176],
    [140, 62, 132],
    [212, 40, 160],
    [340, 56, 150],
    [404, 70, 112],
    [480, 48, 186],
    [534, 60, 130],
  ];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#F2E2D2'}}>
      <g style={{filter: SH1}}>
        <circle cx={470 + par(4)} cy={64} r={34} fill="#F4B860" />
      </g>
      <g style={{filter: SH1}} transform={`translate(${par(3)},0)`}>
        <path d={far} fill="#E2D3C5" />
      </g>
      <g style={{filter: SH2}} transform={`translate(${par(6)},0)`}>
        <path d={skyline(mid)} fill="#C8B6A6" />
        {mid.map(([x, w, h], i) =>
          Array.from({length: Math.floor((h - 24) / 24)}).map((_, r) => (
            <rect
              key={`${i}-${r}`}
              x={x + 8}
              y={GROUND - h + 14 + r * 24}
              width={w - 16}
              height={8}
              rx={2}
              fill={(i + r + Math.floor(frame / 24)) % 5 === 0 ? '#F7D9A0' : '#B3A190'}
            />
          )),
        )}
      </g>
      {/* CN tower + front blocks */}
      <g style={{filter: SH2}} transform={`translate(${par(10)},0)`}>
        <path d="M286,232 L293,100 L301,100 L308,232 Z" fill="#FBF8F3" />
        <rect x={294} y={18} width={6} height={70} rx={3} fill="#FBF8F3" />
        <ellipse cx={297} cy={98} rx={24} ry={11} fill="#FFFFFF" />
        <rect x={282} y={82} width={30} height={14} rx={6} fill={theme.accent} />
        <circle cx={297} cy={16} r={5} fill={Math.floor(frame / 10) % 2 ? theme.accent : '#FFD1D4'} />
        <path d={skyline([[0, 56, 70], [236, 40, 86], [318, 64, 62], [556, 50, 78]])} fill="#EFE7DD" />
        <rect x={236} y={GROUND - 86} width={40} height={10} fill={theme.accent} />
      </g>
      {/* paper lake: three wavy strips */}
      {[0, 1, 2].map((i) => (
        <g key={i} style={{filter: SH1}} transform={`translate(${par(4 + i * 4) + Math.sin((frame + i * 30) / 20) * 4},${i * 18})`}>
          <path
            d={`M-20,${GROUND + 8} Q60,${GROUND} 140,${GROUND + 8} T300,${GROUND + 8} T460,${GROUND + 8} T620,${GROUND + 8} V${H + 10} H-20 Z`}
            fill={['#A9C1CC', '#93B0BE', '#7E9FAF'][i]}
          />
        </g>
      ))}
      <g style={{filter: SH1}} transform={`translate(${40 + ((frame * 1.5) % 620)},${GROUND + 30})`}>
        <path d="M-28,0 L28,0 L20,12 L-20,12 Z" fill={theme.accent} />
        <rect x={-12} y={-12} width={22} height={12} rx={2} fill="#FFFFFF" />
      </g>
    </svg>
  );
};
