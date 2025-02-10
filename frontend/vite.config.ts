import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  define: {
    'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://petek.vercel.app/api')
  },
  server: {
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material']
  }
})
