import React from 'react';

const TERMS = [
  { term: '勾配', description: 'パラメータ更新方向を決める微分値。' },
  { term: 'アテンション', description: '入力要素の重要度を学習して重み付けする仕組み。' },
  { term: '損失関数', description: 'モデル予測と正解の差異を数値化する関数。' },
];

export const GlossaryPage: React.FC = () => (
  <div className="glossary-page">
    <h1>AI用語集</h1>
    <p>レッスン内で登場する用語をクイックリファレンスとしてまとめました。</p>
    <dl>
      {TERMS.map((entry) => (
        <React.Fragment key={entry.term}>
          <dt id={entry.term}>{entry.term}</dt>
          <dd>{entry.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  </div>
);

export default GlossaryPage;
