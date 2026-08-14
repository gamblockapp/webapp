/**
 * The shape every locale must fill.
 *
 * Same convention as the mobile repo: `en.ts` and `fr.ts` both declare
 * `satisfies Dict`, so a key present in one and missing from the other fails
 * `astro check` rather than shipping a blank section. That is intended, and it
 * is the only mechanism keeping a bilingual site honest without a translation
 * service.
 *
 * Anything that takes a value is a function rather than a string with a
 * placeholder, so word order stays each language's own decision — the app name
 * arrives as an argument for exactly that reason.
 */

export const LOCALES = ['en', 'fr'] as const;
export type Locale = (typeof LOCALES)[number];

/** Every page that exists, in both languages. Drives the language switcher. */
export type RouteKey = 'home' | 'privacy' | 'terms' | 'support' | 'help';

/** A block of legal or FAQ prose. Rendered by `Prose.astro`, nothing else. */
export type Block = { p: string } | { ul: string[] } | { note: string };

export type Section = {
  heading: string;
  blocks: Block[];
  /**
   * Marks a section that is only true while the app charges for something.
   * `Legal.astro` drops these when `PAID` is false, which is how the purchases
   * clause of the terms and the payment-processor section of the privacy
   * policy disappear together without either document being edited.
   *
   * Deleting the prose instead would mean rewriting both documents in both
   * languages twice — once now and once when the paywall returns — and legal
   * copy that has been through a review is the last thing worth retyping from
   * memory.
   */
  onlyWhenPaid?: true;
};

export type LegalDoc = {
  title: string;
  /** Rendered above the first heading, at body size. Sets the register. */
  intro: string;
  sections: Section[];
};

export type Faq = { q: string; a: Block[] };

export type Dict = {
  /** `lang` and `dir` on <html>, plus the human name used in the switcher. */
  htmlLang: string;
  localeName: string;

  nav: {
    skipToContent: string;
    home: string;
    privacy: string;
    terms: string;
    support: string;
    help: string;
    /** Screen-reader label on the language switcher. */
    languageLabel: string;
    /**
     * Names for the two `<nav>` landmarks. A screen reader lists landmarks by
     * their accessible name, so both of these were previously announced as
     * "Home" — the same name, on two different landmarks, describing neither.
     */
    primaryNavLabel: string;
    footerNavLabel: string;
  };

  meta: {
    home: (app: string) => { title: string; description: string };
    privacy: (app: string) => { title: string; description: string };
    terms: (app: string) => { title: string; description: string };
    support: (app: string) => { title: string; description: string };
    help: (app: string) => { title: string; description: string };
  };

  landing: {
    /** Small orienting line above the headline — says what this thing is. */
    tagline: string;
    /**
     * The H1, in two tiers: `hook` at display size, `line1` under it as the
     * qualifier.
     *
     * There used to be a separate `catchline` above these, on the reasoning that a
     * first-time visitor needs to know what the app does before being told what
     * gambling is. It is gone, and the hook leads.
     *
     * What made that safe is that the hook is aimed at gambling and not at the
     * reader — it is a statement about the house edge, which is why `line1`
     * ("Not over a year. Not over ten.") is welded to it: the pair reads as an
     * argument about an industry. A hook that accuses the person reading it would
     * break the "no lectures" promise made a few lines further down, so any rewrite
     * has to keep the subject as gambling rather than the reader. `lead` below is
     * what now says what the app does.
     */
    hook: string;
    line1: string;
    lead: (app: string) => string;
    /**
     * The three refusals, split for display as chips. Load-bearing: "no therapy"
     * is the not-treatment disclaimer and "no blocking" is the doesn't-block one.
     * Both must survive any rewrite — but as blunt refusals, not as small print.
     */
    refusalList: string[];
    comingSoon: string;
    comingSoonNote: string;
    comingSoonNoteFree: string;
    download: string;

    /**
     * Three short statements under the hero, on a hairline.
     *
     * They are the page's argument compressed to a line each, for the reader who
     * will not scroll: what it does, where the data lives, what it costs. The
     * last one takes `paid` because it is a price claim and the site has said the
     * wrong thing about the price before — see `PAID` in `src/config.ts`.
     */
    facts: (paid: boolean) => string[];

    /**
     * What it costs, next to the button that gets it.
     *
     * This exists because the site said the app was free in three places after
     * the paywall had already landed, which is a 2.3.1 exposure rather than a
     * copy nit — Apple's rule on misrepresenting a price covers marketing
     * "whether within or outside of the App Store".
     *
     * **Render it adjacent to `trio.free`, in the same visual band.** The free
     * promise is what makes the number read as honest rather than as a reveal,
     * and the comment on `trio.free` already asks for exactly this. Splitting
     * them across sections is the one layout change that would make this section
     * worse than not having it.
     *
     * Nothing here may acquire urgency — no countdown, no "only today", no
     * launch discount. A time-limited offer aimed at people with impulse-control
     * difficulty is indefensible, and it is also the register the app's own
     * paywall copy deliberately refuses.
     */
    pricing: {
      eyebrow: string;
      trial: (days: number) => string;
      plans: (p: PricingStrings) => string[];
      /** Why the euro figures may not be what this reader is charged. */
      note: string;
    };

    /**
     * The working demonstration of the app in the hero.
     *
     * Four screens, seven selectable nights, and controls that respond — driven
     * entirely by `:checked` and `:has()`, because this site runs no JavaScript.
     * See `src/components/Demo.astro`.
     *
     * Two things this copy must keep doing:
     *
     * - **Say that it is a demonstration.** `caption` and `cueBody` are what stop
     *   a reader taking "62 days clean" or "£1,240 kept" for their own figures,
     *   or for a typical result. Rule 1 binds here as hard as anywhere: none of
     *   these numbers may be presented as what the app produces for someone.
     * - **Never show a band without its reasons.** Every entry in `home.nights`
     *   carries both, and invariant 2 is why the two are one object rather than
     *   two parallel arrays that could drift.
     */
    demo: {
      caption: string;
      cueTitle: string;
      cueBody: string;
      /** Accessible names for the two radio groups the layout is built on. */
      screenGroupLabel: string;
      nightGroupLabel: string;
      /** Names of the four screens, used on the controls that switch to them. */
      screens: { home: string; checkin: string; urge: string; slip: string };

      home: {
        daysCleanValue: string;
        daysCleanLabel: string;
        moneyKeptValue: string;
        moneyKeptLabel: string;
        weekLabel: string;
        /**
         * Seven nights, tonight first. Order matches `RiskBand` tones in
         * `Demo.astro`, so an entry added here needs one added there.
         */
        nights: { day: string; band: string; when: string; reasons: string[] }[];
        ledgerLabel: string;
        ledger: { label: string; value: string }[];
        slipNote: string;
      };

      checkin: {
        eyebrow: string;
        question: string;
        clean: string[];
        urgeQuestion: string;
        /** Five, one per point on the scale. */
        urgeWords: string[];
        whenQuestion: string;
        when: string[];
        whyQuestion: string;
        whyOptional: string;
        why: string[];
        close: string;
        save: string;
      };

      urge: {
        eyebrow: string;
        /**
         * Static. The app's timer counts up, and the design file ticks it with a
         * `setInterval` — this site has no script to tick it with, and a clock
         * that runs is also the one kind of counting invariant 3 is wary of.
         */
        clock: string;
        clockNote: string;
        hereLabel: string;
        dropsLabel: string;
        quotesLabel: string;
        quotes: string[];
        actions: string[];
        helplines: string;
        through: string;
      };

      slip: {
        title: string;
        amountLabel: string;
        amount: string;
        amountNote: string;
        whenLabel: string;
        when: string[];
        whyLabel: string;
        why: string[];
        note: string;
        cancel: string;
        save: string;
      };
    };

    /** The forecast card, now in the forecast section. Never a band alone. */
    mock: {
      day: string;
      eyebrow: string;
      band: string;
      reasons: string[];
      caption: string;
      /** The weekday the mock-up is set on, spelled out, beside `eyebrow`. */
      today: string;
      /**
       * Seven short weekday labels for the week strip, starting at `today`. The
       * strip is the app's own, so it runs forwards from tonight rather than from
       * Monday.
       */
      weekdays: string[];
    };

    forecast: {
      eyebrow: string;
      title: string;
      body: string;
      /**
       * What the small bars beside each reason are. They are drawn on the
       * landing page now, so they have to be explained on it — an unlabelled
       * chart beside a sentence is decoration pretending to be evidence.
       */
      marks: string;
      bandsEyebrow: string;
      /** Low, elevated, high — in that order, matching `RiskBand` in the app. */
      bands: string[];
      caption: string;
    };

    slip: {
      eyebrow: string;
      title: string;
      body: string;
      /** Must state the precise claim, never "your numbers never go down". */
      precise: string;
    };

    money: {
      eyebrow: string;
      title: string;
      /** How the app arrives at the figure. Set as a card beside the caveat. */
      body: string;
      bodyEyebrow: string;
      exampleEyebrow: string;
      example: string;
      caveat: string;
      /**
       * The worked example, broken out of `example` so it can be set as a figure
       * rather than as a sentence.
       *
       * **`figure` never animates.** It is what somebody lost, and rolling it up
       * from zero like a jackpot counter — which is what the design file does —
       * makes a joke of the one number on this page that is supposed to land.
       * See AGENTS.md. Every number here already appears in `example`; none of
       * them is a new claim.
       */
      basis: string;
      figure: string;
      figures: { value: string; label: string }[];
      /** Either end of the 365-night grid. */
      gridStart: string;
      gridEnd: string;
      gridNote: string;
    };

    trio: {
      eyebrow: string;
      items: { title: string; body: string }[];
      free: string;
    };

    privacy: {
      eyebrow: string;
      title: string;
      body: string;
      analytics: string;
      gapTitle: string;
      gap: string;
      readPolicy: string;
    };

    close: {
      eyebrow: string;
      title: string;
      items: string[];
      helpLead: string;
      helpLink: string;
    };
  };

  support: {
    title: string;
    intro: (app: string) => string;
    emailLead: string;
    responseNote: string;
    faqTitle: string;
    /**
   * `paid` is false while the app charges for nothing, and the pricing question
   * is omitted rather than answered with a price nobody is asked for.
   */
  faqs: (app: string, pricing: PricingStrings, paid: boolean) => Faq[];
    bugTitle: string;
    bugBlocks: Block[];
    crisisLead: string;
    crisisLink: string;
  };

  help: {
    title: string;
    intro: string;
    emergencyTitle: string;
    emergencyBody: string;
    /** e.g. "Call 999 — Emergency services, UK" */
    callLabel: (display: string, what: string, where: string) => string;
    notTreatment: string;
    checked: string;
    languageNote: string;
    call: (display: string) => string;
    open: (display: string) => string;
  };

  legal: {
    privacy: (ctx: LegalContext) => LegalDoc;
    terms: (ctx: LegalContext) => LegalDoc;
    updated: (date: string) => string;
    /**
     * Heading on the section list beside both documents, and the accessible name
     * of the `<nav>` it sits in. One string for both: they say the same thing.
     */
    contents: string;
  };

  footer: {
    tagline: (app: string) => string;
    notTreatment: string;
    contact: string;
    copyright: (year: number, holder: string) => string;
    /** Column headings, and the three in-page links the first column carries. */
    appHeading: string;
    helpHeading: string;
    legalHeading: string;
    howItWorks: string;
    yourData: string;
    theMoney: string;
  };
};

/**
 * The prices from `src/config.ts`, formatted for one locale by
 * `src/pricing.ts`. Passed into the copy for the same reason `LegalContext` is.
 */
export type PricingStrings = {
  trialDays: number;
  monthly: string;
  annual: string;
  lifetime: string;
  annualPerMonth: string;
};

/**
 * Everything a legal document needs from `src/config.ts`, passed in rather than
 * imported, so the copy modules stay pure data and the provisional values live
 * in exactly one file.
 */
export type LegalContext = {
  app: string;
  email: string;
  legalName: string;
  jurisdiction: string;
  analyticsProcessor: string;
  analyticsRegion: string;
  hostingProvider: string;
  /** Apple, which is the merchant of record and takes the payment. */
  purchasesMerchant: string;
  /** RevenueCat, which validates the receipt. Named because the policy must name it. */
  purchasesProcessor: string;
  purchasesRegion: string;
  pricing: PricingStrings;
};
