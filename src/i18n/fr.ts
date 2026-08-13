import type { Dict } from './types';

/**
 * Copie française du site.
 *
 * Pas une traduction mot à mot de `en.ts` : le registre compte plus que le
 * wording, comme dans `mobile/i18n/fr/*`. Plusieurs lignes sont reprises
 * telles quelles de l'app, et la source est nommée en commentaire là où c'est le
 * cas, pour qu'un changement d'un côté se retrouve de l'autre.
 *
 * **Tutoiement sur la page d'accueil, le support et les ressources** — c'est la
 * voix de l'app, et ces pages reprennent ses phrases. **Vouvoiement dans la
 * politique de confidentialité et les CGU** : ce sont deux documents
 * contractuels entre deux parties, et le tutoiement y sonnerait comme un
 * document qu'on ne prend pas au sérieux. Le changement de registre est
 * délibéré, pas un oubli.
 *
 * Typographie : les espaces avant `?`, `!`, `;` et `:`, et à l'intérieur des
 * « … », sont insécables (U+00A0). Elles ressemblent à des espaces normales dans
 * un éditeur — garde-les, sinon la ponctuation française se retrouve seule en
 * début de ligne.
 */
export const fr = {
  htmlLang: 'fr',
  localeName: 'Français',

  nav: {
    skipToContent: 'Aller au contenu',
    home: 'Accueil',
    privacy: 'Confidentialité',
    terms: 'CGU',
    support: 'Support',
    help: 'Parler à quelqu’un',
    languageLabel: 'Langue',
    primaryNavLabel: 'Principale',
    footerNavLabel: 'Pied de page',
  },

  meta: {
    home: (app) => ({
      title: `${app}: compte ce que le jeu t’a coûté, et te prévient des soirs qui arrivent`,
      description:
        'Une app pour arrêter de parier. Une estimation quotidienne du risque, construite depuis tes propres schémas et le jour où ta paie tombe, un carnet des écarts qui garde ton historique, et tout qui reste sur ton téléphone. Sans compte.',
    }),
    privacy: (app) => ({
      title: `Politique de confidentialité · ${app}`,
      description:
        'Ce qui reste sur ton téléphone, ce que contiennent les statistiques anonymes, et ce qui n’est jamais collecté.',
    }),
    terms: (app) => ({
      title: `Conditions générales d’utilisation · ${app}`,
      description: `Les conditions qui encadrent ton utilisation de ${app}, y compris ce que l’app n’est pas.`,
    }),
    support: (app) => ({
      title: `Support · ${app}`,
      description: `Comment obtenir de l’aide sur ${app}, et les réponses aux questions les plus fréquentes.`,
    }),
    help: () => ({
      title: 'Parler à quelqu’un · lignes d’écoute et ressources d’urgence',
      description:
        'Lignes d’écoute gratuites et confidentielles sur le jeu, par pays. Chaque entrée a été vérifiée sur le site de l’organisme concerné.',
    }),
  },

  landing: {
    tagline: 'Une app pour arrêter de parier',
    /**
     * Le titre. Voir la note détaillée dans en.ts : le `catchline` qui se trouvait
     * au-dessus a été supprimé, et c'est le hook qui porte maintenant la page.
     *
     * mobile/i18n/fr/onboarding.ts → opening.hook / line1.
     *
     * Ce qu'il faut préserver : **le sujet est le jeu, pas le lecteur.** C'est un
     * constat sur l'avantage de la maison, et `line1` est ce qui le rend explicite —
     * « ni sur un an, ni sur dix », c'est l'échelle de temps sur laquelle les maths
     * gagnent. Formulé comme un verdict sur la personne qui lit, ça casserait la
     * promesse « pas de leçon » faite trois lignes plus bas. Règle 1 : aucune
     * affirmation sur un résultat, seulement sur ce qu'est le jeu.
     */
    hook: 'Personne n’est gagnant.',
    line1: 'Ni sur un an. Ni sur dix.',
    lead: (app) =>
      `${app} compte ce que ça t’a vraiment coûté, et te prévient des soirs qui arrivent, à partir de tes propres schémas et du jour où ta paie tombe.`,
    // mobile/i18n/fr/onboarding.ts → opening.line3, découpé pour l’affichage.
    refusalList: ['Pas de thérapie', 'Pas de blocage', 'Pas de leçon'],
    comingSoon: 'Bientôt sur l’App Store',
    // Disait « Gratuit pendant la construction » jusqu’au 05/08/2026, ce qui a
    // cessé d’être vrai dès l’arrivée de `mobile/purchases/` et de l’essai de
    // 14 jours. L’essai est la version honnête du même accueil.
    comingSoonNote: 'iPhone d’abord. Gratuit 14 jours, puis un abonnement.',
    /** Utilisé à la place de la ligne ci-dessus tant que `PAID` est faux. */
    comingSoonNoteFree: 'iPhone d’abord. Gratuit, et rien à acheter.',
    download: 'Télécharger dans l’App Store',

    pricing: {
      eyebrow: 'Ce que ça coûte',
      trial: (days) => `Gratuit pendant ${days} jours. Sans carte bancaire pour commencer.`,
      plans: (p) => [
        `${p.monthly} par mois`,
        `${p.annual} par an, soit ${p.annualPerMonth} par mois, prélevés une fois par an`,
        `${p.lifetime} une seule fois`,
      ],
      note: 'Les prix sont en euros ; l’App Store affiche le prix dans ta devise avant l’achat. Apple encaisse le paiement, et tu peux résilier depuis tes propres réglages à tout moment.',
    },

    mock: {
      day: 'Jour 62',
      eyebrow: 'Ce soir',
      band: 'Risque élevé',
      // Mot pour mot ce que rend le moteur, depuis mobile/i18n/fr/reasons.ts :
      // `paydayToday`, `slipCorroboration(2, 2, 'payday')` et `firstFortnight`.
      // Une maquette qui invente ses propres phrases est une maquette qui dérive.
      reasons: [
        'La paie est tombée aujourd’hui.',
        'Jusqu’ici, tes deux écarts sont tombés un jour de paie.',
        'Tu en es à 9 jours. Les deux premières semaines sont les plus fragiles.',
      ],
      caption: 'Une illustration de l’écran d’accueil.',
    },

    forecast: {
      eyebrow: 'Ce que les autres ne font pas',
      title: 'Tes schémas, croisés avec ta paie.',
      body:
        'La plupart des apps du genre traitent l’envie comme une météo intérieure, à noter après coup. Pour le jeu, le plus gros déclencheur est extérieur et suit un calendrier : le jour où la paie tombe, et les deux soirs qui suivent. Chaque soir, l’app croise tes propres schémas avec l’endroit où tu en es dans ce cycle et te dit à quoi ressemble la soirée.',
      bandsEyebrow: 'Trois niveaux, et c’est tout',
      bands: ['Risque faible', 'Risque modéré', 'Risque élevé'],
      caption:
        'Un soir à risque élevé se lit comme un bulletin de vigilance, pas comme une remontrance. Et l’app montre toujours ce qui a produit l’estimation. Tu peux regarder ces trois lignes et ne pas être d’accord, et c’est justement pour ça qu’elles sont écrites. Une estimation fausse avec laquelle on peut discuter est utile ; un score sans explication ne l’est pas.',
    },

    slip: {
      eyebrow: 'Le soir où ça compte',
      title: 'Un écart est une donnée, pas une remise à zéro.',
      body:
        'La rechute est la norme. Un compteur qui retombe à zéro au moment où la honte est la plus forte, c’est la première raison pour laquelle les gens suppriment ce genre d’app. Ici, noter un écart est un acte d’honnêteté que l’app est faite pour encourager : elle demande ce qui y a mené, garde les ressources d’urgence à un geste, et ajoute ce qu’elle apprend à l’estimation du lendemain.',
      // mobile/i18n/fr/core.ts → slip.stillYours. La formulation exacte, pas la
      // plus forte. Ne pas réécrire en « tes chiffres ne baissent jamais ».
      precise:
        'Ton total de jours sans pari et ta plus longue série sont recalculés depuis ton historique à chaque fois qu’un écran s’ouvre, donc il n’existe aucun total stocké qu’une mauvaise nuit pourrait remettre à zéro. Ta série en cours repart d’aujourd’hui. C’est le seul chiffre qu’un écart déplace.',
    },

    money: {
      eyebrow: 'Le chiffre que personne n’a écrit',
      title: 'Où en est l’argent.',
      body:
        'À l’installation, elle pose une seule question sur l’argent : à peu près ce qu’un mois normal te coûtait. Pas ce que tu misais, mais ce qui avait vraiment disparu à la fin du mois. Ensuite elle tient le compte de ce que l’ancien rythme aurait pris, moins ce que les écarts ont réellement coûté, et elle dit quand un écart n’a pas de montant enregistré au lieu d’en inventer un.',
      exampleEyebrow: 'Un exemple, pas une promesse',
      example:
        'Quelqu’un qui y mettait 600 € par mois est à 7 200 € sur un an, soit environ 20 € par jour. La plupart des gens ne l’ont jamais vu écrit noir sur blanc.',
      // mobile/i18n/fr/onboarding.ts → done.closingBody.
      caveat:
        'Cet argent est parti, et l’app ne peut pas le récupérer. Ce qu’elle peut faire, c’est compter ce que tu ne perds plus.',
    },

    trio: {
      eyebrow: 'Aussi dans l’app',
      items: [
        {
          title: 'L’écran d’urgence',
          body:
            'Un bouton, accessible de partout. Un minuteur qui compte vers le haut et n’a rien à atteindre, les raisons que tu as écrites avec tes mots, où en est l’argent, et cinq choses physiques à faire tout de suite. Une envie monte, atteint un pic, puis retombe ; tout le truc, c’est de traverser le pic.',
        },
        {
          title: 'Tes schémas',
          body:
            'Le jour de la semaine le plus dur, les heures où les envies se concentrent, ce que tes écarts avaient en commun. Quand il n’y a pas assez de données pour dire quelque chose honnêtement, l’écran ne dit rien plutôt que de deviner. Tout ce qu’on tirerait de moins que ça serait un horoscope.',
        },
        {
          title: 'Trente secondes par jour',
          body:
            'Est-ce que la journée s’est passée sans pari, quelle force avaient les envies, quand c’était le pire, ce qui se passait. Étiquettes facultatives, note facultative. C’est ça le point quotidien, et c’est de là que tout le reste est compté.',
        },
      ],
      // mobile/i18n/fr/paywall.ts → freeAnyway.
      free:
        'L’écran d’urgence et les lignes d’écoute restent gratuits quoi qu’il arrive, et le resteront. Ce ne sont pas des options.',
    },

    privacy: {
      eyebrow: 'Où vit ton historique',
      title: 'Tout reste sur ton téléphone.',
      // mobile/i18n/fr/onboarding.ts → opening.privacyBody, et
      // mobile/i18n/fr/secondary.ts → settings.data.onDevice.
      body:
        'Pas de compte. Pas d’e-mail. Rien de synchronisé. Tout ce que tu notes reste sur ce téléphone, aucun serveur ne le détient, et personne d’autre ne peut le voir, nous non plus.',
      analytics:
        'L’app signale quels écrans sont utilisés, et rien d’autre : jamais tes notes, tes raisons, tes montants, l’intensité de tes envies, ni les déclencheurs que tu choisis. Pas de compte, pas d’e-mail, rien qui t’identifie. Ces statistiques anonymes sont actives par défaut ; la politique de confidentialité dit exactement ce qu’elles contiennent et comment les arrêter.',
      gapTitle: 'Et le manque qui va avec',
      // mobile/i18n/fr/secondary.ts → settings.data.noBackup.
      gap:
        'Il n’y a pas encore de sauvegarde. Si tu perds ce téléphone, si tu en changes ou si tu supprimes l’app, cet historique part avec. C’est un vrai manque, autant le savoir maintenant que le découvrir plus tard. Un export est la prochaine chose en chantier.',
      readPolicy: 'Lire la politique de confidentialité',
    },

    close: {
      eyebrow: 'Avant de l’installer',
      title: 'Ce qu’elle n’est pas.',
      items: [
        'Ce n’est pas un traitement, et ça ne remplace pas quelqu’un dont c’est le métier.',
        'Elle ne bloque rien. Elle n’empêchera pas un dépôt, ne fermera pas un compte et ne t’interdira aucun site. Si c’est ça qu’il te faut, la page ressources liste les dispositifs d’auto-exclusion qui le font.',
        'Elle ne promet aucun résultat. Elle tient ton relevé et estime où en est ton risque. Ce que tu en fais t’appartient.',
        'Elle est pour les adultes, et elle ne demande rien sur toi qu’elle n’utilise pas.',
      ],
      helpLead: 'Si le problème c’est ce soir, et pas le mois prochain :',
      helpLink: 'Lignes d’écoute et ressources d’urgence',
    },
  },

  support: {
    title: 'Support',
    intro: (app) =>
      `${app} est développée par une seule personne. L’e-mail est le seul canal de support, et il arrive directement chez moi.`,
    emailLead: 'E-mail',
    responseNote:
      'Réponse en général sous quelques jours. Si c’est urgent au sens où une ligne d’écoute est urgente, passe plutôt par l’une d’elles : elles répondent tout de suite, et moi peut-être pas.',
    faqTitle: 'Les questions qui reviennent',
    faqs: (app, pricing, paid) => [
      {
        q: `Est-ce que ${app} bloque les sites ou les applis de paris ?`,
        a: [
          {
            p: 'Non, et ça n’arrivera pas. C’est une app compagnon et un relevé, pas un outil de contrainte. Le blocage est un autre métier, mieux fait par les dispositifs prévus pour. La page ressources liste GAMSTOP pour le Royaume-Uni et les équivalents ailleurs.',
          },
        ],
      },
      {
        q: 'Faut-il un compte ?',
        a: [
          {
            p: 'Non. Pas d’inscription, pas d’e-mail, pas de mot de passe, pas de profil. Tu ouvres l’app, tu réponds à quelques questions, et l’installation est faite.',
          },
        ],
      },
      {
        q: 'Où sont mes données ?',
        a: [
          {
            p: 'Dans le stockage privé de l’app sur ton téléphone, et nulle part ailleurs. Aucun serveur ne les détient, donc il n’y a rien à pirater et rien que je puisse regarder.',
          },
        ],
      },
      {
        q: 'Qu’est-ce qui se passe si je change de téléphone ?',
        a: [
          {
            p: 'Ton historique ne te suit pas encore, et c’est la réponse honnête plutôt que la réponse confortable. Cette version n’a ni sauvegarde ni export, donc un nouveau téléphone repart du jour un. Un fichier d’export chiffré est la prochaine chose en chantier.',
          },
        ],
      },
      {
        q: 'Comment tout supprimer ?',
        a: [
          {
            p: 'Réglages → Tout supprimer. Ça enlève immédiatement du téléphone tous tes points quotidiens, tous tes écarts, tes raisons et tes réglages. Il n’y a pas de sauvegarde, donc c’est sans retour possible. Supprimer l’app fait la même chose.',
          },
        ],
      },
      {
        q: `Combien coûte ${app} ?`,
        a: paid ? [
          {
            p: `Les ${pricing.trialDays} premiers jours sont gratuits, et il n’y a pas de carte bancaire à saisir pour commencer. Ensuite c’est ${pricing.monthly} par mois, ${pricing.annual} par an, ou ${pricing.lifetime} une seule fois. Les prix sont en euros ; l’App Store affiche le tien dans ta devise avant l’achat.`,
          },
          {
            p: `L’essai dure en réalité un peu plus de ${pricing.trialDays} jours si tu n’as pas fait beaucoup de points quotidiens : il reste ouvert jusqu’à ce qu’il y en ait huit d’enregistrés, parce qu’avant ça la prévision a trop peu à lire et tu paierais pour la version la moins utile de l’app.`,
          },
          {
            p: 'C’est Apple qui encaisse, pas moi, et je ne vois jamais ta carte. Un abonnement se renouvelle jusqu’à ce que tu le résilies, et la résiliation se fait dans les réglages de ton iPhone, sous ton compte Apple, et non dans l’app. Résilier arrête le renouvellement suivant et te laisse la période déjà payée.',
          },
          {
            p: 'L’écran d’urgence et les lignes d’écoute restent gratuits quoi que tu choisisses, et le resteront toujours. Ce ne sont pas des options. Les réglages restent accessibles aussi, pour pouvoir toujours restaurer un achat ou tout supprimer.',
          },
        ] : [
          {
            p: 'Rien. Il n’y a pas de prix, pas d’essai qui se termine, et aucune carte à saisir. Toutes les parties de l’app sont ouvertes.',
          },
          {
            p: 'Ça pourra changer plus tard, et si c’est le cas je l’écrirai ici avant, pas après. Ce qui ne changera pas, c’est l’écran d’urgence et les lignes d’écoute : ils restent gratuits quoi qu’il arrive, et ce ne sont pas des options.',
          },
        ],
      },
      {
        q: 'Il y a une version Android ?',
        a: [{ p: 'Pas encore. iPhone d’abord, et correctement, avant le reste.' }],
      },
      {
        q: 'Comment désactiver les statistiques anonymes ?',
        a: [
          {
            p: 'Elles sont actives, et il n’y a pas d’interrupteur dans l’app pour l’instant : autant le dire franchement plutôt que de l’enrober. Supprimer l’app les arrête définitivement. Réglages → Tout supprimer efface aussi l’identifiant aléatoire, donc rien de ce qui part ensuite ne peut être rattaché à ce qui est parti avant. Si tu préfères qu’elles s’arrêtent sans rien supprimer, écris-moi et je m’en occupe. La politique de confidentialité détaille exactement ce qu’elles contiennent.',
          },
        ],
      },
      {
        q: 'Pourquoi l’estimation ne me dit rien d’utile ?',
        a: [
          {
            p: 'La première semaine, elle n’a pas grand-chose au-delà de ta paie et de la date de ton dernier pari, et elle le dit franchement. Elle garde tous les signaux liés à tes propres schémas de côté jusqu’à ce qu’il y ait assez de points quotidiens pour que ça veuille dire quelque chose : un schéma tiré de trois jours serait une supposition déguisée en constat.',
          },
        ],
      },
    ],
    bugTitle: 'Signaler quelque chose qui ne marche pas',
    bugBlocks: [
      {
        p: 'Utile à indiquer : ton modèle d’iPhone, ta version d’iOS, la version de l’app en bas des réglages, et ce que tu étais en train de faire.',
      },
      {
        note:
          'Merci de ne pas envoyer de captures de ton historique, de tes notes ou de tes raisons. Je n’en ai pas besoin pour corriger un bug, et tout l’arrangement de cette app est que je ne les vois jamais.',
      },
    ],
    crisisLead: 'S’il te faut parler à quelqu’un maintenant :',
    crisisLink: 'Lignes d’écoute et ressources d’urgence',
  },

  help: {
    // mobile/i18n/fr/secondary.ts → crisis.*
    title: 'Parler à quelqu’un',
    intro:
      'Tout ce qui suit est gratuit et confidentiel, et tenu par des gens qui ne font que ça. Tu n’as pas besoin d’en être à un point particulier pour appeler.',
    emergencyTitle: 'Si tu penses à te faire du mal',
    emergencyBody:
      'Appelle les secours maintenant. C’est exactement à ça que servent ces numéros, et personne à l’autre bout ne pensera que tu leur fais perdre leur temps.',
    callLabel: (display, what, where) => `Appeler le ${display}, ${what}, ${where}`,
    notTreatment:
      'Cette app tient ton relevé et estime où en est ton risque. Ce n’est pas un traitement, et ça ne remplace pas quelqu’un dont c’est le métier.',
    checked:
      'Chaque entrée a été vérifiée sur le site de l’organisme concerné. Quand un numéro n’a pas pu être confirmé, seul le site est indiqué. Un mauvais numéro à 2 h du matin est pire que pas de numéro du tout.',
    languageNote: 'Chaque entrée précise dans quelle langue on te répond.',
    call: (display) => `Appeler le ${display}`,
    open: (display) => `Ouvrir ${display}`,
  },

  legal: {
    updated: (date) => `Dernière mise à jour : ${date}`,
    contents: 'Sommaire',

    // Vouvoiement à partir d'ici — voir la note en tête de fichier.
    privacy: (ctx) => ({
      title: 'Politique de confidentialité',
      intro: `${ctx.app} est conçue pour qu’il y ait très peu à écrire dans une politique de confidentialité. Voici tout.`,
      sections: [
        {
          heading: 'En résumé',
          blocks: [
            {
              ul: [
                'Tout ce que vous notez reste sur votre téléphone. Il n’y a pas de compte, aucun serveur qui le détient, et aucune synchronisation.',
                'Les statistiques anonymes sont actives par défaut, et elles ne contiennent jamais ce que vous avez écrit.',
                'Rien n’est vendu, partagé à des fins publicitaires, ni utilisé pour établir un profil de vous.',
                `Si vous vous abonnez, ${ctx.purchasesMerchant} encaisse le paiement et un reçu est vérifié à l’aide d’un identifiant anonyme. Rien de ce que vous avez écrit n’en fait partie.`,
                'Ce site ne dépose aucun cookie et n’utilise aucun outil de mesure.',
              ],
            },
            {
              p: `Tout ce qui suit détaille ces cinq lignes. Si l’une d’elles se révélait en désaccord avec le comportement de l’app, c’est le comportement de l’app qui est le bug, et je veux le savoir : ${ctx.email}.`,
            },
          ],
        },
        {
          heading: 'Ce qui reste sur votre téléphone',
          blocks: [
            {
              p: 'L’app enregistre ce que vous lui dites dans une base de données située dans son propre stockage privé, sur votre appareil. Cela comprend vos points quotidiens et l’intensité de vos envies, les étiquettes de déclencheurs que vous choisissez, les notes que vous écrivez, les écarts que vous consignez et leurs montants, les raisons que vous avez écrites pour arrêter, le montant mensuel et la devise que vous avez indiqués, vos réglages de paie, la date à laquelle vous avez commencé, ainsi que vos préférences de langue et d’apparence.',
            },
            {
              p: 'Rien de tout cela n’est transmis. Il n’y a pas de compte auquel le rattacher, aucun serveur qui le reçoit, et aucune synchronisation. Je n’y ai pas accès et je n’ai aucun moyen de le demander.',
            },
            {
              note:
                'Il n’y a pas non plus de sauvegarde. Si vous perdez le téléphone, le remplacez ou supprimez l’app, cet historique est perdu et ne peut pas être récupéré, ni par vous, ni par moi. Vous pouvez aussi le supprimer volontairement à tout moment : Réglages → Tout supprimer, immédiat et sans retour possible.',
            },
          ],
        },
        {
          heading: 'Les statistiques anonymes',
          blocks: [
            {
              p: 'Elles sont actives par défaut, et l’app ne pose pas la question. Je préfère l’écrire clairement plutôt que de le noyer : leur seul but est de me dire quelles parties de l’app sont utilisées, pour que la prochaine chose construite soit la bonne. Une app dont le problème est que les gens partent la première semaine ne peut pas l’apprendre à partir de données que personne n’a activées.',
            },
            {
              p: 'Quand elles sont actives, un message est envoyé par événement. Chaque message contient : le nom de l’événement, pris dans une liste fixe et publiée ; un petit nombre de compteurs, de valeurs vrai-ou-faux et de valeurs prédéfinies qui s’y rattachent, par exemple si un point quotidien a enregistré une journée sans pari ou combien d’étiquettes ont été sélectionnées ; la version de l’app ; le nom et la version du système d’exploitation ; la langue de votre appareil ; s’il s’agit d’une version de développement ; un horodatage ; et un identifiant aléatoire.',
            },
            {
              p: 'Cet identifiant est inventé au hasard sur votre téléphone au premier envoi, et conservé jusqu’à la suppression de l’app. Il permet de compter les événements d’une installation comme une personne plutôt que comme une foule d’inconnus, ce qui fait la différence entre savoir si un changement a aidé et ne rien savoir. Il n’est dérivé de rien : ni de votre appareil, ni de votre compte Apple, ni d’un identifiant publicitaire, et il n’y a pas d’identifiant de compte puisqu’il n’y a pas de comptes. Il ne peut être rapproché ni des données d’une autre app, ni de vous, et il disparaît avec l’installation.',
            },
            {
              p: 'Ce qui n’est jamais envoyé, jamais : vos notes, vos raisons, les montants que vous consignez, l’intensité de vos envies, les déclencheurs que vous choisissez, votre paie, votre date de départ, votre montant mensuel, ou quoi que ce soit d’autre que vous auriez saisi. La règle est : compteurs, booléens et valeurs prédéfinies uniquement. Elle est appliquée dans le code source de l’app et pas seulement dans un document : un fichier liste chaque événement et chaque propriété autorisés, et rien en dehors ne peut être transmis.',
            },
            {
              p: `Ces messages sont traités pour mon compte par ${ctx.analyticsProcessor}, un prestataire de mesure d’audience, sur des serveurs situés dans ${ctx.analyticsRegion}. Comme pour toute requête internet, elle arrive depuis votre adresse IP, dont un pays approximatif peut être déduit ; l’adresse IP ne fait pas partie du message et n’est pas conservée par moi. ${ctx.analyticsProcessor} agit en tant que sous-traitant et ne peut pas utiliser ces données à ses propres fins.`,
            },
            {
              p: `Comment les arrêter : il n’y a pas d’interrupteur dans l’app pour l’instant, et je ne vais pas décrire ça autrement que comme un manque. Supprimer l’app les arrête définitivement. Réglages → Tout supprimer efface l’identifiant aléatoire en même temps que vos données, donc rien de ce qui part ensuite ne peut être rattaché à ce qui est parti avant. Et vous pouvez vous y opposer en écrivant à ${ctx.email}, ce dont je tiendrai compte.`,
            },
          ],
        },
        {
          heading: 'Si vous vous abonnez',
          onlyWhenPaid: true,
          blocks: [
            {
              p: `Tout achat est géré par ${ctx.purchasesMerchant}. Le paiement passe par votre compte Apple, ${ctx.purchasesMerchant} est le vendeur, et vos coordonnées bancaires ne me parviennent jamais, ni à cette app. J’apprends seulement qu’un achat existe, jamais qui l’a fait.`,
            },
            {
              p: `Pour vérifier qu’un achat est toujours valable, l’app transmet le reçu de l’App Store à ${ctx.purchasesProcessor}, un prestataire de gestion d’abonnements agissant comme sous-traitant pour mon compte, sur des serveurs situés aux ${ctx.purchasesRegion}. Avec le reçu, elle transmet un identifiant d’utilisateur généré aléatoirement sur votre appareil. Cet identifiant n’est ni votre nom, ni votre e-mail, ni votre compte Apple, ni l’identifiant de votre appareil, et il n’est relié à rien de ce que vous notez.`,
            },
            {
              p: 'Rien de ce que vous écrivez n’intervient là-dedans. Vos points quotidiens, vos notes, vos raisons, vos montants et vos niveaux d’envie ne sont transmis ni lors d’un abonnement, ni lors d’une restauration d’achat, ni à aucun autre moment.',
            },
            {
              // TODO(bloquant) : confirmer le mécanisme de transfert dans le DPA
              // en vigueur de RevenueCat et le nommer ici. Dire que les données
              // quittent l'UE est un fait et peut être publié ; nommer un
              // mécanisme — Data Privacy Framework, clauses contractuelles types
              // — est une affirmation juridique, et cette page ne devine pas.
              p: `Ce prestataire opérant aux ${ctx.purchasesRegion}, un reçu et un identifiant aléatoire quittent effectivement l’Union européenne. Rien d’autre ne la quitte, et rien qui vous identifie ne fait partie de l’un ou de l’autre.`,
            },
            {
              note: `C’est la seule partie de l’app qui parle à un serveur, et elle n’existe que parce qu’un reçu doit bien être vérifié quelque part. C’est aussi la raison pour laquelle la fiche App Store déclare « Achats » comme donnée collectée mais non reliée à votre identité. Cette déclaration et ce paragraphe décrivent la même chose.`,
            },
          ],
        },
        {
          heading: 'Ce site',
          blocks: [
            {
              p: 'Ce site est composé de quelques pages statiques. Il ne dépose aucun cookie, n’utilise aucun outil de mesure, n’intègre aucun script, police ou traceur tiers, et ne contient aucun formulaire, il n’a donc rien à collecter sur vous.',
            },
            {
              p: `Il est hébergé par ${ctx.hostingProvider}, qui traite des journaux de serveur ordinaires, adresses IP comprises, pour servir les pages et absorber les attaques. Je n’utilise pas ces journaux pour identifier qui que ce soit.`,
            },
          ],
        },
        {
          heading: 'Ce qui n’arrive jamais',
          blocks: [
            {
              ul: [
                'Aucune vente ni location de données, sous quelque forme que ce soit.',
                'Aucune publicité, aucune régie, aucun identifiant publicitaire, aucun partage à des fins publicitaires.',
                'Aucun outil de mesure ou de pistage tiers. L’app ne parle qu’à deux services extérieurs, tous deux nommés plus haut : le prestataire de statistiques, uniquement si vous les activez, et le vérificateur de reçus, uniquement si vous achetez quelque chose. Ni l’un ni l’autre ne reçoit ce que vous avez écrit.',
                'Aucun profilage, aucune décision automatisée à votre sujet, aucune tentative de savoir qui vous êtes.',
                'Aucune connexion via un réseau social, aucun accès aux contacts, à la localisation ou aux données de santé.',
              ],
            },
          ],
        },
        {
          heading: 'Vos droits',
          blocks: [
            {
              p: 'Le RGPD vous donne des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité sur les données personnelles détenues à votre sujet.',
            },
            {
              p: 'Pour ce que l’app enregistre, ces droits s’exercent sur l’appareil lui-même, puisque c’est le seul endroit où ces données existent : vous y avez déjà pleinement accès dans l’app, et Réglages → Tout supprimer constitue un effacement immédiat et complet. Je n’ai rien à vous envoyer et rien à supprimer, parce que je ne l’ai jamais eu.',
            },
            {
              p: 'Pour les statistiques, la position honnête est que l’identifiant aléatoire est la seule chose qui relie un ensemble d’événements entre eux, et que je n’ai aucun moyen de savoir lequel est le vôtre. Si vous me le transmettez, je peux supprimer ce qu’il désigne ; sans lui, je ne peux ni retrouver vos événements pour vous les communiquer, ni les effacer. C’est la conséquence de ne rien collecter qui vous identifie, pas une façon d’éluder la demande.',
            },
            {
              p: 'Pour les statistiques anonymes, la base légale invoquée est l’intérêt légitime : comprendre quelles parties de l’app servent, pour que l’app fasse mieux ce pour quoi elle existe. Les données sont volontairement limitées à des compteurs, des booléens et des valeurs prédéfinies, ne contiennent rien de ce que vous avez écrit, et ne servent ni à établir un profil, ni à de la publicité, ni à prendre une décision vous concernant. Vous pouvez vous y opposer à tout moment au titre de l’article 21, et le paragraphe correspondant dit comment.',
            },
            {
              p: `Si vous souhaitez malgré tout soulever un point, ou si vous n’êtes pas d’accord avec ce qui précède, écrivez à ${ctx.email}. Vous avez également le droit d’introduire une réclamation auprès de votre autorité de protection des données : en France, la CNIL.`,
            },
          ],
        },
        {
          heading: 'Mineurs',
          blocks: [
            {
              p: 'Cette app est destinée aux adultes. Elle ne s’adresse pas aux mineurs et ne collecte sciemment rien à leur sujet.',
            },
          ],
        },
        {
          heading: 'Modifications de cette politique',
          blocks: [
            {
              p: 'Si ce que l’app collecte change, cette page change dans la même version et pas après, et la date en haut est mise à jour. Une affirmation sur la confidentialité qui est presque vraie est pire qu’une affirmation précise.',
            },
          ],
        },
        {
          heading: 'Qui est responsable',
          blocks: [
            {
              p: `Le responsable du traitement est ${ctx.legalName}. Contact : ${ctx.email}.`,
            },
          ],
        },
      ],
    }),

    terms: (ctx) => ({
      title: 'Conditions générales d’utilisation',
      intro: `Ces conditions encadrent votre utilisation de l’application ${ctx.app}. Elles valent deux minutes de lecture, parce que deux de leurs sections décrivent ce que l’app refuse délibérément de faire pour vous.`,
      sections: [
        {
          heading: 'Entre qui et qui',
          blocks: [
            {
              p: `Ce contrat est conclu entre vous et ${ctx.legalName}, désigné ci-dessous par « je » ou « moi ». En installant ou en utilisant ${ctx.app}, vous l’acceptez. Si vous ne l’acceptez pas, n’utilisez pas l’app.`,
            },
          ],
        },
        {
          heading: `Ce que ${ctx.app} est, et ce qu’elle n’est pas`,
          blocks: [
            {
              p: `${ctx.app} est une application de suivi personnel destinée à quelqu’un qui a décidé d’arrêter de jouer. Elle enregistre ce que vous saisissez, en déduit des chiffres, et estime un niveau de risque quotidien accompagné des raisons qui l’ont produit.`,
            },
            {
              p: 'Elle ne constitue pas un avis médical, clinique, psychologique, financier ou juridique. Ce n’est pas un traitement, ni une thérapie, ni un diagnostic, et elle ne remplace pas un professionnel. Elle ne promet et ne prédit aucun résultat, et rien en elle ne doit être lu comme tel. Les décisions que vous prenez restent les vôtres.',
            },
            {
              p: 'Ce n’est pas un outil de blocage ou de contrainte. Elle ne peut pas et ne va pas vous empêcher de jouer, limiter des dépôts, fermer des comptes, ni vous interdire un site ou un établissement. Si c’est ce dont vous avez besoin, les dispositifs d’auto-exclusion listés sur la page ressources existent pour ça.',
            },
            {
              p: 'L’estimation de risque est produite par des règles simples et publiées, appliquées aux données que vous saisissez. Elle se trompera parfois. Elle est fournie comme une information avec laquelle discuter, pas comme un verdict. C’est pour cette raison qu’elle indique toujours ses motifs.',
            },
          ],
        },
        {
          heading: 'Votre licence d’utilisation',
          blocks: [
            {
              p: `Je vous accorde une licence personnelle, révocable, non exclusive et non transférable d’utiliser ${ctx.app} sur les appareils de marque Apple que vous possédez ou contrôlez, dans les limites prévues par les conditions de service de l’App Store. Je conserve tous les droits sur l’app, son nom et son contenu.`,
            },
            {
              p: 'Vous vous engagez à ne pas copier, vendre ou redistribuer l’app, à ne pas procéder à son ingénierie inverse en dehors de ce que la loi autorise expressément, et à ne pas l’utiliser de manière illicite.',
            },
          ],
        },
        {
          heading: 'Ce que ça coûte',
          onlyWhenPaid: true,
          blocks: [
            {
              p: `${ctx.app} est gratuite à télécharger et gratuite à utiliser pendant les ${ctx.pricing.trialDays} premiers jours, sans aucune coordonnée bancaire pour commencer. L’essai ne se termine pas tant qu’il y a moins de huit points quotidiens enregistrés.`,
            },
            {
              p: `À l’issue de l’essai, continuer d’accéder à l’estimation, à l’écran des tendances, à l’intégralité de votre historique et aux chiffres sur l’argent nécessite l’un de trois achats : ${ctx.pricing.monthly} par mois ou ${ctx.pricing.annual} par an, qui sont deux abonnements à renouvellement automatique, ou ${ctx.pricing.lifetime} en un paiement unique sans renouvellement. Les prix sont indiqués en euros ; l’App Store affiche le prix applicable dans votre devise, selon les paliers tarifaires d’Apple, avant toute confirmation.`,
            },
            {
              p: `${ctx.purchasesMerchant} est le vendeur pour tous les achats. Le paiement est encaissé par ${ctx.purchasesMerchant} via votre compte Apple, selon les conditions d’${ctx.purchasesMerchant}, et je ne reçois ni ne conserve jamais vos coordonnées bancaires.`,
            },
            {
              p: 'Un abonnement se renouvelle automatiquement à la fin de chaque période, sauf résiliation au moins 24 heures avant. La résiliation se fait dans les réglages de votre appareil, sous votre compte Apple, et non dans l’app ; elle arrête le renouvellement suivant et ne raccourcit pas la période déjà payée. Les remboursements se demandent à Apple, et relèvent de son appréciation et non de la mienne.',
            },
            {
              p: 'En cas de changement de prix, Apple en informe les abonnés existants et recueille leur accord avant de prélever le nouveau montant, selon les modalités que ses règles imposent. Je n’introduirai pas de facturation pour une fonction gratuite au moment de votre installation sans le dire au préalable.',
            },
            {
              // Reprend `freeAnyway` dans mobile/i18n/*/paywall.ts et
              // `ALWAYS_FREE_ROUTES`. Énoncé comme une condition et pas seulement
              // comme une fonctionnalité, parce que c'est la promesse qu'un
              // lecteur payant a le plus besoin de pouvoir nous opposer.
              p: 'L’écran d’urgence et les ressources d’urgence restent gratuits, que vous payiez un jour ou non, et même si un abonnement a expiré. Les réglages restent accessibles aux mêmes conditions, de sorte que restaurer un achat et tout supprimer sont toujours possibles.',
            },
          ],
        },
        {
          heading: 'Vos données, et le fait qu’elles ne sont que sur votre téléphone',
          blocks: [
            {
              p: 'Tout ce que vous saisissez est enregistré sur votre appareil et nulle part ailleurs. La politique de confidentialité en détaille le fonctionnement.',
            },
            {
              p: 'Une conséquence doit être énoncée comme une condition et pas seulement comme une caractéristique : puisqu’il n’existe aucune copie sur un serveur et aucune sauvegarde dans cette version, perdre, remplacer, réinitialiser ou effacer votre téléphone, ou supprimer l’app, détruit cet historique définitivement. Je ne peux pas le récupérer pour vous. Sa conservation n’est pas quelque chose que je suis en mesure de promettre, et je ne le promets pas.',
            },
          ],
        },
        {
          heading: 'Ressources d’écoute et d’urgence',
          blocks: [
            {
              p: 'L’app et ce site listent des lignes d’écoute et des organismes d’aide à titre de service. Ces services sont assurés par des tiers indépendants. Je ne les exploite pas, je n’emploie pas leur personnel, je ne supervise pas leurs conseils et je n’en assume pas la responsabilité, et le fait d’en lister un ne constitue pas une recommandation.',
            },
            {
              p: 'Chaque numéro a été vérifié auprès des coordonnées publiées par l’organisme lui-même, et lorsqu’un numéro n’a pas pu être confirmé, seul un site web est indiqué. Ces coordonnées peuvent malgré tout changer sans préavis. En cas d’urgence, appelez le numéro d’urgence local.',
            },
          ],
        },
        {
          heading: 'Âge',
          blocks: [
            {
              p: 'Vous devez avoir 18 ans ou plus pour utiliser l’app.',
            },
          ],
        },
        {
          heading: 'Limites de ma responsabilité',
          blocks: [
            {
              p: `${ctx.app} est fournie en l’état, sans garantie qu’elle fonctionnera sans interruption ni erreur, ni qu’un chiffre ou une estimation qu’elle affiche soit exact ou adapté à votre situation.`,
            },
            {
              p: 'Dans les limites permises par la loi, je ne suis pas responsable des pertes liées au jeu, des pertes financières, ni d’une décision prise avec ou sans les informations de l’app ; ni de la perte des données stockées sur votre appareil ; ni des dommages indirects ou consécutifs. Rien ici n’exclut une responsabilité qui ne peut légalement être exclue, notamment en cas de décès ou de dommage corporel causé par une négligence, ou en cas de fraude. Si vous êtes consommateur, vos droits légaux ne sont pas affectés par la présente section.',
            },
          ],
        },
        {
          heading: 'Le rôle d’Apple',
          blocks: [
            {
              p: 'Apple exige que ce qui suit soit indiqué, et c’est exact :',
            },
            {
              ul: [
                `Ce contrat est conclu entre vous et ${ctx.legalName} uniquement, et non avec Apple. Apple n’est pas responsable de ${ctx.app} ni de son contenu.`,
                `Je suis seul responsable de ${ctx.app}, y compris de sa maintenance et de son support. Apple n’a aucune obligation d’en fournir.`,
                'Si l’app n’est pas conforme à une garantie applicable, vous pouvez en informer Apple, et Apple vous remboursera le prix d’achat de l’app. Dans les limites permises par la loi, Apple n’a aucune autre obligation de garantie concernant l’app.',
                'Je suis responsable du traitement de toute réclamation, de votre part ou d’un tiers, relative à l’app ou à son utilisation, y compris en matière de responsabilité du fait des produits, de non-conformité à des exigences légales ou réglementaires, et de droit de la consommation ou de la protection des données.',
                'Je suis responsable de l’examen, de la défense, du règlement et de l’exécution de toute réclamation d’un tiers alléguant que l’app porte atteinte à des droits de propriété intellectuelle.',
                'Vous déclarez ne pas vous trouver dans un pays soumis à un embargo du gouvernement des États-Unis ou désigné comme soutenant le terrorisme, et ne pas figurer sur une liste de parties interdites ou soumises à restrictions établie par le gouvernement des États-Unis.',
                'Vous devez respecter les conditions applicables des tiers lorsque vous utilisez l’app.',
                'Apple et ses filiales sont bénéficiaires tiers des présentes conditions et peuvent les faire valoir à votre encontre.',
              ],
            },
          ],
        },
        {
          heading: 'Modifications',
          blocks: [
            {
              p: 'L’app évoluera, et les fonctions décrites ici peuvent être ajoutées, modifiées ou retirées. En cas de modification substantielle de ces conditions, la version à jour est publiée sur cette page avec une nouvelle date en haut. Continuer à utiliser l’app après cela vaut acceptation.',
            },
          ],
        },
        {
          heading: 'Droit applicable',
          blocks: [
            {
              p: `Les présentes conditions sont régies par le droit de ${ctx.jurisdiction}. Si vous êtes un consommateur résidant ailleurs, vous conservez la protection des règles impératives de protection des consommateurs du pays où vous vivez.`,
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
    tagline: (app) => `${app}: une app pour arrêter de parier.`,
    notTreatment: 'Ce n’est pas un traitement, et ça ne remplace pas un accompagnement professionnel.',
    contact: 'Contact',
    copyright: (year, holder) => `© ${year} ${holder}`,
  },
} satisfies Dict;
