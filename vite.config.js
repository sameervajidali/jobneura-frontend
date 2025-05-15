// // vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import path from 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       // make @ point to your src/ directory
//       '@': path.resolve(__dirname, 'src'),
//     },
//   },
// })

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // Proxy any request starting with /api to your backend
      '/api': {
        target: 'https://api.jobneura.tech',
        changeOrigin: true,    // pretend the request comes from the backend’s origin
        secure: true,          // verify SSL certificate
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
});

