import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import { SITE_URL } from './src/config';

/**
 * Static output, no adapter, no client-side framework. Every page here is text.
 *
 * Astro's built-in `i18n` option is deliberately not used. It maps locales onto
 * path prefixes, and this site's French slugs are French words rather than the
 * English ones behind a prefix (`/fr/confidentialite`, not `/fr/privacy`). The
 * routing table in `src/i18n/index.ts` is explicit instead, which is also what
 * feeds the `hreflang` tags — one source of truth, and no framework behaviour to
 * reason about on top of it.
 */
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: {
    // Emit `/privacy/index.html` rather than `/privacy.html`, so the canonical
    // URLs in the pages match what the host serves.
    format: 'directory',
  },
});
