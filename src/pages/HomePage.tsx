import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { business } from '@/content/business';
import { photo } from '@/content/images';
import { findItem, itemName, signatureDishIds, signaturePhoto } from '@/content/menu';
import { atmosphere, storyShort } from '@/content/story';
import { useI18n } from '@/i18n';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowUpRight,
  Crescent,
  Eyebrow,
  Reveal,
  SectionHeading,
} from '@/components/ui/Primitives';
import { MoonAccent, Picture } from '@/components/ui/Media';
import { PromoBand, ReserveCta } from '@/components/sections/Shared';

/* ================================================================== *
 * HERO
 * ================================================================== */
function Hero() {
  const { t, to } = useI18n();
  const hero = photo('pizza-margherita');

  return (
    <section className="relative overflow-hidden bg-porcelain">
      {/* Quiet tide shapes — never over the text. */}
      <MoonAccent
        tone="coast"
        className="-right-[22%] -top-[18%] h-[46rem] w-[46rem] opacity-70"
      />
      <MoonAccent
        flip
        tone="sand"
        className="-bottom-[38%] -left-[18%] h-[30rem] w-[30rem] opacity-60"
      />

      <div className="shell relative pb-20 pt-[calc(var(--header-h)+3.5rem)] lg:pb-28 lg:pt-[calc(var(--header-h)+5.5rem)]">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 xl:gap-24">
          {/* Type ------------------------------------------------- */}
          <Reveal>
            <p className="label-xs flex items-center gap-3 text-navy/70">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-60" />
              {t.home.heroEyebrow}
            </p>

            <h1 className="mt-8 font-display text-d1 text-navy">
              {t.home.heroTitleLead}
              <span className="block italic text-rose">{t.home.heroTitleEm}</span>
            </h1>

            <p className="mt-8 max-w-lg text-lede text-ink/70">{t.home.heroLede}</p>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={business.reservationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-7 py-3.5 font-medium text-porcelain shadow-[0_18px_40px_-22px] shadow-rose transition-colors duration-300 hover:bg-[#8f453d]"
              >
                {t.common.reserveTable}
                <span className="sr-only"> ({t.common.newTab})</span>
                <ArrowUpRight />
              </a>
              <Link
                to={to('menu')}
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-navy/20 px-7 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-navy/50"
              >
                {t.common.discoverMenu}
                <ArrowRight />
              </Link>
            </div>
          </Reveal>

          {/* Image ------------------------------------------------ */}
          <Reveal delay={140} className="relative">
            <div className="relative mx-auto w-full max-w-[30rem] lg:max-w-none">
              {/* the moon behind the plate */}
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-10 h-40 w-40 rounded-full bg-sand/60 blur-[2px] sm:h-52 sm:w-52 lg:-right-10 lg:-top-14"
              />
              <figure className="relative">
                <Picture
                  photo={hero}
                  priority
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 42vw, 92vw"
                  className="mask-arch-lg shadow-plate"
                />
                {/* maritime depth, kept very light so the hero stays bright */}
                <div
                  aria-hidden="true"
                  className="mask-arch-lg pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/45 via-navy/5 to-transparent"
                />
                <figcaption className="label-xs absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-porcelain/85">
                  {t.home.heroImageCaption}
                </figcaption>
              </figure>
            </div>
          </Reveal>
        </div>

        {/* Editorial meta strip --------------------------------- */}
        <Reveal delay={220}>
          <ul className="label-xs mt-16 flex flex-col divide-y divide-navy/10 border-t border-navy/10 text-navy/70 sm:flex-row sm:divide-x sm:divide-y-0">
            <li className="py-4 sm:pr-8">{business.address.street} · {business.address.city}</li>
            <li className="py-4 sm:px-8">Pizza napoletana · Cucina italiana</li>
            <li className="py-4 sm:pl-8">
              <a
                href={business.phoneHref}
                className="inline-block py-1.5 transition-colors hover:text-rose-deep"
              >
                {business.phoneDisplay}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== *
 * STORY
 * ================================================================== */
function StorySection() {
  const { t, to, pick } = useI18n();

  return (
    <section className="relative overflow-hidden bg-porcelain py-24 lg:py-36">
      <MoonAccent
        tone="navy"
        className="-left-[16%] top-[8%] h-[38rem] w-[38rem]"
      />

      <div className="shell relative">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">
          {/* Offset image pair ------------------------------------ */}
          <Reveal className="relative">
            <div className="relative ml-auto w-[82%] sm:w-[70%] lg:w-[78%]">
              <Picture
                photo={photo('enseigne')}
                ratio="3 / 4"
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="mask-arch shadow-lift"
              />
            </div>
            <div className="absolute -bottom-12 left-0 w-[48%] sm:w-[42%] lg:-bottom-16 lg:w-[46%]">
              <Picture
                photo={photo('bruschette')}
                ratio="1 / 1"
                sizes="(min-width: 1024px) 18vw, 42vw"
                className="rounded-[1.25rem] shadow-lift ring-8 ring-porcelain"
              />
            </div>
          </Reveal>

          {/* Text -------------------------------------------------- */}
          <Reveal delay={120} className="mt-20 lg:mt-0">
            <SectionHeading
              eyebrow={t.home.storyEyebrow}
              title={t.home.storyTitle}
              className="max-w-xl"
            />
            <p className="mt-8 max-w-xl text-lede text-ink/70">{pick(storyShort)}</p>
            <Link
              to={to('story')}
              className="group mt-10 inline-flex items-center gap-2.5 font-medium text-rose-deep underline-offset-[7px] hover:underline"
            >
              {t.common.readStory}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * SIGNATURE — four real dishes from the 2026 card.
 * ================================================================== */
function SignatureSection() {
  const { t, pick, to, lang } = useI18n();
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const dishes = signatureDishIds
    .map((id) => {
      const entry = findItem(id);
      return entry ? { id, ...entry, pic: photo(signaturePhoto[id]) } : null;
    })
    .filter((d): d is NonNullable<typeof d> => d !== null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = dishes.length - 1;
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  const current = dishes[active];

  return (
    <section className="relative overflow-hidden bg-coast/55 py-24 lg:py-32">
      <MoonAccent tone="mist" className="-right-[14%] -top-[26%] h-[40rem] w-[40rem]" />

      <div className="shell relative">
        <Reveal>
          <SectionHeading
            eyebrow={t.home.signatureEyebrow}
            title={t.home.signatureTitle}
            lede={t.home.signatureLede}
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* The list of dishes ----------------------------------- */}
          <Reveal>
            <div
              role="tablist"
              aria-label={t.home.signatureTitle}
              aria-orientation="vertical"
              onKeyDown={onKeyDown}
              className="border-t border-navy/12"
            >
              {dishes.map((d, i) => {
                const selected = i === active;
                return (
                  <button
                    key={d.id}
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    role="tab"
                    id={`sig-tab-${d.id}`}
                    aria-selected={selected}
                    aria-controls={`sig-panel-${d.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      'group flex w-full items-baseline gap-5 border-b border-navy/12 py-6 text-left transition-colors duration-500',
                      selected ? 'text-navy' : 'text-navy/70 hover:text-navy/85',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'label-xs w-6 shrink-0 pt-1.5 transition-colors duration-500',
                        selected ? 'text-rose-deep' : 'text-navy/65',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-d3 leading-tight">
                        {itemName(d.item, lang)}
                      </span>
                      <span className="label-xs mt-2 block text-navy/65">
                        {pick(d.category.title)}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'font-mono text-[0.9375rem] tabular-nums transition-colors duration-500',
                        selected ? 'text-rose-deep' : 'text-navy/70',
                      )}
                    >
                      {d.item.price}
                    </span>
                  </button>
                );
              })}
            </div>

            <Link
              to={to('menu')}
              className="group mt-10 inline-flex items-center gap-2.5 font-medium text-rose-deep underline-offset-[7px] hover:underline"
            >
              {t.common.seeFullMenu}
              <ArrowRight />
            </Link>
          </Reveal>

          {/*
            The plate. On a phone it sits above the list, so tapping a
            dish never changes something the visitor cannot see.
          */}
          <Reveal delay={120} className="order-first lg:order-last">
            <div className="relative">
              <div className="relative mask-arch-lg overflow-hidden shadow-plate">
                {dishes.map((d, i) => (
                  <div
                    key={d.id}
                    className={cn(
                      'transition-opacity duration-700 ease-[cubic-bezier(.22,.8,.3,1)]',
                      i === active ? 'opacity-100' : 'pointer-events-none absolute inset-0 opacity-0',
                    )}
                    aria-hidden={i !== active}
                  >
                    <Picture
                      photo={d.pic}
                      ratio="4 / 5"
                      sizes="(min-width: 1024px) 46vw, 92vw"
                    />
                  </div>
                ))}
              </div>

              {current ? (
                <div
                  role="tabpanel"
                  id={`sig-panel-${current.id}`}
                  aria-labelledby={`sig-tab-${current.id}`}
                  tabIndex={0}
                  className="mt-7 max-w-md"
                >
                  <p className="text-[1.0625rem] leading-relaxed text-ink/70">
                    {current.item.desc ? pick(current.item.desc) : null}
                  </p>
                  {current.item.allergens?.length ? (
                    <p className="label-xs mt-4 text-navy/65">
                      {t.common.allergens} · {current.item.allergens.join(' · ')}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== *
 * ATMOSPHERE — the room and the terrace.
 * ================================================================== */
function AtmosphereSection() {
  const { t, pick } = useI18n();

  return (
    <section className="on-dark relative overflow-hidden bg-night py-24 lg:py-32">
      <Crescent
        className="drift-slow pointer-events-none absolute -right-[18%] top-[6%] h-[36rem] w-[36rem] max-w-none text-white/[0.04]"
      />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-20">
          <Reveal>
            <Eyebrow tone="sand">{t.home.atmosphereEyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-d2 text-porcelain">{pick(atmosphere.title)}</h2>
            <p className="mt-7 max-w-md text-lede text-seafoam/75">{pick(atmosphere.body)}</p>
          </Reveal>

          <Reveal delay={120} className="grid grid-cols-2 gap-4 sm:gap-6">
            <Picture
              photo={photo('terrasse')}
              ratio="3 / 4"
              sizes="(min-width: 1024px) 26vw, 45vw"
              className="mask-arch translate-y-6 sm:translate-y-10"
            />
            <div className="flex flex-col gap-4 sm:gap-6">
              <Picture
                photo={photo('salle-terrasse')}
                ratio="4 / 5"
                sizes="(min-width: 1024px) 26vw, 45vw"
                className="rounded-[1.25rem]"
              />
              <Picture
                photo={photo('entree')}
                ratio="1 / 1"
                sizes="(min-width: 1024px) 26vw, 45vw"
                className="rounded-[1.25rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PromoBand surface="home" />
      <StorySection />
      <SignatureSection />
      <AtmosphereSection />
      <ReserveCta />
    </>
  );
}
