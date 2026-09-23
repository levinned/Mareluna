import { useEffect } from 'react';
import { useI18n } from '@/i18n';
import { LANGS, LANG_TAG, pathFor, type Lang, type PageKey } from '@/i18n/routes';
import { addressOneLine, business } from '@/content/business';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (hreflang) el.hreflang = hreflang;
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Structured data for the restaurant.
 * Only verified facts are published — no opening hours, no rating, no
 * price range, because none of those are confirmed.
 */
function restaurantJsonLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.legalName,
    url: window.location.origin + pathFor('home', lang),
    telephone: business.phoneDisplay,
    email: business.email,
    servesCuisine: ['Italian', 'Neapolitan', 'Pizza'],
    hasMenu: window.location.origin + business.menuPdf,
    acceptsReservations: business.reservationUrl,
    sameAs: [business.instagramUrl, business.mapsUrl],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.countryCode,
    },
  };
}

export function Seo({ page }: { page: PageKey }) {
  const { lang, t } = useI18n();

  useEffect(() => {
    const meta = t.meta[page as keyof typeof t.meta] as
      | { title: string; description: string }
      | undefined;

    const title = meta?.title || t.meta.titleSuffix;
    const description = meta?.description || '';

    document.title = title;
    document.documentElement.lang = LANG_TAG[lang];

    if (description) upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', business.legalName);
    upsertMeta('property', 'og:locale', LANG_TAG[lang].replace('-', '_'));
    upsertMeta('name', 'twitter:card', 'summary_large_image');

    const origin = window.location.origin;
    upsertLink('canonical', origin + pathFor(page, lang));
    for (const l of LANGS) upsertLink('alternate', origin + pathFor(page, l), l);
    upsertLink('alternate', origin + pathFor(page, 'fr'), 'x-default');
  }, [lang, page, t]);

  // Restaurant structured data, mounted once for the whole site.
  useEffect(() => {
    const id = 'mareluna-jsonld';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(restaurantJsonLd(lang));
  }, [lang]);

  // Geo meta for local search — address only, no invented coordinates.
  useEffect(() => {
    upsertMeta('name', 'geo.placename', `${business.address.city}, ${business.address.country}`);
    upsertMeta('name', 'business.address', addressOneLine);
  }, []);

  return null;
}
