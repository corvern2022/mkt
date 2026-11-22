import React, {useMemo} from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import {pop, prog} from '../util';
import {canadaBounds, canadaD, provincesD} from '../geo';
import {roughLine, roughPath} from '../rough';
import {RoughSvg} from '../components/RoughSvg';
import timeline from '../timeline.json';

/** Silent opening title card. */
export const TitleCard: React.FC<SceneProps> = ({scene, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const tintin = theme.name === 'tintin';
  const p = scene.params;
  const title = (timeline as any).title as string;
  const [pre, , post = ''] = title.split(/(90%)/);
  const k1 = pop(frame, fps, 2);
  const k2 = pop(frame, fps, 8, {damping: 10});
  const k3 = pop(frame, fps, 20, {damping: 9, stiffness: 170});
  const under = prog(frame, 26, 16, Easing.out(Easing.quad));
  const mapT = pop(frame, fps, 10, {damping: 15, stiffness: 80});
  const [[x0, y0], [x1, y1]] = canadaBounds;
  const k = 760 / (x1 - x0);

  const hatch = useMemo(
    () =>
      tintin
        ? roughPath(canadaD, {fill: theme.ink, fillStyle: 'hachure', hachureAngle: -41, hachureGap: 14, stroke: 'none', seed: 11, roughness: 1.1}, 'title-hatch')
        : [],
    [tintin, theme.ink],
  );
  const underline = roughLine(0, 0, 360, 0, {roughness: 1.4, strokeWidth: 8, seed: 2, disableMultiStroke: true});

  return (
    <AbsoluteFill>
      {/* Canada silhouette on the right */}
      <svg width={1920} height={1080} style={{position: 'absolute'}}>
        <defs>
          <clipPath id="t-ca">
            <path d={canadaD} />
          </clipPath>
        </defs>
        <g
          transform={`translate(${1060 + (1 - mapT) * 200},${250 + Math.sin(frame / 25) * 6}) rotate(${(1 - mapT) * 8 - 3}) scale(${k}) translate(${-x0},${-y0})`}
          opacity={Math.min(1, mapT * 1.5)}
          style={{filter: tintin ? undefined : theme.paperShadow}}
        >
          {theme.name === 'hud' ? (
            <>
              <defs>
                <pattern id="t-grid" width={13} height={13} patternUnits="userSpaceOnUse">
                  <path d="M13 0H0V13" fill="none" stroke="#3CD2E6" strokeWidth={0.9} opacity={0.55} />
                </pattern>
              </defs>
              <path d={canadaD} fill={theme.canada} />
              <path d={canadaD} fill="url(#t-grid)" />
              <g clipPath="url(#t-ca)">
                <path d={provincesD} fill="none" stroke="#7FE9F5" strokeOpacity={0.7} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
              </g>
              <path d={canadaD} fill="none" stroke="#3CD2E6" strokeOpacity={0.25} strokeWidth={10} vectorEffect="non-scaling-stroke" />
              <path d={canadaD} fill="none" stroke="#9AF3FF" strokeWidth={2.6} vectorEffect="non-scaling-stroke" />
            </>
          ) : tintin ? (
            <>
              <path d={canadaD} fill="#FBF8F0" />
              <g clipPath="url(#t-ca)">
                <RoughSvg paths={hatch} color={theme.ink} width={1.4} opacity={0.5} nonScaling />
              </g>
              <path d={canadaD} fill="none" stroke={theme.ink} strokeWidth={3} vectorEffect="non-scaling-stroke" />
            </>
          ) : (
            <>
              {[5, 4, 3, 2, 1].map((i) => (
                <path key={i} d={canadaD} fill="#5F6B77" transform={`translate(0,${i * 2.2})`} />
              ))}
              <path d={canadaD} fill={theme.canada} />
            </>
          )}
        </g>
      </svg>
      <div style={{position: 'absolute', left: 120, top: 250, width: 980}}>
        <div
          style={{
            display: 'inline-block',
            transform: `translateX(${(1 - k1) * -80}px)`,
            opacity: Math.min(1, k1 * 2),
            padding: tintin ? '4px 16px 6px' : '8px 20px',
            background: tintin ? theme.ink : theme.accent,
            color: '#FFFFFF',
            fontFamily: tintin ? theme.labelFont : theme.displayFont,
            fontWeight: 800,
            fontSize: tintin ? 36 : 24,
            letterSpacing: 6,
            borderRadius: tintin ? 2 : theme.name === 'hud' ? 4 : 999,
          }}
        >
          {p.kicker} · {(timeline as any).episode}
        </div>
        <div
          style={{
            marginTop: 26,
            transformOrigin: 'left center',
            transform: tintin ? `scale(${k2}) rotate(${(1 - k2) * -4}deg)` : `translateY(${(1 - k2) * 60}px)`,
            opacity: Math.min(1, k2 * 2),
            filter: tintin ? 'none' : theme.paperShadow,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: tintin ? '18px 34px 24px' : '26px 40px 30px',
              background: tintin ? '#FFF6D5' : theme.cardBg,
              border: tintin ? `6px solid ${theme.ink}` : theme.name === 'hud' ? '1.5px solid rgba(60,220,240,0.65)' : 'none',
              boxShadow: tintin ? `12px 12px 0 ${theme.ink}` : 'none',
              borderRadius: tintin ? 2 : theme.name === 'hud' ? 8 : 30,
              fontFamily: theme.displayFont,
              fontWeight: 800,
              fontSize: tintin ? 104 : 84,
              lineHeight: 1.02,
              letterSpacing: tintin ? 1 : -2,
              color: theme.ink,
            }}
          >
            {pre}
            <span style={{display: 'inline-block', color: theme.accent, transform: `scale(${0.6 + 0.4 * k3}) rotate(${(1 - k3) * 12}deg)`}}>90%</span>
            {post}
          </div>
        </div>
        <svg width={420} height={40} style={{marginLeft: 40, marginTop: 18, overflow: 'visible'}}>
          <g transform="translate(10,20)">
            {tintin ? (
              <RoughSvg paths={underline} color={theme.accent} width={8} draw={under} />
            ) : (
              <rect x={0} y={-6} width={360 * under} height={12} rx={6} fill={theme.accent} />
            )}
          </g>
        </svg>
      </div>
    </AbsoluteFill>
  );
};
