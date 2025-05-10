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

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  // … above …
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
        NodeModulesPolyfillPlugin()
      ]
    },
    include: [
      '@emotion/is-prop-valid',
      'stream', 'buffer', 'process'
    ]
  },
  resolve: {
    alias: {
      stream: 'stream-browserify',
      buffer: 'buffer/',
      process: 'process/browser',
      '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
    }
  }
})
