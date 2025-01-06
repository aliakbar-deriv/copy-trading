import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { PROD_CONFIG } from './src/config'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const isDev = mode === 'development'
  const base = '/copy-trading/'

  console.log('Loaded environment variables:', {
    APP_ID: env.VITE_APP_ID || PROD_CONFIG.APP_ID,
    WS_URL: env.VITE_WS_URL || PROD_CONFIG.WS_URL,
    OAUTH_URL: env.VITE_OAUTH_URL || PROD_CONFIG.OAUTH_URL
  })

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: 'prompt',
        injectRegister: 'inline',
        includeAssets: [
          'favicon.ico',
          'apple-touch-icon.png',
          'masked-icon.svg',
          'pwa-192x192.png',
          'pwa-512x512.png'
        ],
        manifest: {
          name: 'Deriv Copy Trading',
          short_name: 'Copy Trading',
          description: 'Copy successful traders and automatically replicate their trading strategies in real-time.',
          theme_color: '#FF444F',
          background_color: '#FFFFFF',
          display: 'standalone',
          start_url: '/copy-trading/',
          scope: '/copy-trading/',
          categories: ['finance', 'trading'],
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: 'pwa-maskable-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'maskable'
            },
            {
              src: 'pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          shortcuts: [
            {
              name: 'Dashboard',
              url: '#/dashboard',
              description: 'View your copy trading dashboard and monitor performance',
              icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }]
            }
          ],
          screenshots: [
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              label: 'Copy Trading Dashboard Mobile View',
              form_factor: 'narrow'
            },
            {
              src: 'desktop-screenshot.png',
              sizes: '1128x635',
              type: 'image/png',
              label: 'Copy Trading Dashboard Desktop View',
              form_factor: 'wide',
              platform: 'web'
            }
          ],
          protocol_handlers: [
            {
              protocol: 'web+copytrading',
              url: '/copy-trading/handle-protocol?url=%s'
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.deriv\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ],
          cleanupOutdatedCaches: true,
          skipWaiting: true,
          clientsClaim: true,
          sourcemap: true
        },
        devOptions: {
          enabled: true,
          type: 'module',
          navigateFallback: 'index.html',
          suppressWarnings: true
        },
        strategies: 'generateSW',
        minify: true,
        manifestFilename: 'manifest.webmanifest',
        includeManifestIcons: true,
        registerSW: true,
        buildBase: base,
        base: base,
        scope: base
      })
    ],
    server: {
      port: 8443
    },
    define: {
      'import.meta.env.VITE_APP_ID': JSON.stringify(env.VITE_APP_ID || PROD_CONFIG.APP_ID),
      'import.meta.env.VITE_WS_URL': JSON.stringify(env.VITE_WS_URL || PROD_CONFIG.WS_URL),
      'import.meta.env.VITE_OAUTH_URL': JSON.stringify(env.VITE_OAUTH_URL || PROD_CONFIG.OAUTH_URL),
      __APP_ENV__: env.APP_ENV
    }
  }
})
