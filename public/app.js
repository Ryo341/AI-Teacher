const tracks = [
  {
    id: "foundation",
    title: "Foundation",
    summary: "数学・Python・データ前処理の基礎を固めてAIの土台を築く。",
    skills: ["Python", "線形代数", "微積・最適化"],
  },
  {
    id: "core",
    title: "Core",
    summary: "ニューラルネットのアーキテクチャと訓練プロセスを理解する。",
    skills: ["バックプロパゲーション", "CNN/RNN", "評価指標"],
  },
  {
    id: "advanced",
    title: "Advanced",
    summary: "Transformerや生成モデルなど最前線の技術を実装レベルで習得。",
    skills: ["Transformer", "最適化戦略", "デプロイ/監視"],
  },
];

const lessonCatalog = [
  { id: "foundation-math", title: "線形代数とベクトル", track: "foundation", topic: "数学" },
  { id: "foundation-python", title: "Pythonでデータを扱う", track: "foundation", topic: "Python" },
  { id: "foundation-ml", title: "ミニプロジェクト: ロジスティック回帰", track: "foundation", topic: "実装" },
  { id: "core-backprop", title: "バックプロパゲーションの仕組み", track: "core", topic: "ニューラルネット" },
  { id: "core-conv", title: "CNNで特徴抽出", track: "core", topic: "コンピュータビジョン" },
  { id: "core-nlp", title: "シーケンスモデリング", track: "core", topic: "NLP" },
  { id: "advanced-transformer", title: "Transformerの注意機構", track: "advanced", topic: "アーキテクチャ" },
  { id: "advanced-generative", title: "生成モデルと評価", track: "advanced", topic: "生成AI" },
  { id: "advanced-mlops", title: "MLOpsとデプロイ", track: "advanced", topic: "MLOps" },
];

const roadmapSteps = [
  {
    title: "Foundation",
    description: "数学・Python・データハンドリングをモジュール化し、可視化しながら理解。",
  },
  {
    title: "Core",
    description: "ニューラルネットの構造をキャンバスで確認し、Notebookで実装を追体験。",
  },
  {
    title: "Advanced",
    description: "Transformer/生成AI/MLOpsのワークロードを通しで設計し、運用ノウハウも学ぶ。",
  },
];

const glossary = [
  { term: "勾配降下法", description: "損失を最小化する方向にパラメータを微調整する最適化アルゴリズム。" },
  { term: "アテンション", description: "入力シーケンス内で重要な部分へ重み付けする仕組み。" },
  { term: "正則化", description: "過学習を防ぐためにパラメータや損失へ制約を設けるテクニック。" },
  { term: "MLOps", description: "モデル開発からデプロイ・監視までの運用プロセス。" },
];

const resources = {
  論文: [
    { title: "Attention is All You Need", url: "https://arxiv.org/abs/1706.03762", desc: "Transformerの原典" },
    { title: "Scaling Laws for Neural Language Models", url: "https://arxiv.org/abs/2001.08361", desc: "モデル規模と性能の関係" },
  ],
  講座: [
    { title: "fast.ai Practical Deep Learning", url: "https://course.fast.ai", desc: "実装重視の人気講座" },
    { title: "スタンフォードCS224N", url: "https://web.stanford.edu/class/cs224n/", desc: "NLPの定番コース" },
  ],
  ツール: [
    { title: "PyTorch", url: "https://pytorch.org", desc: "柔軟なDeep Learningフレームワーク" },
    { title: "Weights & Biases", url: "https://wandb.ai", desc: "実験管理プラットフォーム" },
  ],
};

const discussions = [
  { title: "Foundation #2の勉強法", author: "Yuki", summary: "線形代数を図解で理解するTips" },
  { title: "Core CNN演習で詰まった", author: "Ken", summary: "カーネルサイズとパディングの設定" },
  { title: "Advanced Transformer課題の共有", author: "Sara", summary: "マルチヘッド注意の可視化" },
];

const tips = [
  { title: "ベクトル演算はGeogebraで視覚化", contributor: "Aya" },
  { title: "勾配爆発はLayerNormで緩和", contributor: "Luis" },
  { title: "実務ではMLOpsの監視が肝", contributor: "Mei" },
];

const progressKey = "ai-teacher-progress";
let progressSet = new Set();
let quizBank = [];
let currentQuestion = null;
let correctCount = 0;
let totalCount = 0;

function loadProgress() {
  try {
    const saved = localStorage.getItem(progressKey);
    if (saved) {
      progressSet = new Set(JSON.parse(saved));
    }
  } catch (error) {
    console.error("progress load failed", error);
  }
}

function saveProgress() {
  localStorage.setItem(progressKey, JSON.stringify([...progressSet]));
}

function toggleLesson(id) {
  if (progressSet.has(id)) {
    progressSet.delete(id);
  } else {
    progressSet.add(id);
  }
  saveProgress();
  renderProgress();
}

function renderTrackCards() {
  const trackGrid = document.getElementById("track-grid");
  trackGrid.innerHTML = "";
  tracks.forEach((track) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <span class="card__tag">${track.title}</span>
      <h3>${track.summary}</h3>
      <ul>
        ${track.skills.map((skill) => `<li>${skill}</li>`).join("")}
      </ul>
    `;
    trackGrid.appendChild(card);
  });
}

function renderRoadmap() {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";
  roadmapSteps.forEach((step, index) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `
      <div class="timeline-item__title">${index + 1}. ${step.title}</div>
      <p>${step.description}</p>
    `;
    timeline.appendChild(item);
  });
}

function renderProgress() {
  const list = document.getElementById("progress-list");
  list.innerHTML = "";
  lessonCatalog.forEach((lesson) => {
    const row = document.createElement("div");
    row.className = "progress-list__item";
    const info = document.createElement("div");
    info.innerHTML = `<strong>${lesson.title}</strong><p>${lesson.track.toUpperCase()} / ${lesson.topic}</p>`;
    const button = document.createElement("button");
    button.textContent = progressSet.has(lesson.id) ? "完了済" : "完了";
    button.ariaPressed = progressSet.has(lesson.id);
    button.addEventListener("click", () => toggleLesson(lesson.id));
    row.append(info, button);
    list.appendChild(row);
  });

  const summary = document.getElementById("progress-summary");
  const fill = document.getElementById("progress-bar-fill");
  const percent = Math.round((progressSet.size / lessonCatalog.length) * 100);
  summary.textContent = `${progressSet.size} / ${lessonCatalog.length} レッスン完了 (${percent}%)`;
  fill.style.width = `${percent}%`;
}

async function drawLossChart() {
  const canvas = document.getElementById("loss-chart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  try {
    const res = await fetch("./examples/sample-loss.json");
    const data = await res.json();
    const { epochs, loss } = data;
    const padding = 30;
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    const maxLoss = Math.max(...loss);
    const minLoss = Math.min(...loss);

    ctx.strokeStyle = "#6ae0c9";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    loss.forEach((value, index) => {
      const x = padding + (index / (epochs.length - 1)) * (width - padding * 2);
      const y =
        height - padding - ((value - minLoss) / (maxLoss - minLoss + 0.0001)) * (height - padding * 2);
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
  } catch (error) {
    ctx.fillStyle = "#fdd";
    ctx.fillText("データ読込に失敗", 40, canvas.height / 2);
  }
}

function renderHeatmap() {
  const container = document.getElementById("heatmap");
  if (!container) return;
  container.innerHTML = "";
  const grid = [
    [0.9, 0.6, 0.3, 0.1, 0.05],
    [0.7, 0.65, 0.4, 0.18, 0.09],
    [0.4, 0.52, 0.6, 0.32, 0.2],
    [0.18, 0.3, 0.5, 0.58, 0.33],
    [0.05, 0.12, 0.25, 0.42, 0.71],
  ];
  grid.forEach((row) => {
    row.forEach((value) => {
      const cell = document.createElement("div");
      cell.className = "heatmap-cell";
      const opacity = Math.max(0.1, value);
      cell.style.background = `rgba(106, 224, 201, ${opacity})`;
      cell.textContent = value.toFixed(2);
      cell.title = `注意重み: ${value.toFixed(2)}`;
      container.appendChild(cell);
    });
  });
}

function setupPlayground() {
  const lrSlider = document.getElementById("lr-slider");
  const batchSlider = document.getElementById("batch-slider");
  const lrValue = document.getElementById("lr-value");
  const batchValue = document.getElementById("batch-value");
  const output = document.getElementById("playground-output");

  const update = () => {
    const lr = Number(lrSlider.value);
    const batch = Number(batchSlider.value);
    lrValue.textContent = lr.toFixed(2);
    batchValue.textContent = batch;
    const stability = Math.max(0, 1 - Math.abs(lr - 0.1) * 2);
    const throughput = Math.min(1, batch / 128);
    const score = (0.6 * stability + 0.4 * throughput) * 100;
    output.innerHTML = `
      <p>推定安定度: <strong>${Math.round(stability * 100)}%</strong></p>
      <p>推定スループット: <strong>${Math.round(throughput * 100)}%</strong></p>
      <p>総合スコア: <strong>${Math.round(score)}</strong> / 100</p>
      <p class="muted">学習率は0.05〜0.2、バッチサイズは64〜160でバランスが良好です。</p>
    `;
  };

  lrSlider.addEventListener("input", update);
  batchSlider.addEventListener("input", update);
  update();
}

async function loadQuizBank() {
  const response = await fetch("./data/quizzes.json");
  quizBank = await response.json();
  nextQuestion();
}

function nextQuestion() {
  const level = document.getElementById("quiz-level").value;
  const filtered = quizBank.filter((q) => q.track === level);
  if (filtered.length === 0) return;
  currentQuestion = filtered[Math.floor(Math.random() * filtered.length)];
  const questionEl = document.getElementById("quiz-question");
  const optionsEl = document.getElementById("quiz-options");
  const feedbackEl = document.getElementById("quiz-feedback");

  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";
  currentQuestion.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => checkAnswer(index));
    li.appendChild(button);
    optionsEl.appendChild(li);
  });
}

function checkAnswer(index) {
  if (!currentQuestion) return;
  const feedbackEl = document.getElementById("quiz-feedback");
  totalCount += 1;
  if (index === currentQuestion.answerIndex) {
    correctCount += 1;
    feedbackEl.textContent = `正解! ${currentQuestion.rationale}`;
    feedbackEl.style.color = "#6ae0c9";
  } else {
    const correct = currentQuestion.choices[currentQuestion.answerIndex];
    feedbackEl.textContent = `不正解。正解: ${correct} / ${currentQuestion.rationale}`;
    feedbackEl.style.color = "#ff9f9f";
  }
  adaptLevel();
}

function adaptLevel() {
  const ratio = correctCount / Math.max(1, totalCount);
  const select = document.getElementById("quiz-level");
  if (ratio > 0.8 && select.value !== "advanced") {
    select.value = select.value === "foundation" ? "core" : "advanced";
  } else if (ratio < 0.4 && select.value !== "foundation") {
    select.value = select.value === "advanced" ? "core" : "foundation";
  }
  nextQuestion();
}

function renderGlossary() {
  const list = document.getElementById("glossary-list");
  glossary.forEach((item) => {
    const dt = document.createElement("dt");
    dt.textContent = item.term;
    const dd = document.createElement("dd");
    dd.textContent = item.description;
    list.append(dt, dd);
  });
}

function renderResources() {
  const container = document.getElementById("resource-list");
  Object.entries(resources).forEach(([category, items]) => {
    const card = document.createElement("article");
    card.className = "resource-card";
    card.innerHTML = `<h3>${category}</h3>`;
    const ul = document.createElement("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${item.url}" target="_blank" rel="noreferrer">${item.title}</a><p>${item.desc}</p>`;
      ul.appendChild(li);
    });
    card.appendChild(ul);
    container.appendChild(card);
  });
}

function renderCommunity() {
  const discussionList = document.getElementById("discussion-list");
  discussions.forEach((d) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${d.title}</strong><p>${d.summary} — ${d.author}</p>`;
    discussionList.appendChild(li);
  });

  const tipsList = document.getElementById("tips-list");
  tips.forEach((tip) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${tip.title}</strong><p>${tip.contributor}</p>`;
    tipsList.appendChild(li);
  });

  const challengeBtn = document.getElementById("join-challenge");
  const feedback = document.getElementById("challenge-feedback");
  challengeBtn.addEventListener("click", () => {
    feedback.textContent = "参加登録ありがとうございます！ディスカッションスレッドをメールで共有しました。";
    feedback.style.color = "#6ae0c9";
  });
}

function init() {
  renderTrackCards();
  renderRoadmap();
  loadProgress();
  renderProgress();
  drawLossChart();
  renderHeatmap();
  setupPlayground();
  renderGlossary();
  renderResources();
  renderCommunity();
  loadQuizBank();

  document.getElementById("next-question").addEventListener("click", () => nextQuestion());
  document.getElementById("quiz-level").addEventListener("change", () => nextQuestion());
}

document.addEventListener("DOMContentLoaded", init);
