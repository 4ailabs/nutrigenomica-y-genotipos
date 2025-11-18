import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        target: 'es2015',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
          output: {
            manualChunks: (id) => {
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom')) {
                  return 'vendor';
                }
                if (id.includes('lucide-react')) {
                  return 'ui';
                }
                if (id.includes('react-markdown') || id.includes('remark-gfm')) {
                  return 'markdown';
                }
                if (id.includes('@google/genai')) {
                  return 'ai';
                }
                return 'vendor';
              }
            },
            chunkFileNames: 'assets/[name]-[hash].js',
            entryFileNames: 'assets/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]'
          }
        },
        chunkSizeWarningLimit: 1000,
        sourcemap: false,
        assetsInlineLimit: 4096
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'lucide-react'],
        exclude: ['@google/genai']
      },
      server: {
        port: 5173,
        host: true
      },
      preview: {
        port: 4173,
        host: true
      }
    };
});
