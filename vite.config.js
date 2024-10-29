
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import sass from 'vite-plugin-sass-dts';

export default defineConfig({
  plugins: [react(), sass()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
