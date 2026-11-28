import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Theme} from '../theme';
import {prog, pop} from '../util';

/**
 * Wraps a scene with an entrance and/or exit transition.
 * tintin  → classic cartoon iris (ink black) in/out.
 * paper3d → sheet of paper slides up (in) / lifts away (out).
 * hud     → cyan radar scan line wipes the scene in / out.
 */
export const SceneTransition: React.FC<{
  theme: Theme;
  duration: number;
  enter?: boolean;
  exit?: boolean;
  frames?: number;
  children: React.ReactNode;
}> = ({theme, duration, enter, exit, frames = 14, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const inT = enter ? prog(frame, 0, frames, Easing.out(Easing.cubic)) : 1;
  const outT = exit ? 1 - prog(frame, duration - frames, frames, Easing.in(Easing.cubic)) : 1;

  if (theme.name === 'tintin') {
    const t = Math.min(inT, outT);
    if (t >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
    const r = 1150 * t;
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{background: theme.ink}} />
        <AbsoluteFill style={{clipPath: `circle(${r}px at 50% 50%)`}}>
          <AbsoluteFill style={{background: theme.bg}} />
          {children}
        </AbsoluteFill>
        <svg width={1920} height={1080} style={{position: 'absolute'}}>
          <circle cx={960} cy={540} r={r} fill="none" stroke={theme.ink} strokeWidth={10} />
        </svg>
      </AbsoluteFill>
    );
  }

  if (theme.name === 'hud') {
    // radar-scan wipe: a cyan scan line sweeps across and reveals / conceals the scene
    const t = Math.min(inT, outT);
    if (t >= 1) return <AbsoluteFill>{children}</AbsoluteFill>;
    const x = 1920 * t;
    const revealing = inT <= outT;
    const clip = revealing ? `inset(0 ${1920 - x}px 0 0)` : `inset(0 0 0 ${1920 - x}px)`;
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{clipPath: clip}}>{children}</AbsoluteFill>
        <svg width={1920} height={1080} style={{position: 'absolute'}}>
          <line x1={revealing ? x : 1920 - x} x2={revealing ? x : 1920 - x} y1={0} y2={1080} stroke="#9AF3FF" strokeWidth={4} opacity={0.9} />
          <line x1={revealing ? x : 1920 - x} x2={revealing ? x : 1920 - x} y1={0} y2={1080} stroke="#3CD2E6" strokeWidth={22} opacity={0.18} />
        </svg>
      </AbsoluteFill>
    );
  }

  const s = enter ? pop(frame, fps, 0, {damping: 17, stiffness: 95, mass: 1}) : 1;
  const ty = (1 - s) * 1100 + (1 - outT) * -140;
  const sc = 1 - (1 - outT) * 0.06;
  return (
    <AbsoluteFill
      style={{
        transform: `translateY(${ty}px) scale(${sc})`,
        opacity: outT,
        boxShadow: s < 0.999 ? '0 -30px 60px rgba(40,30,20,0.35)' : undefined,
        background: s < 0.999 ? theme.bg : undefined,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
