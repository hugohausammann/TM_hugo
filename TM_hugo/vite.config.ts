import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/TM_hugo/',
  plugins: [
    vue(),
    tailwindcss(),

    // Transforme le jeu en application installable (PWA)
    VitePWA({
      // Quand une nouvelle version est en ligne, elle s'installe toute seule
      registerType: 'autoUpdate',

      // ① Le manifeste : la carte d'identité de l'application
      manifest: {
        name: 'Takuzu',
        short_name: 'Takuzu',
        description: 'Jeu de Takuzu de Hugo Hausammann',
        lang: 'fr',
        theme_color: '#1E2A3B',
        background_color: '#E8EEF5',
        display: 'standalone',
        // ② Les icônes
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },

      // ③ Le service worker : ce qu'il garde dans le cache pour le mode hors ligne
      workbox: {
        // Le code, les images ET les sons
        globPatterns: ['**/*.{js,css,html,png,svg,mp3}'],
        // La musique fait 5 Mo : on autorise des fichiers jusqu'à 8 Mo
        maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
      },
    }),
  ],
})
