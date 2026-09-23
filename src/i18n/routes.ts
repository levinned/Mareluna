/**
 * ------------------------------------------------------------------
 *  Routing & languages
 * ------------------------------------------------------------------
 *  French is the default language and keeps the existing, un-prefixed
 *  URLs of the current website (`/`, `/histoire`, `/menu`, …) so that
 *  no link that is already out there breaks.
 *  Italian and English live under `/it/…` and `/en/…` with translated
 *  slugs, which is what search engines expect from a multilingual site.
 * ------------------------------------------------------------------
 */

export const LANGS = ['fr', 'it', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'fr';

export const LANG_LABEL: Record<Lang, string> = { fr: 'FR', it: 'IT', en: 'EN' };
export const LANG_NAME: Record<Lang, string> = {
  fr: 'Français',
  it: 'Italiano',
  en: 'English',
};
/** BCP-47 tags used for `<html lang>` and `hreflang`. */
export const LANG_TAG: Record<Lang, string> = { fr: 'fr-CH', it: 'it-CH', en: 'en' };

export type PageKey =
  | 'home'
  | 'story'
  | 'menu'
  | 'gallery'
  | 'order'
  | 'reviews'
  | 'contact'
  | 'privacy'
  | 'legal';

/** Pages shown in the main navigation, in order. */
export const NAV_PAGES: PageKey[] = ['home', 'story', 'menu', 'gallery', 'reviews', 'contact'];

export const ALL_PAGES: PageKey[] = [
  'home',
  'story',
  'menu',
  'gallery',
  'order',
  'reviews',
  'contact',
  'privacy',
  'legal',
];

const SEGMENTS: Record<PageKey, Record<Lang, string>> = {
  home: { fr: '', it: '', en: '' },
  story: { fr: 'histoire', it: 'storia', en: 'story' },
  menu: { fr: 'menu', it: 'menu', en: 'menu' },
  gallery: { fr: 'galerie', it: 'galleria', en: 'gallery' },
  order: { fr: 'commande', it: 'ordina', en: 'order' },
  reviews: { fr: 'avis', it: 'recensioni', en: 'reviews' },
  contact: { fr: 'contact', it: 'contatti', en: 'contact' },
  privacy: { fr: 'confidentialite', it: 'privacy', en: 'privacy' },
  legal: { fr: 'mentions-legales', it: 'note-legali', en: 'legal-notice' },
};

/** The canonical path of a page in a given language. */
export function pathFor(page: PageKey, lang: Lang): string {
  const segment = SEGMENTS[page][lang];
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  if (!segment) return prefix || '/';
  return `${prefix}/${segment}`;
}

/** Every (page, language) pair, used to declare the routes. */
export function allRoutes(): { page: PageKey; lang: Lang; path: string }[] {
  const out: { page: PageKey; lang: Lang; path: string }[] = [];
  for (const lang of LANGS) {
    for (const page of ALL_PAGES) {
      out.push({ page, lang, path: pathFor(page, lang) });
    }
  }
  return out;
}
