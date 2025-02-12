/**
 * @filename: .lintstagedrc.ts
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}': ['npm run check:staged'],
  '*.{ts,tsx}': [() => 'npx tsc --skipLibCheck --noEmit']
};
