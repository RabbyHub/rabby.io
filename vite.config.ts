import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // @rabby-wallet/rabby-api reads this CRA-provided value in the browser.
    'process.env.release': JSON.stringify(process.env.npm_package_version ?? '0.0.0'),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
