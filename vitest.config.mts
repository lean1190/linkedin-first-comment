import path from 'node:path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    setupFiles: [
      './src/lib/__mocks__/supabase.ts',
      './src/lib/__mocks__/server-actions.ts',
      './src/lib/__mocks__/inngest.ts'
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
