import quizzes from '../../../data/quizzes.json';

export type QuizQuestion = typeof quizzes[number];

export interface QuizSessionState {
  history: { id: string; correct: boolean }[];
  difficulty: number;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export class AdaptiveQuizEngine {
  private state: QuizSessionState = { history: [], difficulty: 1 };

  get nextQuestion(track?: string): QuizQuestion | null {
    const filtered = quizzes.filter((q) => (track ? q.track === track : true));
    const target = filtered.find((q) => q.difficulty === this.state.difficulty);
    return target ?? filtered[0] ?? null;
  }

  submitAnswer(questionId: string, choiceIndex: number) {
    const question = quizzes.find((q) => q.id === questionId);
    if (!question) return;
    const correct = question.answerIndex === choiceIndex;
    this.state.history.push({ id: questionId, correct });
    const delta = correct ? 1 : -1;
    this.state.difficulty = clamp(this.state.difficulty + delta, 1, 3);
  }
}
