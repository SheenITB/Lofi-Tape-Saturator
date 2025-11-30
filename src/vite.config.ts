import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Relative paths for iPlug2 embedding
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    // Network Access Configuration
    host: true, // Listen on all addresses (0.0.0.0) - enables LAN access
    // Alternative: host: '0.0.0.0' - explicit notation
  },
  build: {
    outDir: 'build',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: undefined, // Single bundle for plugin
        // Asset naming for consistency
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
    // Optimize for embedding in VST3
    target: 'es2015',
    cssCodeSplit: false,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
