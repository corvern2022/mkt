import type React from 'react';
import type {Theme} from '../theme';

export const isTintin = (t: Theme) => t.name === 'tintin';
export const isHud = (t: Theme) => t.name === 'hud';

/** Card chrome for each theme: ligne-claire box / floating paper / glowing HUD panel. */
export const cardStyle = (theme: Theme, radius = 22): React.CSSProperties => {
  if (isTintin(theme))
    return {background: '#FFF6D5', border: `5px solid ${theme.ink}`, boxShadow: `9px 9px 0 ${theme.ink}`, borderRadius: 3};
  if (isHud(theme))
    return {background: theme.cardBg, border: '1.5px solid rgba(60,220,240,0.65)', boxShadow: '0 0 24px rgba(40,200,230,0.25)', borderRadius: 8};
  return {background: theme.cardBg, borderRadius: radius, filter: theme.paperShadow};
};

/** Small label font: hand-lettered for tintin, display font otherwise. */
export const labelFont = (theme: Theme) => (isTintin(theme) ? theme.labelFont : theme.displayFont);

/** Colour used for "cold / ice" overlays. */
export const iceColor = (theme: Theme) => (isTintin(theme) ? '#8EC3DD' : isHud(theme) ? '#3CD2E6' : '#B7D0DF');
