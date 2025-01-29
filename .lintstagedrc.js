const config = {
  '*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}': ['npm run check:staged'],
  '*.{ts,tsx}': [() => 'npx tsc --skipLibCheck --noEmit']
};

export default config;
