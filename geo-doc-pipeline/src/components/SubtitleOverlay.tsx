import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import type {Theme} from '../theme';
import type {SubtitleMode, Timeline} from '../types';
import {clamp01} from '../util';

interface Cue {
  start: number; // frames (global)
  end: number;
  en: string;
  ko: string;
}

/** Builds global-frame subtitle cues from timeline.json. */
export const buildCues = (tl: Timeline): Cue[] => {
  const out: Cue[] = [];
  for (const s of tl.scenes) {
    if (s.lines.length === 0 && s.params?.subtitleKo) {
      out.push({start: s.startFrame + 10, end: s.startFrame + s.durationFrames - 8, en: tl.title, ko: s.params.subtitleKo});
    }
    s.lines.forEach((l, i) => {
      const base = s.startFrame + s.leadInFrames;
      const isLast = i === s.lines.length - 1;
      out.push({
        start: base + Math.round(l.start * tl.fps) - 3,
        end: isLast ? s.startFrame + s.durationFrames - 6 : base + Math.round(l.end * tl.fps),
        en: l.en,
        ko: l.ko,
      });
    });
  }
  return out;
};

/** LAYER 3 (top) — burned-in review subtitles. */
export const SubtitleOverlay: React.FC<{theme: Theme; mode: SubtitleMode; timeline: Timeline}> = ({
  theme,
  mode,
  timeline,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (mode === 'none') return null;
  const cues = buildCues(timeline);
  const cue = cues.find((c) => frame >= c.start && frame < c.end);
  if (!cue) return null;
  const inT = clamp01((frame - cue.start) / (0.18 * fps));
  const outT = clamp01((cue.end - frame) / (0.15 * fps));
  const o = Math.min(inT, outT);
  const tintin = theme.name === 'tintin';
  const showKo = mode === 'ko' || mode === 'both';
  const showEn = mode === 'en' || mode === 'both';

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 48,
        display: 'flex',
        justifyContent: 'center',
        opacity: o,
        transform: `translateY(${(1 - inT) * 14}px)`,
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          padding: tintin ? '14px 34px 16px' : '16px 40px 18px',
          background: tintin ? '#FFF6D5' : 'rgba(34,36,42,0.86)',
          border: tintin ? `4px solid ${theme.ink}` : 'none',
          boxShadow: tintin ? `7px 7px 0 ${theme.ink}` : '0 10px 30px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.2)',
          borderRadius: tintin ? 4 : 18,
          textAlign: 'center',
        }}
      >
        {showKo && (
          <div
            style={{
              fontFamily: theme.koFont,
              fontWeight: 700,
              fontSize: 44,
              lineHeight: 1.3,
              color: tintin ? theme.ink : '#FFFFFF',
              letterSpacing: -0.5,
            }}
          >
            {cue.ko}
          </div>
        )}
        {showEn && (
          <div
            style={{
              fontFamily: tintin ? theme.labelFont : theme.displayFont,
              fontWeight: 600,
              fontSize: showKo ? 30 : 42,
              lineHeight: 1.3,
              marginTop: showKo ? 4 : 0,
              color: tintin ? theme.ink : 'rgba(255,255,255,0.85)',
              opacity: showKo ? 0.8 : 1,
            }}
          >
            {cue.en}
          </div>
        )}
      </div>
    </div>
  );
};
