import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 5173
  },
  resolve: {
    alias: {
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@config": "/src/config",
      "@context": "/src/context",
      "@helpers": "/src/helpers",
      "@hooks": "/src/hooks",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
    },
  },
})
