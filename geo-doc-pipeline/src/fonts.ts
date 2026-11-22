// Fonts are bundled from npm (Fontsource) so rendering works fully offline.
import '@fontsource/noto-sans-kr/500.css';
import '@fontsource/noto-sans-kr/700.css';
import '@fontsource/noto-sans-kr/900.css';
import '@fontsource/patrick-hand-sc/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/700.css';
import {continueRender, delayRender} from 'remotion';

const FAMILIES = [
  '500 20px "Noto Sans KR"',
  '700 20px "Noto Sans KR"',
  '900 20px "Noto Sans KR"',
  '400 20px "Patrick Hand SC"',
  '800 20px "Montserrat"',
  '700 20px "Montserrat"',
  '500 20px "Montserrat"',
  '700 20px "JetBrains Mono"',
];

let started = false;
export const ensureFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Loading fonts');
  // Korean glyphs live in unicode-range subsets: request them explicitly.
  Promise.all(FAMILIES.map((f) => document.fonts.load(f, '캐나다 ABC 0123')))
    .then(() => document.fonts.ready)
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
