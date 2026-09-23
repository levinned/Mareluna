import { addressOneLine, business } from '@/content/business';
import { useI18n } from '@/i18n';
import { Reveal } from '@/components/ui/Primitives';
import { PageHero } from '@/components/sections/Shared';

/**
 * Privacy policy and legal notice.
 *
 * No legal wording has been written on the operator's behalf. The pages
 * carry the verified company details and clearly marked gaps, so that
 * Mareluna (or its adviser) can drop in the final text.
 */
function ToComplete({ label }: { label: string }) {
  return (
    <span className="label-xs rounded-full border border-brass/40 bg-sand/60 px-3 py-1.5 text-ink/75">
      [{label}]
    </span>
  );
}

export default function LegalPage({ kind }: { kind: 'privacy' | 'legal' }) {
  const { t } = useI18n();
  const title = kind === 'privacy' ? t.legal.privacyTitle : t.legal.legalTitle;

  return (
    <>
      <PageHero eyebrow={t.nav[kind]} title={title} />

      <section className="bg-porcelain pb-28 lg:pb-36">
        <div className="shell">
          <Reveal className="mx-auto max-w-[44rem]">
            <p className="rounded-2xl border border-brass/30 bg-sand/35 px-6 py-5 text-[0.9375rem] leading-relaxed text-ink/75">
              {t.legal.placeholderNotice}
            </p>

            <div className="mt-12 space-y-12">
              <div>
                <h2 className="font-display text-d3 text-navy">{t.legal.editorTitle}</h2>
                <address className="mt-4 space-y-1 text-[1.0625rem] not-italic leading-relaxed text-ink/75">
                  <p>{business.legalName}</p>
                  <p>{addressOneLine}</p>
                  <p>
                    <a
                      href={business.phoneHref}
                      className="text-rose-deep underline decoration-rose/35 underline-offset-4"
                    >
                      {business.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <a
                      href={`mailto:${business.email}`}
                      className="text-rose-deep underline decoration-rose/35 underline-offset-4"
                    >
                      {business.email}
                    </a>
                  </p>
                  <p className="pt-3">
                    <ToComplete label={`${t.legal.toComplete} — IDE / CHE, ${t.legal.editorTitle}`} />
                  </p>
                </address>
              </div>

              <div>
                <h2 className="font-display text-d3 text-navy">{t.legal.hostTitle}</h2>
                <p className="mt-4">
                  <ToComplete label={t.legal.toComplete} />
                </p>
              </div>

              <div>
                <h2 className="font-display text-d3 text-navy">{t.legal.dataTitle}</h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/75">
                  {t.legal.dataBody}
                </p>
                <p className="mt-4">
                  <ToComplete label={t.legal.toComplete} />
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
