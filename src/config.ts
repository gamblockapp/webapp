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
 * The data controller under GDPR, and the other party to the terms.
 *
 * A trading name, deliberately, because the developer does not want to be named
 * on the site. **This is not finished, and it is a legal gap rather than a
 * cosmetic one:** GDPR Art. 13(1)(a) requires the controller to be identifiable,
 * and "Sonar" identifies a product rather than a person or a company. Until there
 * is a registered entity of this name, the actual controller is still the
 * individual behind it, and the policy does not say who that is.
 *
 * Two ways to close it before submission — one of them has to happen:
 *   - register a company and put its legal name here, or
 *   - name the individual, which is what this field held before.
 *
 * Worth knowing either way: an individual Apple Developer account publishes the
 * holder's legal name as the seller on the App Store listing, so the name is
 * likely to be public at launch regardless of what this file says.
 *
 * **Decided on 2026-08-05: sole trader, no separate company.** Which settles it
 * as the second option, and makes this field a launch blocker rather than an
 * open question — it must hold the declared trader's name before submission.
 *
 * The reason it is no longer optional: selling a paid app into the EU makes you
 * a trader under the DSA, Apple has required a verified trader declaration since
 * 17 Feb 2025, and the declared name, address and phone are **published on the
 * App Store product page** in EU storefronts. There is no French storefront
 * without it. So the name becomes public at launch whatever this file says, and
 * leaving "Sonar" here buys no privacy at all — it only leaves the Art. 13 gap
 * open and makes the site look like an anonymous operator charging vulnerable
 * people for a subscription, which is the reading every charity and journalist
 * is trained to apply.
 *
 * Use a business or *domiciliation* address for the declaration rather than a
 * home one. That is the part that is still a real choice, it costs €10–30 a
 * month, and it is permanent once published.
 */
// TODO(launch-blocker): replace with the declared trader name before submission.
export const LEGAL_NAME = 'Sonar';

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
 *
 * Keep the null branch after launch. It is the correct render for the window
 * between the site going live and the listing being approved.
 */
export const APP_STORE_URL: string | null = null;

/**
 * The numeric App Store id, and the provider token from App Store Connect →
 * Users and Access. Both are needed to build a campaign link; until they exist,
 * `appStoreLink()` falls back to `APP_STORE_URL` unchanged.
 */
export const APP_STORE_APP_ID: string | null = null;
export const APP_STORE_PROVIDER_TOKEN: string | null = null;

/**
 * Campaign tokens for App Store Connect → Analytics → Acquisition → Campaigns.
 *
 * **Deliberately coarse, and this is not laziness.** Every campaign-link,
 * web-referrer and app-referrer report in App Store Connect is threshold-gated:
 * nothing is displayed until a source has at least five first-time downloads.
 * One token per page or per post therefore means every token reads zero forever
 * and the whole scheme tells you nothing. Five buckets, and no more, because
 * this site has no analytics of its own and these numbers are the only funnel
 * data that will ever exist.
 *
 * Register each one in App Store Connect *before* using it in a link. `ct` is
 * capped at 30 characters.
 *
 * One rule that is about conduct rather than measurement: **never put a `ct`
 * parameter on a link posted inside a recovery community.** A tracking
 * parameter in a support thread is a bannable offence in several forums, and it
 * deserves to be. Tracked links belong on this site, in press email, and in
 * directory listings we control. Community traffic is read from the
 * Web Referrer report instead, and is structurally under-counted there because
 * in-app browsers frequently do not report a referrer — that is expected, not a
 * bug to chase.
 */
export const CAMPAIGN = {
  webEn: 'web-en',
  webFr: 'web-fr',
  press: 'press',
  directory: 'directory',
  community: 'community',
} as const;

/**
 * An App Store link carrying a campaign token, or the plain link, or null.
 *
 * Pass no campaign for anywhere a tracking parameter would be inappropriate —
 * see the conduct rule above.
 */
export function appStoreLink(campaign?: (typeof CAMPAIGN)[keyof typeof CAMPAIGN]): string | null {
  if (!APP_STORE_URL) return null;
  if (!campaign || !APP_STORE_APP_ID || !APP_STORE_PROVIDER_TOKEN) return APP_STORE_URL;
  const q = new URLSearchParams({
    pt: APP_STORE_PROVIDER_TOKEN,
    ct: campaign,
    mt: '8',
  });
  return `https://apps.apple.com/app/apple-store/id${APP_STORE_APP_ID}?${q}`;
}

/**
 * What the app costs, in one place.
 *
 * Amounts are in minor units so they can be formatted per locale with `Intl`
 * rather than written twice — "€9.99" in English and "9,99 €" in French, with
 * the non-breaking space French typography wants, for free.
 *
 * **These have to agree with three other things or the site is lying:**
 * `PRICE_MINOR` in `mobile/app/paywall.tsx`, the products in
 * `mobile/purchases/index.ts`, and what is actually configured in App Store
 * Connect. ASC is the only one of the four that charges anyone, so it wins any
 * disagreement — and a disagreement is a 2.3.1 problem, not a copy nit, because
 * Apple's rule on misrepresenting a price covers marketing "whether within or
 * outside of the App Store".
 *
 * Euro amounts are what the App Store shows in the eurozone. Apple converts to
 * the reader's own currency on its own price tiers, so the copy that quotes
 * these must also say that — see `landing.pricing.note`. Never quote a pound or
 * dollar figure here that has not been read off App Store Connect.
 *
 * `trialDays` matches `TRIAL_DAYS` in `mobile/domain/entitlement.ts`. Note the
 * app is *more* generous than this number: the trial stays open past day 14
 * until there are eight check-ins, because charging on day 14 would be charging
 * for the least impressive version of the product. Disclosing the shorter
 * period is the safe direction to be wrong in, and the FAQ states the extension.
 */
export const PRICING = {
  currency: 'EUR',
  trialDays: 14,
  monthlyMinor: 999,
  annualMinor: 4999,
  lifetimeMinor: 11900,
} as const;

/**
 * Who handles purchases, named because the privacy policy has to name it.
 *
 * Apple is the merchant of record — it takes the payment and holds the card
 * details, and this site never sees either. RevenueCat sits behind the app to
 * validate the receipt and track whether an entitlement is active; it receives
 * the App Store receipt and an anonymous app-user id generated on the device,
 * and nothing that identifies a person. Kept in step with
 * `expo.extra.revenueCatKey` in `mobile/app.json` and `mobile/purchases/`.
 */
export const PURCHASES = {
  merchant: 'Apple',
  processor: 'RevenueCat',
  processorUrl: 'https://www.revenuecat.com',
  processorRegion: { en: 'the United States', fr: 'les États-Unis' },
} as const;

/**
 * Effective date shown on the legal pages. Bump it whenever their substance
 * changes, not on typo fixes — a date that moves for nothing tells the reader
 * nothing.
 */
/**
 * Whether the app currently charges for anything. **It does not.**
 *
 * Mirrors `PAYWALL_ENABLED` in `mobile/domain/entitlement.ts`, and the two must
 * agree: the app ships with the paywall switched off, so a site quoting a
 * fourteen-day trial and three prices is advertising something nobody is
 * charged for. That is the mismatch App Review notices, and it is a promise to
 * a reader that the build does not keep.
 *
 * While this is false the landing page drops its pricing block, the support FAQ
 * omits the pricing question, and both legal documents drop every section
 * marked `onlyWhenPaid` — the purchases clause of the terms and the
 * payment-processor section of the privacy policy, which describes a receipt
 * going to RevenueCat that no longer leaves the phone at all.
 *
 * Nothing is deleted. Turning the paywall back on means flipping this and
 * `PAYWALL_ENABLED` together, and checking that `PRICING` below still matches
 * App Store Connect.
 */
export const PAID = false;

export const LEGAL_UPDATED = '2026-08-11';

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

/**
 * Where this site is hosted, named because the privacy policy has to name it.
 *
 * This said `Cloudflare Pages` until 2026-08-05, and the deployed site was being
 * served by Vercel the whole time — `server: Vercel`, `x-vercel-id: cdg1`, and no
 * Cloudflare header anywhere in the response. So the live privacy policy named
 * the wrong data processor, on the one page whose entire value is that it can be
 * checked. That is exactly the failure this repo's own standard forbids: a
 * privacy claim that is nearly true is worse than one that's precise.
 *
 * If the host changes, change this in the same commit as the move. The provider
 * is verifiable in one command, so there is no excuse for it drifting again:
 *
 *     curl -sSI https://trysonarapp.com | grep -i '^server:'
 */
export const HOSTING = {
  provider: 'Vercel',
  providerUrl: 'https://vercel.com',
} as const;
