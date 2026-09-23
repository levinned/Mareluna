import { Link } from 'react-router-dom';
import { business, openingHours } from '@/content/business';
import { useI18n } from '@/i18n';
import { LANGS, LANG_LABEL, LANG_NAME, NAV_PAGES } from '@/i18n/routes';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Crescent, Wordmark } from '@/components/ui/Primitives';

const DAY_LABEL: Record<string, Record<'fr' | 'it' | 'en', string>> = {
  mon: { fr: 'Lundi', it: 'Lunedì', en: 'Monday' },
  tue: { fr: 'Mardi', it: 'Martedì', en: 'Tuesday' },
  wed: { fr: 'Mercredi', it: 'Mercoledì', en: 'Wednesday' },
  thu: { fr: 'Jeudi', it: 'Giovedì', en: 'Thursday' },
  fri: { fr: 'Vendredi', it: 'Venerdì', en: 'Friday' },
  sat: { fr: 'Samedi', it: 'Sabato', en: 'Saturday' },
  sun: { fr: 'Dimanche', it: 'Domenica', en: 'Sunday' },
};

export function dayLabel(key: string, lang: 'fr' | 'it' | 'en') {
  return DAY_LABEL[key]?.[lang] ?? key;
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="label-xs mb-5 text-mist/75">{children}</h2>;
}

/* py-1 keeps every footer link at least 24px tall (WCAG 2.5.8). */
const linkClass =
  'inline-flex items-center gap-1.5 py-1 text-seafoam/75 transition-colors duration-300 hover:text-porcelain';

export function Footer() {
  const { t, to, toIn, page, lang } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative overflow-hidden bg-navy text-porcelain">
      <Crescent
        className="drift-slow pointer-events-none absolute -left-40 -top-44 h-[34rem] w-[34rem] max-w-none text-white/[0.035]"
      />

      <div className="shell relative py-20 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand ------------------------------------------------ */}
          <div>
            <Link to={to('home')} aria-label="Mareluna" className="inline-block text-porcelain">
              <Wordmark className="w-44" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-seafoam/70">
              {t.footer.brandLine}
            </p>
            <p className="mt-6 text-[0.9375rem] leading-relaxed text-seafoam/60">
              {business.legalName}
            </p>
          </div>

          {/* Navigation ------------------------------------------- */}
          <nav aria-label={t.footer.navTitle}>
            <ColumnTitle>{t.footer.navTitle}</ColumnTitle>
            <ul className="space-y-3 text-[0.9375rem]">
              {[...NAV_PAGES, 'order' as const].map((p) => (
                <li key={p}>
                  <Link to={to(p)} className={linkClass}>
                    {t.nav[p as keyof typeof t.nav] as string}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact ---------------------------------------------- */}
          <div>
            <ColumnTitle>{t.footer.contactTitle}</ColumnTitle>
            <address className="space-y-3 text-[0.9375rem] not-italic">
              <p className="text-seafoam/75">
                {business.address.street}
                <br />
                {business.address.postalCode} {business.address.city}
              </p>
              <p>
                <a href={business.phoneHref} className={linkClass}>
                  {business.phoneDisplay}
                </a>
              </p>
              <p>
                <a href={`mailto:${business.email}`} className={linkClass}>
                  {business.email}
                </a>
              </p>
              <p>
                <a
                  href={business.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkClass, 'group')}
                >
                  {business.instagramHandle}
                  <ArrowUpRight />
                </a>
              </p>
              <p>
                <a
                  href={business.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(linkClass, 'group')}
                >
                  {t.common.directions}
                  <ArrowUpRight />
                </a>
              </p>
            </address>

            {/* Opening hours only appear once they are verified. */}
            {openingHours.verified && openingHours.days.length > 0 ? (
              <div className="mt-7">
                <ColumnTitle>{t.contact.hoursTitle}</ColumnTitle>
                <dl className="space-y-1.5 text-[0.9375rem] text-seafoam/75">
                  {openingHours.days.map((d) => (
                    <div key={d.key} className="flex justify-between gap-4">
                      <dt>{dayLabel(d.key, lang)}</dt>
                      <dd className="font-mono text-[0.8125rem] text-seafoam/60">
                        {d.ranges.length ? d.ranges.join(' · ') : '—'}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : null}
          </div>

          {/* Reserve + language ----------------------------------- */}
          <div>
            <ColumnTitle>{t.footer.reserveTitle}</ColumnTitle>
            <a
              href={business.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-porcelain px-6 py-3 text-[0.9375rem] font-medium text-navy transition-colors duration-300 hover:bg-white"
            >
              {t.common.reserveTable}
              <span className="sr-only"> ({t.common.newTab})</span>
              <ArrowUpRight />
            </a>

            <div className="mt-10">
              <ColumnTitle>{t.footer.languageTitle}</ColumnTitle>
              <ul className="flex gap-2">
                {LANGS.map((l) => (
                  <li key={l}>
                    <Link
                      to={toIn(page, l)}
                      hrefLang={l}
                      aria-current={l === lang ? 'true' : undefined}
                      className={cn(
                        'label-xs inline-block rounded-full border px-3 py-2 transition-colors duration-300',
                        l === lang
                          ? 'border-porcelain/70 text-porcelain'
                          : 'border-porcelain/20 text-seafoam/60 hover:border-porcelain/50 hover:text-porcelain',
                      )}
                    >
                      <span aria-hidden="true">{LANG_LABEL[l]}</span>
                      <span className="sr-only">{LANG_NAME[l]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Baseline -------------------------------------------- */}
        <div className="mt-16 flex flex-col gap-4 border-t border-porcelain/12 pt-8 text-[0.8125rem] text-seafoam/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.legalName}. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link
                to={to('privacy')}
                className="inline-block py-1 transition-colors hover:text-porcelain"
              >
                {t.nav.privacy}
              </Link>
            </li>
            <li>
              <Link
                to={to('legal')}
                className="inline-block py-1 transition-colors hover:text-porcelain"
              >
                {t.nav.legal}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
