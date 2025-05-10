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
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// these imports come from the packages you just installed
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin }  from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // tell Vite to use the browser‐safe stream polyfill
      stream: 'stream-browserify'
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        // axios/browser expects a global, so polyfill it
        global: 'globalThis'
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,   // polyfill Buffer
          process: true   // polyfill process.env
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  }
})
