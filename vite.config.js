// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // strip the domain attribute so cookie ends up on your dev server
        cookieDomainRewrite: {
          // rewrite `Domain=localhost;` → no Domain (i.e. current host:5173)
          "localhost": ""
        },
      },
    },
  },
})
