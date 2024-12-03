import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pages': path.resolve(__dirname, 'src/pages'),
      'components': path.resolve(__dirname, 'src/components'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'types': path.resolve(__dirname, 'src/types'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'assets': path.resolve(__dirname, 'src/assets'),
    }
  }
});
