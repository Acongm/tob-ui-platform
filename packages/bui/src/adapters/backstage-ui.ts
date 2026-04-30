export type BuiAdapterStatus = 'fallback' | 'ready';

export type BuiAdapterMeta = {
  name: string;
  status: BuiAdapterStatus;
  source: '@backstage/ui' | 'local-fallback';
  reason: string;
};

export const buiAdapters: BuiAdapterMeta[] = [
  {
    name: 'Button',
    status: 'fallback',
    source: 'local-fallback',
    reason: '当前仓库先保留本地 wrapper，实现稳定 public API；后续替换为 @backstage/ui Button。'
  },
  {
    name: 'Card',
    status: 'fallback',
    source: 'local-fallback',
    reason: '当前仓库先保留本地 wrapper，实现统一 Card 语义；后续替换为 @backstage/ui Card 或等价 BUI primitive。'
  },
  {
    name: 'Stack',
    status: 'fallback',
    source: 'local-fallback',
    reason: '当前仓库先保留本地 flex wrapper；后续替换为 BUI layout primitive。'
  }
];
