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
  /** text outline colour used behind map labels */
  halo: string;
  /** muted tag colour on the "empty north" card */
  tagMuted: string;
  /** colours for the glacier cross-section (non-tintin themes) */
  glacier: GlacierPalette;
}

export interface GlacierPalette {
  panel: string;
  bedrock: string;
  layers: [string, string, string];
  crack: string;
  lake: string;
  soil: string;
  grass: string;
  moraine: string;
  stone: string;
  ice: [string, string, string];
  iceBump: string;
  inset: string;
  pill: string;
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
    halo: '#FFFDF6',
    tagMuted: '#3F5E73',
    // tintin draws its own palette in the scene files; kept for type completeness
    glacier: {
      panel: '#D7E9EE',
      bedrock: '#B8B6B0',
      layers: ['#B8B6B0', '#B8B6B0', '#B8B6B0'],
      crack: '#1E1E1E',
      lake: '#7FB7D0',
      soil: '#9A6234',
      grass: '#2E5B2A',
      moraine: '#8A5428',
      stone: '#7D7B76',
      ice: ['#E6F5FA', '#E6F5FA', '#E6F5FA'],
      iceBump: '#5FA8C8',
      inset: '#CFD6DA',
      pill: '#1E1E1E',
    },
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
    halo: '#FBF9F5',
    tagMuted: '#6E7C89',
    glacier: {
      panel: '#E4E9EC',
      bedrock: '#9FA6AD',
      layers: ['#929AA2', '#858D96', '#79818A'],
      crack: '#6C747C',
      lake: '#8FB5C8',
      soil: '#9C6B43',
      grass: '#86A86E',
      moraine: '#8E5E3A',
      stone: '#8C939A',
      ice: ['#BFD9E6', '#D9EBF3', '#FAFDFE'],
      iceBump: '#CFE3EE',
      inset: '#8A96A2',
      pill: '#2B2D33',
    },
  },
  hud: {
    name: 'hud',
    bg: '#06121C',
    gridMinor: 'rgba(60,210,230,0.07)',
    gridMajor: 'rgba(60,210,230,0.16)',
    ink: '#BDF4F8',
    accent: '#FF7A1A',
    accentDark: '#C4480A',
    ocean: '#081B28',
    land: '#0C2636',
    usLand: '#0D2A3A',
    canada: '#0F3A4A',
    canadaNorth: ['#0F3A4A'],
    hatch: '#3CD2E6',
    displayFont: '"Montserrat", "Inter", sans-serif',
    labelFont: '"Montserrat", "Inter", sans-serif',
    koFont: KO,
    monoFont: '"JetBrains Mono", monospace',
    cardBg: '#0A2130',
    paperShadow: 'drop-shadow(0px 0px 2px rgba(60,220,240,0.55)) drop-shadow(0px 0px 14px rgba(40,200,230,0.28))',
    paperShadowSoft: 'drop-shadow(0px 0px 6px rgba(60,220,240,0.3))',
    halo: '#06121C',
    tagMuted: '#2E7C8C',
    glacier: {
      panel: '#071A26',
      bedrock: '#0F3646',
      layers: ['#0D2F3E', '#0B2836', '#092230'],
      crack: '#3CD2E6',
      lake: '#2FB7C9',
      soil: '#1F6670',
      grass: '#3CD2E6',
      moraine: '#2A8796',
      stone: '#58C9D8',
      ice: ['#0C3A4C', '#115067', '#1A7A94'],
      iceBump: '#2FA8BF',
      inset: '#14586A',
      pill: '#0F3646',
    },
  },
};

export const getTheme = (name: ThemeName): Theme => THEMES[name] ?? THEMES.tintin;
