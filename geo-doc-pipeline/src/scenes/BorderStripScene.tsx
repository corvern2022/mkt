import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import {Cam, lerp, lerpCam, pop, prog, toScreen} from '../util';
import {borderBounds, LABELS, milesToBase, project} from '../geo';
import {MapLayers} from '../components/MapLayers';
import {CityPins, MapLabel} from '../components/MapOverlay';
import {AltitudeHUD} from '../components/AltitudeHUD';
import {ComparisonCards} from '../components/ComparisonCards';
import {roughLine, roughPath} from '../rough';
import {RoughSvg} from '../components/RoughSvg';
import {ZOOM_DRIFT, ZOOM_END} from './MapZoomScene';

const PANEL = {x: 64, y: 64, w: 1100, h: 846};

/** SCENE 2 — map shrinks into a comic panel; red 100-mile strip draws W→E; 70% counter; comparison cards. */
export const BorderStripScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = theme.name === 'tintin';

  // --- camera: continue from scene 1, then fly into the panel ---
  const startCam: Cam = {...ZOOM_END, k: ZOOM_END.k * ZOOM_DRIFT};
  const panelT = pop(frame, fps, 2, {damping: 18, stiffness: 90, mass: 1});
  const rect = {
    x: lerp(0, PANEL.x, panelT),
    y: lerp(0, PANEL.y, panelT),
    w: lerp(1920, PANEL.w, panelT),
    h: lerp(1080, PANEL.h, panelT),
  };
  const panelCam: Cam = {cx: 965, cy: 610, k: 0.66, vx: PANEL.x + PANEL.w / 2, vy: PANEL.y + PANEL.h / 2};
  let cam = lerpCam(startCam, panelCam, Math.min(1, panelT));
  cam = {...cam, vx: rect.x + rect.w / 2, vy: rect.y + rect.h / 2};
  const push = prog(frame, 30, scene.durationFrames - 30, Easing.linear);
  cam.k *= 1 + 0.07 * push;
  cam.cy += 25 * push;

  // --- strip & pins ---
  const stripStart = cue('strip');
  const stripDur = Math.round(2.4 * fps);
  const stripReveal = prog(frame, stripStart, stripDur, Easing.inOut(Easing.quad));
  const bx0 = borderBounds[0][0];
  const bx1 = borderBounds[1][0];
  const appear = (i: number, x: number) => {
    const at = stripStart + stripDur * ((x - bx0) / (bx1 - bx0)) + 4;
    return pop(frame, fps, at, {damping: 9, stiffness: 160});
  };

  // --- "100 MI" dimension marker ---
  const dimT = prog(frame, cue('dim'), 14, Easing.out(Easing.quad));
  const a = toScreen(cam, project([-97.5, 49]));
  const b = toScreen(cam, project([-97.5, 49 + (p.stripMiles ?? 100) * 1.609 / 111.2]));
  const dimLine = roughLine(0, 0, 0, -100, {roughness: 0.8, seed: 3, disableMultiStroke: true});
  const dimLen = Math.hypot(b[0] - a[0], b[1] - a[1]);

  // --- 70% counter ---
  const counterS = pop(frame, fps, cue('counter'), {damping: 12});
  const countT = prog(frame, cue('counter') + 3, Math.round(1.3 * fps), Easing.out(Easing.cubic));
  const value = Math.round(lerp(0, p.countTo ?? 70, countT));
  const plusS = pop(frame, fps, cue('counter') + 3 + Math.round(1.3 * fps));
  const cPos = toScreen(cam, project([-98, 64.5]));
  const target = toScreen(cam, project([-90, 49.8]));
  const arrowDraw = prog(frame, cue('counter') + 10, 18, Easing.out(Easing.quad));
  const arrowD = `M${cPos[0] + 40},${cPos[1] + 70} Q${cPos[0] + 170},${(cPos[1] + target[1]) / 2 + 20} ${target[0]},${target[1] - 14}`;
  const arrow = roughPath(arrowD, {roughness: 1.2, strokeWidth: 6, seed: 8, disableMultiStroke: true}, `arrow-${Math.round(cPos[0] / 4)}-${Math.round(target[1] / 4)}`);
  const ang = Math.atan2(target[1] - 14 - ((cPos[1] + target[1]) / 2 + 20), target[0] - (cPos[0] + 170));

  const hudO = 1 - prog(frame, 0, 10);
  const panelBorderT = prog(frame, 4, 16);

  return (
    <AbsoluteFill>
      {/* panel shadow / frame base */}
      {!tintin && (
        <div
          style={{
            position: 'absolute',
            left: rect.x,
            top: rect.y,
            width: rect.w,
            height: rect.h,
            borderRadius: 28 * panelT,
            background: theme.ocean,
            boxShadow: `0 ${14 * panelT}px ${40 * panelT}px rgba(40,30,20,${0.3 * panelT}), 0 2px 3px rgba(40,30,20,${0.25 * panelT})`,
          }}
        />
      )}
      {tintin && <div style={{position: 'absolute', left: rect.x + 12, top: rect.y + 12, width: rect.w, height: rect.h, background: theme.ink, opacity: panelT}} />}
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <clipPath id="s2panel">
            <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx={tintin ? 0 : 28 * panelT} />
          </clipPath>
        </defs>
        <g clipPath="url(#s2panel)">
          {tintin && <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill={theme.bg} />}
          <MapLayers theme={theme} cam={cam} canadaReveal={1} stripReveal={stripReveal} stripMiles={p.stripMiles} idPrefix="s2" />
          <MapLabel theme={theme} cam={cam} at={LABELS.usa} text="UNITED STATES" size={28} opacity={0.75} />
          <MapLabel theme={theme} cam={cam} at={LABELS.canada} text="CANADA" size={tintin ? 70 : 58} opacity={Math.max(0, 0.9 - 1.2 * counterS)} spacing={16} color={tintin ? theme.ink : '#FFFFFF'} />
          <CityPins theme={theme} cam={cam} appear={appear} />
          {/* 100 MI bracket */}
          {dimT > 0 && (
            <g opacity={dimT}>
              <g transform={`translate(${a[0]},${a[1]}) rotate(${(Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI + 90}) scale(1,${dimLen / 100})`}>
                <RoughSvg paths={dimLine} color={tintin ? theme.ink : theme.accentDark} width={4} draw={dimT} />
              </g>
              <line x1={a[0] - 14} x2={a[0] + 14} y1={a[1]} y2={a[1]} stroke={theme.ink} strokeWidth={4} />
              <line x1={b[0] - 14} x2={b[0] + 14} y1={b[1]} y2={b[1]} stroke={theme.ink} strokeWidth={4} />
              <text
                x={b[0] - 22}
                y={(a[1] + b[1]) / 2 + 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontFamily={tintin ? theme.labelFont : theme.displayFont}
                fontWeight={800}
                fontSize={tintin ? 40 : 30}
                fill={theme.ink}
                stroke={tintin ? '#FFFDF6' : theme.cardBg}
                strokeWidth={8}
                paintOrder="stroke"
              >
                {`${p.stripMiles ?? 100} MI`}
              </text>
            </g>
          )}
          {/* arrow from counter to strip */}
          {arrowDraw > 0 && (
            <g>
              <RoughSvg paths={arrow} color={theme.accent} width={tintin ? 6 : 7} draw={arrowDraw} />
              {arrowDraw > 0.95 && (
                <polygon
                  points="0,0 -26,-13 -26,13"
                  transform={`translate(${target[0]},${target[1] - 14}) rotate(${(ang * 180) / Math.PI})`}
                  fill={theme.accent}
                  stroke={tintin ? theme.ink : 'none'}
                  strokeWidth={3}
                />
              )}
            </g>
          )}
        </g>
        {tintin && (
          <rect x={rect.x} y={rect.y} width={rect.w} height={rect.h} fill="none" stroke={theme.ink} strokeWidth={7 * panelBorderT} />
        )}
      </svg>
      {/* 70%+ counter */}
      {counterS > 0.001 && (
        <div
          style={{
            position: 'absolute',
            left: cPos[0] - 200,
            top: cPos[1] - 95,
            width: 400,
            textAlign: 'center',
            transform: `scale(${counterS})`,
            filter: tintin ? 'none' : theme.paperShadow,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: tintin ? '4px 26px 8px' : '8px 30px 12px',
              background: tintin ? '#FFF6D5' : theme.cardBg,
              border: tintin ? `5px solid ${theme.ink}` : 'none',
              boxShadow: tintin ? `8px 8px 0 ${theme.ink}` : 'none',
              borderRadius: tintin ? 3 : 24,
            }}
          >
            <div
              style={{
                fontFamily: tintin ? theme.displayFont : theme.displayFont,
                fontWeight: 800,
                fontSize: tintin ? 132 : 118,
                lineHeight: 1,
                color: theme.accent,
                letterSpacing: -2,
                WebkitTextStroke: tintin ? `3px ${theme.ink}` : undefined,
              }}
            >
              {value}%
              <span style={{display: 'inline-block', transform: `scale(${plusS})`, marginLeft: 4}}>+</span>
            </div>
            <div
              style={{
                fontFamily: tintin ? theme.labelFont : theme.displayFont,
                fontWeight: 800,
                fontSize: tintin ? 40 : 28,
                letterSpacing: 6,
                color: theme.ink,
                marginTop: 2,
              }}
            >
              {p.counterLabel ?? 'POPULATION'}
            </div>
          </div>
        </div>
      )}
      {hudO > 0 && <AltitudeHUD theme={theme} altitudeKm={50} fromKm={400} toKm={50} opacity={hudO} frame={frame} />}
      <ComparisonCards
        theme={theme}
        topAt={cue('cardTop')}
        bottomAt={cue('cardBottom')}
        top={{title: p.cardTop, sub: p.cardTopSub}}
        bottom={{title: p.cardBottom, sub: p.cardBottomSub}}
      />
    </AbsoluteFill>
  );
};
