import path from 'node:path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    clearMocks: true,
    setupFiles: []
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
