import React from 'react';
import type {Theme} from '../../theme';
import {roughPolygon, roughRect} from '../../rough';
import {RoughSvg} from '../RoughSvg';

const W = 600;
const H = 290;
// [x, width, height, fill]
const BUILDINGS: [number, number, number, string][] = [
  [10, 60, 120, '#E9DDBF'],
  [66, 46, 168, '#D9C9A3'],
  [108, 64, 132, '#F1E8D2'],
  [168, 40, 196, '#C9D7D9'],
  [204, 70, 150, '#E9DDBF'],
  [318, 54, 176, '#D9C9A3'],
  [368, 72, 128, '#F1E8D2'],
  [436, 44, 206, '#C9D7D9'],
  [476, 66, 158, '#E9DDBF'],
  [538, 60, 116, '#D9C9A3'],
];
const GROUND = 226;

/** Toronto in ligne-claire: flat colours, uniform black ink lines, roughjs hachure shading. */
export const TintinSkyline: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const ink = theme.ink;
  const cloudX = (frame * 0.6) % 700;
  const boatX = 40 + ((frame * 1.6) % 620);
  const blink = Math.floor(frame / 10) % 2 === 0;
  const water = roughRect(-10, GROUND + 4, W + 20, H - GROUND, {fill: '#2F6F8F', fillStyle: 'hachure', hachureAngle: 0, hachureGap: 9, stroke: 'none', seed: 2, roughness: 1.4});
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#BFDCE5'}}>
      <circle cx={520} cy={58} r={30} fill="#F6D36B" stroke={ink} strokeWidth={3} />
      {[0, 1].map((i) => {
        const x = ((cloudX + i * 330) % 700) - 100;
        return (
          <path
            key={i}
            transform={`translate(${x},${40 + i * 26})`}
            d="M0,20 C0,6 18,2 26,10 C32,-4 58,-4 62,12 C76,8 88,16 84,28 L0,28 Z"
            fill="#FFFFFF"
            stroke={ink}
            strokeWidth={3}
            strokeLinejoin="round"
          />
        );
      })}
      {BUILDINGS.map(([x, w, h, fill], i) => {
        const y = GROUND - h;
        const shade = roughRect(x + w * 0.62, y + 2, w * 0.38 - 2, h - 2, {fill: ink, fillStyle: 'hachure', hachureGap: 5, hachureAngle: 60, stroke: 'none', seed: 30 + i, roughness: 0.9});
        return (
          <g key={i}>
            <rect x={x} y={y} width={w} height={h} fill={fill} stroke={ink} strokeWidth={3} />
            <RoughSvg paths={shade} color={ink} width={1.3} opacity={0.6} />
            {Array.from({length: Math.floor((h - 20) / 22)}).map((_, r) =>
              Array.from({length: Math.floor((w - 10) / 16)}).map((__, c) => {
                const lit = (i * 7 + r * 3 + c * 5 + Math.floor(frame / 20)) % 9 === 0;
                return (
                  <rect key={`${r}-${c}`} x={x + 7 + c * 16} y={y + 12 + r * 22} width={8} height={11} fill={lit ? '#F6D36B' : '#4C6A7A'} stroke={ink} strokeWidth={1.2} />
                );
              }),
            )}
          </g>
        );
      })}
      {/* CN Tower */}
      <g>
        <polygon points="284,226 292,96 300,96 308,226" fill="#F1E8D2" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x={293} y={20} width={6} height={60} fill="#F1E8D2" stroke={ink} strokeWidth={2.5} />
        <ellipse cx={296} cy={96} rx={22} ry={10} fill="#C9D7D9" stroke={ink} strokeWidth={3} />
        <rect x={281} y={82} width={30} height={14} rx={4} fill="#F1E8D2" stroke={ink} strokeWidth={3} />
        <circle cx={296} cy={18} r={5} fill={blink ? theme.accent : '#7A2A1E'} stroke={ink} strokeWidth={2} />
      </g>
      {/* shoreline + lake */}
      <rect x={-5} y={GROUND} width={W + 10} height={8} fill="#9C8C6C" stroke={ink} strokeWidth={3} />
      <rect x={-5} y={GROUND + 8} width={W + 10} height={H - GROUND} fill="#8FBCCB" />
      <RoughSvg paths={water} color="#2F6F8F" width={1.6} opacity={0.6} />
      {/* ferry */}
      <g transform={`translate(${boatX},${GROUND + 34})`}>
        <path d="M-30,0 L30,0 L22,14 L-22,14 Z" fill={theme.accent} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
        <rect x={-14} y={-14} width={24} height={14} fill="#FFFFFF" stroke={ink} strokeWidth={3} />
        <rect x={0} y={-26} width={6} height={12} fill={ink} />
      </g>
      <line x1={0} y1={GROUND + 8} x2={W} y2={GROUND + 8} stroke={ink} strokeWidth={3} />
    </svg>
  );
};
