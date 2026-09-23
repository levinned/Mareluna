import { business, ordering, orderingPhoto } from '@/content/business';
import { photo } from '@/content/images';
import { findItem, itemName } from '@/content/menu';
import { useI18n, fill } from '@/i18n';
import { mailto } from '@/lib/utils';
import { ArrowRight, ArrowUpRight, Crescent, Reveal } from '@/components/ui/Primitives';
import { MoonAccent, Picture } from '@/components/ui/Media';
import { PageHero, PromoBand, ReserveCta } from '@/components/sections/Shared';
import { Link } from 'react-router-dom';

export default function OrderPage() {
  const { t, pick, lang, to } = useI18n();

  const dishes = ordering.featured
    .map((id) => {
      const entry = findItem(id);
      if (!entry) return null;
      return { id, ...entry, pic: photo(orderingPhoto[id]) };
    })
    .filter((d): d is NonNullable<typeof d> => d !== null);

  const openOrderHref = mailto(
    business.email,
    t.order.mailSubject,
    t.order.mailIntroOpen + t.order.mailOutro,
  );

  return (
    <>
      <PageHero eyebrow={t.order.eyebrow} title={t.order.title} lede={t.order.lede} />

      <PromoBand surface="order" />

      {/* The dishes --------------------------------------------- */}
      <section className="relative overflow-hidden bg-porcelain py-20 lg:py-28">
        <MoonAccent tone="coast" className="-left-[20%] top-[10%] h-[36rem] w-[36rem] opacity-50" />

        <div className="shell relative">
          <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-navy/15 pb-6">
            <h2 className="font-display text-d3 text-navy">{t.order.selectionTitle}</h2>
            <p className="max-w-md text-[0.9375rem] text-ink/70">{t.order.selectionNote}</p>
          </Reveal>

          <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((d, i) => (
              <Reveal as="li" key={d.id} delay={(i % 3) * 90} className="group flex flex-col">
                <Picture
                  photo={d.pic}
                  ratio="4 / 5"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                  className="mask-arch"
                  imgClassName="group-hover:scale-[1.03]"
                />

                <div className="mt-6 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-[1.5rem] leading-tight text-navy">
                    {itemName(d.item, lang)}
                  </h3>
                  <p className="font-mono text-[0.9375rem] tabular-nums text-navy/75">
                    {d.item.price}
                  </p>
                </div>

                <p className="label-xs mt-2 text-navy/65">{pick(d.category.title)}</p>

                {d.item.desc ? (
                  <p className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink/65">
                    {pick(d.item.desc)}
                  </p>
                ) : null}

                <a
                  href={mailto(
                    business.email,
                    t.order.mailSubject,
                    fill(t.order.mailIntroSingle, {
                      dish: itemName(d.item, lang),
                      price: d.item.price,
                    }) + t.order.mailOutro,
                  )}
                  className="group/cta mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-navy/20 px-6 py-3 text-[0.9375rem] font-medium text-navy transition-colors duration-300 hover:border-rose hover:text-rose-deep"
                >
                  {t.order.orderThis}
                  <ArrowRight className="group-hover/cta:translate-x-1" />
                </a>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14">
            <Link
              to={to('menu')}
              className="group inline-flex items-center gap-2.5 font-medium text-rose-deep underline-offset-[7px] hover:underline"
            >
              {t.common.seeFullMenu}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The two real channels ---------------------------------- */}
      <section className="on-dark relative overflow-hidden bg-night py-20 lg:py-28">
        <Crescent
          className="drift-slow pointer-events-none absolute -right-[14%] -top-[24%] h-[36rem] w-[36rem] max-w-none text-white/[0.045]"
        />

        <div className="shell relative">
          <div className="grid divide-y divide-porcelain/12 overflow-hidden rounded-[1.75rem] border border-porcelain/12 md:grid-cols-2 md:divide-x md:divide-y-0">
          <Reveal className="p-9 lg:p-12">
            <h2 className="font-display text-d3 text-porcelain">{t.order.composeTitle}</h2>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-seafoam/70">
              {t.order.composeLede}
            </p>
            <a
              href={openOrderHref}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-rose-deep px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-[#8f453d]"
            >
              {t.order.composeCta}
              <ArrowUpRight />
            </a>
            <p className="mt-5 font-mono text-[0.8125rem] text-seafoam/65">{business.email}</p>
          </Reveal>

          <Reveal delay={100} className="p-9 lg:p-12">
            <h2 className="font-display text-d3 text-porcelain">{t.order.callTitle}</h2>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-seafoam/70">
              {t.order.callLede}
            </p>
            <a
              href={business.phoneHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-porcelain/25 px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:border-porcelain/60"
            >
              {business.phoneDisplay}
            </a>
            <p className="mt-5 font-mono text-[0.8125rem] text-seafoam/65">
              {business.address.street} · {business.address.postalCode} {business.address.city}
            </p>
          </Reveal>
          </div>
        </div>
      </section>

      <ReserveCta />
    </>
  );
}
