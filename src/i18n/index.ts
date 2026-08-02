import { en } from './en';
import { fr } from './fr';
import { LOCALES, type Dict, type Locale, type RouteKey } from './types';

export { LOCALES, type Block, type Dict, type Locale, type RouteKey } from './types';

const DICTS: Record<Locale, Dict> = { en, fr };

export function t(locale: Locale): Dict {
  return DICTS[locale];
}

/**
 * Every page's URL in every language.
 *
 * Hand-written rather than derived, because the French slugs are French words
 * and not the English ones with a prefix — `/fr/confidentialite`, not
 * `/fr/privacy`. That is the right call for a reader and the wrong one for a
 * clever helper, so the table is explicit and the language switcher reads its
 * counterpart straight out of it.
 *
 * Trailing slashes: only the two home pages have one, matching Astro's default
 * output. Everything else is extensionless.
 */
export const ROUTES: Record<Locale, Record<RouteKey, string>> = {
  en: {
    home: '/',
    privacy: '/privacy',
    terms: '/terms',
    support: '/support',
    help: '/help',
  },
  fr: {
    home: '/fr/',
    privacy: '/fr/confidentialite',
    terms: '/fr/conditions',
    support: '/fr/support',
    help: '/fr/aide',
  },
};

export function path(locale: Locale, key: RouteKey): string {
  return ROUTES[locale][key];
}

/** The other locale. Two locales, so this is total; add a third and revisit. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en';
}

/** `<link rel="alternate" hreflang>` pairs for a given page. */
export function alternates(key: RouteKey): { locale: Locale; href: string }[] {
  return LOCALES.map((locale) => ({ locale, href: ROUTES[locale][key] }));
}
