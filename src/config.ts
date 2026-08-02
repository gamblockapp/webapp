/**
 * Everything provisional, in one file.
 *
 * The app name, the domain, the contact address and the legal identity are all
 * expected to change before release, so nothing else in this repo may hardcode
 * them — not a page, not a layout, not a legal document. Copy in `src/i18n/`
 * takes the name as a function argument for the same reason the mobile app does
 * (`APP_NAME` in `mobile/theme/tokens.ts`): renaming must not mean rewriting the
 * French.
 *
 * If you rename the app, change `APP_NAME` here and `APP_NAME` in
 * `mobile/theme/tokens.ts` plus `expo.name` in `mobile/app.json`. Three places,
 * and this is the only one on the web side.
 */

/** Matches `APP_NAME` in `../mobile/theme/tokens.ts`, which is the source of truth. */
export const APP_NAME = 'Sonar';

/**
 * Used for canonical URLs, hreflang, sitemap and og tags.
 *
 * Inferred rather than given: the mobile repo ships `com.trysonarapp.ios` as its
 * bundle identifier and `https://feed.trysonarapp.com/feed/v1/` as the fixture
 * feed, so the apex is almost certainly this. Confirm it before submission —
 * every canonical URL, the sitemap and both legal documents point at it, and the
 * feed URL in particular cannot be changed for an install that never updates.
 */
export const SITE_URL = 'https://trysonarapp.com';

/** The only address published anywhere on this site. Confirm it resolves. */
export const CONTACT_EMAIL = 'hello@trysonarapp.com';

/**
 * The data controller under GDPR, and the other party to the terms. A trading
 * name or company would replace this; until then it is a named individual,
 * which is what the law requires it to be.
 */
export const LEGAL_NAME = 'Vincent Vielle';

/**
 * Governing law for the terms, and the jurisdiction whose consumer rules apply.
 * Assumed French — confirm before submission, because it is the one clause here
 * that a reader cannot check against the app's behaviour.
 */
export const JURISDICTION = { en: 'France', fr: 'la France' } as const;

/**
 * Null until the app is actually on sale. The landing page renders a
 * "coming soon" state instead of a download badge while this is null, because
 * the site has to exist *before* the listing does — App Store Connect wants a
 * privacy-policy URL at submission, which is earlier than the app having a URL
 * of its own.
 */
export const APP_STORE_URL: string | null = null;

/**
 * Effective date shown on the legal pages. Bump it whenever their substance
 * changes, not on typo fixes — a date that moves for nothing tells the reader
 * nothing.
 */
export const LEGAL_UPDATED = '2026-07-31';

/**
 * Where opt-in analytics go, named because the privacy policy has to name it.
 * Kept in step with `expo.extra.aptabaseKey` in `mobile/app.json`; the `A-EU-`
 * prefix there is what makes the EU claim below true.
 */
export const ANALYTICS = {
  processor: 'Aptabase',
  processorUrl: 'https://aptabase.com',
  region: { en: 'the European Union', fr: 'l’Union européenne' },
} as const;

/** Where this site is hosted, named because the privacy policy has to name it. */
export const HOSTING = {
  provider: 'Cloudflare Pages',
  providerUrl: 'https://www.cloudflare.com',
} as const;
