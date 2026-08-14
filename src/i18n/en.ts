import type { Dict } from './types';

/**
 * English copy for the whole site.
 *
 * The register is the app's, not a marketing site's: short sentences, blunt
 * refusals, and a stated limitation wherever there would otherwise be a claim.
 * Several lines are lifted verbatim from `mobile/i18n/en/*` because they are
 * already the best version of themselves — where that happens the source is
 * named in a comment, so a change on one side can be found on the other.
 *
 * Three things that must survive any rewrite:
 *
 * 1. **No clinical or outcome claims.** No recovery rates, no success
 *    percentages, no "proven", no implication that using the app produces an
 *    outcome. This binds the website exactly as it binds the app and the store
 *    listing.
 * 2. **The streak claim stays precise.** "There is no stored total for a bad
 *    night to reset" is true. "Your numbers never go down" is not — backdating a
 *    slip lowers `totalDaysClean` by one. See `mobile/AGENTS.md`, invariant 1.
 * 3. **The forecast is never described as a score without reasons.** Invariant 2.
 */
export const en = {
  htmlLang: 'en',
  localeName: 'English',

  nav: {
    skipToContent: 'Skip to content',
    home: 'Home',
    privacy: 'Privacy',
    terms: 'Terms',
    support: 'Support',
    help: 'Talk to someone',
    languageLabel: 'Language',
    primaryNavLabel: 'Main',
    footerNavLabel: 'Site',
  },

  meta: {
    home: (app) => ({
      title: `${app}: it counts what gambling cost you, and tells you which nights are coming`,
      description:
        'A companion for stopping gambling. A nightly risk forecast built from your own patterns and when your money lands, a slip log that keeps your history, and everything stored on your phone. No account.',
    }),
    privacy: (app) => ({
      title: `Privacy policy · ${app}`,
      description:
        'What stays on your phone, what the anonymous statistics contain, and what is never collected.',
    }),
    terms: (app) => ({
      title: `Terms and conditions · ${app}`,
      description: `The agreement covering your use of ${app}, including what it is not.`,
    }),
    support: (app) => ({
      title: `Support · ${app}`,
      description: `How to get help with ${app}, and answers to the questions that come up most.`,
    }),
    help: () => ({
      title: 'Talk to someone · gambling helplines and crisis resources',
      description:
        'Free, confidential gambling helplines and crisis lines by country. Checked against each organisation’s own site.',
    }),
  },

  landing: {
    tagline: 'A companion for stopping gambling',
    /**
     * The headline, and the strongest sentence on the site.
     *
     * mobile/i18n/en/onboarding.ts → opening.hook / line1.
     *
     * This is the third arrangement of the hero and worth recording, because the
     * first two both failed for reasons that are easy to walk back into:
     *
     *   1. "Know which nights are coming" — repeated `lead` below almost verbatim,
     *      and the `meta.home` title too, so the biggest text on the page was the
     *      only text saying nothing new.
     *   2. "See it coming." — solved that, but said so little that the eyebrow and
     *      the lead were doing all the work of explaining the product.
     *
     * Both sat above this hook, which was always the better line and was being
     * kept in a smaller tier below them. It leads now.
     *
     * The one thing to preserve: **the subject is gambling, not the reader.** This
     * is a claim about the house edge, and `line1` is what makes that unmistakable
     * — "not over a year, not over ten" is the timescale over which the maths wins.
     * Written as a verdict on the person reading it, it would break the "no
     * lectures" promise three lines further down, before they have agreed to
     * anything. Rule 1 still holds too: it says nothing about outcomes, only about
     * what gambling is.
     */
    hook: 'Nobody’s up.',
    line1: 'Not over a year. Not over ten.',
    lead: (app) =>
      `${app} counts what it actually cost you, and tells you which nights are coming, built from your own patterns and the day your money lands.`,
    // mobile/i18n/en/onboarding.ts → opening.line3, split for display.
    refusalList: ['No therapy', 'No blocking', 'No lectures'],
    comingSoon: 'Coming to the App Store',
    // Said "Free while it's being built" until 2026-08-05, which stopped being
    // true the moment `mobile/purchases/` and the 14-day trial landed. The trial
    // is the honest version of the same welcome.
    comingSoonNote: 'iPhone first. Free for 14 days, then a subscription.',
    /** Used instead of the above while `PAID` is false — see src/config.ts. */
    comingSoonNoteFree: 'iPhone first. Free, with nothing to buy.',
    download: 'Download on the App Store',

    facts: (paid) => [
      'A forecast every evening, with the reasons behind it',
      'Your whole history stays on your phone',
      paid ? 'Free for 14 days, then a subscription' : 'Free, with nothing to buy',
    ],

    pricing: {
      eyebrow: 'What it costs',
      trial: (days) => `Free for ${days} days. No card to start.`,
      plans: (p) => [
        `${p.monthly} a month`,
        `${p.annual} a year, which is ${p.annualPerMonth} a month taken once a year`,
        `${p.lifetime} once`,
      ],
      note: 'Prices are in euros; the App Store shows the price in your own currency before you buy. Apple takes the payment, and you can cancel from your own Settings at any time.',
    },

    /**
     * The demonstration in the hero. Copy is the app's own wherever the app has
     * a version of it — mobile/i18n/en/* — because a demo that invents its own
     * sentences is a demo that drifts from what it is demonstrating.
     *
     * Every figure here is illustrative and the page says so twice, in `cueBody`
     * and again in `caption`. Rule 1: none of it is a claim about what using the
     * app produces for anyone.
     */
    demo: {
      caption:
        'A working illustration, not anyone’s real record. Every figure in it is made up.',
      cueTitle: 'Try it yourself',
      cueBody:
        'This is the real thing, not a picture of it. Tap a night, check in, or open the urge screen.',
      screenGroupLabel: 'Demonstration screen',
      nightGroupLabel: 'Night',
      screens: {
        home: 'Home',
        checkin: 'Check in',
        urge: 'Urge',
        slip: 'Log a slip',
      },

      home: {
        daysCleanValue: '62',
        daysCleanLabel: 'Days clean',
        moneyKeptValue: '£1,240',
        moneyKeptLabel: 'Money kept',
        weekLabel: 'The next seven nights',
        // Word for word what the engine renders, from mobile/i18n/en/reasons.ts.
        nights: [
          {
            day: 'Fri',
            band: 'Elevated',
            when: 'tonight, Friday',
            reasons: [
              'Money landed today.',
              'Both of your slips so far were on payday.',
              'Three matches on tonight.',
            ],
          },
          {
            day: 'Sat',
            band: 'High',
            when: 'tomorrow, Saturday',
            reasons: [
              'Six matches on, including the late kick-off.',
              'Saturday is your hardest night: four of your six slips.',
              'Payday was two days before.',
            ],
          },
          {
            day: 'Sun',
            band: 'Low',
            when: 'Sunday',
            reasons: [
              'No matches on that you follow.',
              'Sundays have never been a problem for you.',
            ],
          },
          {
            day: 'Mon',
            band: 'Low',
            when: 'Monday',
            reasons: ['Nothing in the calendar.', 'Four days since money landed.'],
          },
          {
            day: 'Tue',
            band: 'Low',
            when: 'Tuesday',
            reasons: [
              'Nothing in the calendar.',
              'Your quietest weekday on the record so far.',
            ],
          },
          {
            day: 'Wed',
            band: 'Elevated',
            when: 'Wednesday',
            reasons: [
              'Two matches on in the evening.',
              'Midweek fixtures have come up twice in your check-ins.',
            ],
          },
          {
            day: 'Thu',
            band: 'Low',
            when: 'Thursday',
            reasons: ['Nothing in the calendar.', 'A week out from the next payday.'],
          },
        ],
        ledgerLabel: 'How that’s worked out',
        ledger: [
          { label: '62 nights at your old rate', value: '£1,320' },
          { label: 'What slips actually cost', value: '−£80' },
          { label: 'Kept', value: '£1,240' },
        ],
        slipNote: 'a record, not a verdict',
      },

      checkin: {
        eyebrow: 'Friday night',
        question: 'Did you stay clean?',
        clean: ['Yes', 'No'],
        urgeQuestion: 'How strong were the urges?',
        urgeWords: [
          'None at all',
          'Mild',
          'There, but manageable',
          'Strong. Hard to think about anything else.',
          'As bad as it gets',
        ],
        whenQuestion: 'When were they strongest?',
        when: ['Morning', 'Afternoon', 'Evening', 'Late night'],
        whyQuestion: 'What was going on?',
        whyOptional: 'optional',
        why: ['A match was on', 'Payday', 'Drinking', 'Alone'],
        close: 'Close',
        save: 'Save',
      },

      urge: {
        eyebrow: 'Sitting with it',
        clock: '04:12',
        clockNote: 'Counting up. There is nothing to reach.',
        hereLabel: 'You are here',
        dropsLabel: 'It drops from here',
        quotesLabel: 'You wrote this down',
        quotes: [
          'I want to stop lying to Rachel about the bank app.',
          '£8,400 last year. That was meant to be the deposit.',
        ],
        actions: [
          'Cold water on your wrists. Sixty seconds.',
          'Walk to the end of the street and back.',
          'Eat something. Anything will do.',
        ],
        helplines: 'Helplines',
        through: 'I’m through it',
      },

      slip: {
        title: 'What happened?',
        amountLabel: 'How much?',
        amount: '£40',
        amountNote: 'Leave it blank if you’d rather not count it.',
        whenLabel: 'When?',
        when: ['Tonight', 'Yesterday', 'Earlier'],
        whyLabel: 'What was going on?',
        why: ['A match was on', 'Chasing', 'Payday', 'Drinking'],
        // mobile/i18n/en/core.ts → slip.stillYours, shortened. The precise claim,
        // not the stronger one. Do not rewrite as "your numbers never go down".
        note: 'A record, not a verdict. Writing it down doesn’t reset your total days clean, and never has.',
        cancel: 'Cancel',
        save: 'Save the record',
      },
    },

    mock: {
      day: 'Day 62',
      eyebrow: 'Tonight',
      band: 'Elevated risk',
      // Word for word what the engine renders, from mobile/i18n/en/reasons.ts:
      // `paydayToday`, `slipCorroboration(2, 2, 'payday')` and `firstFortnight`.
      // A mock that invents its own sentences is a mock that drifts.
      reasons: [
        'Money landed today.',
        'Both of your slips so far were on payday.',
        'You’re 9 days in. The first fortnight is the fragile part.',
      ],
      caption: 'An illustration of the home screen.',
      today: 'Friday',
      // Short forms, running forwards from tonight. Not a calendar week: the
      // app's own strip starts at today, because what is behind you isn't the
      // thing it is for.
      weekdays: ['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    },

    forecast: {
      eyebrow: 'The thing it does that nothing else does',
      title: 'Your patterns, crossed with your payday.',
      body:
        'Most apps in this category treat an urge as weather to be journalled after the fact. For gambling, the biggest trigger is external and on a schedule: the day the money lands, and the two nights after it. Every evening the app crosses what you have logged with where you are in that cycle, and says what tonight looks like.',
      marks: 'The marks beside each reason are what it read to get there.',
      bandsEyebrow: 'Three bands, and that’s all',
      bands: ['Low risk', 'Elevated risk', 'High risk'],
      // Invariant 2, stated as a feature rather than a footnote.
      caption:
        'A high-risk night reads like a weather warning, not a telling-off, and it always shows what produced it. You can look at those reasons and disagree with them; that is the point of printing them. A wrong forecast you can argue with is useful, and a score with no workings is not.',
    },

    slip: {
      eyebrow: 'The night it matters',
      title: 'A slip is a data point, not a reset.',
      body:
        'Relapse is the norm, so a counter that drops to zero at the moment of maximum shame is the category’s biggest reason people delete the app. Here, logging a slip is an act of honesty the app is built to encourage: it asks what led to it, keeps crisis resources one tap away, and adds what it learns to tomorrow’s forecast.',
      // mobile/i18n/en/core.ts → slip.stillYours. The precise claim, not the
      // stronger one. Do not rewrite this as "your numbers never go down".
      precise:
        'Your total days clean and your longest run are counted from your history every time a screen opens, so there is no stored total for a bad night to reset. Your current run starts again from today. That is the only figure a slip moves.',
    },

    money: {
      eyebrow: 'The number nobody has written down',
      title: 'Where the money stands.',
      body:
        'During setup it asks one question about money: roughly what a typical month used to cost. Not what you staked, but what was actually gone by the end of it. From there it keeps a running account of what the old pattern would have taken, less what slips actually cost, and it says so when a slip has no amount recorded rather than inventing one.',
      bodyEyebrow: 'How it arrives at the figure',
      exampleEyebrow: 'An example, not a promise',
      example:
        'Someone who put £600 a month in is looking at £7,200 a year, or about £20 a day. Most people have never seen that written down.',
      // Every figure below is already in `example` above. Broken out so the year
      // total can be set as a number rather than buried in a sentence — and it is
      // set still. See the note on this block in types.ts.
      basis: 'One year, at £600 a month',
      figure: '£7,200',
      figures: [
        { value: '£20', label: 'A day' },
        { value: '£600', label: 'A month' },
        { value: '£7,200', label: 'A year' },
      ],
      gridStart: 'Night one',
      gridEnd: 'Night 365',
      gridNote:
        'One mark for every night of the year. Most people have never seen it written down at all, let alone laid out.',
      // mobile/i18n/en/onboarding.ts → done.closingBody.
      caveat:
        'That money’s gone and this app can’t fetch it. What it can do is count what you don’t lose from here.',
    },

    trio: {
      eyebrow: 'Also in the app',
      items: [
        {
          title: 'The urge screen',
          body:
            'One button, reachable from everywhere. A timer that counts up and has nothing to reach, the reasons you wrote in your own words, where the money stands, and five physical things to do right now. Urges rise, peak and drop; sitting through the peak is the whole trick.',
        },
        {
          title: 'Your patterns',
          body:
            'The weekday that is hardest, the hours urges cluster in, what your slips had in common. Where there is not enough logged to say something honestly, the screen says nothing rather than guessing. Anything drawn from less than that would be a horoscope.',
        },
        {
          title: 'Thirty seconds a day',
          body:
            'Did you stay clean, how strong were the urges, when was it worst, what was going on. Optional tags, an optional note. That is the check-in, and it is what everything else is counted from.',
        },
      ],
      // mobile/i18n/en/paywall.ts → freeAnyway. Keep this promise wherever
      // pricing eventually lands.
      free:
        'The urge screen and the helplines stay free whatever else happens, and always will. They aren’t a feature.',
    },

    privacy: {
      eyebrow: 'Where your history lives',
      title: 'It stays on your phone.',
      // mobile/i18n/en/onboarding.ts → opening.privacyBody, and
      // mobile/i18n/en/secondary.ts → settings.data.onDevice.
      body:
        'No account. No email. Nothing synced. Everything you log is stored on this phone only, there is no server holding it, and no one else can see it, not us either.',
      analytics:
        'The app reports which screens get used and nothing else: never your notes, your reasons, your amounts, your urge levels, or which triggers you pick. No account, no email, and nothing that identifies you. These anonymous statistics are on by default; the privacy policy says exactly what they contain and how to stop them.',
      gapTitle: 'And the gap that comes with that',
      // mobile/i18n/en/secondary.ts → settings.data.noBackup. On the landing
      // page on purpose: better read here than discovered after a phone upgrade.
      gap:
        'There is no backup yet. If you lose this phone, change to a new one, or delete the app, this history goes with it. That is a real gap and worth knowing now rather than finding out later. An export is the next thing being built.',
      readPolicy: 'Read the privacy policy',
    },

    close: {
      eyebrow: 'Before you install it',
      title: 'What it isn’t.',
      items: [
        'It isn’t treatment, and it isn’t a substitute for talking to someone who does this for a living.',
        'It doesn’t block anything. It won’t stop a deposit, close an account or bar you from a site. If that is what you need, the resources page lists the self-exclusion schemes that do it.',
        'It makes no claim about outcomes. It keeps your record and works out where your risk is. What you do with that is yours.',
        'It’s for adults, and it asks nothing about you that it doesn’t use.',
      ],
      helpLead: 'If tonight is the problem rather than next month:',
      helpLink: 'Helplines and crisis resources',
    },
  },

  support: {
    title: 'Support',
    intro: (app) =>
      `${app} is built by one person. Email is the only support channel, and it reaches me directly.`,
    emailLead: 'Email',
    responseNote:
      'Usually answered within a few days. If it’s urgent in the way a helpline is urgent, please use one of those instead: they answer immediately and I might not.',
    faqTitle: 'Questions that come up',
    faqs: (app, pricing, paid) => [
      {
        q: `Does ${app} block gambling sites or apps?`,
        a: [
          {
            p: 'No, and it never will. It is a companion and a record, not an enforcement tool. Blocking is a different job done better by schemes built for it. The resources page lists GAMSTOP for Great Britain and the equivalents elsewhere.',
          },
        ],
      },
      {
        q: 'Do I need an account?',
        a: [
          {
            p: 'No. There is no sign-up, no email, no password and no profile. You open the app and answer a few questions, and that is the whole setup.',
          },
        ],
      },
      {
        q: 'Where is my data kept?',
        a: [
          {
            p: 'In the app’s private storage on your phone, and nowhere else. There is no server holding it, so there is nothing to breach and nothing for me to look at.',
          },
        ],
      },
      {
        q: 'What happens if I get a new phone?',
        a: [
          {
            p: 'Your history does not move with you yet, and that is the honest answer rather than a comfortable one. There is no backup or export in this version, so a new phone starts from day one. An encrypted export file is the next thing being built.',
          },
        ],
      },
      {
        q: 'How do I delete everything?',
        a: [
          {
            p: 'Settings → Delete everything. It removes every check-in, every slip, your reasons and your settings from the phone immediately. There is no backup, so it cannot be undone. Deleting the app does the same thing.',
          },
        ],
      },
      // Asked whether or not there is anything to pay, so it is answered either
      // way rather than omitted — a missing price question reads as evasion.
      {
        q: `What does ${app} cost?`,
        a: paid ? [
          {
            p: `The first ${pricing.trialDays} days are free, and you don't need to enter a card to start. After that it is ${pricing.monthly} a month, ${pricing.annual} a year, or ${pricing.lifetime} once. Prices are in euros; the App Store shows yours in your own currency before you buy.`,
          },
          {
            p: `The trial is actually a little longer than ${pricing.trialDays} days if you have not checked in much: it stays open until there are eight check-ins on the record, because until then the forecast has too little to read and you would be paying for the least useful version of the app.`,
          },
          {
            p: 'Apple takes the payment, not me, and I never see your card. A subscription renews until you cancel it, and you cancel it in your own iPhone Settings under your Apple Account rather than in the app. Cancelling stops the next renewal and leaves you the time you have already paid for.',
          },
          {
            p: 'The urge screen and the helplines stay free whatever you choose, and always will. They aren’t a feature. Settings stays reachable too, so you can always restore a purchase or delete everything.',
          },
        ] : [
          {
            p: 'Nothing. There is no charge, no trial to run out, and nothing to enter a card for. Every part of the app is open.',
          },
          {
            p: 'That may change later, and if it does I will say so here before it does rather than after. What will not change is the urge screen and the helplines: those stay free whatever happens to the rest, and they are not a feature.',
          },
        ],
      },
      {
        q: 'Is there an Android version?',
        a: [{ p: 'Not yet. iPhone first, and properly, before anything else.' }],
      },
      {
        q: 'How do I turn the anonymous statistics off?',
        a: [
          {
            p: 'They are on, and there is no switch for them in the app at the moment, and that is a deliberate choice I am not going to dress up. Deleting the app stops them for good. Settings → Delete everything discards the random identifier along with your data, so nothing sent afterwards can be joined to anything sent before. If you would rather they stopped and you would rather not delete anything, write to me and I will act on it. The privacy policy lists exactly what they contain.',
          },
        ],
      },
      {
        q: 'Why is the forecast telling me nothing useful?',
        a: [
          {
            p: 'For the first week or so it has little to work with beyond your payday and how recently you bet, and it says so out loud. It holds every personal-pattern signal back until there are enough check-ins to mean something, because a pattern drawn from three days would be a guess dressed up as a finding.',
          },
        ],
      },
    ],
    bugTitle: 'Reporting something broken',
    bugBlocks: [
      {
        p: 'Useful to include: your iPhone model, your iOS version, the app version from the bottom of Settings, and what you were doing when it happened.',
      },
      {
        note:
          'Please don’t send screenshots of your own history, your notes or your reasons. I don’t need them to fix a bug, and this app’s whole arrangement is that I never see them.',
      },
    ],
    crisisLead: 'If you need to talk to someone now:',
    crisisLink: 'Helplines and crisis resources',
  },

  help: {
    // mobile/i18n/en/secondary.ts → crisis.*
    title: 'Talk to someone',
    intro:
      'Everything below is free and confidential, and answered by people who do only this. You don’t have to have reached any particular point to ring them.',
    emergencyTitle: 'If you are thinking about harming yourself',
    emergencyBody:
      'Ring emergency services now. This is exactly what those numbers are for, and nobody answering them will think you are wasting their time.',
    callLabel: (display, what, where) => `Call ${display}, ${what}, ${where}`,
    notTreatment:
      'This app keeps your record and works out where your risk is. It isn’t treatment, and it isn’t a substitute for talking to someone who does this for a living.',
    checked:
      'Each of these was checked against the organisation’s own site. Where a number couldn’t be confirmed, only the website is listed. A wrong number at 2am is worse than none.',
    languageNote: 'Each entry says which language it is answered in.',
    call: (display) => `Call ${display}`,
    open: (display) => `Open ${display}`,
  },

  legal: {
    updated: (date) => `Last updated ${date}`,
    contents: 'Contents',

    privacy: (ctx) => ({
      title: 'Privacy policy',
      intro: `${ctx.app} is built so that there is very little to write a privacy policy about. This is the whole of it.`,
      sections: [
        {
          heading: 'The short version',
          blocks: [
            {
              ul: [
                'Everything you log stays on your phone. There is no account, no server holding it, and no sync.',
                'Anonymous usage statistics are off unless you switch them on, and they never contain anything you wrote.',
                'Nothing is sold, shared for advertising, or used to build a profile of you.',
                `If you subscribe, ${ctx.purchasesMerchant} takes the payment and a receipt is checked against an anonymous identifier. Nothing you wrote is part of that.`,
                'This website sets no cookies and runs no analytics.',
              ],
            },
            {
              p: `Everything below is the detail behind those five lines. If any of it turns out to disagree with what the app does, the app’s behaviour is the bug and I want to hear about it: ${ctx.email}.`,
            },
          ],
        },
        {
          heading: 'What stays on your phone',
          blocks: [
            {
              p: 'The app stores what you tell it in a database inside its own private storage on your device. That includes your daily check-ins and urge levels, the trigger tags you pick, any notes you write, the slips you log and their amounts, the reasons you wrote for stopping, the monthly figure and currency you gave, your payday settings, the date you started, and your language and appearance preferences.',
            },
            {
              p: 'None of it is transmitted. There is no account to attach it to, no server that receives it, and no sync. I have no access to it and no way to request it.',
            },
            {
              note:
                'There is also no backup. If you lose the phone, replace it, or delete the app, that history is gone and cannot be recovered, not by you and not by me. You can also delete all of it deliberately at any time: Settings → Delete everything, which is immediate and cannot be undone.',
            },
          ],
        },
        {
          heading: 'Anonymous usage statistics',
          blocks: [
            {
              p: 'These are on by default, and the app does not ask. I would rather say that plainly than bury it: their only purpose is telling me which parts of the app get used, so the next thing built is the right one, and an app whose problem is people leaving in the first week cannot learn that from data nobody switched on.',
            },
            {
              p: 'One message is sent per event. Each message contains: the name of the event, from a fixed published list; a small number of counts, true-or-false flags and fixed values attached to it, such as whether a check-in recorded a clean day or how many trigger tags were selected; the app version; the operating-system name and version; your device language; whether the build is a development build; a timestamp; and one random identifier.',
            },
            {
              p: 'That identifier is invented at random on your phone the first time anything is sent, and kept until the app is deleted. It means the events from one installation can be counted as one person rather than as a crowd of strangers, which is the difference between knowing whether a change helped and knowing nothing. It is derived from nothing: not your device, not your Apple Account, not an advertising identifier, and there is no account identifier because there are no accounts. It cannot be joined to another app’s data or to you, and it dies with the installation.',
            },
            {
              p: 'What is never sent, ever: your notes, your reasons, the amounts you log, your urge levels, which triggers you pick, your payday, your start date, your monthly figure, or anything else you typed. The rule is counts, flags and fixed values only. It is enforced in the app’s source rather than by policy: one file lists every event and every property permitted, and nothing outside it can be transmitted.',
            },
            {
              p: `These messages are processed on my behalf by ${ctx.analyticsProcessor}, an analytics provider, on servers in ${ctx.analyticsRegion}. As with any internet request, it arrives from your IP address, and an approximate country can be derived from that; the IP address is not part of the message and is not stored by me. ${ctx.analyticsProcessor} acts as a processor and may not use the data for its own purposes.`,
            },
            {
              p: `How to stop them: there is no switch for this in the app at the moment, and I am not going to describe that as anything other than a gap. Deleting the app stops it permanently. Settings → Delete everything discards the random identifier as well as your data, so nothing sent after that point can be joined to anything sent before it. And you can object by writing to ${ctx.email}, which I will act on.`,
            },
          ],
        },
        {
          heading: 'If you subscribe',
          onlyWhenPaid: true,
          blocks: [
            {
              p: `Buying anything is handled by ${ctx.purchasesMerchant}. Payment goes through your Apple Account, ${ctx.purchasesMerchant} is the merchant, and your card details never reach me or this app. I only ever learn that a purchase exists, never who made it.`,
            },
            {
              p: `To check whether a purchase is still valid, the app sends the App Store receipt to ${ctx.purchasesProcessor}, a subscription-management provider acting as a processor on my behalf, on servers in ${ctx.purchasesRegion}. Alongside the receipt it sends an app-user identifier generated at random on your device. That identifier is not your name, your email, your Apple Account or your device id, and it is not connected to anything you log.`,
            },
            {
              p: 'Nothing you write is involved in any of this. Your check-ins, notes, reasons, amounts and urge levels are not sent when you subscribe, restore a purchase, or at any other time.',
            },
            {
              // TODO(launch-blocker): confirm the transfer safeguard from
              // RevenueCat's current DPA and name it here. Stating that the data
              // leaves the EU is a fact and is safe to publish; naming a
              // mechanism — Data Privacy Framework, standard contractual clauses
              // — is a legal claim, and this page does not get to guess at one.
              p: `Because that provider operates in ${ctx.purchasesRegion}, a receipt and a random identifier do leave the European Union. Nothing else does, and nothing that identifies you is part of either.`,
            },
            {
              note: `This is the one part of the app that talks to a server, and it exists only because a receipt has to be checked somewhere. It is also the reason the App Store listing declares "Purchases" as data collected but not linked to your identity. That declaration and this paragraph describe the same thing.`,
            },
          ],
        },
        {
          heading: 'This website',
          blocks: [
            {
              // Reworded on 2026-08-14, when the home page gained the working
              // demonstration of the app. It said "and has no forms" — the demo
              // is built out of radio buttons and checkboxes, so that sentence
              // stopped being precise even though nothing about what the site
              // collects had changed. A privacy claim that is nearly true is
              // worse than one that is precise, so this now describes the
              // controls rather than denying they exist.
              p: `This site is a few static pages. It sets no cookies, runs no analytics, and embeds no third-party scripts, fonts or trackers. The working demonstration of the app on the home page is made of ordinary page controls and nothing else: choosing a night or a screen only changes what is drawn, nothing is submitted anywhere, and nothing is remembered between visits. There is nothing here for this site to collect about you.`,
            },
            {
              p: `It is hosted by ${ctx.hostingProvider}, which processes ordinary web-server request logs, including IP addresses, to serve pages and absorb attacks. I do not use those logs to identify anyone.`,
            },
          ],
        },
        {
          heading: 'What never happens',
          blocks: [
            {
              ul: [
                'No selling or renting of data, in any form.',
                'No advertising, no ad networks, no advertising identifiers, and no sharing for advertising.',
                'No third-party analytics or tracking SDKs. The app talks to exactly two outside services, both named above: the statistics provider, only if you switch statistics on, and the receipt checker, only if you buy something. Neither receives anything you wrote.',
                'No profiling, no automated decisions about you, and no attempt to work out who you are.',
                'No social login, no contact-list access, no location access, no health-data access.',
              ],
            },
          ],
        },
        {
          heading: 'Your rights',
          blocks: [
            {
              p: 'Under the UK and EU General Data Protection Regulation you have rights of access, correction, erasure, restriction, objection and portability over personal data held about you.',
            },
            {
              p: 'For what the app stores, those rights are satisfied on the device itself, because that is the only place it exists: you already have full access to it in the app, and Settings → Delete everything is an immediate and complete erasure. There is nothing for me to send you and nothing for me to delete, because I never had it.',
            },
            {
              p: 'For the statistics, the honest position is that the random identifier is the only thing tying a set of events together, and I have no way of knowing which one is yours. If you send it to me I can delete what it points at; without it I cannot find your events to give you or to erase, which is a consequence of collecting nothing that identifies you rather than a way of avoiding the request.',
            },
            {
              p: `For the anonymous statistics, the lawful basis I rely on is legitimate interest: understanding which parts of the app are used, so that the app gets better at the thing it exists for. The data is deliberately kept to counts, flags and fixed values, contains nothing you wrote, and is not used to build a profile, to advertise, or to make any decision about you. You have the right to object to this at any time under Article 21, and the paragraph above says how.`,
            },
            {
              p: `If you want to raise something regardless, or you disagree with any of the above, write to ${ctx.email}. You also have the right to complain to your national data protection authority.`,
            },
          ],
        },
        {
          heading: 'Children',
          blocks: [
            {
              p: 'This app is for adults. It is not directed at children, and it does not knowingly collect anything from them.',
            },
          ],
        },
        {
          heading: 'Changes to this policy',
          blocks: [
            {
              p: 'If what the app collects changes, this page changes in the same release rather than afterwards, and the date at the top moves. A privacy claim that is nearly true is worse than one that is precise.',
            },
          ],
        },
        {
          heading: 'Who is responsible',
          blocks: [
            {
              p: `The data controller is ${ctx.legalName}. Contact: ${ctx.email}.`,
            },
          ],
        },
      ],
    }),

    terms: (ctx) => ({
      title: 'Terms and conditions',
      intro: `These terms cover your use of the ${ctx.app} app. They are worth two minutes because two of the sections describe what the app deliberately will not do for you.`,
      sections: [
        {
          heading: 'Who this is between',
          blocks: [
            {
              p: `This agreement is between you and ${ctx.legalName}, referred to below as "I" or "me". By installing or using ${ctx.app} you accept it. If you do not, don’t use the app.`,
            },
          ],
        },
        {
          heading: `What ${ctx.app} is, and what it is not`,
          blocks: [
            {
              p: `${ctx.app} is a self-tracking companion for someone who has decided to stop gambling. It records what you enter, derives figures from that record, and estimates a daily risk level with the reasons behind it.`,
            },
            {
              p: 'It is not medical, clinical, psychological, financial or legal advice. It is not treatment, therapy or diagnosis, and it is not a substitute for a professional. It makes no promise or prediction about any outcome, and nothing in it should be read as one. Decisions you take remain yours.',
            },
            {
              p: 'It is not a blocking or enforcement tool. It cannot and will not prevent you from gambling, restrict deposits, close accounts, or bar you from any site or venue. If that is what you need, the self-exclusion schemes listed on the resources page exist to do it.',
            },
            {
              p: 'The risk estimate is produced by simple published rules over the data you enter. It will sometimes be wrong. It is offered as information to argue with, not as a verdict, which is why it always states its reasons.',
            },
          ],
        },
        {
          heading: 'Your licence to use the app',
          blocks: [
            {
              p: `I grant you a personal, revocable, non-exclusive and non-transferable licence to use ${ctx.app} on Apple-branded devices that you own or control, as permitted by the App Store Terms of Service. I keep all rights in the app, its name and its content.`,
            },
            {
              p: 'You agree not to copy, sell or redistribute the app, reverse-engineer it except where law expressly allows, or use it unlawfully.',
            },
          ],
        },
        {
          heading: 'What it costs',
          onlyWhenPaid: true,
          blocks: [
            {
              p: `${ctx.app} is free to download and free to use for the first ${ctx.pricing.trialDays} days, with no payment details required to begin. The trial does not end while there are fewer than eight daily check-ins on the record.`,
            },
            {
              p: `After the trial, continued access to the forecast, the patterns screen, your full history and the money figures requires one of three purchases: ${ctx.pricing.monthly} per month or ${ctx.pricing.annual} per year, both of which are auto-renewing subscriptions, or ${ctx.pricing.lifetime} as a single non-renewing payment. Prices are stated in euros; the App Store displays the applicable price in your own currency, on Apple's price tiers, before you confirm.`,
            },
            {
              p: `${ctx.purchasesMerchant} is the merchant of record for every purchase. Payment is taken by ${ctx.purchasesMerchant} through your Apple Account, under ${ctx.purchasesMerchant}'s terms, and I never receive or hold your payment details.`,
            },
            {
              p: 'A subscription renews automatically at the end of each period unless cancelled at least 24 hours beforehand. Cancellation is done in your device Settings under your Apple Account, not in the app; it stops the next renewal and does not shorten the period already paid for. Refunds are requested from Apple, and are at Apple’s discretion rather than mine.',
            },
            {
              p: 'If a price changes, Apple notifies existing subscribers and asks for consent before charging the new amount, in the manner its rules require. I will not introduce a charge for anything that is free at the time you install the app without saying so first.',
            },
            {
              // Tracks `freeAnyway` in mobile/i18n/*/paywall.ts and
              // `ALWAYS_FREE_ROUTES`. Stated as a term and not only as a feature,
              // because it is the one promise a paying reader most needs to be
              // able to hold us to.
              p: 'The urge screen and the crisis resources remain free regardless of whether you ever pay, and regardless of whether a subscription has lapsed. Settings remains reachable on the same terms, so restoring a purchase and deleting everything are always available.',
            },
          ],
        },
        {
          heading: 'Your data, and the fact that it is only on your phone',
          blocks: [
            {
              p: 'Everything you enter is stored on your device and nowhere else. The privacy policy sets out the detail.',
            },
            {
              p: 'One consequence needs stating as a term and not only as a feature: because there is no server copy and no backup in this version, losing, replacing, resetting or wiping your phone, or deleting the app, destroys that history permanently. I cannot recover it for you. Keeping it is not something I am able to promise, and I don’t.',
            },
          ],
        },
        {
          heading: 'Crisis and support resources',
          blocks: [
            {
              p: 'The app and this site list helplines and support organisations as a convenience. Those services are run by independent third parties. I do not operate them, employ their staff, supervise their advice or take responsibility for what they do, and listing one is not an endorsement of it.',
            },
            {
              p: 'Every number was checked against the organisation’s own published contact details, and where a number could not be confirmed only a website is listed. Contact details still change without notice. In an emergency, use your local emergency number.',
            },
          ],
        },
        {
          heading: 'Age',
          blocks: [
            {
              p: 'You must be 18 or over to use the app.',
            },
          ],
        },
        {
          heading: 'Limits on my responsibility',
          blocks: [
            {
              p: `${ctx.app} is provided as it is, without warranty that it will be uninterrupted, error-free, or that any figure or forecast in it is accurate or suitable for your circumstances.`,
            },
            {
              p: 'To the extent the law allows, I am not liable for gambling losses, financial losses, or any decision taken with or without the app’s information; for loss of data stored on your device; or for indirect or consequential loss. Nothing here excludes liability that cannot lawfully be excluded, including for death or personal injury caused by negligence, or for fraud. If you are a consumer, your statutory rights are unaffected by anything in this section.',
            },
          ],
        },
        {
          heading: 'Apple’s role',
          blocks: [
            {
              p: 'Apple requires the following to be stated, and it is accurate:',
            },
            {
              ul: [
                `This agreement is between you and ${ctx.legalName} only, and not with Apple. Apple is not responsible for ${ctx.app} or its content.`,
                `I am solely responsible for ${ctx.app}, including any maintenance and support. Apple has no obligation to furnish either.`,
                'If the app fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the purchase price of the app to you. To the maximum extent permitted by law, Apple has no other warranty obligation whatsoever in respect of the app.',
                'I am responsible for addressing any claim by you or a third party relating to the app or your use of it, including product liability, any failure to conform to legal or regulatory requirements, and claims under consumer-protection or privacy law.',
                'I am responsible for the investigation, defence, settlement and discharge of any third-party claim that the app infringes intellectual property rights.',
                'You represent that you are not located in a country subject to a U.S. Government embargo or designated as terrorist-supporting, and that you are not listed on any U.S. Government list of prohibited or restricted parties.',
                'You must comply with any applicable third-party terms when using the app.',
                'Apple and its subsidiaries are third-party beneficiaries of these terms, and may enforce them against you.',
              ],
            },
          ],
        },
        {
          heading: 'Changes',
          blocks: [
            {
              p: 'The app will change, and features described here may be added, altered or removed. If these terms change materially, the updated version appears on this page with a new date at the top. Continuing to use the app after that means accepting the change.',
            },
          ],
        },
        {
          heading: 'Governing law',
          blocks: [
            {
              p: `These terms are governed by the law of ${ctx.jurisdiction}. If you are a consumer resident elsewhere, you keep the protection of any mandatory consumer law of the country where you live.`,
            },
          ],
        },
        {
          heading: 'Contact',
          blocks: [
            {
              p: `${ctx.legalName}, ${ctx.email}.`,
            },
          ],
        },
      ],
    }),
  },

  footer: {
    tagline: (app) => `${app}: a companion for stopping gambling.`,
    notTreatment: 'Not treatment, and not a substitute for professional support.',
    contact: 'Contact',
    copyright: (year, holder) => `© ${year} ${holder}`,
    appHeading: 'The app',
    helpHeading: 'Help',
    legalHeading: 'Legal',
    howItWorks: 'How it works',
    yourData: 'Your data',
    theMoney: 'Where the money stands',
  },
} satisfies Dict;
