import React, { useState } from 'react';

export const NotebookRunner: React.FC = () => {
  const [code, setCode] = useState('print("Hello, AI Teacher")');
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const runCode = async () => {
    setRunning(true);
    try {
      const pyodide = (window as any).loadPyodide ? await (window as any).loadPyodide() : null;
      if (!pyodide) {
        setOutput('Pyodideが読み込まれていません');
        return;
      }
      const result = await pyodide.runPythonAsync(code);
      setOutput(String(result));
    } catch (error: any) {
      setOutput(error?.message ?? '実行エラー');
    } finally {
      setRunning(false);
    }
  };

  return (
    <section className="notebook-runner">
      <textarea value={code} onChange={(event) => setCode(event.target.value)} />
      <button onClick={runCode} disabled={running}>
        {running ? '実行中…' : 'セルを実行'}
      </button>
      <pre aria-live="polite">{output}</pre>
    </section>
  );
};
