import React, {useMemo} from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import type {SceneProps} from '../types';
import type {Theme} from '../theme';
import {lerp, pop, prog} from '../util';
import {borderD, canadaD, milesToBase, project} from '../geo';
import {roughLine, roughPath, roughRect} from '../rough';
import {RoughSvg} from '../components/RoughSvg';

const BOX = {x0: 80, x1: 1840, y0: 168, y1: 912};
const S = (x: number) => 640 + 16 * Math.sin(x / 130) + 9 * Math.sin(x / 47 + 1);
const SOIL = 34;
const T = (x: number) => S(x) - SOIL;
const ICE_H = 370;
const ICE_L = 860;
const XS = BOX.x0 - 160;
const XE = 1430;
const MORAINE_W = 120;

const pts = (f: (x: number) => number, a: number, b: number, step = 8) => {
  const out: string[] = [];
  const dir = a < b ? 1 : -1;
  for (let x = a; dir > 0 ? x <= b : x >= b; x += step * dir) out.push(`${x.toFixed(1)},${f(x).toFixed(1)}`);
  out.push(`${b.toFixed(1)},${f(b).toFixed(1)}`);
  return out;
};

/** local minima of the bedrock surface → future lakes */
const LAKES = (() => {
  const res: number[] = [];
  for (let x = 200; x < 1350; x += 2) if (S(x) > S(x - 2) && S(x) >= S(x + 2)) res.push(x);
  return res.filter((x, i, a) => i === 0 || x - a[i - 1] > 120).slice(0, 6);
})();

const GlacierLabel: React.FC<{theme: Theme; x: number; y: number; s: number; text: string; to?: [number, number]; small?: boolean; tone?: 'accent' | 'plain'}> = ({
  theme,
  x,
  y,
  s,
  text,
  to,
  small,
  tone = 'plain',
}) => {
  if (s <= 0.001) return null;
  const tintin = theme.name === 'tintin';
  const fs = small ? (tintin ? 30 : 22) : tintin ? 40 : 30;
  const w = text.length * fs * (tintin ? 0.5 : 0.68) + 40;
  const h = fs + 24;
  const bg = tone === 'accent' ? theme.accent : tintin ? '#FFF6D5' : theme.cardBg;
  const fg = tone === 'accent' ? '#FFFFFF' : theme.ink;
  return (
    <g>
      {to && (
        <g opacity={Math.min(1, s)}>
          <line x1={x} y1={y + h / 2} x2={lerp(x, to[0], Math.min(1, s))} y2={lerp(y + h / 2, to[1], Math.min(1, s))} stroke={theme.ink} strokeWidth={tintin ? 3.5 : 2.5} />
          <circle cx={to[0]} cy={to[1]} r={tintin ? 7 : 6} fill={tintin ? theme.ink : theme.accent} opacity={s > 0.9 ? 1 : 0} />
        </g>
      )}
      <g transform={`translate(${x},${y}) scale(${s})`} style={{filter: tintin ? undefined : theme.paperShadowSoft}}>
        {tintin && <rect x={-w / 2 + 6} y={-h / 2 + 6} width={w} height={h} fill={theme.ink} />}
        <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={tintin ? 2 : h / 2} fill={bg} stroke={tintin ? theme.ink : 'none'} strokeWidth={4} />
        <text
          textAnchor="middle"
          dominantBaseline="central"
          y={2}
          fontFamily={theme.displayFont}
          fontWeight={800}
          fontSize={fs}
          letterSpacing={tintin ? 2 : 2}
          fill={fg}
        >
          {text}
        </text>
      </g>
    </g>
  );
};

/** SCENE 3 — ice-age glacier bulldozes the topsoil and exposes the granite of the Canadian Shield. */
export const GlacierScene: React.FC<SceneProps> = ({scene, theme, cue}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = scene.params;
  const tintin = theme.name === 'tintin';

  const g0 = cue('glacier') - 12;
  const g1 = cue('reveal');
  const adv = prog(frame, g0, g1 - g0, Easing.inOut(Easing.sin));
  const X = lerp(XS, XE, adv);
  const melt = prog(frame, g1, Math.round(1.1 * fps), Easing.inOut(Easing.quad));
  const lakeT = prog(frame, g1 + 14, 22, Easing.out(Easing.cubic));
  const moraineH = Math.min(52, Math.max(0, (X - BOX.x0) * 0.05));
  const hScale = 1 - 0.75 * melt;
  const iceTop = (x: number) => S(x) - ICE_H * hScale * Math.sqrt(Math.max(0, Math.min(1, (X - x) / ICE_L)));
  const icePoly = [...pts(iceTop, BOX.x0 - 40, X, 10), ...pts(S, X, BOX.x0 - 40, 10)].join(' ');
  const morTop = (x: number) => T(x) - moraineH * Math.cos((Math.PI / 2) * Math.max(0, Math.min(1, (x - X) / MORAINE_W)));
  const moraine = [...pts(morTop, X - 6, X + MORAINE_W, 6), ...pts(S, X + MORAINE_W, X - 6, 6)].join(' ');
  const soil = [...pts(T, BOX.x0 - 40, BOX.x1 + 40, 8), ...pts(S, BOX.x1 + 40, BOX.x0 - 40, 8)].join(' ');
  const bedrock = [...pts(S, BOX.x0 - 40, BOX.x1 + 40, 8), `${BOX.x1 + 40},${BOX.y1 + 40}`, `${BOX.x0 - 40},${BOX.y1 + 40}`].join(' ');

  const enter = (i: number) => pop(frame, fps, 2 + i * 4, {damping: 16, stiffness: 110});
  const titleS = pop(frame, fps, 6, {damping: 12});
  const soilLabelS = pop(frame, fps, 18);
  const iceLabelS = pop(frame, fps, cue('glacier') + 6);
  const rockLabelS = pop(frame, fps, g1 + 12);
  const shieldLabelS = pop(frame, fps, cue('scrape'));
  const arrowDraw = prog(frame, cue('glacier'), 20, Easing.out(Easing.quad));
  const isToday = frame >= g1 + Math.round(0.6 * fps);

  const rough = useMemo(() => {
    if (!tintin) return null;
    return {
      rockHatch: roughRect(BOX.x0 - 40, 560, BOX.x1 - BOX.x0 + 80, BOX.y1 - 520, {fill: theme.ink, fillStyle: 'cross-hatch', hachureGap: 16, hachureAngle: 30, stroke: 'none', seed: 21, roughness: 1.2}),
      soilDots: roughPath(
        `M${soil.split(' ').join(' L')} Z`,
        {fill: '#3B2412', fillStyle: 'dots', hachureGap: 9, fillWeight: 2, stroke: 'none', seed: 13, roughness: 1},
        'soil-dots',
      ),
      iceHatch: roughRect(-1400, 260, 1500, 420, {fill: '#5FA8C8', fillStyle: 'hachure', hachureAngle: -55, hachureGap: 10, stroke: 'none', seed: 17, roughness: 1.1}),
      arrow: roughLine(0, 0, 520, 0, {roughness: 1.1, strokeWidth: 8, seed: 3, disableMultiStroke: true}),
    };
  }, [tintin, theme.ink, soil]);

  // granite speckles + cracks (deterministic)
  const specks = useMemo(
    () =>
      Array.from({length: 170}).map((_, i) => {
        const h1 = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
        const h2 = Math.abs(Math.sin(i * 78.233 + 1.7) * 24634.6345) % 1;
        const x = BOX.x0 + 10 + h1 * (BOX.x1 - BOX.x0 - 20);
        const yMin = S(x) + 14;
        const y = yMin + h2 * Math.max(10, BOX.y1 - yMin - 10);
        return {x, y, r: 2 + (i % 4), c: i % 3 === 0 ? '#C98F86' : i % 3 === 1 ? '#3A3A3A' : '#E9E6E0'};
      }),
    [],
  );
  const cracks = [
    'M260,700 l40,40 l-10,50 l30,40',
    'M620,690 l-20,60 l40,30 l-10,70',
    'M980,710 l30,50 l-30,40 l20,60',
    'M1360,700 l-30,40 l20,70',
    'M1650,690 l20,60 l-30,50 l10,60',
  ];

  const sectionOpacity = Math.min(1, enter(0) * 1.5);
  const rise = (i: number) => (1 - enter(i)) * 120;

  // inset map
  const insetK = 0.165;
  const insetTx = 1520 - 170 * insetK;
  const insetTy = 205 - 150 * insetK;
  const secA = project([-104, 52]);
  const secB = project([-86, 60]);
  const insetS = pop(frame, fps, 10, {damping: 14});

  return (
    <AbsoluteFill>
      <svg width={1920} height={1080}>
        <defs>
          <clipPath id="g-box">
            <rect x={BOX.x0} y={BOX.y0} width={BOX.x1 - BOX.x0} height={BOX.y1 - BOX.y0} rx={tintin ? 0 : 28} />
          </clipPath>
          <clipPath id="g-ice">
            <polygon points={icePoly} />
          </clipPath>
          <clipPath id="g-soil-ahead">
            <rect x={X - 2} y={0} width={4000} height={1200} />
          </clipPath>
          <clipPath id="g-inset-ca">
            <path d={canadaD} />
          </clipPath>
        </defs>

        {/* panel */}
        {tintin ? (
          <>
            <rect x={BOX.x0 + 12} y={BOX.y0 + 12} width={BOX.x1 - BOX.x0} height={BOX.y1 - BOX.y0} fill={theme.ink} opacity={sectionOpacity} />
            <rect x={BOX.x0} y={BOX.y0} width={BOX.x1 - BOX.x0} height={BOX.y1 - BOX.y0} fill="#D7E9EE" opacity={sectionOpacity} />
          </>
        ) : (
          <rect
            x={BOX.x0}
            y={BOX.y0}
            width={BOX.x1 - BOX.x0}
            height={BOX.y1 - BOX.y0}
            rx={28}
            fill="#E4E9EC"
            opacity={sectionOpacity}
            style={{filter: theme.paperShadow}}
          />
        )}

        <g clipPath="url(#g-box)">
          {/* bedrock */}
          <g transform={`translate(0,${rise(1)})`} style={{filter: tintin ? undefined : theme.paperShadow}}>
            <polygon points={bedrock} fill={tintin ? '#B8B6B0' : '#9FA6AD'} stroke={tintin ? theme.ink : 'none'} strokeWidth={4} strokeLinejoin="round" />
          </g>
          {!tintin &&
            [70, 150, 230].map((d, i) => (
              <g key={d} transform={`translate(0,${rise(2 + i)})`} style={{filter: 'drop-shadow(0px -3px 3px rgba(30,30,40,0.25))'}}>
                <polygon
                  points={[...pts((x) => S(x) + d + 10 * Math.sin(x / (90 + i * 30) + i), BOX.x0 - 40, BOX.x1 + 40, 10), `${BOX.x1 + 40},${BOX.y1 + 40}`, `${BOX.x0 - 40},${BOX.y1 + 40}`].join(' ')}
                  fill={['#929AA2', '#858D96', '#79818A'][i]}
                />
              </g>
            ))}
          <g transform={`translate(0,${rise(1)})`}>
            {tintin && rough && (
              <g clipPath="url(#g-box)">
                <clipPath id="g-rock">
                  <polygon points={bedrock} />
                </clipPath>
                <g clipPath="url(#g-rock)">
                  <RoughSvg paths={rough.rockHatch} color={theme.ink} width={1.2} opacity={0.22} />
                </g>
              </g>
            )}
            {specks.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.c} opacity={tintin ? 0.8 : 0.55} />
            ))}
            {cracks.map((d, i) => (
              <path key={i} d={d} fill="none" stroke={tintin ? theme.ink : '#6C747C'} strokeWidth={tintin ? 3 : 2.5} strokeLinecap="round" strokeLinejoin="round" />
            ))}
          </g>

          {/* lakes in scraped hollows (appear after the ice melts) */}
          {LAKES.map((lx, i) => {
            const s = Math.max(0, Math.min(1, lakeT * 1.4 - i * 0.08));
            if (s <= 0) return null;
            return (
              <ellipse
                key={lx}
                cx={lx}
                cy={S(lx) - 2}
                rx={46 * s}
                ry={9 * s}
                fill={tintin ? '#7FB7D0' : '#8FB5C8'}
                stroke={tintin ? theme.ink : 'none'}
                strokeWidth={3}
                style={{filter: tintin ? undefined : theme.paperShadowSoft}}
              />
            );
          })}

          {/* topsoil ahead of the glacier */}
          <g transform={`translate(0,${rise(0)})`} clipPath="url(#g-soil-ahead)">
            <g style={{filter: tintin ? undefined : theme.paperShadowSoft}}>
              <polygon points={soil} fill={tintin ? '#9A6234' : '#9C6B43'} stroke={tintin ? theme.ink : 'none'} strokeWidth={3.5} strokeLinejoin="round" />
              {!tintin && <polygon points={[...pts((x) => T(x) - 6, BOX.x0 - 40, BOX.x1 + 40, 8), ...pts((x) => T(x) + 8, BOX.x1 + 40, BOX.x0 - 40, 8)].join(' ')} fill="#86A86E" />}
            </g>
            {tintin && rough && <RoughSvg paths={rough.soilDots} fill="#3B2412" opacity={0.45} />}
            {tintin &&
              Array.from({length: 60}).map((_, i) => {
                const gx = BOX.x0 + i * 30 + 8;
                const gy = T(gx);
                return <path key={i} d={`M${gx - 6},${gy - 8} L${gx},${gy} L${gx + 6},${gy - 9} M${gx},${gy} L${gx + 1},${gy - 12}`} stroke="#2E5B2A" strokeWidth={2.5} fill="none" strokeLinecap="round" />;
              })}
          </g>

          {/* bulldozed moraine */}
          {moraineH > 1 && melt < 1 && (
            <g style={{filter: tintin ? undefined : theme.paperShadowSoft}}>
              <polygon points={moraine} fill={tintin ? '#8A5428' : '#8E5E3A'} stroke={tintin ? theme.ink : 'none'} strokeWidth={3.5} strokeLinejoin="round" />
              {Array.from({length: 10}).map((_, i) => (
                <circle key={i} cx={X + 8 + ((i * 37) % (MORAINE_W - 30))} cy={T(X) - 4 - ((i * 13) % Math.max(4, moraineH - 6))} r={4 + (i % 3) * 2} fill={tintin ? '#7D7B76' : '#8C939A'} stroke={tintin ? theme.ink : 'none'} strokeWidth={2} />
              ))}
            </g>
          )}

          {/* the ice sheet */}
          {X > BOX.x0 - 30 && melt < 1 && (
            <g opacity={1 - melt} transform={`translate(0,${-40 * melt})`}>
              {tintin ? (
                <>
                  <polygon points={icePoly} fill="#E6F5FA" />
                  <g clipPath="url(#g-ice)">
                    <g transform={`translate(${X},0)`}>
                      {rough && <RoughSvg paths={rough.iceHatch} color="#5FA8C8" width={1.6} opacity={0.55} />}
                    </g>
                    {[0.25, 0.45, 0.65].map((f, i) => {
                      const cx = X - ICE_L * f;
                      const ty = iceTop(cx);
                      return <path key={i} d={`M${cx},${ty} l14,46 l-18,30 l10,40`} stroke={theme.ink} strokeWidth={3} fill="none" strokeLinejoin="round" />;
                    })}
                    {Array.from({length: 22}).map((_, i) => {
                      const dx = 30 + ((i * 53) % 640);
                      const cx = X - dx;
                      return <circle key={i} cx={cx} cy={S(cx) - 8 - ((i * 7) % 22)} r={3 + (i % 3)} fill="#8A5428" stroke={theme.ink} strokeWidth={1.5} />;
                    })}
                  </g>
                  <polygon points={icePoly} fill="none" stroke={theme.ink} strokeWidth={4.5} strokeLinejoin="round" />
                </>
              ) : (
                <g style={{filter: theme.paperShadow}}>
                  <polygon points={icePoly} fill="#BFD9E6" transform="translate(0,10)" />
                  <polygon points={icePoly} fill="#D9EBF3" transform="translate(0,5)" />
                  <polygon points={icePoly} fill="#FAFDFE" />
                  <g clipPath="url(#g-ice)">
                    {[0.2, 0.42, 0.64].map((f, i) => {
                      const cx = X - ICE_L * f;
                      const ty = iceTop(cx);
                      return <path key={i} d={`M${cx - 10},${ty} L${cx + 10},${ty} L${cx + 2},${ty + 90} Z`} fill="#CFE3EE" />;
                    })}
                    {Array.from({length: 16}).map((_, i) => {
                      const dx = 30 + ((i * 53) % 640);
                      const cx = X - dx;
                      return <circle key={i} cx={cx} cy={S(cx) - 9 - ((i * 7) % 20)} r={4 + (i % 3)} fill="#9C6B43" />;
                    })}
                  </g>
                </g>
              )}
            </g>
          )}

          {/* flow arrow */}
          {arrowDraw > 0 && melt < 1 && (
            <g opacity={1 - melt} transform={`translate(${470},${244})`}>
              {tintin && rough ? (
                <RoughSvg paths={rough.arrow} color={theme.accent} width={9} draw={arrowDraw} />
              ) : (
                <rect x={0} y={-7} width={520 * arrowDraw} height={14} rx={7} fill={theme.accent} style={{filter: theme.paperShadowSoft}} />
              )}
              {arrowDraw > 0.9 && (
                <polygon points="548,0 506,-24 506,24" fill={theme.accent} stroke={tintin ? theme.ink : 'none'} strokeWidth={3} strokeLinejoin="round" style={{filter: tintin ? undefined : theme.paperShadowSoft}} />
              )}
              <text x={0} y={-24} fontFamily={tintin ? theme.labelFont : theme.displayFont} fontWeight={800} fontSize={tintin ? 30 : 22} letterSpacing={3} fill={theme.accent} opacity={arrowDraw}>
                ICE FLOWS SOUTH →
              </text>
            </g>
          )}
        </g>

        {tintin && (
          <rect x={BOX.x0} y={BOX.y0} width={BOX.x1 - BOX.x0} height={BOX.y1 - BOX.y0} fill="none" stroke={theme.ink} strokeWidth={7} opacity={sectionOpacity} />
        )}

        {/* labels */}
        <GlacierLabel theme={theme} x={1660} y={470} s={soilLabelS} text={p.topsoilLabel ?? 'TOPSOIL'} to={[1690, T(1690) + SOIL / 2]} small />
        <GlacierLabel theme={theme} x={Math.max(360, X - 470)} y={S(X - 470) - 150} s={iceLabelS * (1 - melt)} text={p.glacierLabel ?? 'ICE AGE GLACIER'} />
        <GlacierLabel theme={theme} x={720} y={430} s={rockLabelS} text={p.bedrockLabel ?? 'EXPOSED GRANITE BEDROCK'} to={[780, S(780) + 14]} tone="accent" />
        <GlacierLabel theme={theme} x={430} y={850} s={shieldLabelS} text="CANADIAN SHIELD · 2.5+ BILLION YRS OLD" small />

        {/* era tag */}
        <g transform={`translate(${BOX.x0 + 30},${BOX.y0 + 26})`} opacity={sectionOpacity}>
          <rect width={300} height={54} rx={tintin ? 2 : 27} fill={isToday ? theme.accent : tintin ? theme.ink : '#2B2D33'} />
          <text x={150} y={36} textAnchor="middle" fontFamily={theme.monoFont} fontWeight={700} fontSize={24} fill="#FFFFFF" letterSpacing={1}>
            {isToday ? 'TODAY' : '≈ 20,000 YRS AGO'}
          </text>
        </g>
      </svg>

      {/* title band */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 54,
          display: 'flex',
          justifyContent: 'center',
          transform: `translateY(${(1 - titleS) * -40}px) scale(${0.9 + 0.1 * titleS})`,
          opacity: Math.min(1, titleS * 2),
        }}
      >
        <div
          style={{
            padding: tintin ? '8px 30px 10px' : '12px 34px',
            background: tintin ? '#FFF6D5' : theme.cardBg,
            border: tintin ? `5px solid ${theme.ink}` : 'none',
            boxShadow: tintin ? `8px 8px 0 ${theme.ink}` : '0 8px 24px rgba(40,30,20,0.22), 0 2px 3px rgba(40,30,20,0.2)',
            borderRadius: tintin ? 2 : 999,
            fontFamily: theme.displayFont,
            fontWeight: 800,
            fontSize: tintin ? 50 : 34,
            letterSpacing: tintin ? 3 : 2,
            color: theme.ink,
          }}
        >
          {p.sectionTitle}
        </div>
      </div>

      {/* inset locator map */}
      <svg width={1920} height={1080} style={{position: 'absolute', left: 0, top: 0}}>
        <g transform={`translate(1660,300) scale(${insetS}) translate(-1660,-300)`} opacity={Math.min(1, insetS)}>
          <rect x={1500} y={200} width={316} height={196} rx={tintin ? 2 : 18} fill={tintin ? '#FFFDF6' : theme.cardBg} stroke={tintin ? theme.ink : 'none'} strokeWidth={4} style={{filter: tintin ? undefined : theme.paperShadow}} />
          <g transform={`translate(${insetTx},${insetTy}) scale(${insetK})`}>
            <path d={canadaD} fill={tintin ? '#CFD6DA' : '#8A96A2'} stroke={tintin ? theme.ink : 'none'} strokeWidth={2.2 / insetK} />
            <g clipPath="url(#g-inset-ca)">
              <path d={borderD} fill="none" stroke={theme.accent} strokeWidth={milesToBase(100) * 2} />
            </g>
            <line x1={secA[0]} y1={secA[1]} x2={secB[0]} y2={secB[1]} stroke={theme.ink} strokeWidth={4 / insetK} strokeDasharray={`${10 / insetK} ${6 / insetK}`} />
            <circle cx={secA[0]} cy={secA[1]} r={6 / insetK} fill={theme.ink} />
            <circle cx={secB[0]} cy={secB[1]} r={6 / insetK} fill={theme.ink} />
          </g>
          <text x={1512} y={386} fontFamily={theme.monoFont} fontWeight={700} fontSize={15} fill={theme.ink} opacity={0.7}>
            SECTION A—A′
          </text>
        </g>
      </svg>
    </AbsoluteFill>
  );
};
