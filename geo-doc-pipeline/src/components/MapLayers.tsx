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
