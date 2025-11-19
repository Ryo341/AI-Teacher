import React, { useEffect, useState } from 'react';

interface Tip {
  id: string;
  author: string;
  body: string;
}

interface TipsPanelProps {
  lessonId: string;
}

export const TipsPanel: React.FC<TipsPanelProps> = ({ lessonId }) => {
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/lessons/${lessonId}/tips`)
      .then((response) => response.json())
      .then((data) => setTips(data))
      .finally(() => setLoading(false));
  }, [lessonId]);

  if (loading) return <p>Tipsを読み込み中…</p>;

  return (
    <section className="tips-panel">
      <h3>コミュニティTips</h3>
      {tips.length === 0 && <p>まだTipsがありません。最初の投稿者になりましょう！</p>}
      <ul>
        {tips.map((tip) => (
          <li key={tip.id}>
            <strong>{tip.author}</strong>
            <p>{tip.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
