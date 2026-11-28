import React from 'react';
import type {Theme} from '../../theme';

const W = 600;
const H = 290;
const SH1 = 'drop-shadow(0px 2px 1.5px rgba(30,40,50,0.28)) drop-shadow(0px 6px 8px rgba(30,40,50,0.18))';
const SH2 = 'drop-shadow(0px 3px 2px rgba(30,40,50,0.32)) drop-shadow(0px 10px 14px rgba(30,40,50,0.22))';

const tree = (x: number, y: number, s: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 4; i++) {
    const w = (30 - i * 6) * s;
    const yy = y - i * 18 * s;
    pts.push(`M${x - w},${yy} L${x + w},${yy} L${x},${yy - 32 * s} Z`);
  }
  pts.push(`M${x - 3 * s},${y} h${6 * s} v${10 * s} h${-6 * s} Z`);
  return pts.join('');
};

/** The empty north as a paper diorama: slate mountains, white snow sheets, stacked spruce, paper snowflakes. */
export const PaperNorth: React.FC<{theme: Theme; frame: number}> = ({frame}) => {
  const par = (d: number) => Math.sin(frame / 55) * d;
  const back = [
    [40, 210, 0.9],
    [86, 200, 0.7],
    [470, 196, 0.8],
    [520, 206, 0.65],
  ];
  const front = [
    [24, 262, 1.25],
    [80, 270, 1.0],
    [136, 258, 1.35],
    [520, 266, 1.2],
    [574, 256, 1.4],
  ];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{display: 'block', background: '#DCE2E8'}}>
      <g style={{filter: SH1}}>
        <circle cx={110 + par(3)} cy={60} r={26} fill="#F7F3EA" />
      </g>
      <g style={{filter: SH1}} transform={`translate(${par(3)},0)`}>
        <path d="M-20,210 L90,90 L170,160 L280,46 L400,170 L480,100 L620,210 Z" fill="#9AA7B4" />
        <path d="M255,72 L280,46 L306,74 L292,70 L280,82 L268,70 Z M74,108 L90,90 L108,108 L98,104 L90,112 Z M466,114 L480,100 L494,114 Z" fill="#F7F9FA" />
      </g>
      <g style={{filter: SH2}} transform={`translate(${par(6)},0)`}>
        <path d="M-20,230 Q120,170 260,214 T620,196 V300 H-20 Z" fill="#C9D2DA" />
        <path d={back.map(([x, y, s]) => tree(x, y, s)).join('')} fill="#5E7872" />
      </g>
      <g style={{filter: SH2}} transform={`translate(${par(9)},0)`}>
        <path d="M-20,250 Q160,214 320,244 T620,236 V300 H-20 Z" fill="#F8F9F9" />
        <ellipse cx={330} cy={258} rx={110} ry={16} fill="#B9D3E0" />
        <ellipse cx={330} cy={256} rx={80} ry={9} fill="#D3E5EE" />
      </g>
      <g style={{filter: SH2}} transform={`translate(${par(12)},0)`}>
        <path d={front.map(([x, y, s]) => tree(x, y, s)).join('')} fill="#3F5A55" />
      </g>
      <g style={{filter: SH1}}>
        {Array.from({length: 26}).map((_, i) => {
          const sx = (i * 89) % W;
          const sp = 0.6 + ((i * 31) % 10) / 12;
          const y = ((frame * sp * 1.3 + i * 47) % (H + 20)) - 10;
          const x = sx + Math.sin((frame + i * 17) / 20) * 7;
          return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill="#FFFFFF" />;
        })}
      </g>
    </svg>
  );
};
