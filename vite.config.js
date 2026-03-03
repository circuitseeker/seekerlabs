import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function inlineCssPlugin() {
  return {
    name: 'inline-css',
    enforce: 'post',
    apply: 'build',
    generateBundle(_, bundle) {
      const htmlFile = Object.values(bundle).find(f => f.fileName === 'index.html')
      if (!htmlFile) return

      for (const [name, chunk] of Object.entries(bundle)) {
        if (name.endsWith('.css') && chunk.type === 'asset') {
          const cssTag = new RegExp(
            `<link[^>]*href="[^"]*${name.split('/').pop()}"[^>]*/?>`
          )
          htmlFile.source = htmlFile.source.replace(
            cssTag,
            `<style>${chunk.source}</style>`
          )
          delete bundle[name]
        }
      }
    },
  }
}

export default defineConfig({
  base: '/',
  plugins: [react(), inlineCssPlugin()],
})
