import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { business } from '@/content/business';
import {
  allergenLegend,
  itemName,
  meatOrigin,
  menu,
  type Allergen,
  type MenuCategory,
  type MenuItem,
} from '@/content/menu';
import { useI18n } from '@/i18n';
import { useScrollSpy } from '@/lib/hooks';
import { cn, scrollToY } from '@/lib/utils';
import { asset } from '@/lib/base';
import { ArrowUpRight, InfoIcon, Reveal } from '@/components/ui/Primitives';
import { MoonAccent } from '@/components/ui/Media';
import { PageHero, ReserveCta } from '@/components/sections/Shared';

/* ------------------------------------------------------------------ *
 * Allergen badge — the letter from the printed card, with its meaning
 * available to screen readers and on hover.
 * ------------------------------------------------------------------ */
function AllergenBadges({ codes }: { codes: Allergen[] }) {
  const { t, pick } = useI18n();
  return (
    <span className="ml-2.5 inline-flex translate-y-[-0.15em] gap-1 align-middle">
      {codes.map((code) => {
        const entry = allergenLegend.find((a) => a.code === code);
        const label = entry ? pick(entry.label) : code;
        return (
          <abbr
            key={code}
            title={`${t.menu.allergenPrefix} : ${label}`}
            className="inline-flex h-[1.35rem] w-[1.35rem] items-center justify-center rounded-full border border-navy/20 font-mono text-[0.625rem] leading-none text-navy/70 no-underline"
          >
            <span aria-hidden="true">{code}</span>
            <span className="sr-only">
              {t.menu.allergenPrefix}: {label}
            </span>
          </abbr>
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * One line of the card.
 * ------------------------------------------------------------------ */
function Row({ item, dense }: { item: MenuItem; dense: boolean }) {
  const { lang, pick } = useI18n();

  return (
    <li
      className={cn(
        'grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-6 border-b border-navy/10',
        dense ? 'py-4' : 'py-6 sm:py-7',
      )}
    >
      <h3
        className={cn(
          'font-display leading-snug text-navy',
          dense ? 'text-[1.1875rem]' : 'text-[1.375rem] sm:text-[1.5rem]',
        )}
      >
        {itemName(item, lang)}
        {item.allergens?.length ? <AllergenBadges codes={item.allergens} /> : null}
      </h3>
      <p className="font-mono text-[0.9375rem] tabular-nums text-navy/75">{item.price}</p>

      {item.meta ? (
        <p className="label-xs col-span-2 mt-2 text-navy/65">{pick(item.meta)}</p>
      ) : null}
      {item.desc ? (
        <p className="col-span-2 mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/65">
          {pick(item.desc)}
        </p>
      ) : null}
    </li>
  );
}

/* ------------------------------------------------------------------ *
 * One category of the card.
 * ------------------------------------------------------------------ *
 *  Two rhythms, the way a printed card sets them:
 *   • dishes, which carry a description, run in a single column of a
 *     comfortable measure so the name and its price stay paired;
 *   • drinks, wines and spirits, which are one line each, run in two
 *     columns on wide screens instead of stretching across the page.
 * ------------------------------------------------------------------ */
function Category({ category, index }: { category: MenuCategory; index: number }) {
  const { pick, t } = useI18n();
  const dense = category.items.every((item) => !item.desc);

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-[3.75rem] py-14 lg:py-20"
    >
      <Reveal className={dense ? undefined : 'max-w-[62rem]'}>
        <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b border-navy/20 pb-5">
          <div className="flex items-baseline gap-4">
            <span className="label-xs text-rose-deep" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h2 id={`${category.id}-title`} className="font-display text-d3 text-navy">
              {pick(category.title)}
            </h2>
          </div>
          <p className="label-xs text-navy/65">
            {category.priceHeader ? pick(category.priceHeader) : t.common.pricesInChf}
          </p>
        </header>

        {category.note ? (
          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-sand/45 px-5 py-4 text-[0.9375rem] leading-relaxed text-ink/80">
            <InfoIcon className="mt-0.5 h-[1.0625rem] w-[1.0625rem] shrink-0 text-brass" />
            {pick(category.note)}
          </p>
        ) : null}

        <ul className={cn('mt-2', dense && 'lg:grid lg:grid-cols-2 lg:gap-x-16')}>
          {category.items.map((item) => (
            <Row key={item.id} item={item} dense={dense} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Sticky category rail
 * ------------------------------------------------------------------ *
 *  A jump has to land the chosen category exactly under the sticky bar —
 *  not a pixel of the previous one may remain, otherwise the wrong chip
 *  stays marked. Letting the browser handle the anchor does not achieve
 *  that: `scroll-padding-top` on the page and `scroll-margin-top` on the
 *  section add up, so the target ends up far too low. We therefore scroll
 *  ourselves, to a position measured from the live header and bar heights,
 *  and give the scroll spy the very same offset.
 * ------------------------------------------------------------------ */

/**
 * Distance from the top of the document, measured without reading the
 * scroll position. `getBoundingClientRect() + scrollY` can disagree with
 * itself while a scroll is still in flight — which is exactly the case
 * when a visitor taps a second chip mid-jump.
 */
function documentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

/** Height of everything that is pinned above the content. */
function useStickyOffset(barRef: React.RefObject<HTMLDivElement | null>) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const measure = () => {
      const header = document.querySelector('header')?.offsetHeight ?? 0;
      const bar = barRef.current?.offsetHeight ?? 0;
      setOffset(header + bar);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [barRef]);

  return offset;
}

function CategoryRail({ barRef, offset }: { barRef: React.RefObject<HTMLDivElement | null>; offset: number }) {
  const { pick, t } = useI18n();
  const ids = useMemo(() => [...menu.map((c) => c.id), 'allergenes'], []);

  // +2px so that a section sitting exactly at the offset counts as reached.
  const spied = useScrollSpy(ids, offset + 2);

  /** Held while we scroll to a chip, so the mark never flickers on the way. */
  const [pinned, setPinned] = useState<string | null>(null);
  const cancelScroll = useRef<(() => void) | null>(null);
  const active = pinned ?? spied;

  const railRef = useRef<HTMLDivElement>(null);

  const jumpTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      cancelScroll.current?.();

      const top = Math.max(0, documentTop(el) - offset);
      setPinned(id);
      window.history.replaceState(null, '', `#${id}`);

      cancelScroll.current = scrollToY(top, () => {
        cancelScroll.current = null;
        setPinned(null);
      });
    },
    [offset],
  );

  // A jump the visitor interrupts belongs to the visitor again.
  useEffect(() => {
    if (!pinned) return;
    const release = () => {
      cancelScroll.current?.();
      cancelScroll.current = null;
      setPinned(null);
    };
    window.addEventListener('wheel', release, { passive: true });
    window.addEventListener('touchstart', release, { passive: true });
    return () => {
      window.removeEventListener('wheel', release);
      window.removeEventListener('touchstart', release);
    };
  }, [pinned]);

  useEffect(() => () => cancelScroll.current?.(), []);

  // Land correctly when the page is opened straight on `/menu#pizzas`.
  useEffect(() => {
    if (offset === 0) return;
    const id = window.location.hash.slice(1);
    if (!id || !ids.includes(id)) return;
    const frame = window.requestAnimationFrame(() => jumpTo(id));
    return () => window.cancelAnimationFrame(frame);
    // Only on the first measurement, never on later re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset > 0]);

  // Keep the active chip visible inside the horizontally scrolling rail.
  useEffect(() => {
    if (!active || !railRef.current) return;
    const chip = railRef.current.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    if (!chip) return;
    const rail = railRef.current;
    const left = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left, behavior: 'smooth' });
  }, [active]);

  const chips = [
    ...menu.map((c) => ({ id: c.id, label: pick(c.title) })),
    { id: 'allergenes', label: t.menu.allergensShort },
  ];

  return (
    <div
      ref={barRef}
      className="sticky top-[var(--header-h)] z-30 border-y border-navy/10 bg-porcelain/93 backdrop-blur-xl"
    >
      <nav aria-label={t.menu.categoriesLabel} className="shell">
        <div ref={railRef} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto py-2.5">
          {chips.map((chip) => {
            const isActive = chip.id === active;
            return (
              <a
                key={chip.id}
                href={`#${chip.id}`}
                data-chip={chip.id}
                aria-current={isActive ? 'true' : undefined}
                onClick={(event) => {
                  // Let modified clicks (new tab, save) behave normally.
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
                  event.preventDefault();
                  jumpTo(chip.id);
                }}
                className={cn(
                  'shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[0.875rem] transition-colors duration-300',
                  isActive
                    ? 'bg-rose-deep text-porcelain'
                    : 'text-navy/60 hover:bg-navy/[0.06] hover:text-navy',
                )}
              >
                {chip.label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Allergen key — shown before the first category, so nobody has to
 * guess what the letters after a dish mean.
 * ------------------------------------------------------------------ */
function AllergenKeyBar() {
  const { t, pick } = useI18n();

  return (
    <div className="border-b border-navy/10 bg-sand/35">
      <div className="shell flex flex-col gap-x-8 gap-y-3 py-4 lg:flex-row lg:items-center">
        <p className="label-xs shrink-0 text-ink/75">{t.menu.allergenKeyIntro}</p>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {allergenLegend.map((a) => (
            <li key={a.code} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-flex h-[1.35rem] w-[1.35rem] shrink-0 items-center justify-center rounded-full border border-navy/25 font-mono text-[0.625rem] leading-none text-navy/70"
              >
                {a.code}
              </span>
              <span className="text-[0.875rem] text-ink/75">{pick(a.label)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Allergen legend
 * ------------------------------------------------------------------ */
function AllergenLegend() {
  const { t, pick } = useI18n();

  return (
    <section
      id="allergenes"
      aria-labelledby="allergenes-title"
      className="scroll-mt-[3.75rem] py-16 lg:py-20"
    >
      <Reveal className="rounded-[1.75rem] bg-sand/40 p-8 sm:p-12">
        <h2 id="allergenes-title" className="font-display text-d3 text-navy">
          {t.menu.allergensTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink/70">
          {t.menu.allergensLede}
        </p>

        <ul className="mt-9 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {allergenLegend.map((a) => (
            <li key={a.code} className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy/25 font-mono text-[0.75rem] text-navy/70">
                {a.code}
              </span>
              <span className="text-[0.9375rem] text-ink/75">{pick(a.label)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 border-t border-navy/12 pt-6 text-[0.875rem] leading-relaxed text-ink/70">
          {pick(meatOrigin)}
        </p>
      </Reveal>
    </section>
  );
}

/* ================================================================== */
export default function MenuPage() {
  const { t } = useI18n();
  const barRef = useRef<HTMLDivElement>(null);
  const offset = useStickyOffset(barRef);

  return (
    <>
      <PageHero eyebrow={t.menu.eyebrow} title={t.menu.title} lede={t.menu.lede}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={asset(business.menuPdf)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-night"
          >
            {t.menu.openPdf}
            <span className="sr-only"> ({t.common.newTab})</span>
            <ArrowUpRight />
          </a>
          <a
            href={asset(business.menuPdf)}
            download={business.menuPdfFilename}
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-navy/20 px-7 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-navy/50"
          >
            {t.menu.downloadPdf}
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-[0.9em] w-[0.9em]">
              <path
                d="M8 2v9m0 0L4.8 7.8M8 11l3.2-3.2M2.5 13.5h11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </PageHero>

      <CategoryRail barRef={barRef} offset={offset} />
      <AllergenKeyBar />

      <div className="relative overflow-hidden bg-porcelain">
        <MoonAccent tone="coast" className="-left-[22%] top-[12%] h-[38rem] w-[38rem] opacity-50" />
        <MoonAccent
          flip
          tone="coast"
          className="-right-[20%] top-[55%] h-[34rem] w-[34rem] opacity-40"
        />
        <div className="shell relative divide-y divide-navy/[0.07]">
          {menu.map((category, i) => (
            <Category key={category.id} category={category} index={i} />
          ))}
          <AllergenLegend />
        </div>
      </div>

      <ReserveCta />
    </>
  );
}
