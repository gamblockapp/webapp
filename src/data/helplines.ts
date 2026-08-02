import type { Locale } from '../i18n/types';

/**
 * A mirror of `mobile/domain/helplines.ts`.
 *
 * Copied deliberately rather than abstracted into a shared package: two repos
 * that both need this list at build time, one of which must work with no network
 * and no dependencies, is not worth a workspace. The cost of the copy is that it
 * can drift, so:
 *
 * **Edit both files in the same commit, or neither.** The types and the entry
 * order are identical on purpose, so `diff` across the two is meaningful.
 *
 * The four rules from the mobile file apply here unchanged, and the first one is
 * the one that matters:
 *
 * 1. **Never invent a phone number.** Every number below was checked against the
 *    organisation's own site. If a number can't be confirmed, the entry gets a
 *    website and nothing else — a wrong number at 2am is worse than no number.
 * 2. **Describe, don't claim.** What a service is and how it's reached. No
 *    outcomes, no "proven", no "treatment that works".
 * 3. **Names, numbers and URLs are never translated.** Only `what`, `note`,
 *    `title` and `where` carry copy. Translating an organisation's name would
 *    leave someone searching for a body that doesn't exist.
 * 4. **Every description states the language you'll be answered in**, in both
 *    locales, because it is a fact about the service rather than a translation
 *    of one.
 */

/** Copy that exists once per UI language. Names, numbers and URLs never do. */
export type Localised = Record<Locale, string>;

export type HelplineContact =
  | { kind: 'phone'; display: string; dial: string; note?: Localised }
  | { kind: 'web'; display: string; url: string; note?: Localised };

export type Helpline = {
  name: string;
  what: Localised;
  contacts: HelplineContact[];
};

export type HelplineRegion = {
  id: string;
  title: Localised;
  services: Helpline[];
};

export type EmergencyNumber = {
  where: Localised;
  display: string;
  dial: string;
  what: Localised;
};

/** For immediate danger to life. Kept separate so it reads in one glance. */
export const EMERGENCY_NUMBERS: EmergencyNumber[] = [
  {
    where: { en: 'UK', fr: 'Royaume-Uni' },
    display: '999',
    dial: '999',
    what: { en: 'Emergency services', fr: 'Services d’urgence' },
  },
  {
    where: { en: 'EU', fr: 'UE' },
    display: '112',
    dial: '112',
    what: {
      en: 'Emergency services, anywhere in the EU',
      fr: 'Services d’urgence, partout dans l’UE',
    },
  },
  {
    where: { en: 'US', fr: 'États-Unis' },
    display: '988',
    dial: '988',
    // The service's own name, kept as it is in both locales — rule 3. The region
    // tag already tells a French reader this is an American line.
    what: { en: 'Suicide and Crisis Lifeline', fr: 'Suicide and Crisis Lifeline' },
  },
];

const SAMARITANS: Helpline = {
  name: 'Samaritans',
  what: {
    en: 'For when it has stopped being about the money. Free to call, day or night, from the UK and Ireland. Answered in English. You don’t have to be in crisis to ring them.',
    fr: 'Pour quand ce n’est plus une question d’argent. Gratuit, jour et nuit, depuis le Royaume-Uni et l’Irlande. On te répond en anglais. Tu n’as pas besoin d’être en crise pour appeler.',
  },
  contacts: [
    {
      kind: 'phone',
      display: '116 123',
      dial: '116123',
      note: {
        en: 'Free from the UK and Ireland, 24 hours. Does not appear on your phone bill.',
        fr: 'Gratuit depuis le Royaume-Uni et l’Irlande, 24 h/24. N’apparaît pas sur ta facture.',
      },
    },
    { kind: 'web', display: 'samaritans.org', url: 'https://www.samaritans.org' },
  ],
};

export const HELPLINE_REGIONS: HelplineRegion[] = [
  {
    id: 'uk',
    title: { en: 'United Kingdom', fr: 'Royaume-Uni' },
    services: [
      {
        name: 'National Gambling Helpline (GamCare)',
        what: {
          en: 'Free and confidential, 24 hours a day, answered in English. Advisers talk through what is going on and can refer you into free support near you.',
          fr: 'Gratuit et confidentiel, 24 h/24, on te répond en anglais. Les conseillers font le point avec toi et peuvent t’orienter vers un accompagnement gratuit près de chez toi.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '0808 8020 133',
            dial: '08088020133',
            note: {
              en: 'Free from the UK, 24 hours. Also on WhatsApp at the same number.',
              fr: 'Gratuit depuis le Royaume-Uni, 24 h/24. Aussi sur WhatsApp au même numéro.',
            },
          },
          { kind: 'web', display: 'gamcare.org.uk', url: 'https://www.gamcare.org.uk' },
        ],
      },
      {
        name: 'GAMSTOP',
        what: {
          // The scope matters more than the mechanism: it covers operators
          // licensed in Great Britain, so it does nothing about a French- or
          // German-licensed site. Saying so is the difference between a tool and
          // a false sense of safety.
          en: 'Free self-exclusion scheme. One registration blocks your access to online gambling accounts with participating companies licensed in Great Britain. The site is in English.',
          fr: 'Dispositif d’auto-exclusion britannique, gratuit. Une seule inscription bloque ton accès aux comptes de jeu en ligne des opérateurs participants sous licence britannique — pas aux sites agréés en France. Site en anglais.',
        },
        contacts: [{ kind: 'web', display: 'gamstop.co.uk', url: 'https://www.gamstop.co.uk' }],
      },
      SAMARITANS,
    ],
  },
  {
    id: 'ie',
    title: { en: 'Ireland', fr: 'Irlande' },
    services: [
      {
        name: 'Gambling Care',
        what: {
          en: 'Freephone helpline run by Dunlewey Addiction Services, open 24 hours, every day of the year, answered in English. They talk it through and refer on to counselling.',
          fr: 'Ligne gratuite gérée par Dunlewey Addiction Services, ouverte 24 h/24, tous les jours de l’année, on te répond en anglais. On fait le point avec toi et on peut t’orienter vers un suivi.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '1800 936 725',
            dial: '1800936725',
            note: {
              en: 'Free from Ireland, 24 hours, 365 days.',
              fr: 'Gratuit depuis l’Irlande, 24 h/24, 365 jours par an.',
            },
          },
          { kind: 'web', display: 'gamblingcare.ie', url: 'https://gamblingcare.ie' },
        ],
      },
      {
        name: 'Gamblers Anonymous Ireland',
        what: {
          en: 'Peer meetings across Ireland, most days of the week, held in English. Free, and you don’t have to give your real name.',
          fr: 'Réunions entre pairs partout en Irlande, presque tous les jours, en anglais. Gratuit, et tu n’as pas besoin de donner ton vrai nom.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '01 872 1133',
            dial: '018721133',
            note: {
              en: 'Dublin line, listed as the national contact.',
              fr: 'Ligne de Dublin, indiquée comme contact national.',
            },
          },
          {
            kind: 'web',
            display: 'gamblersanonymous.ie',
            url: 'https://www.gamblersanonymous.ie',
            note: {
              en: 'Meeting times and regional numbers.',
              fr: 'Horaires des réunions et numéros régionaux.',
            },
          },
        ],
      },
      {
        name: 'Problem Gambling Ireland',
        what: {
          en: 'Information, a directory of meetings and online support groups. In English.',
          fr: 'Informations, annuaire de réunions et groupes de soutien en ligne. En anglais.',
        },
        contacts: [
          {
            kind: 'web',
            display: 'problemgambling.ie',
            url: 'https://www.problemgambling.ie',
            // Their support-line number could not be confirmed from their own
            // site, so this entry stays website-only rather than guessing.
            note: {
              en: 'Current contact details are on their site.',
              fr: 'Les coordonnées à jour sont sur leur site.',
            },
          },
        ],
      },
      SAMARITANS,
    ],
  },
  {
    id: 'fr',
    title: { en: 'France', fr: 'France' },
    services: [
      {
        name: 'Joueurs Info Service',
        what: {
          en: 'National helpline, anonymous, seven days a week, answered in French. Advisers can point you to a service near you.',
          fr: 'Ligne d’écoute nationale, anonyme, sept jours sur sept, en français. Les écoutants peuvent t’orienter vers un service près de chez toi.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '09 74 75 13 13',
            dial: '0974751313',
            note: {
              en: 'Seven days a week. Charged as an ordinary call, no premium rate.',
              fr: 'Sept jours sur sept. Prix d’un appel normal, sans surtaxe.',
            },
          },
          {
            kind: 'web',
            display: 'joueurs-info-service.fr',
            url: 'https://www.joueurs-info-service.fr',
          },
        ],
      },
    ],
  },
  {
    id: 'de',
    title: { en: 'Germany', fr: 'Allemagne' },
    services: [
      {
        name: 'Telefonberatung zur Glücksspielsucht (BZgA)',
        what: {
          en: 'Free, anonymous phone counselling from the German federal health-education agency, in German. Their site also lists advice centres by region.',
          fr: 'Conseil téléphonique gratuit et anonyme, assuré par l’agence fédérale allemande d’éducation à la santé, en allemand. Leur site liste aussi les centres de consultation par région.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '0800 1 37 27 00',
            dial: '08001372700',
            note: {
              en: 'Free from Germany, and anonymous.',
              fr: 'Gratuit depuis l’Allemagne, et anonyme.',
            },
          },
          { kind: 'web', display: 'check-dein-spiel.de', url: 'https://www.check-dein-spiel.de' },
        ],
      },
    ],
  },
  {
    id: 'us',
    title: { en: 'United States', fr: 'États-Unis' },
    services: [
      {
        name: 'National Problem Gambling Helpline',
        what: {
          en: 'Free and confidential, 24 hours a day, answered in English. Routes you to a contact centre in your state.',
          fr: 'Gratuit et confidentiel, 24 h/24, on te répond en anglais. La ligne te met en relation avec un centre de ton État.',
        },
        contacts: [
          {
            kind: 'phone',
            display: '1-800-MY-RESET',
            dial: '18006973738',
            note: {
              en: 'Call or text, from the US. Dials as 1-800-697-3738.',
              fr: 'Appel ou SMS, depuis les États-Unis. Se compose 1-800-697-3738.',
            },
          },
          { kind: 'web', display: 'ncpgambling.org', url: 'https://www.ncpgambling.org' },
        ],
      },
    ],
  },
  {
    id: 'intl',
    title: { en: 'International and online', fr: 'International et en ligne' },
    services: [
      {
        name: 'Gamblers Anonymous',
        what: {
          en: 'Free peer meetings worldwide, in person and online. The site is in English and lists groups by country, so local meetings are held in the local language.',
          fr: 'Réunions entre pairs gratuites dans le monde entier, sur place et en ligne. Le site est en anglais et liste les groupes par pays ; les réunions locales se tiennent dans la langue du pays.',
        },
        contacts: [
          {
            kind: 'web',
            display: 'gamblersanonymous.org',
            url: 'https://www.gamblersanonymous.org',
            note: { en: 'Meeting directory.', fr: 'Annuaire des réunions.' },
          },
        ],
      },
      {
        name: 'Gambling Therapy',
        what: {
          en: 'Free online groups, moderated forums and one-to-one chat, in more than forty languages. Run by the UK charity Gordon Moody.',
          fr: 'Groupes en ligne gratuits, forums modérés et discussion individuelle, dans plus de quarante langues. Géré par l’association britannique Gordon Moody.',
        },
        contacts: [
          { kind: 'web', display: 'gamblingtherapy.org', url: 'https://www.gamblingtherapy.org' },
        ],
      },
      {
        name: 'Find a Helpline',
        what: {
          en: 'If your country is not listed above: a directory of free, confidential lines by country and topic.',
          fr: 'Si ton pays n’est pas dans la liste : un annuaire de lignes gratuites et confidentielles, par pays et par sujet.',
        },
        contacts: [{ kind: 'web', display: 'findahelpline.com', url: 'https://findahelpline.com' }],
      },
    ],
  },
];

/**
 * The regions in reading order for a given UI language.
 *
 * The only reordering: a region whose id matches the language moves to the top,
 * so a French reader meets Joueurs Info Service — the one line here answered in
 * French — before six English-language services. Nothing is added, removed or
 * renamed, and every other section keeps its authored order.
 */
export function helplineRegionsFor(locale: Locale): HelplineRegion[] {
  if (!HELPLINE_REGIONS.some((r) => r.id === locale)) return HELPLINE_REGIONS;

  return [
    ...HELPLINE_REGIONS.filter((r) => r.id === locale),
    ...HELPLINE_REGIONS.filter((r) => r.id !== locale),
  ];
}
