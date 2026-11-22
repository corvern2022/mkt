import React, {useMemo} from 'react';
import type {Theme} from '../theme';
import {Cam, camTransform} from '../util';
import {
  borderBounds,
  borderD,
  canadaBounds,
  canadaD,
  graticuleD,
  milesToBase,
  northOfLatD,
  provincesD,
  usaD,
  worldPaths,
} from '../geo';
import {roughPath} from '../rough';
import {RoughSvg} from './RoughSvg';

const OCEAN = 'M-6000,-6000H8000V7000H-6000Z';

/**
 * LAYER 2 — the dynamic map. Geometry lives in base space; `cam` moves over it.
 * canadaReveal: 0..1 hachure / paper-drop reveal of Canada.
 * stripReveal:  0..1 left-to-right wipe of the 100-mile border strip.
 */
export const MapLayers: React.FC<{
  theme: Theme;
  cam: Cam;
  canadaReveal: number;
  stripReveal?: number;
  stripMiles?: number;
  idPrefix: string;
}> = ({theme, cam, canadaReveal, stripReveal = 0, stripMiles = 100, idPrefix}) => {
  const tf = camTransform(cam);
  const id = (s: string) => `${idPrefix}-${s}`;
  const stripW = milesToBase(stripMiles) * 2;
  const [[bx0], [bx1]] = canadaBounds;
  const [[sx0], [sx1]] = borderBounds;
  const wipeX = sx0 - 30 + (sx1 - sx0 + 60) * stripReveal;
  const revealX = bx0 - 20 + (bx1 - bx0 + 40) * canadaReveal;

  const hatch = useMemo(
    () =>
      theme.name === 'tintin'
        ? roughPath(
            canadaD,
            {fill: theme.hatch, fillStyle: 'hachure', hachureAngle: -41, hachureGap: 11, fillWeight: 1.4, stroke: 'none', seed: 11, roughness: 1.1},
            'canada-hatch',
          )
        : [],
    [theme.name, theme.hatch],
  );

  const defs = (
    <defs>
      <clipPath id={id('canada')}>
        <path d={canadaD} />
      </clipPath>
      <clipPath id={id('wipe')}>
        <rect x={-6000} y={-6000} width={wipeX + 6000} height={13000} />
      </clipPath>
      <clipPath id={id('reveal')}>
        <rect x={-6000} y={-6000} width={revealX + 6000} height={13000} />
      </clipPath>
      <pattern id={id('stripHatch')} width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1={0} y1={0} x2={0} y2={9} stroke={theme.ink} strokeWidth={1.6} opacity={0.45} />
      </pattern>
    </defs>
  );

  if (theme.name === 'tintin') {
    return (
      <g>
        {defs}
        <g transform={tf}>
          <path d={OCEAN} fill={theme.ocean} opacity={0.85} />
          <path d={graticuleD} fill="none" stroke={theme.ink} strokeOpacity={0.14} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          {worldPaths.map((p) => (
            <path key={p.id} d={p.d} fill={theme.land} stroke={theme.ink} strokeWidth={1.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={usaD} fill={theme.usLand} stroke={theme.ink} strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d={canadaD} fill={theme.canada} />
          <g clipPath={`url(#${id('reveal')})`}>
            <g clipPath={`url(#${id('canada')})`}>
              <RoughSvg paths={hatch} color={theme.hatch} width={1.5} nonScaling opacity={0.55} />
            </g>
          </g>
          {/* 100-mile strip: ink rim + red band + hatch, clipped to Canada */}
          {stripReveal > 0 && (
            <g clipPath={`url(#${id('canada')})`}>
              <g clipPath={`url(#${id('wipe')})`}>
                <path d={borderD} fill="none" stroke={theme.ink} strokeWidth={stripW + 7 / cam.k} strokeLinejoin="round" strokeLinecap="round" />
                <path d={borderD} fill="none" stroke={theme.accent} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" />
                <path d={borderD} fill="none" stroke={`url(#${id('stripHatch')})`} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" />
              </g>
            </g>
          )}
          <path d={canadaD} fill="none" stroke={theme.ink} strokeWidth={2.8} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          {stripReveal > 0 && (
            <g clipPath={`url(#${id('wipe')})`}>
              <path d={borderD} fill="none" stroke={theme.ink} strokeWidth={4.5} strokeDasharray="14 9" vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </g>
      </g>
    );
  }

  // ---------------- hud: dark blueprint — wireframe land, glowing outline, orange strip ----------------
  if (theme.name === 'hud') {
    const CY = '#3CD2E6';
    return (
      <g>
        {defs}
        <defs>
          <pattern id={id('hudGrid')} width={13} height={13} patternUnits="userSpaceOnUse">
            <path d="M13 0H0V13" fill="none" stroke={CY} strokeWidth={0.9} opacity={0.55} />
          </pattern>
          <pattern id={id('hudStrip')} width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={9} stroke="#FFB066" strokeWidth={1.4} opacity={0.55} />
          </pattern>
        </defs>
        <g transform={tf}>
          <path d={OCEAN} fill={theme.ocean} opacity={0.9} />
          <path d={graticuleD} fill="none" stroke={CY} strokeOpacity={0.16} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          {worldPaths.map((p) => (
            <path key={p.id} d={p.d} fill={theme.land} stroke={CY} strokeOpacity={0.35} strokeWidth={1.2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={usaD} fill={theme.usLand} stroke={CY} strokeOpacity={0.45} strokeWidth={1.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d={usaD} fill={`url(#${id('hudGrid')})`} opacity={0.18} />
          {/* Canada: scanned-in wireframe */}
          <g clipPath={`url(#${id('reveal')})`}>
            <path d={canadaD} fill={theme.canada} />
            <path d={canadaD} fill={`url(#${id('hudGrid')})`} />
            <g clipPath={`url(#${id('canada')})`}>
              <path d={provincesD} fill="none" stroke="#3CD2E6" strokeOpacity={0.18} strokeWidth={6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              <path d={provincesD} fill="none" stroke="#7FE9F5" strokeOpacity={0.75} strokeWidth={1.3} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </g>
            <path d={canadaD} fill="none" stroke={CY} strokeOpacity={0.22} strokeWidth={9} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <path d={canadaD} fill="none" stroke="#9AF3FF" strokeWidth={2.4} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </g>
          {/* scan line that draws Canada in */}
          {canadaReveal > 0.01 && canadaReveal < 0.99 && (
            <line x1={revealX} x2={revealX} y1={-4000} y2={5000} stroke="#9AF3FF" strokeWidth={3} strokeOpacity={0.8} vectorEffect="non-scaling-stroke" />
          )}
          {/* 100-mile zone: translucent orange band + glowing border line */}
          {stripReveal > 0 && (
            <g clipPath={`url(#${id('canada')})`}>
              <g clipPath={`url(#${id('wipe')})`}>
                <path d={borderD} fill="none" stroke={theme.accent} strokeOpacity={0.3} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" />
                <path d={borderD} fill="none" stroke={`url(#${id('hudStrip')})`} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" />
                <path d={borderD} fill="none" stroke={theme.accent} strokeOpacity={0.55} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" style={{mixBlendMode: 'screen'}} />
              </g>
            </g>
          )}
          {stripReveal > 0 && (
            <g clipPath={`url(#${id('wipe')})`}>
              <path d={borderD} fill="none" stroke={theme.accent} strokeOpacity={0.35} strokeWidth={14} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={borderD} fill="none" stroke="#FFB066" strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </g>
      </g>
    );
  }

  // ---------------- paper3d: stacked paper sheets, no outlines ----------------
  const lift = 1 - canadaReveal; // 1 = still in the air
  const unit = 1 / cam.k; // 1 screen px in base units
  const terraces = [55, 61, 67, 73];
  return (
    <g>
      {defs}
      <g transform={tf}>
        <path d={OCEAN} fill={theme.ocean} opacity={0.55} />
        <path d={graticuleD} fill="none" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={1} vectorEffect="non-scaling-stroke" />
      </g>
      <g style={{filter: theme.paperShadowSoft}}>
        <g transform={tf}>
          {worldPaths.map((p) => (
            <path key={p.id} d={p.d} fill={theme.land} />
          ))}
          <path d={usaD} fill={theme.usLand} />
          {/* flat cut-out where the Canada sheet will land */}
          <path d={canadaD} fill="#DDD8CF" />
        </g>
      </g>
      {/* Canada sheet drops onto the table */}
      <g
        opacity={Math.min(1, canadaReveal * 2.2)}
        transform={`translate(0,${-lift * 70}) translate(960,540) scale(${1 + lift * 0.05}) translate(-960,-540)`}
        style={{filter: theme.paperShadow}}
      >
        <g transform={tf}>
          {/* sheet thickness */}
          {[4, 3, 2, 1].map((i) => (
            <path key={i} d={canadaD} fill="#5F6B77" transform={`translate(0,${i * 1.3 * unit})`} />
          ))}
          <path d={canadaD} fill={theme.canada} />
        </g>
      </g>
      {/* northern shield terraces — each a separate raised paper layer */}
      {terraces.map((lat, i) => {
        const t = Math.max(0, Math.min(1, canadaReveal * 1.6 - 0.25 - i * 0.12));
        if (t <= 0) return null;
        return (
          <g key={lat} opacity={t} transform={`translate(0,${-(1 - t) * 30})`} style={{filter: theme.paperShadowSoft}}>
            <g transform={tf}>
              <clipPath id={id(`terr${i}`)}>
                <path d={northOfLatD(lat)} />
              </clipPath>
              <g clipPath={`url(#${id(`terr${i}`)})`}>
                <path d={canadaD} fill={theme.canadaNorth[Math.min(i, theme.canadaNorth.length - 1)]} transform={`translate(0,${-1.5 * unit})`} />
              </g>
            </g>
          </g>
        );
      })}
      {/* raised crimson strip */}
      {stripReveal > 0 && (
        <g style={{filter: 'drop-shadow(0px 3px 2px rgba(80,10,15,0.35)) drop-shadow(0px 12px 14px rgba(60,10,10,0.28))'}}>
          <g transform={tf}>
            <g clipPath={`url(#${id('canada')})`}>
              <g clipPath={`url(#${id('wipe')})`}>
                {[0, 1, 2, 3].map((i) => (
                  <path
                    key={i}
                    d={borderD}
                    fill="none"
                    stroke={theme.accentDark}
                    strokeWidth={stripW}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    transform={`translate(0,${(i * 1.4 - 1) * unit})`}
                  />
                ))}
                <path d={borderD} fill="none" stroke={theme.accent} strokeWidth={stripW} strokeLinejoin="round" strokeLinecap="round" transform={`translate(0,${-6 * unit})`} />
              </g>
            </g>
          </g>
        </g>
      )}
    </g>
  );
};
