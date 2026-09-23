import { Link } from 'react-router-dom';
import { business, promo } from '@/content/business';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/utils';
import { ArrowRight, ArrowUpRight, Crescent, Reveal } from '@/components/ui/Primitives';

/* ------------------------------------------------------------------ *
 * PromoBand
 * ------------------------------------------------------------------ *
 *  Driven entirely by `promo` in content/business.ts. Setting
 *  `promo.active = false` removes it everywhere, with no code change.
 * ------------------------------------------------------------------ */
export function PromoBand({ surface }: { surface: (typeof promo.surfaces)[number] }) {
  const { pick, to } = useI18n();

  if (!promo.active) return null;
  if (!(promo.surfaces as readonly string[]).includes(surface)) return null;

  return (
    <aside
      aria-label={pick(promo.label)}
      className="relative border-y border-brass/25 bg-sand/45"
    >
      <div className="shell flex flex-col items-start gap-x-6 gap-y-2 py-4 sm:flex-row sm:items-center sm:justify-center sm:text-center">
        {/* Brass stays on the mark and the hairline; the label itself is
            set in ink, where it clears the contrast requirement. */}
        <span className="label-xs flex shrink-0 items-center gap-2.5 text-ink/75">
          <Crescent className="h-2.5 w-2.5 text-brass" />
          {pick(promo.label)}
        </span>
        <p className="text-[0.9375rem] text-ink/80">{pick(promo.message)}</p>
        {promo.cta ? (
          <Link
            to={to(promo.cta.to)}
            className="group inline-flex items-center gap-1.5 py-1 text-[0.9375rem] font-medium text-rose-deep underline-offset-[6px] hover:underline"
          >
            {pick(promo.cta.label)}
            <ArrowRight />
          </Link>
        ) : null}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ *
 * ReserveCta — the closing block of almost every page.
 * ------------------------------------------------------------------ */
export function ReserveCta({
  title,
  lede,
  className,
}: {
  title?: string;
  lede?: string;
  className?: string;
}) {
  const { t } = useI18n();

  return (
    <section className={cn('on-dark relative overflow-hidden bg-navy py-24 lg:py-32', className)}>
      <Crescent
        className="drift-slow pointer-events-none absolute -right-[12%] top-1/2 h-[30rem] w-[30rem] max-w-none -translate-y-1/2 text-white/[0.05]"
      />
      <Crescent
        flip
        className="drift pointer-events-none absolute -bottom-40 -left-24 h-[22rem] w-[22rem] max-w-none text-mist/[0.06]"
      />

      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-d2 text-porcelain">{title ?? t.home.ctaTitle}</h2>
          <p className="mt-6 max-w-xl text-lede text-seafoam/80">{lede ?? t.home.ctaLede}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={business.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-[#8f453d]"
            >
              {t.common.reserveTable}
              <span className="sr-only"> ({t.common.newTab})</span>
              <ArrowUpRight />
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-porcelain/25 px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:border-porcelain/60"
            >
              {business.phoneDisplay}
            </a>
          </div>

          <p className="mt-6 max-w-md text-[0.8125rem] leading-relaxed text-seafoam/65">
            {t.common.externalBooking}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * PageHero — the quiet porcelain header used by the inner pages.
 * ------------------------------------------------------------------ */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-porcelain pb-16 pt-[calc(var(--header-h)+4.5rem)] lg:pb-24 lg:pt-[calc(var(--header-h)+7rem)]">
      <Crescent
        className="drift-slow pointer-events-none absolute -right-[14%] -top-[30%] h-[40rem] w-[40rem] max-w-none text-coast/55"
      />
      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <p className="label-xs flex items-center gap-3 text-navy/70">
            <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-60" />
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-d1 text-navy">{title}</h1>
          {lede ? <p className="mt-7 max-w-2xl text-lede text-ink/70">{lede}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
