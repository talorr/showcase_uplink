import { fileURLToPath, URL } from 'node:url'
import manifestSRI from 'vite-plugin-manifest-sri'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    manifestSRI({
      // Этот плагин сгенерирует SRI атрибуты (хэши) для ресурсов
      hashAlgorithm: 'sha384'
    }),
  ],
  server:{port: 3006},
  build: {
    manifest: true,
    target: "ES2022",
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
        manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
            if(id.includes('.scss')) {
              'styles'
            }
            if (id.includes('src/views') && id.includes('vue')) {
              const componentPath = id.toString().split('src/views')[1];
              const pathSegments = componentPath.split('/');
              if(pathSegments.length === 3) {
                return pathSegments[1];
              } 
            }
        }
      }
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets-images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
      '@scss': fileURLToPath(new URL('./src/assets/style', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
    }
  }
})
