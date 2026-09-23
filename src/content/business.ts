/**
 * ------------------------------------------------------------------
 *  MARELUNA — central business configuration
 * ------------------------------------------------------------------
 *  Every verified business fact lives here and nowhere else.
 *  Nothing in this file may be invented: if a value is not confirmed
 *  by the owner, it stays `null` and the UI hides the whole block.
 * ------------------------------------------------------------------
 */

export const business = {
  name: 'Mareluna',
  legalName: 'Mareluna Restaurant & Pizzeria',
  tagline: { fr: 'Restaurant & Pizzeria', it: 'Ristorante & Pizzeria', en: 'Restaurant & Pizzeria' },

  address: {
    street: 'Chemin des Noyers 8E',
    postalCode: '1131',
    city: 'Tolochenaz',
    country: 'Suisse',
    countryCode: 'CH',
  },

  /** Display form used in the header / footer / contact page. */
  phoneDisplay: '+41 21 803 30 00',
  /** Machine form used for `tel:` links. */
  phoneHref: 'tel:+41218033000',

  email: 'mareluna.resto@gmail.com',

  instagramHandle: '@restaurantmareluna',
  instagramUrl: 'https://www.instagram.com/restaurantmareluna',

  /** Official Google Maps place link (also used for “Itinéraire”). */
  mapsUrl: 'https://maps.app.goo.gl/sG7beFEKxT1qDBuX6',

  /** External booking platform — the reservation is NOT rebuilt on this site. */
  reservationUrl: 'https://eat.thelemmon.ch/restaurant/mareluna/reserve/tables',

  /** Official menu PDF, shipped in /public/assets. */
  menuPdf: '/assets/menu-mareluna-2026.pdf',
  menuPdfFilename: 'menu-mareluna-2026.pdf',
} as const;

/**
 * ------------------------------------------------------------------
 *  OPENING HOURS
 * ------------------------------------------------------------------
 *  No verified opening hours were available at build time, so the
 *  opening-hours component stays hidden. As soon as the owner confirms
 *  them, fill `days` below and the block appears automatically on the
 *  contact page and in the footer — no code change required.
 *
 *  Example once verified:
 *    days: [
 *      { key: 'tue', ranges: ['11:30–14:00', '18:00–22:30'] },
 *      { key: 'mon', ranges: [] },              // closed
 *    ]
 */
export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export const openingHours: {
  verified: boolean;
  days: { key: DayKey; ranges: string[] }[];
  note: { fr: string; it: string; en: string } | null;
} = {
  verified: false,
  days: [],
  note: null,
};

/**
 * ------------------------------------------------------------------
 *  PROMOTION BAND
 * ------------------------------------------------------------------
 *  A single, centrally switched announcement. Set `active: false` to
 *  remove it from every page at once; replace the copy to run a new one.
 *  The text below is carried over verbatim from the current website.
 */
export const promo = {
  active: true,
  /** Where the band is allowed to appear. */
  surfaces: ['home', 'order'] as const,
  label: { fr: 'Service du soir', it: 'Servizio della sera', en: 'Evening service' },
  message: {
    fr: 'Livraison sans frais tous les soirs du mardi au samedi.',
    it: 'Consegna gratuita tutte le sere, dal martedì al sabato.',
    en: 'Free delivery every evening, Tuesday to Saturday.',
  },
  /** Optional call to action — set to null to show the message alone. */
  cta: {
    label: { fr: 'Commander', it: 'Ordina', en: 'Order' },
    to: 'order' as const,
  },
};

/**
 * ------------------------------------------------------------------
 *  REVIEWS
 * ------------------------------------------------------------------
 *  We deliberately never hard-code a star rating: it changes over time
 *  and a stale number would be misleading. The reviews page links to the
 *  live Google listing instead.
 *
 *  `showPlaceholderQuotes` is OFF on purpose. The quotes below are the
 *  generic placeholders inherited from the previous site — they are NOT
 *  real, attributed customer testimonials. Only switch this on after
 *  replacing them with real, permitted quotes from the Google listing.
 */
export const reviews = {
  googleUrl: business.mapsUrl,
  /** Google's canonical "write a review" entry point for this place. */
  writeReviewUrl: business.mapsUrl,
  showPlaceholderQuotes: false,
  placeholderQuotes: [
    {
      fr: 'Cuisine italienne authentique, accueil chaleureux et ambiance familiale.',
      it: 'Cucina italiana autentica, accoglienza calorosa e atmosfera familiare.',
      en: 'Authentic Italian cooking, a warm welcome and a family atmosphere.',
    },
    {
      fr: 'Pizza napolitaine généreuse, produits savoureux et service attentionné.',
      it: 'Pizza napoletana generosa, prodotti saporiti e servizio attento.',
      en: 'Generous Neapolitan pizza, flavourful produce and attentive service.',
    },
    {
      fr: 'Une belle adresse à Tolochenaz pour partager un moment gourmand.',
      it: 'Un bell’indirizzo a Tolochenaz per condividere un momento goloso.',
      en: 'A lovely address in Tolochenaz to share a good moment.',
    },
  ],
};

/**
 * ------------------------------------------------------------------
 *  CONTACT FORM
 * ------------------------------------------------------------------
 *  No backend is connected. Until `endpoint` is set, the validated form
 *  hands the message to the guest's own mail client (a real action) and
 *  never claims that a message was sent.
 *
 *  To connect a real backend, set `endpoint` to a Formspree / Resend /
 *  custom URL that accepts a JSON POST. See HANDOVER.md.
 */
export const contactForm: { endpoint: string | null; method: 'POST' } = {
  endpoint: null,
  method: 'POST',
};

/**
 * ------------------------------------------------------------------
 *  TAKE-AWAY / ORDERING
 * ------------------------------------------------------------------
 *  No checkout, cart or payment is simulated. Orders are placed by
 *  e-mail or by phone — both are real, working channels today.
 *  `checkoutProvider` is the single switch for a future Stripe / POS /
 *  WooCommerce integration (see HANDOVER.md).
 */
export const ordering: {
  checkoutProvider: null | 'stripe' | 'woocommerce' | 'pos';
  /**
   * Menu item ids (see content/menu.ts) offered on the take-away page.
   * Each one is a real dish from the official card, illustrated with a
   * real photograph of that same dish.
   */
  featured: string[];
} = {
  checkoutProvider: null,
  featured: [
    'pizza-margherita',
    'linguine-astice',
    'ziti-genovese',
    'fritto-misto',
    'fantasia-bruschette',
  ],
};

/** Photo id (see content/images.ts) for each take-away dish. */
export const orderingPhoto: Record<string, string> = {
  'pizza-margherita': 'pizza-margherita',
  'linguine-astice': 'linguine-homard',
  'ziti-genovese': 'ziti-genovese',
  'fritto-misto': 'fritto-misto',
  'fantasia-bruschette': 'bruschette',
};

export const addressOneLine = `${business.address.street}, ${business.address.postalCode} ${business.address.city}`;
