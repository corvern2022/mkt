import type {ThemeName} from './types';

export interface Theme {
  name: ThemeName;
  bg: string;
  gridMinor: string;
  gridMajor: string;
  ink: string;
  accent: string;
  accentDark: string;
  ocean: string;
  land: string;
  usLand: string;
  canada: string;
  canadaNorth: string[]; // paper terraces, south -> north
  hatch: string;
  displayFont: string;
  labelFont: string;
  koFont: string;
  monoFont: string;
  cardBg: string;
  /** CSS filter value used for floating paper objects */
  paperShadow: string;
  paperShadowSoft: string;
}

const KO = '"Noto Sans KR", sans-serif';

export const THEMES: Record<ThemeName, Theme> = {
  tintin: {
    name: 'tintin',
    bg: '#F4F1EA',
    gridMinor: 'rgba(30,30,30,0.055)',
    gridMajor: 'rgba(30,30,30,0.11)',
    ink: '#1E1E1E',
    accent: '#D9381E',
    accentDark: '#A3260F',
    ocean: '#CFE2E3',
    land: '#EFE5CC',
    usLand: '#E6D9B8',
    canada: '#FBF8F0',
    canadaNorth: ['#FBF8F0'],
    hatch: '#1E1E1E',
    displayFont: '"Patrick Hand SC", "Comic Sans MS", cursive',
    labelFont: '"Patrick Hand SC", "Comic Sans MS", cursive',
    koFont: KO,
    monoFont: '"JetBrains Mono", monospace',
    cardBg: '#FFFDF6',
    paperShadow: 'none',
    paperShadowSoft: 'none',
  },
  paper3d: {
    name: 'paper3d',
    bg: '#E5E2DC',
    gridMinor: 'rgba(60,50,40,0.035)',
    gridMajor: 'rgba(60,50,40,0.06)',
    ink: '#2B2D33',
    accent: '#E63946',
    accentDark: '#A8222D',
    ocean: '#D6D3CC',
    land: '#F3EFE7',
    usLand: '#ECE6DA',
    canada: '#A9B3BD',
    canadaNorth: ['#A9B3BD', '#99A4AF', '#8A96A2', '#7D8995'],
    hatch: '#1E1E1E',
    displayFont: '"Montserrat", "Inter", sans-serif',
    labelFont: '"Montserrat", "Inter", sans-serif',
    koFont: KO,
    monoFont: '"JetBrains Mono", monospace',
    cardBg: '#FBF9F5',
    paperShadow:
      'drop-shadow(0px 2px 1px rgba(40,30,20,0.25)) drop-shadow(0px 8px 10px rgba(40,30,20,0.20)) drop-shadow(0px 22px 28px rgba(40,30,20,0.16))',
    paperShadowSoft:
      'drop-shadow(0px 1px 1px rgba(40,30,20,0.22)) drop-shadow(0px 5px 7px rgba(40,30,20,0.16))',
  },
};

export const getTheme = (name: ThemeName): Theme => THEMES[name] ?? THEMES.tintin;
