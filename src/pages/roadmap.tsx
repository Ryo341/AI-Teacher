import React from 'react';

const TRACKS = [
  {
    id: 'foundation',
    label: 'Foundation',
    color: '#0ea5e9',
    lessons: [
      { id: 'math-basics', title: '線形代数と微積の基礎', duration: '45分' },
      { id: 'python-primer', title: 'Pythonで学ぶ数値計算', duration: '30分' },
      { id: 'probability', title: '確率・統計インタラクティブ', duration: '40分' },
    ],
  },
  {
    id: 'core',
    label: 'Core',
    color: '#f97316',
    lessons: [
      { id: 'nn-forward', title: 'ニューラルネットの順伝播', duration: '50分' },
      { id: 'backprop', title: 'バックプロパゲーションを体感', duration: '50分' },
      { id: 'training-pipeline', title: '学習パイプライン設計', duration: '60分' },
    ],
  },
  {
    id: 'advanced',
    label: 'Advanced',
    color: '#a855f7',
    lessons: [
      { id: 'transformers', title: 'Transformer内部構造', duration: '60分' },
      { id: 'scaling-laws', title: 'スケーリング法則実験', duration: '50分' },
      { id: 'deployment', title: 'LLMアプリ応用', duration: '45分' },
    ],
  },
];

export const RoadmapPage: React.FC = () => {
  return (
    <div className="roadmap-page">
      <h1>AIロードマップ</h1>
      <p>Foundation → Core → Advancedの順で学習すると理解がスムーズです。</p>
      <div className="roadmap-grid">
        {TRACKS.map((track) => (
          <section key={track.id} style={{ borderColor: track.color }}>
            <h2>{track.label}</h2>
            <ol>
              {track.lessons.map((lesson, index) => (
                <li key={lesson.id}>
                  <span className="order">{index + 1}</span>
                  <div>
                    <p className="title">{lesson.title}</p>
                    <p className="duration">{lesson.duration}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
};

export default RoadmapPage;
