import React from 'react';

const RESOURCES = [
  {
    category: '論文',
    items: [
      { title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', notes: 'Transformerの基礎' },
      { title: 'Scaling Laws for Neural Language Models', url: 'https://arxiv.org/abs/2001.08361', notes: 'スケーリング実験' },
    ],
  },
  {
    category: 'チュートリアル',
    items: [
      { title: 'Fast.ai Practical Deep Learning', url: 'https://course.fast.ai/', notes: '実践講座' },
      { title: 'MIT Introduction to Deep Learning', url: 'https://introtodeeplearning.com/', notes: 'MIT講義' },
    ],
  },
  {
    category: 'ツール',
    items: [
      { title: 'Weights & Biases', url: 'https://wandb.ai/', notes: '実験管理' },
      { title: 'Hugging Face Hub', url: 'https://huggingface.co/', notes: 'モデル共有' },
    ],
  },
];

export const ResourcesPage: React.FC = () => (
  <div className="resources-page">
    <h1>リソース集</h1>
    {RESOURCES.map((group) => (
      <section key={group.category}>
        <h2>{group.category}</h2>
        <ul>
          {group.items.map((item) => (
            <li key={item.title}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
              <p>{item.notes}</p>
            </li>
          ))}
        </ul>
      </section>
    ))}
  </div>
);

export default ResourcesPage;
