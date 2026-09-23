import { photo } from '@/content/images';
import {
  storyClosing,
  storyParagraphs,
  storyPullQuote,
  storySignature,
  storyValues,
} from '@/content/story';
import { useI18n } from '@/i18n';
import { Crescent, Eyebrow, Reveal, SectionHeading } from '@/components/ui/Primitives';
import { MoonAccent, Picture } from '@/components/ui/Media';
import { ReserveCta } from '@/components/sections/Shared';

/** Quotation marks follow the typographic convention of each language. */
const QUOTES: Record<string, [string, string]> = {
  fr: ['« ', ' »'],
  it: ['« ', ' »'],
  en: ['“', '”'],
};

function StoryHero() {
  const { t, pick, lang } = useI18n();
  const [open, close] = QUOTES[lang];

  return (
    <section className="on-dark relative overflow-hidden bg-navy pb-24 pt-[calc(var(--header-h)+5rem)] lg:pb-32 lg:pt-[calc(var(--header-h)+8rem)]">
      <Crescent
        className="drift-slow pointer-events-none absolute -right-[16%] -top-[34%] h-[46rem] w-[46rem] max-w-none text-white/[0.05]"
      />
      <Crescent
        flip
        className="drift pointer-events-none absolute -bottom-52 -left-28 h-[28rem] w-[28rem] max-w-none text-mist/[0.06]"
      />

      <div className="shell relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="sand">{t.story.eyebrow}</Eyebrow>
          <h1 className="mt-7 font-display text-d1 text-porcelain">{t.story.title}</h1>
          <p className="mt-10 max-w-2xl font-display text-d3 italic text-sand">
            {open}
            {pick(storyPullQuote)}
            {close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/** A quiet visual pause between two paragraphs of the story. */
function Intermezzo({
  left,
  right,
  offset = false,
}: {
  left: string;
  right: string;
  offset?: boolean;
}) {
  return (
    <Reveal className="my-20 grid grid-cols-2 gap-5 sm:gap-8 lg:my-28">
      <Picture
        photo={photo(left)}
        ratio="4 / 5"
        sizes="(min-width: 1024px) 34vw, 46vw"
        className={offset ? 'mask-arch translate-y-8 sm:translate-y-14' : 'rounded-[1.25rem]'}
      />
      <Picture
        photo={photo(right)}
        ratio="4 / 5"
        sizes="(min-width: 1024px) 34vw, 46vw"
        className={offset ? 'rounded-[1.25rem]' : 'mask-arch translate-y-8 sm:translate-y-14'}
      />
    </Reveal>
  );
}

function StoryBody() {
  const { t, pick } = useI18n();

  return (
    <section className="relative overflow-hidden bg-porcelain py-24 lg:py-32">
      <MoonAccent tone="coast" className="-left-[20%] top-[30%] h-[36rem] w-[36rem] opacity-60" />

      <div className="shell relative">
        <div className="mx-auto max-w-[44rem]">
          <Reveal>
            <p className="text-[1.375rem] leading-[1.58] text-ink/85 sm:text-[1.5rem]">
              {pick(storyParagraphs[0])}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 text-lede text-ink/70">{pick(storyParagraphs[1])}</p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[52rem]">
          <Intermezzo left="terrasse" right="baba" />
        </div>

        <div className="mx-auto max-w-[44rem]">
          <Reveal>
            <p className="text-lede text-ink/70">{pick(storyParagraphs[2])}</p>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-8 text-lede text-ink/70">{pick(storyParagraphs[3])}</p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[52rem]">
          <Intermezzo left="fritto-misto" right="salle-2" offset />
        </div>

        <div className="mx-auto max-w-[44rem]">
          <Reveal>
            <p className="font-display text-d3 text-navy">{pick(storyParagraphs[4])}</p>
          </Reveal>
          <Reveal delay={100}>
            <figure className="mt-12 flex items-center gap-5 border-t border-navy/12 pt-8">
              <Crescent className="h-7 w-7 shrink-0 text-rose" />
              <figcaption>
                <span className="block font-display text-2xl text-navy">
                  {pick(storySignature)}
                </span>
                <span className="mt-1 block text-[0.9375rem] text-ink/70">
                  {pick(storyClosing)}
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-10 text-[0.8125rem] leading-relaxed text-ink/45">
              {t.story.portraitNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const { t, pick } = useI18n();

  return (
    <section className="relative overflow-hidden bg-coast/55 py-24 lg:py-32">
      <MoonAccent tone="mist" className="-bottom-[30%] -right-[12%] h-[34rem] w-[34rem]" />

      <div className="shell relative">
        <Reveal>
          <SectionHeading eyebrow={t.story.valuesEyebrow} title={t.story.valuesTitle} />
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[1.5rem] bg-navy/12 sm:grid-cols-2">
          {storyValues.map((value, i) => (
            <Reveal as="li" key={value.id} delay={i * 90} className="bg-porcelain p-9 lg:p-12">
              <span className="label-xs text-rose-deep">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-5 font-display text-d3 text-navy">{pick(value.title)}</h3>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/70">
                {pick(value.body)}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function StoryPage() {
  return (
    <>
      <StoryHero />
      <StoryBody />
      <ValuesSection />
      <ReserveCta />
    </>
  );
}
