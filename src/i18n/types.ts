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

export type Section = { heading: string; blocks: Block[] };

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
    download: string;

    /** The home-screen mock-up in the hero. Never a band without its reasons. */
    mock: {
      day: string;
      eyebrow: string;
      band: string;
      reasons: string[];
      caption: string;
    };

    forecast: {
      eyebrow: string;
      title: string;
      body: string;
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
      body: string;
      exampleEyebrow: string;
      example: string;
      caveat: string;
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
    faqs: (app: string) => Faq[];
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
  };
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
};
