import React, { useEffect, useState } from 'react';
import { ProgressStorage } from './storage';

interface ProgressTrackerProps {
  progressKey: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progressKey }) => {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = new ProgressStorage(globalThis.navigator?.onLine ? 'remote' : 'local');
    storage
      .load(progressKey)
      .then((record) => setCompleted(record?.completed ?? false))
      .finally(() => setLoading(false));
  }, [progressKey]);

  const toggle = async () => {
    const next = !completed;
    setCompleted(next);
    const storage = new ProgressStorage(globalThis.navigator?.onLine ? 'remote' : 'local');
    storage.save({ key: progressKey, completed: next, updatedAt: Date.now() });
  };

  return (
    <button
      className="progress-tracker"
      onClick={toggle}
      disabled={loading}
      aria-pressed={completed}
    >
      {completed ? '完了済み ✅' : '未完了'}
    </button>
  );
};
