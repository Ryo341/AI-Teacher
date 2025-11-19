import React, { useState } from 'react';

interface UnderstandingCheckProps {
  lessonId: string;
}

const QUESTIONS = [
  {
    id: 'concept',
    label: '主要な概念を他の人に説明できる',
  },
  {
    id: 'code',
    label: '代表的なコード例を自力で書ける',
  },
  {
    id: 'apply',
    label: '応用課題のアイデアが思いつく',
  },
];

export const UnderstandingCheck: React.FC<UnderstandingCheckProps> = ({ lessonId }) => {
  const [state, setState] = useState<Record<string, boolean>>({});

  return (
    <section className="understanding-check" aria-labelledby={`${lessonId}-check`}>
      <h2 id={`${lessonId}-check`}>理解度チェック</h2>
      <ul>
        {QUESTIONS.map((question) => (
          <li key={question.id}>
            <label>
              <input
                type="checkbox"
                checked={state[question.id] ?? false}
                onChange={() =>
                  setState((prev) => ({ ...prev, [question.id]: !(prev[question.id] ?? false) }))
                }
              />
              {question.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
};
