import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  // Relative paths work on GitHub Pages project URLs and local previews.
  base: './',
})
