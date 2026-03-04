import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    mainFields: ['module', 'main', 'browser'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-hook-form',
      '@hookform/resolvers/zod',
      'zod',
      'zustand',
      'axios',
      '@tanstack/react-query',
      'recharts',
      'react-hot-toast',
      'lucide-react',
      'socket.io-client',
      'clsx',
      'tailwind-merge',
    ],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
