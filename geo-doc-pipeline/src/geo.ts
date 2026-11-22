/**
 * Offline geography: Natural Earth via world-atlas (no network, no API keys).
 * All geometry is projected ONCE into a fixed 1920x1080 "base space";
 * cameras then move over it with cheap SVG transforms.
 */
import world from 'world-atlas/countries-50m.json';
import provincesJson from './data/canada_provinces.json';
import {feature, mesh} from 'topojson-client';
import {geoCentroid, geoConicConformal, geoGraticule10, geoPath} from 'd3-geo';
import type {Feature, FeatureCollection, Geometry, MultiLineString} from 'geojson';

const topo = world as any;
const countries = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry>;

export const CANADA_ID = '124';
export const USA_ID = '840';

const canadaF = countries.features.find((f) => f.id === CANADA_ID) as Feature;
const usaF = countries.features.find((f) => f.id === USA_ID) as Feature;

/** Lambert conformal conic tuned for Canada; Canada fills a 1580x860 box. */
export const projection = geoConicConformal()
  .parallels([49, 77])
  .rotate([96, 0])
  .fitExtent(
    [
      [170, 150],
      [1750, 1010],
    ],
    canadaF,
  )
  .clipExtent([
    [-5000, -5000],
    [7000, 6000],
  ]);

const path = geoPath(projection);

export const project = (lonlat: [number, number]) => projection(lonlat) as [number, number];

const roughlyVisible = (f: Feature) => {
  // Keep North/Central America, Greenland and Iceland. Eurasian countries crossing the projection's
  // cut meridian (84°E) would otherwise render long straight seams.
  const [lon, lat] = geoCentroid(f);
  return (lat > -2 && lon > -175 && lon < -10) || f.id === '352'; // + Iceland
};

export const worldPaths = countries.features
  .filter((f) => f.id !== CANADA_ID && f.id !== USA_ID && roughlyVisible(f))
  .map((f) => ({id: String(f.id), d: path(f) ?? ''}))
  .filter((p) => p.d.length > 0);

export const canadaD = path(canadaF) ?? '';
/** Canadian province / territory outlines (Natural Earth 1:50m admin-1, bundled offline). */
export const provincesD = path(provincesJson as unknown as FeatureCollection<Geometry>) ?? '';
export const usaD = path(usaF) ?? '';
export const graticuleD = path(geoGraticule10()) ?? '';
export const canadaBounds = path.bounds(canadaF);
export const canadaCentroid = path.centroid(canadaF) as [number, number];

/** US–Canada land border, excluding the Alaska segment. */
const borderMesh = mesh(
  topo,
  topo.objects.countries,
  (a: any, b: any) => (a.id === CANADA_ID && b.id === USA_ID) || (a.id === USA_ID && b.id === CANADA_ID),
) as unknown as MultiLineString;
const southBorder: MultiLineString = {
  type: 'MultiLineString',
  coordinates: borderMesh.coordinates.filter(
    (ls) => ls.reduce((s, p) => s + p[0], 0) / ls.length > -128,
  ),
};
export const borderD = path(southBorder) ?? '';
export const borderBounds = path.bounds(southBorder as any);

/** Projected width (base px) of N miles measured northward from 49°N. */
export const milesToBase = (miles: number) => {
  const km = miles * 1.609344;
  const a = project([-96, 49]);
  const b = project([-96, 49 + km / 111.2]);
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
};

/** Clip region "north of latitude L" as a base-space path (follows the conic arc). */
export const northOfLatD = (lat: number) => {
  const pts: [number, number][] = [];
  for (let lon = -175; lon <= -15; lon += 1) pts.push(project([lon, lat]));
  const first = pts[0];
  const last = pts[pts.length - 1];
  return (
    `M${first[0]},${first[1]}` +
    pts.map((p) => `L${p[0]},${p[1]}`).join('') +
    `L${last[0]},-6000L${first[0]},-6000Z`
  );
};

export interface City {
  name: string;
  lonlat: [number, number];
  big?: boolean;
  dx?: number;
  dy?: number;
}
export const CITIES: City[] = [
  {name: 'Vancouver', lonlat: [-123.12, 49.28], big: true, dx: -30, dy: 40},
  {name: 'Calgary', lonlat: [-114.07, 51.05], dy: -22},
  {name: 'Winnipeg', lonlat: [-97.14, 49.9], dy: -22},
  {name: 'Toronto', lonlat: [-79.38, 43.65], big: true, dx: -20, dy: 36},
  {name: 'Ottawa', lonlat: [-75.7, 45.42], dx: 10, dy: -26},
  {name: 'Montréal', lonlat: [-73.57, 45.5], big: true, dx: 60, dy: 30},
  {name: 'Halifax', lonlat: [-63.57, 44.65], dx: 10, dy: 30},
];

export const cityXY = (c: City) => project(c.lonlat);

export const LABELS = {
  canada: project([-112, 57.5]),
  usa: project([-100, 40.5]),
  hudson: project([-85.5, 59.5]),
  pacific: project([-138, 47]),
  atlantic: project([-55, 46.5]),
  greenland: project([-42, 72]),
};
