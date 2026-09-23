import { business, reviews } from '@/content/business';
import { useI18n } from '@/i18n';
import { ArrowUpRight, Crescent, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { MoonAccent } from '@/components/ui/Media';
import { PageHero, ReserveCta } from '@/components/sections/Shared';

export default function ReviewsPage() {
  const { t, pick, lang } = useI18n();

  return (
    <>
      <PageHero eyebrow={t.reviews.eyebrow} title={t.reviews.title} lede={t.reviews.lede}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={reviews.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-night"
          >
            {t.reviews.seeGoogle}
            <span className="sr-only"> ({t.common.newTab})</span>
            <ArrowUpRight />
          </a>
          <a
            href={reviews.writeReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 px-7 py-3.5 font-medium text-navy transition-colors duration-300 hover:border-navy/50"
          >
            {t.reviews.writeReview}
            <span className="sr-only"> ({t.common.newTab})</span>
            <ArrowUpRight />
          </a>
        </div>
      </PageHero>

      {/*
        Three real places where a guest can form an opinion. No rating
        and no quote is reproduced here — each card simply points at the
        live source.
      */}
      <section className="relative overflow-hidden bg-porcelain pb-24 lg:pb-32">
        <MoonAccent tone="coast" className="-left-[20%] top-[4%] h-[34rem] w-[34rem] opacity-55" />

        <div className="shell relative">
          <Reveal>
            <SectionHeading eyebrow={t.reviews.whereEyebrow} title={t.reviews.whereTitle} />
          </Reveal>

          <ol className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-navy/12 bg-navy/12 md:grid-cols-3">
            {[
              {
                id: 'google',
                title: t.reviews.channelGoogle,
                body: t.reviews.channelGoogleBody,
                label: t.reviews.seeGoogle,
                href: reviews.googleUrl,
              },
              {
                id: 'instagram',
                title: t.reviews.channelInstagram,
                body: t.reviews.channelInstagramBody,
                label: business.instagramHandle,
                href: business.instagramUrl,
              },
              {
                id: 'table',
                title: t.reviews.channelTable,
                body: t.reviews.channelTableBody,
                label: t.common.reserveTable,
                href: business.reservationUrl,
              },
            ].map((channel, i) => (
              <Reveal
                as="li"
                key={channel.id}
                delay={i * 90}
                className="flex flex-col bg-porcelain p-8 lg:p-10"
              >
                <span className="label-xs text-rose-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-[1.75rem] text-navy">{channel.title}</h3>
                <p className="mt-4 flex-1 text-[1.0625rem] leading-relaxed text-ink/65">
                  {channel.body}
                </p>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-7 inline-flex w-fit items-center gap-2 font-medium text-rose-deep underline-offset-[7px] hover:underline"
                >
                  {channel.label}
                  <span className="sr-only"> ({t.common.newTab})</span>
                  <ArrowUpRight />
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/*
        Placeholder quotes are off by default (see `reviews` in
        content/business.ts). They are example wording, never presented
        as a real, attributed customer testimonial.
      */}
      {reviews.showPlaceholderQuotes ? (
        <section className="relative overflow-hidden bg-coast/55 py-24 lg:py-32">
          <MoonAccent tone="mist" className="-left-[16%] top-[10%] h-[34rem] w-[34rem]" />
          <div className="shell relative">
            <Reveal>
              <SectionHeading eyebrow={t.reviews.quotesEyebrow} title={t.reviews.quotesTitle} />
            </Reveal>

            <ul className="mt-14 grid gap-6 lg:grid-cols-3">
              {reviews.placeholderQuotes.map((quote, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={i * 100}
                  className="rounded-[1.5rem] bg-porcelain p-8 lg:p-10"
                >
                  <Crescent className="h-6 w-6 text-rose" />
                  <blockquote className="mt-6 font-display text-[1.375rem] leading-snug text-navy">
                    {lang === 'en' ? '“' : '« '}
                    {pick(quote)}
                    {lang === 'en' ? '”' : ' »'}
                  </blockquote>
                </Reveal>
              ))}
            </ul>

            <Reveal>
              <p className="mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-ink/50">
                {t.reviews.quotesDisclaimer}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      <ReserveCta title={t.reviews.ctaTitle} lede={t.reviews.ctaLede} />
    </>
  );
}
