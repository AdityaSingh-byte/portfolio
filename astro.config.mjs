// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://adityasingh.pages.dev',
  output: 'static',
  // Every stylesheet is a file and there are no scripts, so the CSP in public/_headers
  // can stay at 'self' with no hashes.
  build: { inlineStylesheets: 'never' },
  // No CSS minifier: lightningcss folds animation-timeline into the animation shorthand,
  // which browsers reject, and every scroll-driven animation silently disappears.
  vite: { build: { assetsInlineLimit: 0, cssMinify: false } },
  prefetch: false,
  devToolbar: { enabled: false },
  server: { port: 8731, host: '127.0.0.1' },
});
