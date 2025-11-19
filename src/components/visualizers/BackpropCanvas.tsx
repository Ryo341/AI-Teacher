import React, { useEffect, useRef } from 'react';

type Weight = { from: string; to: string; value: number };

const NETWORK = {
  layers: [
    { id: 'input', neurons: ['x1', 'x2'] },
    { id: 'hidden', neurons: ['h1', 'h2'] },
    { id: 'output', neurons: ['y'] },
  ],
  weights: [
    { from: 'x1', to: 'h1', value: 0.5 },
    { from: 'x1', to: 'h2', value: -0.3 },
    { from: 'x2', to: 'h1', value: 0.2 },
    { from: 'x2', to: 'h2', value: 0.8 },
    { from: 'h1', to: 'y', value: 1.1 },
    { from: 'h2', to: 'y', value: -0.6 },
  ] as Weight[],
};

export const BackpropCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    NETWORK.layers.forEach((layer, layerIndex) => {
      layer.neurons.forEach((neuron, neuronIndex) => {
        const x = 80 + layerIndex * 160;
        const y = 50 + neuronIndex * 100;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#4f46e5';
        ctx.stroke();
        ctx.fillStyle = '#111';
        ctx.fillText(neuron, x - 10, y + 4);
      });
    });

    NETWORK.weights.forEach((weight) => {
      const fromIndex = NETWORK.layers.flatMap((layer) => layer.neurons).indexOf(weight.from);
      const toIndex = NETWORK.layers.flatMap((layer) => layer.neurons).indexOf(weight.to);
      if (fromIndex === -1 || toIndex === -1) return;
      const fromLayer = NETWORK.layers.find((layer) => layer.neurons.includes(weight.from));
      const toLayer = NETWORK.layers.find((layer) => layer.neurons.includes(weight.to));
      if (!fromLayer || !toLayer) return;
      const fromLayerIndex = NETWORK.layers.indexOf(fromLayer);
      const toLayerIndex = NETWORK.layers.indexOf(toLayer);
      const fromY = 50 + fromLayer.neurons.indexOf(weight.from) * 100;
      const toY = 50 + toLayer.neurons.indexOf(weight.to) * 100;
      const fromX = 80 + fromLayerIndex * 160;
      const toX = 80 + toLayerIndex * 160;
      ctx.beginPath();
      ctx.moveTo(fromX + 20, fromY);
      ctx.lineTo(toX - 20, toY);
      ctx.strokeStyle = weight.value > 0 ? '#10b981' : '#ef4444';
      ctx.lineWidth = Math.abs(weight.value) + 1;
      ctx.stroke();
      ctx.fillStyle = '#000';
      ctx.fillText(weight.value.toFixed(2), (fromX + toX) / 2, (fromY + toY) / 2);
    });
  }, []);

  return (
    <figure>
      <canvas ref={canvasRef} width={480} height={240} aria-label="バックプロパゲーション可視化" />
      <figcaption>重みの符号と大きさで線の色と太さを変化させています。</figcaption>
    </figure>
  );
};
