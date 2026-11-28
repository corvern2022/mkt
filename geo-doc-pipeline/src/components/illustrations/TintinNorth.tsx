import React from 'react';
import type {Theme} from '../../theme';
import {roughPolygon} from '../../rough';
import {RoughSvg} from '../RoughSvg';

const W = 600;
const H = 290;

const Spruce: React.FC<{x: number; y: number; s: number; ink: string}> = ({x, y, s, ink}) => (
  <g transform={`translate(${x},${y}) scale(${s})`}>
    <rect x={-4} y={-6} width={8} height={14} fill="#6B4A2E" stroke={ink} strokeWidth={2.5} />
    {[0, 1, 2, 3].map((i) => {
      const w = 34 - i * 7;
      const yy = -6 - i * 20;
      return (
        <g key={i}>
          <polygon points={`${-w},${yy} ${w},${yy} 0,${yy - 34}`} fill="#2F5D50" stroke={ink} strokeWidth={2.8} strokeLinejoin="round" />
          <path d={`M${-w * 0.55},${yy - 15} Q0,${yy - 9} ${w * 0.55},${yy - 15} L0,${yy - 34} Z`} fill="#FFFFFF" stroke={ink} strokeWidth={2} strokeLinejoin="round" />
        </g>
      );
    })}
  </g>
);

/** The empty north in ligne-claire: snow hills, spruce, hatched shadows, falling snow, "POP. 0" sign. */
export const TintinNorth: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const ink = theme.ink;
  const mtn: [number, number][] = [
    [-10, 200],
    [110, 70],
    [190, 150],
    [290, 40],
    [420, 170],
    [500, 96],
    [620, 200],
  ];
  const shade1 = roughPolygon(
    [
      [290, 40],
      [420, 170],
      [330, 190],
    ],
    {fill: '#5B7F99', fillStyle: 'hachure', hachureAngle: -50, hachureGap: 6, stroke: 'none', seed: 4, roughness: 1},
  );
  const shade2 = roughPolygon(
    [
      [110, 70],
      [190, 150],
      [130, 175],
    ],
    {fill: '#5B7F99', fillStyle: 'hachure', hachureAngle: -50, hachureGap: 6, stroke: 'none', seed: 6, roughness: 1},
  );
  const lake = roughPolygon(
    [
      [330, 236],
      [470, 228],
      [560, 244],
      [450, 262],
      [340, 256],
    ],
    {fill: '#7FB0C9', fillStyle: 'cross-hatch', hachureGap: 8, stroke: 'none', seed: 9, roughness: 1},
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#DCE8EC'}}>
      <circle cx={80} cy={50} r={22} fill="#F8EFD8" stroke={ink} strokeWidth={3} />
      <polygon points={mtn.map((p) => p.join(',')).join(' ') + ` 620,300 -10,300`} fill="#F4F7F8" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <RoughSvg paths={shade1} color="#5B7F99" width={1.4} />
      <RoughSvg paths={shade2} color="#5B7F99" width={1.4} />
      <path d="M-10,214 Q150,184 300,212 T620,204 L620,300 L-10,300 Z" fill="#FFFFFF" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <path d="M330,236 L470,228 L560,244 L450,262 L340,256 Z" fill="#BFDCE5" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <RoughSvg paths={lake} color="#5B7F99" width={1.1} opacity={0.6} />
      <path d="M380,240 l20,8 l-6,10 M470,236 l-10,12 l14,8" fill="none" stroke={ink} strokeWidth={2} />
      {[
        [40, 236, 1.05],
        [96, 226, 0.8],
        [140, 246, 1.2],
        [196, 222, 0.7],
        [236, 238, 0.95],
        [560, 214, 0.75],
        [590, 236, 1.0],
      ].map(([x, y, s], i) => (
        <Spruce key={i} x={x} y={y} s={s} ink={ink} />
      ))}
      {/* POP. 0 sign */}
      <g transform="translate(290,250) rotate(-4)">
        <rect x={-3} y={-34} width={6} height={40} fill="#8A5A34" stroke={ink} strokeWidth={2.5} />
        <rect x={-38} y={-62} width={76} height={32} fill="#F1E8D2" stroke={ink} strokeWidth={3} />
        <text x={0} y={-39} textAnchor="middle" fontFamily={theme.labelFont} fontSize={22} fill={theme.accent}>
          POP. 0
        </text>
      </g>
      {/* falling snow */}
      {Array.from({length: 34}).map((_, i) => {
        const sx = (i * 97) % W;
        const sp = 0.7 + ((i * 37) % 10) / 10;
        const y = ((frame * sp * 1.4 + i * 53) % (H + 20)) - 10;
        const x = sx + Math.sin((frame + i * 20) / 18) * 6;
        return <circle key={i} cx={x} cy={y} r={2.6 + (i % 3)} fill="#FFFFFF" stroke={ink} strokeWidth={1.4} />;
      })}
    </svg>
  );
};
