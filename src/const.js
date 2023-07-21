import { CHAINS } from '@debank/common/dist/index-rabby';

export const chains = Object.values(CHAINS).sort((a, b) => {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  return 1;
});