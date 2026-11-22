import React from 'react';
import {Composition} from 'remotion';
import {GeoDocVideo, timeline} from './Video';
import type {VideoProps} from './types';

const defaultProps: VideoProps = {theme: 'tintin', subtitleMode: 'ko'};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="GeoDoc"
      component={GeoDocVideo as unknown as React.FC<Record<string, unknown>>}
      durationInFrames={timeline.totalFrames}
      fps={timeline.fps}
      width={timeline.width}
      height={timeline.height}
      defaultProps={defaultProps as unknown as Record<string, unknown>}
    />
  </>
);
