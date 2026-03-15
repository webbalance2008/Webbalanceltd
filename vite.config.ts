import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// ── Figma Make asset fallback ─────────────────────────────────────────────────
// In Figma Make's own build environment a private plugin resolves
// `figma:asset/<hash>.png` imports.  When building outside that environment
// (e.g. Cloudflare Pages) Rollup can't resolve them and crashes.
// This plugin intercepts every `figma:asset/` import and returns an empty-
// string module so the build always succeeds. Any component that still uses a
// figma:asset import will simply render a blank <img> rather than crash.
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-fallback',
    enforce: 'pre' as const, // run before Rollup's native resolver so it never sees the import
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return '\0' + id; // mark as a virtual module
      }
    },
    load(id: string) {
      if (id.startsWith('\0figma:asset/')) {
        return 'export default ""';
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Raise the warning limit slightly — our chunks are intentionally split
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — always cached after first visit
          'vendor-react': ['react', 'react-dom', 'react-router'],
          // Animation library
          'vendor-motion': ['motion'],
          // UI primitives (Radix)
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
          ],
          // Icons
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})