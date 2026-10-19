// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://adityasingh.pages.dev',
  output: 'static',
  // Every stylesheet is a file and there are no scripts, so the CSP in public/_headers
  // can stay at 'self' with no hashes.
  build: { inlineStylesheets: 'never' },
  vite: { build: { assetsInlineLimit: 0 } },
  prefetch: false,
  devToolbar: { enabled: false },
  server: { port: 8731, host: '127.0.0.1' },
});
