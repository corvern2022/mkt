import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import type {Theme} from '../theme';

/** LAYER 1 — paper texture + grid. Drifts slowly and independently of everything above it. */
export const Background: React.FC<{theme: Theme}> = ({theme}) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.35) % 120;
  const tintin = theme.name === 'tintin';
  const lightX = 50 + Math.sin(frame / 90) * 12;
  if (theme.name === 'hud') return <HudBackground theme={theme} frame={frame} />;

  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <pattern id="gridMinor" width={24} height={24} patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke={theme.gridMinor} strokeWidth={1} />
          </pattern>
          <pattern id="gridMajor" width={120} height={120} patternUnits="userSpaceOnUse">
            <rect width={120} height={120} fill="url(#gridMinor)" />
            <path d="M120 0H0V120" fill="none" stroke={theme.gridMajor} strokeWidth={1.4} />
          </pattern>
          <filter id="paperNoise" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency={tintin ? 0.8 : 0.95} numOctaves={3} seed={4} />
            <feColorMatrix
              type="matrix"
              values={`0 0 0 0 ${tintin ? 0.45 : 0.35}  0 0 0 0 ${tintin ? 0.38 : 0.3}  0 0 0 0 ${tintin ? 0.28 : 0.25}  0 0 0 ${tintin ? 0.12 : 0.2} 0`}
            />
          </filter>
          <filter id="paperFibers" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves={2} seed={9} />
            <feColorMatrix type="matrix" values="0 0 0 0 0.5  0 0 0 0 0.42  0 0 0 0 0.3  0 0 0 0.07 0" />
          </filter>
          <radialGradient id="vignette" cx={`${lightX}%`} cy="42%" r="75%">
            <stop offset="55%" stopColor="#000" stopOpacity={0} />
            <stop offset="100%" stopColor={tintin ? '#5a4520' : '#2a2018'} stopOpacity={tintin ? 0.16 : 0.22} />
          </radialGradient>
        </defs>
        <g transform={`translate(${-drift},${-drift * 0.5})`}>
          <rect x={0} y={0} width={2160} height={1320} fill="url(#gridMajor)" />
        </g>
        <rect width={1920} height={1080} filter="url(#paperNoise)" />
        <rect width={1920} height={1080} filter="url(#paperFibers)" />
        <rect width={1920} height={1080} fill="url(#vignette)" />
      </svg>
    </AbsoluteFill>
  );
};

/** hud: dark blueprint — fine cyan grid, slow radar sweep, concentric range rings, scanlines. */
const HudBackground: React.FC<{theme: Theme; frame: number}> = ({theme, frame}) => {
  const drift = (frame * 0.25) % 96;
  const sweep = (frame * 0.9) % 360;
  return (
    <AbsoluteFill style={{backgroundColor: theme.bg}}>
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <pattern id="hudMinor" width={24} height={24} patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke={theme.gridMinor} strokeWidth={1} />
          </pattern>
          <pattern id="hudMajor" width={96} height={96} patternUnits="userSpaceOnUse">
            <rect width={96} height={96} fill="url(#hudMinor)" />
            <path d="M96 0H0V96" fill="none" stroke={theme.gridMajor} strokeWidth={1.2} />
          </pattern>
          <radialGradient id="hudGlow" cx="50%" cy="46%" r="70%">
            <stop offset="0%" stopColor="#0E3347" stopOpacity={0.85} />
            <stop offset="100%" stopColor="#030A10" stopOpacity={0.95} />
          </radialGradient>
          <linearGradient id="hudSweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3CD2E6" stopOpacity={0} />
            <stop offset="100%" stopColor="#3CD2E6" stopOpacity={0.14} />
          </linearGradient>
          <pattern id="hudScan" width={4} height={4} patternUnits="userSpaceOnUse">
            <rect width={4} height={1} fill="#000" opacity={0.18} />
          </pattern>
        </defs>
        <rect width={1920} height={1080} fill="url(#hudGlow)" />
        <g transform={`translate(${-drift},${-drift})`}>
          <rect x={0} y={0} width={2016} height={1176} fill="url(#hudMajor)" />
        </g>
        <g transform="translate(960,540)" fill="none" stroke="#3CD2E6" strokeOpacity={0.16}>
          {[300, 500, 700, 900].map((r) => (
            <circle key={r} r={r} strokeWidth={1.2} strokeDasharray={r % 400 === 100 ? '2 10' : undefined} />
          ))}
          <path d="M-1000,0H1000M0,-700V700" strokeWidth={1} strokeDasharray="3 12" />
          <g transform={`rotate(${sweep})`}>
            <path d="M0,0 L900,-170 A915,915 0 0 1 900,170 Z" fill="url(#hudSweep)" stroke="none" />
          </g>
        </g>
        {/* corner ticks */}
        <g stroke="#3CD2E6" strokeOpacity={0.5} strokeWidth={2} fill="none">
          <path d="M28,70V28H70M1850,28H1892V70M28,1010V1052H70M1892,1010V1052H1850" />
        </g>
        <rect width={1920} height={1080} fill="url(#hudScan)" />
      </svg>
    </AbsoluteFill>
  );
};
