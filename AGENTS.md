# The Sonar website

Four pages that exist because App Store Connect will not accept a submission
without them, plus a landing page and a public mirror of the app's crisis
resources. Astro, static output, no client-side JavaScript at all.

The app itself lives in `../mobile`. Read `../mobile/AGENTS.md` before changing
copy here — this site inherits its product rules, and several of its strings.

## What this site is for

| Page | Route (EN / FR) | Why it exists |
|---|---|---|
| Landing | `/` · `/fr/` | The pitch. Also the App Store "Marketing URL". |
| Privacy policy | `/privacy` · `/fr/confidentialite` | **Mandatory** for any App Store submission. |
| Terms | `/terms` · `/fr/conditions` | Custom EULA. Also paste into App Store Connect → License Agreement. |
| Support | `/support` · `/fr/support` | **Mandatory** App Store "Support URL". Must resolve and reach a human. |
| Resources | `/help` · `/fr/aide` | Not required. Duty of care — see below. |

## Four rules, inherited and non-negotiable

These come from `../mobile/AGENTS.md` and the product plan. They bind the website
exactly as they bind the app, because a marketing page is a store listing.

1. **No clinical or outcome claims.** No recovery rates, no success percentages,
   no "proven", no implication that using the app produces an outcome. Not in
   copy, not in a meta description, not in an alt attribute.

2. **The streak claim stays precise.** The true sentence is *"there is no stored
   total for a bad night to reset"*. The false one is *"your numbers never go
   down"* — backdating a slip lowers `totalDaysClean` by one and can split a run.
   `landing.slip.precise` in both locales holds the correct wording; don't
   "tighten" it.

3. **The forecast is never shown as a score without its reasons.** That includes
   the mock-up on the landing page. Explainability is the product, so a
   screenshot that crops the reasons off misrepresents it.

4. **Motion is allowed, and one thing still isn't.** This rule used to read
   "nothing rewards — no bounce, no hover transforms, no scroll-triggered
   reveals". The product owner lifted it for the website on 2 August 2026: a
   landing page has to compete for attention in a way the app's home screen never
   does, and the restraint was reading as a legal document rather than a product.

   **The app's version of this rule is untouched.** It applies to
   `../mobile` exactly as before. Do not carry anything below back into the app.

   What the website now has: scroll reveals, a sonar sweep in the hero, hover lift
   on cards and buttons, a reading-progress bar, page transitions.

   What is still off the table, and the reason is not squeamishness:

   - **The money figure never animates.** `landing.money.example` is what somebody
     lost. Rolling it upward like a jackpot counter makes a joke of the one number
     on the page that is supposed to land. It is styled large and left still.
   - **Nothing celebrates a slip-free streak.** No confetti, no badge, no
     "well done" state anywhere. That is the feedback loop the app exists to
     interrupt, and it is the actual point of the original rule.
   - **The risk bands don't flash, pulse or count.** A forecast is information.

   Two constraints that are not style and cannot be traded away:

   - **Everything is CSS.** Reveals and the progress bar use
     `animation-timeline`, not a scroll library, because the privacy policy claims
     this site loads no scripts. Check with the `grep` further down.
   - **Everything collapses under `prefers-reduced-motion: reduce`,** and the
     `@supports (animation-timeline: view())` guard wraps the `opacity: 0` start
     state rather than just the animation — otherwise Firefox, which has no
     scroll-driven animations, renders a blank page. Print does too: there is an
     `@media print` block in `base.css` that resets the reveals, because the terms
     were coming out of the printer empty.

Also: crisis resources stay reachable from every page. That's the `/help` link in
the site header, and it isn't decoration.

## Where things live

```
src/config.ts          Everything provisional: app name, domain, email, legal
                       identity, jurisdiction, App Store URL. Nothing else may
                       hardcode these.
src/i18n/types.ts      The shape both locales must fill.
src/i18n/en.ts         All English copy, including both legal documents.
src/i18n/fr.ts         All French copy. Not a word-for-word translation.
src/i18n/index.ts      The routing table — the one source of truth for URLs.
src/data/helplines.ts  Mirror of ../mobile/domain/helplines.ts. See below.
src/layouts/           Base (head, header, footer) and Legal (both documents).
src/components/pages/  One component per page, taking `locale` as a prop.
src/pages/             Thin route wrappers. Ten files, four lines each.
```

**Copy is data, not markup.** Legal and FAQ prose lives in `src/i18n/*` as arrays
of `Block`s (`{p}`, `{ul}`, `{note}`), rendered by `Prose.astro`. That is what
stops a page from smuggling an unreviewed claim into a document as inline HTML,
and it is why the vocabulary is deliberately tiny.

**Both locales or the build fails.** `en.ts` and `fr.ts` both `satisfies Dict`, so
a key present in one and missing from the other is a type error, not a blank
section. Same intent as the mobile repo. Verified: renaming one French key
produces three errors from `astro check`.

**French slugs are French words**, not English ones behind a prefix. That's why
Astro's built-in `i18n` option is not used and `ROUTES` in `src/i18n/index.ts` is
written out by hand — it also feeds the `hreflang` tags, so there is one table
rather than two conventions.

## Things that will bite you

- **`src/data/helplines.ts` is a copy, not an import.** Two repos need this list
  at build time and one of them must work with no network and no dependencies, so
  a shared package isn't worth it. The cost is drift: **edit it and
  `../mobile/domain/helplines.ts` in the same commit, or neither.** The types and
  entry order are identical so `diff` across the two is meaningful. And never
  invent a phone number — a wrong number at 2am is worse than none.

- **The privacy policy is a claim about code, and four places must agree:** this
  site, `../mobile/telemetry/events.ts` (the allowlist), the App Store privacy
  questionnaire, and `../mobile/ios/Sonar/PrivacyInfo.xcprivacy`. `../mobile/AGENTS.md`
  already requires the app's onboarding and Settings strings to change in the same
  commit as the payload; this site is now a fifth place in that set. A privacy
  claim that is nearly true is worse than one that's precise.

- **Adding any external resource breaks the privacy policy.** The policy states
  this site loads no third-party scripts, fonts, images or trackers and sets no
  cookies. One `<script src>` or Google Font makes that false. Check with:
  `grep -ohE 'src="https?://[^"]+"' dist/**/*.html` — it should return nothing.

- **`APP_STORE_URL` is null until the app ships.** The landing page renders a
  "coming soon" chip instead of a download button while it is. The site has to
  exist before the listing does, because the privacy-policy URL is needed at
  submission.

- **No IAP anywhere in the copy.** The app currently has no purchases wired up
  (`../mobile/db/entitlement-repo.ts` holds the seam), so the site says the app is
  free and the terms say there are no in-app purchases. When IAP lands, both change
  — and Apple's subscription disclosure rules start applying to the landing page.

- **Node 22, not 23.** Pinned in `mise.toml` to match `../mobile`. Run
  `mise trust` once in a fresh worktree or every `mise exec` fails.

## Verify a change

```bash
mise exec -- npm run typecheck   # astro check — this is what enforces EN/FR parity
mise exec -- npm run build       # 10 pages + sitemap + robots.txt
mise exec -- npm run dev         # look at it, in both light and dark
```

Look at it in dark mode too. The palette is ported from the app, which is used at
night, and the dark values are the ones that get skipped.

Since the motion went in, four states break in ways the happy path won't show you.
All four have been wrong at least once:

- **A browser with no `animation-timeline`** (Firefox today). Content must render
  fully visible, not blank. The `opacity: 0` lives inside the `@supports` query
  for this reason.
- **`prefers-reduced-motion: reduce`.** Emulate it in DevTools → Rendering. Every
  reveal off, the sonar static rather than gone, nothing looping.
- **Print preview of `/terms`.** The reveals must be reset or the page prints
  empty, and the dark palette must not follow you onto paper — it is scoped to
  `screen` in `tokens.css` for that.
- **`--c-text-faint` is not for text.** It fails WCAG AA at every size this site
  uses it at. `.faint` and `.eyebrow` resolve to `--c-text-subtle`; the faint token
  is kept only for palette parity with the app.
