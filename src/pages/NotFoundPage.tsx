import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { NAV_PAGES } from '@/i18n/routes';
import { ArrowRight, Crescent } from '@/components/ui/Primitives';

export default function NotFoundPage() {
  const { t, to } = useI18n();

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-porcelain pb-24 pt-[calc(var(--header-h)+5rem)]">
      <Crescent className="drift-slow pointer-events-none absolute -right-[16%] -top-[22%] h-[40rem] w-[40rem] max-w-none text-coast/60" />

      <div className="shell relative">
        <p className="label-xs text-rose-deep">404</p>
        <h1 className="mt-6 max-w-2xl font-display text-d1 text-navy">{t.notFound.title}</h1>
        <p className="mt-7 max-w-lg text-lede text-ink/70">{t.notFound.lede}</p>

        <Link
          to={to('home')}
          className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-rose-deep px-7 py-3.5 font-medium text-porcelain transition-colors duration-300 hover:bg-[#8f453d]"
        >
          {t.notFound.cta}
          <ArrowRight />
        </Link>

        <ul className="label-xs mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-navy/12 pt-8 text-navy/70">
          {NAV_PAGES.filter((p) => p !== 'home').map((p) => (
            <li key={p}>
              <Link to={to(p)} className="transition-colors hover:text-rose-deep">
                {t.nav[p as keyof typeof t.nav] as string}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
