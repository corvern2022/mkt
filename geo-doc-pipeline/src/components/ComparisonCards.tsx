import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {Theme} from '../theme';
import {pop} from '../util';
import {TintinSkyline} from './illustrations/TintinSkyline';
import {TintinNorth} from './illustrations/TintinNorth';
import {PaperSkyline} from './illustrations/PaperSkyline';
import {PaperNorth} from './illustrations/PaperNorth';
import {HudSkyline} from './illustrations/HudSkyline';
import {HudNorth} from './illustrations/HudNorth';

const X = 1218;
const W = 640;
const H = 400;
const TOPS = [64, 510];
export const ILLU_W = 600;
export const ILLU_H = 290;

interface CardInfo {
  title: string;
  sub?: string;
}

const Card: React.FC<{theme: Theme; s: number; y: number; info: CardInfo; tag: string; tagColor: string; children: React.ReactNode; tilt: number}> = ({
  theme,
  s,
  y,
  info,
  tag,
  tagColor,
  children,
  tilt,
}) => {
  if (s <= 0.001) return null;
  const tintin = theme.name === 'tintin';
  return (
    <div
      style={{
        position: 'absolute',
        left: X,
        top: y,
        width: W,
        height: H,
        transformOrigin: '50% 60%',
        transform: tintin
          ? `scale(${0.3 + 0.7 * s}) rotate(${tilt * (1.6 - 0.6 * s)}deg)`
          : `translateY(${(1 - s) * 80}px) scale(${0.88 + 0.12 * s})`,
        opacity: Math.min(1, s * 2.5),
        filter: tintin ? 'none' : theme.paperShadow,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: theme.cardBg,
          border: tintin ? `6px solid ${theme.ink}` : theme.name === 'hud' ? '1.5px solid rgba(60,220,240,0.65)' : 'none',
          boxShadow: tintin ? `11px 11px 0 ${theme.ink}` : 'none',
          borderRadius: tintin ? 2 : theme.name === 'hud' ? 8 : 26,
          overflow: 'hidden',
        }}
      >
        <div style={{position: 'absolute', left: 20, top: 92, width: ILLU_W, height: ILLU_H, borderRadius: tintin ? 0 : 16, overflow: 'hidden', border: tintin ? `4px solid ${theme.ink}` : 'none', boxSizing: 'border-box'}}>
          {children}
        </div>
        <div style={{position: 'absolute', left: 22, top: 14, right: 20, display: 'flex', alignItems: 'center', gap: 14}}>
          <div
            style={{
              fontFamily: theme.displayFont,
              fontWeight: 800,
              fontSize: tintin ? 46 : 34,
              color: theme.ink,
              letterSpacing: tintin ? 2 : 0.5,
              lineHeight: 1,
            }}
          >
            {info.title}
          </div>
          <div
            style={{
              marginLeft: 'auto',
              padding: tintin ? '2px 12px 4px' : '6px 14px',
              background: tagColor,
              color: '#FFFFFF',
              fontFamily: tintin ? theme.labelFont : theme.displayFont,
              fontWeight: 800,
              fontSize: tintin ? 26 : 18,
              letterSpacing: 2,
              border: tintin ? `3px solid ${theme.ink}` : 'none',
              borderRadius: tintin ? 2 : 999,
            }}
          >
            {tag}
          </div>
        </div>
        {info.sub && (
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 60,
              fontFamily: tintin ? theme.labelFont : theme.displayFont,
              fontWeight: 600,
              fontSize: tintin ? 24 : 17,
              letterSpacing: 3,
              color: theme.ink,
              opacity: 0.6,
            }}
          >
            {info.sub}
          </div>
        )}
      </div>
    </div>
  );
};

/** Right-hand comparison cards (city strip vs empty north), each a theme-specific SVG illustration. */
export const ComparisonCards: React.FC<{theme: Theme; topAt: number; bottomAt: number; top: CardInfo; bottom: CardInfo}> = ({
  theme,
  topAt,
  bottomAt,
  top,
  bottom,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s1 = pop(frame, fps, topAt, {damping: 10, stiffness: 120});
  const s2 = pop(frame, fps, bottomAt, {damping: 10, stiffness: 120});
  const tintin = theme.name === 'tintin';
  const hud = theme.name === 'hud';
  const f1 = frame - topAt;
  const f2 = frame - bottomAt;
  return (
    <>
      <Card theme={theme} s={s1} y={TOPS[0]} info={top} tag="70%+" tagColor={theme.accent} tilt={-2.5}>
        {tintin ? <TintinSkyline theme={theme} frame={f1} /> : hud ? <HudSkyline theme={theme} frame={f1} /> : <PaperSkyline theme={theme} frame={f1} />}
      </Card>
      <Card theme={theme} s={s2} y={TOPS[1]} info={bottom} tag="< 30%" tagColor={theme.tagMuted} tilt={2}>
        {tintin ? <TintinNorth theme={theme} frame={f2} /> : hud ? <HudNorth theme={theme} frame={f2} /> : <PaperNorth theme={theme} frame={f2} />}
      </Card>
    </>
  );
};
