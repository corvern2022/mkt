import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import {pop, prog} from '../util';
import {cardStyle, isHud, isTintin, labelFont} from '../components/ui';

/** Silent chapter divider: big chapter number, title, Korean subtitle line, animated rule. */
export const ChapterCard: React.FC<SceneProps> = ({scene, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const hud = isHud(theme);
  const numS = pop(frame, fps, 2, {damping: 10});
  const titleS = pop(frame, fps, 8, {damping: 13});
  const rule = prog(frame, 12, 18, Easing.out(Easing.cubic));
  const koS = prog(frame, 18, 12);
  const out = 1 - prog(frame, scene.durationFrames - 10, 10);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', opacity: out}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 56}}>
        <div
          style={{
            ...cardStyle(theme, 36),
            width: 260,
            height: 260,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: tintin ? `scale(${numS}) rotate(${(1 - numS) * -10}deg)` : `scale(${0.7 + 0.3 * numS})`,
            opacity: Math.min(1, numS * 2),
            background: tintin ? theme.accent : hud ? theme.cardBg : theme.accent,
          }}
        >
          <div
            style={{
              fontFamily: hud ? theme.monoFont : theme.displayFont,
              fontWeight: 800,
              fontSize: 150,
              lineHeight: 1,
              color: hud ? theme.accent : '#FFFFFF',
              WebkitTextStroke: tintin ? `4px ${theme.ink}` : undefined,
            }}
          >
            {p.number}
          </div>
        </div>
        <div style={{transform: `translateX(${(1 - titleS) * 60}px)`, opacity: Math.min(1, titleS * 2)}}>
          <div style={{fontFamily: labelFont(theme), fontWeight: 800, fontSize: tintin ? 40 : 28, letterSpacing: 10, color: theme.accent}}>
            {p.kicker ?? 'CHAPTER'}
          </div>
          <div style={{fontFamily: theme.displayFont, fontWeight: 800, fontSize: tintin ? 120 : 104, lineHeight: 1.02, color: theme.ink, letterSpacing: tintin ? 2 : -2, marginTop: 6}}>
            {p.title}
          </div>
          <div style={{height: 10, width: 560 * rule, background: theme.accent, borderRadius: tintin ? 0 : 5, marginTop: 18, boxShadow: hud ? '0 0 14px rgba(255,122,26,0.6)' : undefined}} />
          {p.titleKo && (
            <div style={{fontFamily: theme.koFont, fontWeight: 700, fontSize: 46, color: theme.ink, opacity: 0.8 * koS, marginTop: 18}}>{p.titleKo}</div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
