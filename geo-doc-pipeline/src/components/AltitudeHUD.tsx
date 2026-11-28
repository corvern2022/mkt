import React from 'react';
import type {Theme} from '../theme';

/** Altimeter that tracks the camera zoom (log scale). */
export const AltitudeHUD: React.FC<{
  theme: Theme;
  altitudeKm: number;
  fromKm: number;
  toKm: number;
  opacity: number;
  frame: number;
}> = ({theme, altitudeKm, fromKm, toKm, opacity, frame}) => {
  const tintin = theme.name === 'tintin';
  const W = 330;
  const H = 300;
  const ladderTop = 92;
  const ladderH = 170;
  const t = Math.log(fromKm / altitudeKm) / Math.log(fromKm / toKm); // 0..1
  const markerY = ladderTop + t * ladderH;
  const ticks = [400, 300, 200, 150, 100, 75, 50];
  const font = tintin ? theme.labelFont : theme.displayFont;
  const blink = Math.floor(frame / 12) % 2 === 0;

  return (
    <div
      style={{
        position: 'absolute',
        right: 64,
        top: 56,
        width: W,
        height: H,
        opacity,
        transform: `translateY(${(1 - opacity) * -30}px)`,
        filter: tintin ? 'none' : theme.paperShadow,
      }}
    >
      <svg width={W + 12} height={H + 12} style={{overflow: 'visible'}}>
        {tintin ? (
          <>
            <rect x={9} y={9} width={W} height={H} fill={theme.ink} />
            <rect x={0} y={0} width={W} height={H} fill="#FFF6D5" stroke={theme.ink} strokeWidth={4} />
          </>
        ) : (
          <rect x={0} y={0} width={W} height={H} rx={theme.name === 'hud' ? 6 : 22} fill={theme.cardBg} stroke={theme.name === 'hud' ? 'rgba(60,220,240,0.65)' : 'none'} strokeWidth={1.5} />
        )}
        <text x={24} y={46} fontFamily={font} fontSize={tintin ? 30 : 22} fontWeight={800} letterSpacing={3} fill={theme.ink}>
          ALTITUDE
        </text>
        <circle cx={W - 34} cy={36} r={7} fill={theme.accent} opacity={blink ? 1 : 0.25} />
        <text x={W - 50} y={43} fontFamily={theme.monoFont} fontSize={17} textAnchor="end" fill={theme.ink} opacity={0.7}>
          REC
        </text>
        {/* ladder */}
        <line x1={44} y1={ladderTop} x2={44} y2={ladderTop + ladderH} stroke={theme.ink} strokeWidth={tintin ? 3 : 2} opacity={tintin ? 1 : 0.4} />
        {ticks.map((km) => {
          const ty = ladderTop + (Math.log(fromKm / km) / Math.log(fromKm / toKm)) * ladderH;
          return (
            <g key={km}>
              <line x1={36} x2={54} y1={ty} y2={ty} stroke={theme.ink} strokeWidth={2} opacity={tintin ? 1 : 0.45} />
              <text x={62} y={ty + 6} fontFamily={theme.monoFont} fontSize={15} fill={theme.ink} opacity={0.65}>
                {km}
              </text>
            </g>
          );
        })}
        <polygon
          points={`${26},${markerY - 10} ${44},${markerY} ${26},${markerY + 10}`}
          fill={theme.accent}
          stroke={tintin ? theme.ink : 'none'}
          strokeWidth={2}
        />
        <text
          x={W - 24}
          y={ladderTop + 92}
          textAnchor="end"
          fontFamily={theme.monoFont}
          fontWeight={700}
          fontSize={64}
          fill={theme.ink}
        >
          {Math.round(altitudeKm)}
        </text>
        <text x={W - 24} y={ladderTop + 128} textAnchor="end" fontFamily={font} fontSize={tintin ? 30 : 22} fontWeight={800} fill={theme.accent} letterSpacing={2}>
          KM ▼
        </text>
        <text x={W - 24} y={ladderTop + 176} textAnchor="end" fontFamily={theme.monoFont} fontSize={15} fill={theme.ink} opacity={0.55}>
          56°N 106°W
        </text>
      </svg>
    </div>
  );
};
