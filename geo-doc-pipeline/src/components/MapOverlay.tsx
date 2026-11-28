import React from 'react';
import type {Theme} from '../theme';
import {CITIES, cityXY} from '../geo';
import {Cam, toScreen} from '../util';

/** Screen-space text label that sticks to a base-space map point but keeps its size. */
export const MapLabel: React.FC<{
  theme: Theme;
  cam: Cam;
  at: [number, number];
  text: string;
  size: number;
  opacity?: number;
  italic?: boolean;
  color?: string;
  spacing?: number;
  weight?: number;
}> = ({theme, cam, at, text, size, opacity = 1, italic, color, spacing = 6, weight = 800}) => {
  const [x, y] = toScreen(cam, at);
  const tintin = theme.name === 'tintin';
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily={tintin ? theme.labelFont : theme.displayFont}
      fontWeight={weight}
      fontStyle={italic ? 'italic' : undefined}
      fontSize={size}
      letterSpacing={spacing}
      fill={color ?? theme.ink}
      opacity={opacity}
      stroke={tintin ? '#FFFDF6' : 'rgba(255,255,255,0.0)'}
      strokeWidth={tintin ? size * 0.16 : 0}
      paintOrder="stroke"
      strokeLinejoin="round"
    >
      {text}
    </text>
  );
};

/** City markers: ink dots (tintin) or dropped 3D pins (paper3d). `appear` gives 0..1 spring per city. */
export const CityPins: React.FC<{theme: Theme; cam: Cam; appear: (i: number, x: number) => number}> = ({theme, cam, appear}) => {
  const tintin = theme.name === 'tintin';
  return (
    <g>
      {CITIES.map((c, i) => {
        const base = cityXY(c);
        const s = appear(i, base[0]);
        if (s <= 0.001) return null;
        const [x, y] = toScreen(cam, base);
        const r = c.big ? 11 : 8;
        const labelSize = c.big ? 30 : 24;
        if (tintin) {
          return (
            <g key={c.name} transform={`translate(${x},${y}) scale(${s})`}>
              <circle r={r + 2} fill="#FFFDF6" stroke={theme.ink} strokeWidth={3.5} />
              <circle r={r - 3} fill={theme.ink} />
              {c.big && (
                <text
                  x={c.dx ?? 0}
                  y={c.dy ?? -24}
                  textAnchor="middle"
                  fontFamily={theme.labelFont}
                  fontSize={labelSize}
                  fill={theme.ink}
                  stroke="#FFFDF6"
                  strokeWidth={6}
                  paintOrder="stroke"
                >
                  {c.name.toUpperCase()}
                </text>
              )}
            </g>
          );
        }
        const drop = (1 - Math.min(1, s)) * -60;
        return (
          <g key={c.name} transform={`translate(${x},${y})`}>
            <ellipse cx={0} cy={2} rx={10 * Math.min(1, s)} ry={4 * Math.min(1, s)} fill="rgba(40,20,20,0.35)" />
            <g transform={`translate(0,${drop}) scale(${c.big ? 1.15 : 0.9})`} style={{filter: theme.paperShadowSoft}} opacity={Math.min(1, s * 3)}>
              <path d="M0,0 C-4,-14 -15,-20 -15,-33 A15,15 0 1 1 15,-33 C15,-20 4,-14 0,0Z" fill={theme.accent} />
              <path d="M0,0 C-4,-14 -15,-20 -15,-33 A15,15 0 0 1 0,-48 L0,0Z" fill={theme.accentDark} opacity={0.35} />
              <circle cx={0} cy={-33} r={6} fill="#FFFFFF" />
            </g>
            {c.big && (
              <g opacity={Math.min(1, s)} transform={`translate(${c.dx ?? 0},${(c.dy ?? -24) + (c.dy && c.dy > 0 ? 0 : -42)})`}>
                <text
                  textAnchor="middle"
                  fontFamily={theme.displayFont}
                  fontWeight={800}
                  fontSize={22}
                  letterSpacing={2}
                  fill={theme.ink}
                  stroke={theme.halo}
                  strokeWidth={6}
                  paintOrder="stroke"
                >
                  {c.name.toUpperCase()}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Pop-up stat badge (screen space, HTML). */
export const StatBadge: React.FC<{
  theme: Theme;
  x: number;
  y: number;
  s: number;
  big: string;
  small: string;
  tilt?: number;
  accent?: boolean;
}> = ({theme, x, y, s, big, small, tilt = -3, accent}) => {
  if (s <= 0.001) return null;
  const tintin = theme.name === 'tintin';
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transformOrigin: 'left center',
        transform: tintin
          ? `scale(${s}) rotate(${tilt * (2 - s)}deg)`
          : `translateY(${(1 - s) * 40}px) scale(${0.85 + 0.15 * s})`,
        opacity: Math.min(1, s * 2),
        filter: tintin ? 'none' : theme.paperShadow,
      }}
    >
      <div
        style={{
          padding: tintin ? '12px 26px 14px' : '18px 30px 20px',
          background: tintin ? (accent ? theme.accent : '#FFF6D5') : accent ? theme.accent : theme.cardBg,
          border: tintin ? `4px solid ${theme.ink}` : 'none',
          boxShadow: tintin ? `8px 8px 0 ${theme.ink}` : 'none',
          borderRadius: tintin ? 3 : 20,
          color: accent ? '#FFFFFF' : theme.ink,
        }}
      >
        <div
          style={{
            fontFamily: tintin ? theme.displayFont : theme.displayFont,
            fontWeight: 800,
            fontSize: tintin ? 64 : 54,
            lineHeight: 1,
            letterSpacing: tintin ? 2 : -1,
          }}
        >
          {big}
        </div>
        <div
          style={{
            fontFamily: tintin ? theme.labelFont : theme.displayFont,
            fontWeight: 700,
            fontSize: tintin ? 28 : 20,
            marginTop: 6,
            letterSpacing: 2,
            opacity: 0.85,
          }}
        >
          {small}
        </div>
      </div>
    </div>
  );
};
