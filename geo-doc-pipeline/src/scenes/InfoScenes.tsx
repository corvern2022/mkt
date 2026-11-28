import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import type {Theme} from '../theme';
import {lerp, pop, prog} from '../util';
import {cardStyle, isHud, isTintin, labelFont} from '../components/ui';

const Heading: React.FC<{theme: Theme; text?: string; sub?: string; frame: number}> = ({theme, text, sub, frame}) => {
  if (!text) return null;
  const t = prog(frame, 2, 14, Easing.out(Easing.cubic));
  const tintin = isTintin(theme);
  return (
    <div style={{position: 'absolute', top: 70, left: 0, right: 0, textAlign: 'center', opacity: t, transform: `translateY(${(1 - t) * -30}px)`}}>
      <div style={{fontFamily: theme.displayFont, fontWeight: 800, fontSize: tintin ? 76 : 62, color: theme.ink, letterSpacing: tintin ? 2 : -1}}>{text}</div>
      {sub && <div style={{fontFamily: labelFont(theme), fontWeight: 700, fontSize: tintin ? 30 : 22, letterSpacing: 5, color: theme.accent, marginTop: 6}}>{sub}</div>}
    </div>
  );
};

const Footnote: React.FC<{theme: Theme; text?: string}> = ({theme, text}) =>
  text ? (
    <div style={{position: 'absolute', right: 70, bottom: 150, fontFamily: theme.monoFont, fontSize: 18, color: theme.ink, opacity: 0.55}}>{text}</div>
  ) : null;

const countText = (v: number, decimals = 0) => v.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals});

/** Two side-by-side fact cards (e.g. Nunavut vs Mexico). params.left/right = {title, sub, rows:[{label, value}], at}. */
export const StatCompareScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const side = (s: any, x: number, i: number) => {
    const start = s.at ? cue(s.at) : 6 + i * 10;
    const k = pop(frame, fps, start, {damping: 12});
    if (k <= 0.001) return null;
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: x,
          top: 250,
          width: 720,
          ...cardStyle(theme, 30),
          padding: '34px 44px 38px',
          transform: tintin ? `scale(${0.4 + 0.6 * k}) rotate(${(i ? 2 : -2) * (1.5 - 0.5 * k)}deg)` : `translateY(${(1 - k) * 90}px)`,
          opacity: Math.min(1, k * 2.5),
          boxSizing: 'border-box',
        }}
      >
        <div style={{display: 'flex', alignItems: 'baseline', gap: 16}}>
          <div style={{fontFamily: theme.displayFont, fontWeight: 800, fontSize: tintin ? 72 : 60, color: s.accent ? theme.accent : theme.ink, lineHeight: 1}}>{s.title}</div>
        </div>
        {s.sub && <div style={{fontFamily: labelFont(theme), fontWeight: 700, fontSize: tintin ? 28 : 21, letterSpacing: 4, color: theme.ink, opacity: 0.6, marginTop: 8}}>{s.sub}</div>}
        <div style={{height: 4, background: theme.ink, opacity: 0.15, margin: '22px 0 10px'}} />
        {(s.rows ?? []).map((r: any, j: number) => {
          const rs = pop(frame, fps, (r.at ? cue(r.at) : start + 8 + j * 7), {damping: 14});
          return (
            <div key={j} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', opacity: Math.min(1, rs * 2), transform: `translateX(${(1 - rs) * 30}px)`}}>
              <div style={{fontFamily: labelFont(theme), fontWeight: 700, fontSize: tintin ? 34 : 26, letterSpacing: 3, color: theme.ink, opacity: 0.75}}>{r.label}</div>
              <div style={{fontFamily: isHud(theme) ? theme.monoFont : theme.displayFont, fontWeight: 800, fontSize: tintin ? 64 : 54, color: r.accent ? theme.accent : theme.ink}}>{r.value}</div>
            </div>
          );
        })}
      </div>
    );
  };
  const vs = pop(frame, fps, (p.left?.at ? cue(p.left.at) : 6) + 6);
  return (
    <AbsoluteFill>
      <Heading theme={theme} text={p.heading} sub={p.sub} frame={frame} />
      {side(p.left, 150, 0)}
      {side(p.right, 1050, 1)}
      <div
        style={{
          position: 'absolute',
          left: 960 - 60,
          top: 470,
          width: 120,
          height: 120,
          borderRadius: tintin ? 4 : 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: theme.accent,
          color: '#FFFFFF',
          fontFamily: theme.displayFont,
          fontWeight: 800,
          fontSize: 48,
          border: tintin ? `5px solid ${theme.ink}` : undefined,
          transform: `scale(${vs}) rotate(${(1 - vs) * 40}deg)`,
          boxShadow: isHud(theme) ? '0 0 24px rgba(255,122,26,0.5)' : undefined,
        }}
      >
        VS
      </div>
      <Footnote theme={theme} text={p.footnote} />
    </AbsoluteFill>
  );
};

/** Horizontal bar chart. params.bars = [{label, value, highlight?}], unit, at, max. */
export const BarCompareScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const hud = isHud(theme);
  const bars: any[] = p.bars ?? [];
  const max = p.max ?? Math.max(...bars.map((b) => b.value));
  const start = p.at ? cue(p.at) : 8;
  const rowH = Math.min(78, 640 / bars.length);
  const W = 1100;
  return (
    <AbsoluteFill>
      <Heading theme={theme} text={p.heading} sub={p.sub} frame={frame} />
      <div style={{position: 'absolute', left: 170, top: 250, width: 1580, ...cardStyle(theme, 30), padding: '30px 40px', boxSizing: 'border-box', opacity: prog(frame, 0, 10)}}>
        {bars.map((b, i) => {
          const hl = b.highlight || (p.highlightAt && frame >= cue(p.highlightAt) && b.hl2);
          const t = prog(frame, start + i * 4, Math.round(0.8 * fps), Easing.out(Easing.cubic));
          const w = (W * b.value * t) / max;
          const color = hl ? theme.accent : tintin ? '#6F8FA3' : hud ? '#2E7C8C' : '#8C98A4';
          return (
            <div key={b.label} style={{display: 'flex', alignItems: 'center', height: rowH}}>
              <div style={{width: 300, fontFamily: labelFont(theme), fontWeight: 800, fontSize: tintin ? 32 : 24, letterSpacing: 2, color: theme.ink, opacity: hl ? 1 : 0.75}}>{b.label}</div>
              <div style={{position: 'relative', height: rowH * 0.62, width: Math.max(2, w), background: color, borderRadius: tintin ? 0 : hud ? 3 : rowH, border: tintin ? `3px solid ${theme.ink}` : undefined, boxShadow: hud && hl ? '0 0 16px rgba(255,122,26,0.55)' : undefined}} />
              <div style={{marginLeft: 16, fontFamily: hud ? theme.monoFont : theme.displayFont, fontWeight: 800, fontSize: tintin ? 34 : 28, color: hl ? theme.accent : theme.ink, opacity: t}}>
                {countText(b.value * t, b.value < 1 ? 1 : p.decimals ?? 0)}
                {p.unit ?? '%'}
              </div>
            </div>
          );
        })}
      </div>
      {p.callout && (
        <div
          style={{
            position: 'absolute',
            right: 120,
            top: 470,
            ...cardStyle(theme, 24),
            background: theme.accent,
            color: '#FFFFFF',
            padding: '18px 30px',
            fontFamily: theme.displayFont,
            fontWeight: 800,
            fontSize: tintin ? 50 : 40,
            transform: `scale(${pop(frame, fps, cue(p.callout.at))}) rotate(${tintin ? -3 : 0}deg)`,
          }}
        >
          {p.callout.text}
        </div>
      )}
      <Footnote theme={theme} text={p.footnote} />
    </AbsoluteFill>
  );
};

/** Big count-up number + 10×10 waffle grid filling to `value` percent. */
export const WaffleStatScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const hud = isHud(theme);
  const start = p.at ? cue(p.at) : 10;
  const t = prog(frame, start, Math.round(1.4 * fps), Easing.out(Easing.cubic));
  const v = lerp(0, p.value, t);
  const numS = pop(frame, fps, start - 4, {damping: 12});
  const cell = 52;
  const gap = 8;
  const grid = Array.from({length: 100});
  const filled = Math.round(v);
  const off = tintin ? '#E7DDC2' : hud ? '#0D2C3C' : '#D9D4CB';
  return (
    <AbsoluteFill>
      <Heading theme={theme} text={p.heading} sub={p.sub} frame={frame} />
      <div style={{position: 'absolute', left: 170, top: 300, width: 760, transform: `scale(${0.8 + 0.2 * numS})`, transformOrigin: 'left center', opacity: Math.min(1, numS * 2)}}>
        <div style={{fontFamily: hud ? theme.monoFont : theme.displayFont, fontWeight: 800, fontSize: 260, lineHeight: 1, color: theme.accent, letterSpacing: -6, WebkitTextStroke: tintin ? `5px ${theme.ink}` : undefined}}>
          {p.prefix ?? ''}
          {countText(v, p.decimals ?? 0)}
          {p.suffix ?? '%'}
        </div>
        <div style={{fontFamily: theme.displayFont, fontWeight: 800, fontSize: tintin ? 54 : 44, color: theme.ink, marginTop: 14, lineHeight: 1.1}}>{p.label}</div>
        {p.note && <div style={{fontFamily: labelFont(theme), fontWeight: 700, fontSize: tintin ? 30 : 22, letterSpacing: 3, color: theme.ink, opacity: 0.6, marginTop: 16}}>{p.note}</div>}
      </div>
      <div style={{position: 'absolute', left: 1080, top: 250, ...cardStyle(theme, 28), padding: 28, opacity: prog(frame, 4, 12)}}>
        <svg width={10 * cell + 9 * gap} height={10 * cell + 9 * gap}>
          {grid.map((_, i) => {
            const r = Math.floor(i / 10);
            const c = i % 10;
            const on = i < filled;
            return (
              <rect
                key={i}
                x={c * (cell + gap)}
                y={(9 - r) * (cell + gap)}
                width={cell}
                height={cell}
                rx={tintin ? 0 : hud ? 3 : 10}
                fill={on ? theme.accent : off}
                stroke={tintin ? theme.ink : hud && on ? '#FFB066' : 'none'}
                strokeWidth={tintin ? 2.5 : 1.5}
              />
            );
          })}
        </svg>
      </div>
      <Footnote theme={theme} text={p.footnote} />
    </AbsoluteFill>
  );
};

/** Numbered list of reasons, each popping in on its cue. params.items = [{title, sub, at}], tag. */
export const BulletListScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const hud = isHud(theme);
  const items: any[] = p.items ?? [];
  const top = p.heading ? 260 : 180;
  const rowH = Math.min(190, (860 - top) / items.length);
  return (
    <AbsoluteFill>
      <Heading theme={theme} text={p.heading} sub={p.sub} frame={frame} />
      {items.map((it, i) => {
        const s = pop(frame, fps, it.at ? cue(it.at) : 8 + i * 12, {damping: 13});
        if (s <= 0.001) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 260,
              top: top + i * rowH,
              width: 1400,
              height: rowH - 30,
              display: 'flex',
              alignItems: 'center',
              gap: 34,
              ...cardStyle(theme, 26),
              padding: '0 36px',
              boxSizing: 'border-box',
              transform: `translateX(${(1 - s) * -120}px)`,
              opacity: Math.min(1, s * 2.5),
            }}
          >
            <div
              style={{
                width: rowH - 70,
                height: rowH - 70,
                flex: 'none',
                borderRadius: tintin ? 2 : hud ? 6 : 999,
                background: theme.accent,
                border: tintin ? `4px solid ${theme.ink}` : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: hud ? theme.monoFont : theme.displayFont,
                fontWeight: 800,
                fontSize: (rowH - 70) * 0.55,
              }}
            >
              {it.icon ?? i + 1}
            </div>
            <div>
              <div style={{fontFamily: theme.displayFont, fontWeight: 800, fontSize: tintin ? 58 : 48, color: theme.ink, lineHeight: 1.05}}>{it.title}</div>
              {it.sub && <div style={{fontFamily: labelFont(theme), fontWeight: 700, fontSize: tintin ? 30 : 23, letterSpacing: 3, color: theme.ink, opacity: 0.62, marginTop: 6}}>{it.sub}</div>}
            </div>
          </div>
        );
      })}
      {p.tag && (
        <div
          style={{
            position: 'absolute',
            right: 150,
            top: top - 40,
            ...cardStyle(theme, 20),
            background: theme.accent,
            color: '#FFFFFF',
            padding: '14px 26px',
            fontFamily: theme.displayFont,
            fontWeight: 800,
            fontSize: tintin ? 44 : 36,
            transform: `scale(${pop(frame, fps, cue(p.tag.at))}) rotate(${tintin ? 4 : 0}deg)`,
          }}
        >
          {p.tag.text}
        </div>
      )}
      <Footnote theme={theme} text={p.footnote} />
    </AbsoluteFill>
  );
};
