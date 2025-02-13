import path from 'node:path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    clearMocks: true,
    setupFiles: ['./src/lib/__mocks__/supabase.ts']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
