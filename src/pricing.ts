import { PRICING } from './config';
import type { Locale, PricingStrings } from './i18n/types';

/**
 * Formats the prices in `config.ts` for one locale.
 *
 * The copy modules in `src/i18n/` take these as an argument rather than
 * importing `config.ts`, on the same terms as `legalContext()` — the copy stays
 * pure data and the amounts live in exactly one place. Writing "€9.99" into the
 * English strings and "9,99 €" into the French ones would be two places to
 * change and two chances to disagree with App Store Connect.
 *
 * `Intl` earns its keep here: the French forms come out as "9,99 €" with the
 * narrow non-breaking space French typography wants, which is not something
 * worth hand-typing into a string and hoping survives an editor.
 */
const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR' };

export function formatPrice(locale: Locale, minor: number): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: 'currency',
    currency: PRICING.currency,
  }).format(minor / 100);
}

export function pricingStrings(locale: Locale): PricingStrings {
  return {
    trialDays: PRICING.trialDays,
    monthly: formatPrice(locale, PRICING.monthlyMinor),
    annual: formatPrice(locale, PRICING.annualMinor),
    lifetime: formatPrice(locale, PRICING.lifetimeMinor),
    /**
     * The annual price expressed per month, which is the comparison the app's
     * own paywall leads with. Rounded to the cent the same way the app rounds
     * it, so the two never disagree by a penny in a screenshot.
     */
    annualPerMonth: formatPrice(locale, Math.round(PRICING.annualMinor / 12)),
  };
}
