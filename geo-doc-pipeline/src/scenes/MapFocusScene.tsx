import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import {Cam, camTransform, lerpCam, pop, prog, toScreen} from '../util';
import {canadaD, lineD, northOfLatD, polyD, project, provinceDs} from '../geo';
import {MapLayers} from '../components/MapLayers';
import {MapLabel, StatBadge} from '../components/MapOverlay';
import {cardStyle, iceColor, isHud, isTintin, labelFont} from '../components/ui';

type LL = [number, number];
interface CamSpec {
  lon: number;
  lat: number;
  zoom: number;
}
const toCam = (c: CamSpec): Cam => {
  const [x, y] = project([c.lon, c.lat]);
  return {cx: x, cy: y, k: c.zoom, vx: 960, vy: 540};
};

/**
 * Generic map scene driven entirely by script.json params:
 *  cam / camFrom          camera target (lon, lat, zoom); flies camFrom → cam
 *  provinces {codes, at}  highlight provinces/territories
 *  region {northOf, label, labelAt, at, kind:'ice'|'accent'}  shade Canada north of a latitude
 *  shape {points, label, labelAt, at}                            shade an arbitrary lon/lat polygon (clipped to Canada)
 *  route {points, label, labelAt, at, durSec}                     animated line (railway, corridor)
 *  pins {items:[{name, lonlat, dx?, dy?}], at}                   staggered city pins
 *  badges [{big, small, at, accent}]                              stat badges (left column)
 *  heading                                                        chip at top centre
 * Every `at` is a cue key from the scene's "cues".
 */
export const MapFocusScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = isTintin(theme);
  const hud = isHud(theme);
  const at = (k?: string, fb = 0.3) => (k ? cue(k, fb) : 0);
  const id = (s: string) => `${scene.id}-${s}`;

  // camera
  const to = toCam(p.cam);
  const from = p.camFrom ? toCam(p.camFrom) : {...to, k: to.k * 0.9};
  const flyT = prog(frame, 0, Math.round((p.flySec ?? 1.6) * fps), Easing.inOut(Easing.cubic));
  const cam = lerpCam(from, to, flyT);
  cam.k *= 1 + 0.04 * prog(frame, 0, scene.durationFrames, Easing.linear);
  const tf = camTransform(cam);

  const fillA = tintin ? 0.5 : hud ? 0.32 : 0.85;
  const strokeC = tintin ? theme.ink : hud ? theme.accent : 'none';

  // reveals
  const provT = p.provinces ? prog(frame, at(p.provinces.at), 14) : 0;
  const regT = p.region ? prog(frame, at(p.region.at), Math.round(1.1 * fps), Easing.inOut(Easing.quad)) : 0;
  const shapeT = p.shape ? prog(frame, at(p.shape.at), Math.round(1.0 * fps), Easing.inOut(Easing.quad)) : 0;
  const routeT = p.route ? prog(frame, at(p.route.at), Math.round((p.route.durSec ?? 2.2) * fps), Easing.inOut(Easing.quad)) : 0;

  const regionColor = p.region?.kind === 'accent' ? theme.accent : iceColor(theme);

  const label = (text: string, ll: LL, o: number, size = 40, color?: string) => (
    <MapLabel theme={theme} cam={cam} at={project(ll)} text={text} size={size} opacity={o} spacing={6} color={color} />
  );

  // route in screen space so stroke widths stay constant
  const routePts: LL[] = p.route?.points ?? [];
  const routeScreen = routePts.map((ll) => toScreen(cam, project(ll)));
  const routeD = routeScreen.map((q, i) => `${i ? 'L' : 'M'}${q[0].toFixed(1)},${q[1].toFixed(1)}`).join('');

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <defs>
          <clipPath id={id('ca')}>
            <path d={canadaD} />
          </clipPath>
          <clipPath id={id('north')}>
            <path d={northOfLatD(p.region?.northOf ?? 90)} />
          </clipPath>
          <pattern id={id('ice')} width={12} height={12} patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
            <line x1={0} y1={0} x2={0} y2={12} stroke={tintin ? theme.ink : regionColor} strokeWidth={1.4} opacity={tintin ? 0.5 : 0.6} />
          </pattern>
        </defs>
        <MapLayers theme={theme} cam={cam} canadaReveal={1} idPrefix={id('m')} />
        <g transform={tf}>
          {/* highlighted provinces */}
          {p.provinces &&
            p.provinces.codes.map((c: string, i: number) => {
              const t = Math.max(0, Math.min(1, provT * 1.6 - i * 0.2));
              return (
                <path
                  key={c}
                  d={provinceDs[c]}
                  fill={theme.accent}
                  fillOpacity={fillA * t}
                  stroke={strokeC}
                  strokeOpacity={t}
                  strokeWidth={tintin ? 3 : 2}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                  style={{filter: !tintin && !hud && t > 0 ? theme.paperShadowSoft : undefined}}
                />
              );
            })}
          {/* northern region */}
          {p.region && regT > 0 && (
            <g clipPath={`url(#${id('ca')})`} opacity={regT}>
              <g clipPath={`url(#${id('north')})`}>
                <path d={canadaD} fill={regionColor} fillOpacity={tintin ? 0.55 : hud ? 0.22 : 0.75} />
                <path d={canadaD} fill={`url(#${id('ice')})`} />
              </g>
              <path
                d={northOfLatD(p.region.northOf)}
                fill="none"
                stroke={tintin ? theme.ink : hud ? '#9AF3FF' : '#5E7C90'}
                strokeWidth={tintin ? 3.5 : 2.5}
                strokeDasharray="12 8"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )}
          {/* arbitrary shape (e.g. Canadian Shield) */}
          {p.shape && shapeT > 0 && (
            <g clipPath={`url(#${id('ca')})`} opacity={shapeT}>
              <path
                d={polyD(p.shape.points)}
                fill={p.shape.color === 'ice' ? iceColor(theme) : theme.accent}
                fillOpacity={fillA * 0.85}
                stroke={strokeC === 'none' ? theme.accentDark : strokeC}
                strokeWidth={tintin ? 3.5 : 2.5}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )}
        </g>
        {/* route */}
        {routeT > 0 && routeD && (
          <g>
            {hud && <path d={routeD} fill="none" stroke={theme.accent} strokeOpacity={0.35} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - routeT} />}
            {tintin && <path d={routeD} fill="none" stroke={theme.ink} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - routeT} />}
            <path
              d={routeD}
              fill="none"
              stroke={hud ? '#FFB066' : theme.accent}
              strokeWidth={p.route.width ?? 8}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray="1 1"
              strokeDashoffset={1 - routeT}
              style={{filter: !tintin && !hud ? theme.paperShadowSoft : undefined}}
            />
            {p.route.dashed && routeT >= 1 && (
              <path d={routeD} fill="none" stroke={tintin ? theme.ink : '#FFFFFF'} strokeWidth={2.5} strokeDasharray="10 12" strokeLinecap="round" opacity={0.8} />
            )}
          </g>
        )}
        {/* pins */}
        {p.pins &&
          p.pins.items.map((c: any, i: number) => {
            const s = pop(frame, fps, at(p.pins.at) + i * 5, {damping: 10, stiffness: 160});
            if (s <= 0.001) return null;
            const [x, y] = toScreen(cam, project(c.lonlat));
            return (
              <g key={c.name} transform={`translate(${x},${y})`}>
                <g transform={`scale(${s})`}>
                  {hud && <circle r={20} fill={theme.accent} opacity={0.25} />}
                  <circle r={11} fill={tintin ? '#FFFDF6' : hud ? theme.bg : '#FFFFFF'} stroke={tintin ? theme.ink : theme.accent} strokeWidth={4} />
                  <circle r={5} fill={tintin ? theme.ink : theme.accent} />
                </g>
                <text
                  x={c.dx ?? 0}
                  y={c.dy ?? -24}
                  textAnchor="middle"
                  fontFamily={labelFont(theme)}
                  fontWeight={800}
                  fontSize={tintin ? 30 : 24}
                  letterSpacing={2}
                  fill={theme.ink}
                  stroke={theme.halo}
                  strokeWidth={7}
                  paintOrder="stroke"
                  opacity={Math.min(1, s)}
                >
                  {c.name.toUpperCase()}
                </text>
              </g>
            );
          })}
        {p.region?.label && p.region.labelAt && label(p.region.label, p.region.labelAt, regT, p.region.labelSize ?? 46)}
        {p.shape?.label && p.shape.labelAt && label(p.shape.label, p.shape.labelAt, shapeT, p.shape.labelSize ?? 44)}
        {p.provinces?.label && p.provinces.labelAt && label(p.provinces.label, p.provinces.labelAt, provT, p.provinces.labelSize ?? 44)}
        {p.route?.label && p.route.labelAt && label(p.route.label, p.route.labelAt, routeT >= 1 ? 1 : 0, p.route.labelSize ?? 34)}
        {(p.labels ?? []).map((l: any, i: number) => (
          <React.Fragment key={i}>{label(l.text, l.lonlat, prog(frame, at(l.at), 10), l.size ?? 30, l.color)}</React.Fragment>
        ))}
      </svg>
      {p.heading && (
        <div style={{position: 'absolute', top: 48, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: prog(frame, 4, 12)}}>
          <div
            style={{
              ...cardStyle(theme, 999),
              padding: tintin ? '6px 26px 8px' : '10px 30px',
              borderRadius: tintin ? 3 : hud ? 6 : 999,
              fontFamily: theme.displayFont,
              fontWeight: 800,
              fontSize: tintin ? 44 : 30,
              letterSpacing: 3,
              color: theme.ink,
            }}
          >
            {p.heading}
          </div>
        </div>
      )}
      {(p.badges ?? []).map((b: any, i: number) => (
        <StatBadge key={i} theme={theme} x={74} y={p.heading ? 150 + i * 175 : 70 + i * 175} s={pop(frame, fps, at(b.at))} big={b.big} small={b.small} accent={b.accent} tilt={i % 2 ? 2 : -3} />
      ))}
    </AbsoluteFill>
  );
};
