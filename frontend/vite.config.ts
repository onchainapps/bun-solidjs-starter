import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3030',
      '/ws': {
        target: 'ws://localhost:3030',
        ws: true
      }
    }
  },
  build: {
    outDir: '../dist-frontend',
    emptyOutDir: true,
    target: 'esnext'
  }
});
