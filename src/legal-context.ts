import { ANALYTICS, APP_NAME, CONTACT_EMAIL, HOSTING, JURISDICTION, LEGAL_NAME } from './config';
import type { LegalContext, Locale } from './i18n/types';

/**
 * Assembles the provisional values a legal document needs.
 *
 * The documents in `src/i18n/*` take these as an argument rather than importing
 * `config.ts` themselves, so the copy modules stay pure data and there is exactly
 * one place a rename has to happen.
 */
export function legalContext(locale: Locale): LegalContext {
  return {
    app: APP_NAME,
    email: CONTACT_EMAIL,
    legalName: LEGAL_NAME,
    jurisdiction: JURISDICTION[locale],
    analyticsProcessor: ANALYTICS.processor,
    analyticsRegion: ANALYTICS.region[locale],
    hostingProvider: HOSTING.provider,
  };
}
