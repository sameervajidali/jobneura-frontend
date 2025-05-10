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
// vite.config.js



// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Emotion CJS helper
      '@emotion/is-prop-valid': path.resolve(
        __dirname,
        'node_modules/@emotion/is-prop-valid'
      ),
      // Node core polyfills
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
    }
  },
  optimizeDeps: {
    include: [
      '@emotion/is-prop-valid',
      'buffer',
      'process',
      'stream'
    ],
    esbuildOptions: {
      // Define global for modules expecting Node
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  }
})
