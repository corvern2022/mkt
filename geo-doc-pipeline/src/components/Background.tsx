import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import type {Theme} from '../theme';

/** LAYER 1 — paper texture + grid. Drifts slowly and independently of everything above it. */
export const Background: React.FC<{theme: Theme}> = ({theme}) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.35) % 120;
  const tintin = theme.name === 'tintin';
  const lightX = 50 + Math.sin(frame / 90) * 12;

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
