import rough from 'roughjs';
import type {Options} from 'roughjs/bin/core';

const gen = rough.generator();

export interface RoughPath {
  d: string;
  stroke: string;
  strokeWidth: number;
  fill?: string;
}

const cache = new Map<string, RoughPath[]>();

/** Memoised roughjs path generation. A fixed `seed` keeps strokes stable between frames. */
export const roughPaths = (key: string, make: (g: typeof gen) => ReturnType<typeof gen.path>) => {
  const hit = cache.get(key);
  if (hit) return hit;
  const res = gen.toPaths(make(gen)) as RoughPath[];
  cache.set(key, res);
  return res;
};

export const roughPath = (d: string, opts: Options, key?: string) =>
  roughPaths(key ?? `p:${d.length}:${d.slice(0, 40)}:${JSON.stringify(opts)}`, (g) => g.path(d, opts));

export const roughLine = (x1: number, y1: number, x2: number, y2: number, opts: Options) =>
  roughPaths(`l:${x1},${y1},${x2},${y2}:${JSON.stringify(opts)}`, (g) => g.line(x1, y1, x2, y2, opts));

export const roughRect = (x: number, y: number, w: number, h: number, opts: Options) =>
  roughPaths(`r:${x},${y},${w},${h}:${JSON.stringify(opts)}`, (g) => g.rectangle(x, y, w, h, opts));

export const roughPolygon = (pts: [number, number][], opts: Options) =>
  roughPaths(`g:${JSON.stringify(pts)}:${JSON.stringify(opts)}`, (g) => g.polygon(pts, opts));

export const roughEllipse = (x: number, y: number, w: number, h: number, opts: Options) =>
  roughPaths(`e:${x},${y},${w},${h}:${JSON.stringify(opts)}`, (g) => g.ellipse(x, y, w, h, opts));
