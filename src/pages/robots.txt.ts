import type { APIRoute } from 'astro';

import { SITE_URL } from '../config';

/**
 * Generated rather than dropped in `public/`, so the domain comes from
 * `src/config.ts` like everything else. A static file here would be one more
 * place to forget when `SITE_URL` changes.
 */
export const GET: APIRoute = () => {
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('/sitemap-index.xml', SITE_URL).href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
