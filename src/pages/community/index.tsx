import React, { useEffect, useState } from 'react';

type Discussion = {
  id: string;
  title: string;
  author: string;
  replies: number;
};

export const CommunityPage: React.FC = () => {
  const [threads, setThreads] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/discussions')
      .then((response) => response.json())
      .then((data) => setThreads(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>コミュニティを読み込み中…</p>;

  return (
    <div className="community-page">
      <h1>コミュニティ</h1>
      <p>質問やTips、学習記録を共有しましょう。</p>
      <ul>
        {threads.map((thread) => (
          <li key={thread.id}>
            <h2>{thread.title}</h2>
            <p>
              投稿者: {thread.author} / 返信: {thread.replies}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommunityPage;
