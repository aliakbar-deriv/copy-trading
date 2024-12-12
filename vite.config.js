import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      port: 8443,
    },
    base: './',
    define: {
      __APP_ENV__: env.APP_ENV
    }
  }
})
