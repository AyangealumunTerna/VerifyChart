import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // 👇 Only use base path in production (GitHub Pages)
  base: mode === 'production' ? '/VerifyChart/' : '/',

  build: {
    outDir: 'dist',   // 👈 MUST be dist (or any folder NOT root)
    emptyOutDir: true
  }
}))
