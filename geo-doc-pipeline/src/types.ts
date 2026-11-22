export type ThemeName = 'tintin' | 'paper3d';
export type SubtitleMode = 'ko' | 'en' | 'both' | 'none';

export interface Word {
  text: string;
  start: number;
  end: number;
}
export interface TimedLine {
  en: string;
  ko: string;
  start: number;
  end: number;
}
export interface SceneTiming {
  id: string;
  type: string;
  text: string;
  audio: string | null;
  audioDurationSec: number;
  audioDurationFrames: number;
  leadInFrames: number;
  durationFrames: number;
  startFrame: number;
  words: Word[];
  lines: TimedLine[];
  cues: Record<string, number>;
  params: Record<string, any>;
}
export interface Timeline {
  title: string;
  episode: string;
  fps: number;
  width: number;
  height: number;
  transitionFrames: number;
  totalFrames: number;
  totalSec: number;
  scenes: SceneTiming[];
}

export interface VideoProps {
  theme: ThemeName;
  subtitleMode: SubtitleMode;
}

/** Props passed to every scene component. */
export interface SceneProps {
  scene: SceneTiming;
  theme: import('./theme').Theme;
  subtitleMode: SubtitleMode;
  /** frame (scene-local) at which a narration cue word starts */
  cue: (key: string, fallbackSec?: number) => number;
}
