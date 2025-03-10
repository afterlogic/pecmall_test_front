import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3320,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'build',
    assetsInlineLimit: 0,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
});
