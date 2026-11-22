import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import {Cam, lerpCam, pop, prog, toScreen} from '../util';
import {LABELS, project} from '../geo';
import {MapLayers} from '../components/MapLayers';
import {MapLabel, StatBadge} from '../components/MapOverlay';
import {AltitudeHUD} from '../components/AltitudeHUD';
import {roughEllipse} from '../rough';
import {RoughSvg} from '../components/RoughSvg';

export const ZOOM_START: Cam = {cx: 1000, cy: 790, k: 0.4, vx: 960, vy: 540};
export const ZOOM_END: Cam = {cx: 960, cy: 600, k: 1.0, vx: 960, vy: 540};
export const ZOOM_DRIFT = 1.045;

/** Camera for scene 1 at a given local frame (exported so scene 2 can start exactly where it ends). */
export const zoomCam = (frame: number, zoomEndF: number, totalF: number): {cam: Cam; zt: number} => {
  const zt = prog(frame, 0, zoomEndF, Easing.inOut(Easing.cubic));
  const cam = lerpCam(ZOOM_START, ZOOM_END, zt);
  const drift = prog(frame, zoomEndF, totalF - zoomEndF, Easing.linear);
  cam.k *= 1 + (ZOOM_DRIFT - 1) * drift;
  return {cam, zt};
};

/** SCENE 1 — fly down onto Canada; territory fills; stat cards pop. */
export const MapZoomScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const zoomEndF = cue('fill') + Math.round(1.0 * fps);
  const {cam, zt} = zoomCam(frame, zoomEndF, scene.durationFrames);
  const fromKm = p.altitudeFromKm ?? 400;
  const toKm = p.altitudeToKm ?? 50;
  const altitude = fromKm * Math.pow(toKm / fromKm, zt);
  const reveal = prog(frame, cue('fill'), Math.round(1.3 * fps), Easing.inOut(Easing.quad));
  const statS = pop(frame, fps, cue('stat'));
  const densS = pop(frame, fps, cue('density'));
  const labelO = prog(frame, cue('fill') + 10, 12);
  const tintin = theme.name === 'tintin';

  // "nobody" scribble around the empty north
  const north = toScreen(cam, project([-100, 66]));
  const ring = roughEllipse(0, 0, 860, 330, {roughness: 1.6, strokeWidth: 6, seed: 5, disableMultiStroke: true});
  const ringDraw = prog(frame, cue('density') + 4, 16, Easing.out(Easing.quad));

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <MapLayers theme={theme} cam={cam} canadaReveal={reveal} idPrefix="s1" />
        <MapLabel theme={theme} cam={cam} at={LABELS.pacific} text="PACIFIC OCEAN" size={26} italic opacity={0.55 * (1 - reveal * 0.4)} weight={500} />
        <MapLabel theme={theme} cam={cam} at={LABELS.atlantic} text="ATLANTIC OCEAN" size={26} italic opacity={0.55 * (1 - reveal * 0.4)} weight={500} />
        <MapLabel theme={theme} cam={cam} at={LABELS.usa} text="UNITED STATES" size={30} opacity={0.75} />
        <g transform={`translate(0,${(1 - labelO) * 20})`}>
          <MapLabel theme={theme} cam={cam} at={LABELS.canada} text="CANADA" size={tintin ? 118 : 96} opacity={labelO} spacing={tintin ? 22 : 30} color={tintin ? theme.ink : '#FFFFFF'} />
        </g>
        {ringDraw > 0 && (
          <g transform={`translate(${north[0]},${north[1] - 20}) rotate(-4)`}>
            <RoughSvg paths={ring} color={theme.accent} width={tintin ? 6 : 7} draw={ringDraw} />
          </g>
        )}
      </svg>
      <AltitudeHUD
        theme={theme}
        altitudeKm={altitude}
        fromKm={fromKm}
        toKm={toKm}
        opacity={prog(frame, 4, 12)}
        frame={frame}
      />
      <StatBadge theme={theme} x={74} y={70} s={statS} big="#2 LARGEST" small={p.statLabel ?? ''} />
      <StatBadge theme={theme} x={74} y={240} s={densS} big={p.densityLabel ?? ''} small="POPULATION DENSITY" tilt={2} accent />
    </AbsoluteFill>
  );
};
