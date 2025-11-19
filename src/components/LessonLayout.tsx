import React from 'react';
import { ProgressTracker } from '../features/progress/ProgressTracker';
import { UnderstandingCheck } from './common/UnderstandingCheck';

export interface LessonLayoutProps {
  title: string;
  track: 'foundation' | 'core' | 'advanced';
  estimatedMinutes?: number;
  progressKey: string;
  children: React.ReactNode;
}

export const LessonLayout: React.FC<LessonLayoutProps> = ({
  title,
  track,
  estimatedMinutes = 30,
  progressKey,
  children,
}) => {
  return (
    <div className={`lesson-layout lesson-layout--${track}`}>
      <header>
        <div>
          <p className="track">{track.toUpperCase()}</p>
          <h1>{title}</h1>
          <p className="meta">所要時間: {estimatedMinutes}分</p>
        </div>
        <ProgressTracker progressKey={progressKey} />
      </header>
      <main>{children}</main>
      <UnderstandingCheck lessonId={progressKey} />
    </div>
  );
};
