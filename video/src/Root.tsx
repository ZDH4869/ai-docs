import React from 'react';
import {Composition} from 'remotion';
import {AiEvolution} from './AiEvolution';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AiEvolution"
      component={AiEvolution}
      durationInFrames={1680}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{}}
    />
  );
};
