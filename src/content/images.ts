/**
 * ------------------------------------------------------------------
 *  MARELUNA — image registry
 * ------------------------------------------------------------------
 *  Single source of truth for every photograph on the site.
 *
 *  All images currently in use are REAL Mareluna photographs, carried
 *  over from the previous website (`/assets/*` on the Netlify build) and
 *  stored locally in `public/assets/photos/`. No stock photography was
 *  needed, so none was added.
 *
 *  To swap in new photos, drop the file into `public/assets/photos/`,
 *  update `src`, `w`, `h` and the `alt` texts here — nothing else in the
 *  codebase references a file path directly.
 * ------------------------------------------------------------------
 */

export type ImageTag = 'cuisine' | 'restaurant' | 'terrasse' | 'moments';

export type Photo = {
  id: string;
  src: string;
  /** Intrinsic pixel size — used to reserve layout space and avoid shift. */
  w: number;
  h: number;
  tags: ImageTag[];
  alt: { fr: string; it: string; en: string };
  /** Source / rights holder, for the handover documentation. */
  credit: string;
};

export const photos: Photo[] = [
  {
    id: 'pizza-margherita',
    src: '/assets/photos/pizza-margherita.jpg',
    w: 1443,
    h: 1536,
    tags: ['cuisine'],
    alt: {
      fr: 'Pizza Margherita napolitaine, croûte soufflée et légèrement brûlée, fior di latte et basilic frais.',
      it: 'Pizza Margherita napoletana, cornicione alveolato e leggermente bruciacchiato, fior di latte e basilico fresco.',
      en: 'Neapolitan Margherita pizza with an airy, leopard-spotted crust, fior di latte and fresh basil.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'linguine-homard',
    src: '/assets/photos/linguine-homard.jpg',
    w: 1254,
    h: 1254,
    tags: ['cuisine'],
    alt: {
      fr: 'Linguine au homard et tomates datterino jaunes et rouges, servies dans une assiette blanche.',
      it: 'Linguine all’astice con datterini gialli e rossi, servite in un piatto bianco.',
      en: 'Linguine with lobster and yellow and red datterino tomatoes, served on a white plate.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'fritto-misto',
    src: '/assets/photos/fritto-misto.jpg',
    w: 1152,
    h: 1536,
    tags: ['cuisine'],
    alt: {
      fr: 'Fritto misto partenopeo : arancino, crocchè, frittatina et roquette sur une assiette en ardoise.',
      it: 'Fritto misto partenopeo: arancino, crocchè, frittatina e rucola su un piatto d’ardesia.',
      en: 'Neapolitan fritto misto — arancino, crocchè, frittatina and rocket on a slate plate.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'bruschette',
    src: '/assets/photos/bruschette.jpg',
    w: 1414,
    h: 1536,
    tags: ['cuisine'],
    alt: {
      fr: 'Assortiment de bruschette garnies de tomates, roquette, ricotta et crème de courgettes.',
      it: 'Assortimento di bruschette con pomodori, rucola, ricotta e crema di zucchine.',
      en: 'An assortment of bruschette topped with tomatoes, rocket, ricotta and courgette cream.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'pasta-polpette',
    src: '/assets/photos/pasta-polpette.jpg',
    w: 1152,
    h: 1536,
    tags: ['cuisine'],
    alt: {
      fr: 'Pâtes à la sauce tomate mijotée et basilic frais, dans une assiette creuse blanche.',
      it: 'Pasta al sugo di pomodoro lungamente cotto e basilico fresco, in un piatto fondo bianco.',
      en: 'Pasta in a slow-cooked tomato sauce with fresh basil, in a white bowl.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'ziti-genovese',
    src: '/assets/photos/ziti-genovese.jpg',
    w: 1152,
    h: 1536,
    tags: ['cuisine'],
    alt: {
      fr: 'Ziti alla genovese : pâtes au ragoût d’oignons doux et bœuf longuement mijoté, basilic.',
      it: 'Ziti alla genovese: pasta con ragù di cipolle dolci e manzo a lunga cottura, basilico.',
      en: 'Ziti alla genovese — pasta with a slow-cooked sweet onion and beef ragù, basil.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'baba',
    src: '/assets/photos/baba.jpg',
    w: 1269,
    h: 1240,
    tags: ['cuisine', 'moments'],
    alt: {
      fr: 'Babà napolitain doré, crème fouettée et fruits rouges sur une assiette en ardoise.',
      it: 'Babà napoletano dorato, panna montata e frutti rossi su un piatto d’ardesia.',
      en: 'Golden Neapolitan babà with whipped cream and red berries on a slate plate.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'dessert-chocolat',
    src: '/assets/photos/dessert-chocolat.jpg',
    w: 1122,
    h: 1402,
    tags: ['cuisine'],
    alt: {
      fr: 'Part de gâteau au chocolat nappée de sauce chocolat, crème fouettée et sucre glace.',
      it: 'Fetta di torta al cioccolato con salsa al cioccolato, panna montata e zucchero a velo.',
      en: 'A slice of chocolate cake with chocolate sauce, whipped cream and icing sugar.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'desserts-maison',
    src: '/assets/photos/desserts-maison.jpg',
    w: 1086,
    h: 1448,
    tags: ['moments', 'cuisine'],
    alt: {
      fr: 'Deux desserts faits maison présentés à table sur des serviettes vertes.',
      it: 'Due dolci fatti in casa presentati a tavola su tovaglioli verdi.',
      en: 'Two house-made desserts presented at the table on green napkins.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'terrasse',
    src: '/assets/photos/terrasse.jpg',
    w: 1536,
    h: 2048,
    tags: ['terrasse'],
    alt: {
      fr: 'Terrasse végétalisée de Mareluna, tables en bois dressées sous la pergola.',
      it: 'La terrazza verde di Mareluna, tavoli in legno apparecchiati sotto la pergola.',
      en: 'Mareluna’s planted terrace, wooden tables laid under the pergola.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'salle-terrasse',
    src: '/assets/photos/salle-terrasse.jpg',
    w: 1152,
    h: 2048,
    tags: ['restaurant', 'terrasse'],
    alt: {
      fr: 'Salle lumineuse de Mareluna ouverte sur la terrasse par de grandes baies vitrées.',
      it: 'La sala luminosa di Mareluna aperta sulla terrazza da grandi vetrate.',
      en: 'Mareluna’s bright dining room opening onto the terrace through wide glass doors.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'salle-2',
    src: '/assets/photos/salle-2.jpg',
    w: 1152,
    h: 2048,
    tags: ['restaurant'],
    alt: {
      fr: 'Tables dressées dans la salle contemporaine de Mareluna, aux tons clairs.',
      it: 'Tavoli apparecchiati nella sala contemporanea di Mareluna, dai toni chiari.',
      en: 'Laid tables in Mareluna’s contemporary, light-toned dining room.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'entree',
    src: '/assets/photos/entree.jpg',
    w: 1536,
    h: 2048,
    tags: ['restaurant'],
    alt: {
      fr: 'Entrée du restaurant Mareluna, sol en mosaïque et vue sur la salle et la terrasse.',
      it: 'Ingresso del ristorante Mareluna, pavimento a mosaico e vista sulla sala e la terrazza.',
      en: 'The entrance of Mareluna, mosaic floor and a view through to the room and terrace.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
  {
    id: 'enseigne',
    src: '/assets/photos/enseigne.jpg',
    w: 1536,
    h: 2048,
    tags: ['restaurant', 'moments'],
    alt: {
      fr: 'Enseigne lumineuse Mareluna Restaurant et Pizzeria sur la façade, Chemin des Noyers.',
      it: 'L’insegna luminosa Mareluna Restaurant et Pizzeria sulla facciata, Chemin des Noyers.',
      en: 'The illuminated Mareluna Restaurant et Pizzeria sign on the façade, Chemin des Noyers.',
    },
    credit: 'Mareluna — photo du restaurant',
  },
];

/**
 * Two further files exist in `public/assets/photos/` but are deliberately
 * not shown: `nerano.jpg` and `tiramisu.jpg`. Both duplicate a photo that
 * is already used (`linguine-homard.jpg` / `desserts-maison.jpg`) and carry
 * burnt-in marketing lettering, which reads poorly next to the clean
 * editorial layout. They are kept in the repository so they can be brought
 * back in one line if the owner prefers them.
 */
export const unusedPhotos = ['/assets/photos/nerano.jpg', '/assets/photos/tiramisu.jpg'];

/* ------------------------------------------------------------------ *
 *  Responsive variants
 * ------------------------------------------------------------------ *
 *  `scripts/optimize-images.py` writes compressed WebP variants (and a
 *  JPEG fallback) next to the originals, in `public/assets/photos/opt/`.
 *  The originals stay untouched and are what you replace when new
 *  photographs arrive — then re-run the script.
 * ------------------------------------------------------------------ */
export const PHOTO_WIDTHS = [640, 1024, 1400] as const;

const optBase = (p: Photo) =>
  p.src.replace('/photos/', '/photos/opt/').replace(/\.jpg$/, '');

/** Widths that actually exist for this photo (never upscaled). */
const availableWidths = (p: Photo) => PHOTO_WIDTHS.filter((w) => w <= p.w);

export function webpSrcSet(p: Photo): string {
  return availableWidths(p)
    .map((w) => `${optBase(p)}-${w}.webp ${w}w`)
    .join(', ');
}

/** JPEG fallback for browsers without WebP support. */
export function fallbackSrc(p: Photo): string {
  return availableWidths(p).includes(1024) ? `${optBase(p)}-1024.jpg` : p.src;
}

/** Largest variant, used by the lightbox. */
export function largeSrc(p: Photo): string {
  const widest = availableWidths(p).at(-1);
  return widest ? `${optBase(p)}-${widest}.webp` : p.src;
}

const byId = new Map(photos.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown photo id: ${id}`);
  return found;
}

export function photosByTag(tag: ImageTag | 'all'): Photo[] {
  return tag === 'all' ? photos : photos.filter((p) => p.tags.includes(tag));
}
