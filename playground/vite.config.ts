import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'material-form-builder': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      'src': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
})
