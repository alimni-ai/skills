import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://alimni-ai.com',
  output: 'static',
  compressHTML: true,
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  trailingSlash: 'never',
  prefetch: false
});
