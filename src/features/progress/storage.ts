export type ProgressRecord = {
  key: string;
  completed: boolean;
  updatedAt: number;
};

type StorageMode = 'local' | 'remote';

export class ProgressStorage {
  private mode: StorageMode;
  private endpoint = '/api/progress';

  constructor(mode: StorageMode) {
    this.mode = mode;
  }

  async load(key: string): Promise<ProgressRecord | null> {
    if (this.mode === 'local') {
      const raw = globalThis.localStorage?.getItem(`progress:${key}`);
      return raw ? (JSON.parse(raw) as ProgressRecord) : null;
    }
    const response = await fetch(`${this.endpoint}/${key}`);
    if (!response.ok) return null;
    return (await response.json()) as ProgressRecord;
  }

  async save(record: ProgressRecord) {
    if (this.mode === 'local') {
      globalThis.localStorage?.setItem(`progress:${record.key}`, JSON.stringify(record));
      return;
    }
    await fetch(`${this.endpoint}/${record.key}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
  }
}
