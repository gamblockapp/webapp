# sonar-webapp

The marketing and legal site for **Sonar**, an iOS gambling-recovery companion.
The app lives in [`../mobile`](../mobile).

Astro, static output, English and French, no client-side JavaScript.

## Run it

```bash
mise trust        # once per fresh checkout
npm install
npm run dev       # http://localhost:4321
```

```bash
npm run typecheck # astro check — also enforces EN/FR copy parity
npm run build     # → dist/
```

## Pages

| | English | French |
|---|---|---|
| Landing | `/` | `/fr/` |
| Privacy policy | `/privacy` | `/fr/confidentialite` |
| Terms | `/terms` | `/fr/conditions` |
| Support | `/support` | `/fr/support` |
| Helplines | `/help` | `/fr/aide` |

## Renaming the app or changing the domain

Everything provisional is in [`src/config.ts`](src/config.ts) — app name, domain,
contact address, legal identity, jurisdiction, App Store URL. Nothing else in the
repo hardcodes them.

Renaming the app is three edits in total: `APP_NAME` here, `APP_NAME` in
`../mobile/theme/tokens.ts`, and `expo.name` in `../mobile/app.json`.

Plus one re-render: the share image has the name printed on it. Source is
[`design/og-cover.html`](design/og-cover.html) — open it, screenshot the body at
exactly 1200×630, and save over `public/og-cover.png`. It deliberately uses only
the light palette and Georgia, so it needs nothing installed.

## Before submitting to the App Store

- [ ] **Give the data controller a real identity.** `LEGAL_NAME` is `'Sonar'`,
      because the developer does not want to be named on the site — but that is a
      product, not a person or a company, and GDPR Art. 13(1)(a) wants the
      controller to be identifiable. Either register a company and use its legal
      name, or name the individual. Note that an individual Apple Developer
      account publishes the holder's legal name as the App Store seller anyway.
- [x] Settle the app name — `Sonar`, matching `../mobile/theme/tokens.ts`.
- [ ] **Confirm the domain.** `SITE_URL` and `CONTACT_EMAIL` use
      `trysonarapp.com`, inferred from the mobile bundle id (`com.trysonarapp.ios`)
      and the feed host — not confirmed. Every canonical URL, the sitemap and both
      legal documents point at it. Check `hello@trysonarapp.com` resolves.
- [ ] Have the two legal documents reviewed by a solicitor — they are drafted from
      the app's actual behaviour, which is the part a template gets wrong, but the
      liability and governing-law clauses want a professional eye.
- [ ] Confirm the governing-law assumption in `JURISDICTION` (currently France).
- [ ] Decide whether a postal address is needed alongside the controller's identity
      in the privacy policy.
- [ ] Deploy, then paste into App Store Connect: **Privacy Policy URL**
      (`/privacy`), **Support URL** (`/support`), **Marketing URL** (`/`), and the
      terms text into **License Agreement**.
- [ ] Check the app's privacy questionnaire and `PrivacyInfo.xcprivacy` say the
      same thing as `/privacy`.
- [x] Replace the share image with a real 1200×630 one — `public/og-cover.png`,
      generated from `design/og-cover.html`. `public/og-icon.png` stays square
      because it is the `apple-touch-icon`.

Contributor and product rules: [`AGENTS.md`](AGENTS.md). Read it before touching
copy — several strings are load-bearing disclaimers.
