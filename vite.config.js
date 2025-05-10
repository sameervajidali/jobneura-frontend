// // // vite.config.js
// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // export default defineConfig({
// //   plugins: [react()],
// // })


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

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@emotion/is-prop-valid'
    ]
  },
  // If you still see CJS left over, enable mixed‐module transforms:
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  resolve: {
    // Prefer the "module" or "jsnext:main" entrypoints, not the CJS one
    mainFields: ['module', 'jsnext:main', 'main']
  }
});
