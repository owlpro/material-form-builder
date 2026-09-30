import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // the package source imports MUI from the root node_modules; one copy keeps theme and picker context shared
    dedupe: ['react', 'react-dom', '@mui/material', '@mui/icons-material', '@mui/x-date-pickers', '@emotion/react', '@emotion/styled', 'dayjs'],
    alias: {
      'material-form-builder': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
      'src': fileURLToPath(new URL('../src', import.meta.url)),
    },
  },
})
