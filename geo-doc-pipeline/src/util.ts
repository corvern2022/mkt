import {Easing, interpolate, spring} from 'remotion';

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

/** Linear 0..1 progress between two frames, optional easing. */
export const prog = (
  frame: number,
  from: number,
  dur: number,
  ease: (t: number) => number = Easing.inOut(Easing.cubic),
) => ease(clamp01((frame - from) / Math.max(1, dur)));

/** Spring-physics pop that starts at `from` (frames). */
export const pop = (
  frame: number,
  fps: number,
  from: number,
  cfg: {damping?: number; stiffness?: number; mass?: number} = {},
) =>
  spring({
    frame: frame - from,
    fps,
    config: {damping: cfg.damping ?? 11, stiffness: cfg.stiffness ?? 140, mass: cfg.mass ?? 0.8},
  });

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export interface Cam {
  /** base-space point that sits at the viewport centre */
  cx: number;
  cy: number;
  /** zoom */
  k: number;
  /** viewport centre on screen */
  vx: number;
  vy: number;
}
export const camTransform = (c: Cam) =>
  `translate(${c.vx},${c.vy}) scale(${c.k}) translate(${-c.cx},${-c.cy})`;
export const toScreen = (c: Cam, p: [number, number]): [number, number] => [
  c.vx + (p[0] - c.cx) * c.k,
  c.vy + (p[1] - c.cy) * c.k,
];
export const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({
  cx: lerp(a.cx, b.cx, t),
  cy: lerp(a.cy, b.cy, t),
  // zoom interpolates geometrically so it feels like constant-speed flight
  k: a.k * Math.pow(b.k / a.k, t),
  vx: lerp(a.vx, b.vx, t),
  vy: lerp(a.vy, b.vy, t),
});

export const fmt = (n: number) => Math.round(n).toLocaleString('en-US');

export {interpolate, Easing};
