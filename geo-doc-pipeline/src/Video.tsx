import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile} from 'remotion';
import timelineJson from './timeline.json';
import type {SceneProps, SceneTiming, Timeline, VideoProps} from './types';
import {getTheme} from './theme';
import {ensureFonts} from './fonts';
import {Background} from './components/Background';
import {SubtitleOverlay} from './components/SubtitleOverlay';
import {SceneTransition} from './components/SceneTransition';
import {TitleCard} from './scenes/TitleCard';
import {MapZoomScene} from './scenes/MapZoomScene';
import {BorderStripScene} from './scenes/BorderStripScene';
import {GlacierScene} from './scenes/GlacierScene';

export const timeline = timelineJson as unknown as Timeline;

/** scene.type (from script.json) → component. Add new scene types here. */
const REGISTRY: Record<string, React.FC<SceneProps>> = {
  titleCard: TitleCard,
  mapZoom: MapZoomScene,
  borderStrip: BorderStripScene,
  glacierSection: GlacierScene,
};

/** Which scene boundaries get a visual cut (otherwise scenes flow continuously, e.g. map → panel). */
const CONTINUOUS = new Set(['mapZoom>borderStrip']);

export const GeoDocVideo: React.FC<VideoProps> = ({theme: themeName, subtitleMode}) => {
  ensureFonts();
  const theme = getTheme(themeName);
  const scenes = timeline.scenes;
  const tf = timeline.transitionFrames;

  return (
    <AbsoluteFill style={{background: theme.bg}}>
      <Background theme={theme} />
      {scenes.map((s: SceneTiming, i) => {
        const Comp = REGISTRY[s.type];
        if (!Comp) throw new Error(`Unknown scene type "${s.type}" — register it in Video.tsx`);
        const prev = scenes[i - 1];
        const next = scenes[i + 1];
        const enter = !!prev && !CONTINUOUS.has(`${prev.type}>${s.type}`);
        const exit = !!next && !CONTINUOUS.has(`${s.type}>${next.type}`);
        const cue = (key: string, fallbackSec = 0) =>
          s.leadInFrames + Math.round((s.cues[key] ?? fallbackSec) * timeline.fps);
        return (
          <Sequence key={s.id} from={s.startFrame} durationInFrames={s.durationFrames} name={`${s.id} · ${s.type}`}>
            <SceneTransition theme={theme} duration={s.durationFrames} enter={enter} exit={exit} frames={tf}>
              <Comp scene={s} theme={theme} subtitleMode={subtitleMode} cue={cue} />
            </SceneTransition>
            {s.audio && (
              <Sequence from={s.leadInFrames} name={`${s.id} narration`}>
                <Html5Audio src={staticFile(s.audio)} />
              </Sequence>
            )}
          </Sequence>
        );
      })}
      <SubtitleOverlay theme={theme} mode={subtitleMode} timeline={timeline} />
    </AbsoluteFill>
  );
};
