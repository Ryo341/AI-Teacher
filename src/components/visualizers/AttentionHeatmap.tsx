import React from 'react';

const TOKENS = ['[CLS]', 'I', 'love', 'AI'];
const ATTENTION = [
  [0.4, 0.2, 0.2, 0.2],
  [0.1, 0.5, 0.3, 0.1],
  [0.1, 0.2, 0.5, 0.2],
  [0.2, 0.2, 0.2, 0.4],
];

export const AttentionHeatmap: React.FC = () => {
  return (
    <table className="attention-heatmap">
      <thead>
        <tr>
          <th>Query ↓ / Key →</th>
          {TOKENS.map((token) => (
            <th key={token}>{token}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ATTENTION.map((row, rowIndex) => (
          <tr key={TOKENS[rowIndex]}>
            <th>{TOKENS[rowIndex]}</th>
            {row.map((value, colIndex) => (
              <td
                key={`${rowIndex}-${colIndex}`}
                style={{ backgroundColor: `rgba(79, 70, 229, ${value})` }}
              >
                {value.toFixed(2)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
