import type { L10n } from './menu';

/**
 * ------------------------------------------------------------------
 *  MARELUNA — the family story
 * ------------------------------------------------------------------
 *  The French text is the original, printed on the first page of the
 *  official menu PDF and carried over from the previous website.
 *  The Italian and English versions are translations of that same text.
 *  No biographical detail has been added.
 * ------------------------------------------------------------------
 */

export const storySignature: L10n = {
  fr: 'Ilaria et Biagio',
  it: 'Ilaria e Biagio',
  en: 'Ilaria and Biagio',
};

export const storyClosing: L10n = {
  fr: 'en vous souhaitant Buon Appetito !',
  it: 'augurandovi Buon Appetito!',
  en: 'wishing you Buon Appetito!',
};

/** The full story, paragraph by paragraph, as printed in the menu. */
export const storyParagraphs: L10n[] = [
  {
    fr: 'Mareluna est né d’un rêve partagé entre un frère et une sœur, différents par leur caractère et leurs goûts mais unis par la même passion pour la cuisine et l’accueil.',
    it: 'Mareluna nasce da un sogno condiviso tra un fratello e una sorella, diversi per carattere e per gusti ma uniti dalla stessa passione per la cucina e per l’accoglienza.',
    en: 'Mareluna was born from a dream shared by a brother and a sister — different in character and in taste, yet united by the same passion for cooking and for welcoming people.',
  },
  {
    fr: 'Nous avons choisi d’entrelacer nos différences comme s’entrelacent les ingrédients dans une recette réussie : chaque saveur garde son identité, mais ensemble elles créent l’harmonie.',
    it: 'Abbiamo scelto di intrecciare le nostre differenze come si intrecciano gli ingredienti in una ricetta riuscita: ogni sapore mantiene la propria identità, ma insieme creano armonia.',
    en: 'We chose to weave our differences together the way ingredients are woven into a good recipe: each flavour keeps its own identity, but together they create harmony.',
  },
  {
    fr: 'Dans ce menu, vous trouverez un voyage à travers les souvenirs de notre famille, les parfums de nos terres et les traditions qui nous ont fait grandir.',
    it: 'In questo menù troverete un viaggio attraverso i ricordi della nostra famiglia, i profumi delle nostre terre e le tradizioni che ci hanno fatto crescere.',
    en: 'In this menu you will find a journey through our family’s memories, the scents of our land and the traditions we grew up with.',
  },
  {
    fr: 'Chaque plat raconte un morceau de notre histoire, l’amour pour Naples, l’attachement à nos racines mais aussi l’envie d’expérimenter et de partager.',
    it: 'Ogni piatto racconta un pezzo della nostra storia, l’amore per Napoli, l’attaccamento alle nostre radici ma anche la voglia di sperimentare e di condividere.',
    en: 'Every dish tells a piece of our story — our love for Naples, the attachment to our roots, and also the urge to experiment and to share.',
  },
  {
    fr: 'Bienvenue chez Mareluna : ici on ne vient pas seulement pour manger, mais pour se sentir à la maison.',
    it: 'Benvenuti da Mareluna: qui non si viene soltanto per mangiare, ma per sentirsi a casa.',
    en: 'Welcome to Mareluna: here you do not come only to eat, but to feel at home.',
  },
];

/** The sentence used as the large pull-quote on the story page. */
export const storyPullQuote: L10n = {
  fr: 'Ici on ne vient pas seulement pour manger, mais pour se sentir à la maison.',
  it: 'Qui non si viene soltanto per mangiare, ma per sentirsi a casa.',
  en: 'Here you do not come only to eat, but to feel at home.',
};

/** Short version used in the home page story section. */
export const storyShort: L10n = {
  fr: 'Mareluna est né d’un rêve partagé entre un frère et une sœur, différents par leur caractère et leurs goûts mais unis par la même passion pour la cuisine et l’accueil. Chaque plat raconte un morceau de leur histoire : l’amour pour Naples, l’attachement aux racines, l’envie d’expérimenter et de partager.',
  it: 'Mareluna nasce da un sogno condiviso tra un fratello e una sorella, diversi per carattere e per gusti ma uniti dalla stessa passione per la cucina e per l’accoglienza. Ogni piatto racconta un pezzo della loro storia: l’amore per Napoli, l’attaccamento alle radici, la voglia di sperimentare e di condividere.',
  en: 'Mareluna was born from a dream shared by a brother and a sister — different in character and in taste, yet united by the same passion for cooking and for welcoming people. Every dish tells a piece of their story: a love for Naples, an attachment to their roots, and the urge to experiment and to share.',
};

/**
 * Four values, each one drawn directly from a sentence of the story
 * above — nothing here is invented.
 */
export const storyValues: { id: string; title: L10n; body: L10n }[] = [
  {
    id: 'famille',
    title: { fr: 'Famille', it: 'Famiglia', en: 'Family' },
    body: {
      fr: 'Un frère et une sœur, différents par leur caractère et leurs goûts, unis par la même passion pour la cuisine et l’accueil.',
      it: 'Un fratello e una sorella, diversi per carattere e per gusti, uniti dalla stessa passione per la cucina e per l’accoglienza.',
      en: 'A brother and a sister, different in character and in taste, united by the same passion for cooking and for welcoming people.',
    },
  },
  {
    id: 'naples',
    title: { fr: 'Naples', it: 'Napoli', en: 'Naples' },
    body: {
      fr: 'L’amour pour Naples et l’attachement aux racines, dans les parfums de nos terres et les traditions qui nous ont fait grandir.',
      it: 'L’amore per Napoli e l’attaccamento alle radici, nei profumi delle nostre terre e nelle tradizioni che ci hanno fatto crescere.',
      en: 'A love for Naples and an attachment to our roots, in the scents of our land and the traditions we grew up with.',
    },
  },
  {
    id: 'accueil',
    title: { fr: 'Accueil', it: 'Accoglienza', en: 'Welcome' },
    body: {
      fr: 'Ici on ne vient pas seulement pour manger, mais pour se sentir à la maison.',
      it: 'Qui non si viene soltanto per mangiare, ma per sentirsi a casa.',
      en: 'Here you do not come only to eat, but to feel at home.',
    },
  },
  {
    id: 'partage',
    title: { fr: 'Partage', it: 'Condivisione', en: 'Sharing' },
    body: {
      fr: 'Entrelacer les différences comme s’entrelacent les ingrédients dans une recette réussie : chaque saveur garde son identité, ensemble elles créent l’harmonie.',
      it: 'Intrecciare le differenze come si intrecciano gli ingredienti in una ricetta riuscita: ogni sapore mantiene la propria identità, insieme creano armonia.',
      en: 'Weaving differences together the way ingredients are woven into a good recipe: each flavour keeps its identity, together they create harmony.',
    },
  },
];

/**
 * The description of the room and terrace, carried over from the
 * current website’s home page.
 */
export const atmosphere: { title: L10n; body: L10n } = {
  title: {
    fr: 'Un lieu lumineux et chaleureux',
    it: 'Un luogo luminoso e accogliente',
    en: 'A bright and warm place',
  },
  body: {
    fr: 'Salle contemporaine, terrasse végétalisée et accueil familial, pour déjeuner, dîner ou partager une pizza entre amis.',
    it: 'Sala contemporanea, terrazza verde e accoglienza familiare, per pranzare, cenare o condividere una pizza tra amici.',
    en: 'A contemporary dining room, a planted terrace and a family welcome — for lunch, for dinner, or to share a pizza with friends.',
  },
};
