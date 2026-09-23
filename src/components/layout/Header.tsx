import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { business } from '@/content/business';
import { useI18n } from '@/i18n';
import { LANGS, LANG_LABEL, LANG_NAME, NAV_PAGES, type PageKey } from '@/i18n/routes';
import { cn } from '@/lib/utils';
import { useLockBodyScroll, useScrolled } from '@/lib/hooks';
import { ArrowUpRight, Crescent, Wordmark } from '@/components/ui/Primitives';

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={className}>
      <path
        d="M6.3 3.2 4.1 4.4a1.8 1.8 0 0 0-.85 2.05 14.3 14.3 0 0 0 10.3 10.3 1.8 1.8 0 0 0 2.05-.85l1.2-2.2a1 1 0 0 0-.43-1.35l-2.5-1.3a1 1 0 0 0-1.2.22l-.83.92a11.1 11.1 0 0 1-3.95-3.95l.92-.83a1 1 0 0 0 .22-1.2l-1.3-2.5a1 1 0 0 0-1.35-.43Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LanguageSwitcher({ tone }: { tone: 'ink' | 'light' }) {
  const { lang, page, toIn, t } = useI18n();
  return (
    <div
      className={cn(
        'label-xs flex items-center gap-0.5 rounded-full border p-0.5',
        tone === 'light' ? 'border-porcelain/25' : 'border-navy/15',
      )}
      role="group"
      aria-label={t.nav.chooseLanguage}
    >
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <Link
            key={l}
            to={toIn(page, l)}
            hrefLang={l}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'rounded-full px-2.5 py-1.5 transition-colors duration-300',
              active
                ? tone === 'light'
                  ? 'bg-porcelain/95 text-navy'
                  : 'bg-navy text-porcelain'
                : tone === 'light'
                  ? 'text-porcelain/65 hover:text-porcelain'
                  : 'text-navy/70 hover:text-navy',
            )}
          >
            <span aria-hidden="true">{LANG_LABEL[l]}</span>
            <span className="sr-only">{LANG_NAME[l]}</span>
          </Link>
        );
      })}
    </div>
  );
}

export function Header({ tone }: { tone: 'onLight' | 'onDark' }) {
  const { t, to } = useI18n();
  const location = useLocation();
  const scrolled = useScrolled(28);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(open);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.querySelector<HTMLElement>('a, button')?.focus();
  }, [open]);

  /** Solid once scrolled; transparent over the top of the page. */
  const solid = scrolled || open;
  const light = solid ? false : tone === 'onDark';

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'relative py-2 text-[0.9375rem] tracking-[0.005em] transition-colors duration-300',
      'after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-rose after:transition-[width] after:duration-500 after:ease-[cubic-bezier(.22,.8,.3,1)]',
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full',
      light
        ? isActive
          ? 'text-porcelain'
          : 'text-porcelain/75 hover:text-porcelain'
        : isActive
          ? 'text-navy'
          : 'text-navy/70 hover:text-navy',
    );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(.22,.8,.3,1)]',
        solid
          ? 'bg-porcelain/92 shadow-[0_1px_0_0_rgba(16,42,59,0.08)] backdrop-blur-xl'
          : 'bg-transparent',
        light && 'on-dark',
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-navy px-5 py-3 text-porcelain focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-10"
      >
        {t.nav.skip}
      </a>

      <div className="shell flex h-[var(--header-h)] items-center justify-between gap-6">
        {/* Wordmark ------------------------------------------------ */}
        <Link
          to={to('home')}
          className={cn(
            'flex items-center transition-colors duration-500',
            light ? 'text-porcelain' : 'text-navy',
          )}
          aria-label={`Mareluna — ${t.nav.home}`}
        >
          <Wordmark className="w-[7.5rem] sm:w-[8.75rem]" />
        </Link>

        {/* Desktop navigation -------------------------------------- */}
        <nav
          aria-label={t.nav.primary}
          className="hidden items-center gap-7 lg:flex xl:gap-9"
        >
          {NAV_PAGES.map((p) => (
            <NavLink key={p} to={to(p)} end className={navLinkClass}>
              {t.nav[p as keyof typeof t.nav] as string}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions ----------------------------------------- */}
        <div className="hidden items-center gap-3 lg:flex xl:gap-4">
          <LanguageSwitcher tone={light ? 'light' : 'ink'} />

          <a
            href={business.phoneHref}
            className={cn(
              'group flex items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] transition-colors duration-300',
              light
                ? 'text-porcelain/80 hover:text-porcelain'
                : 'text-navy/70 hover:text-navy',
            )}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="sr-only xl:not-sr-only">{business.phoneDisplay}</span>
          </a>

          <a
            href={business.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full bg-rose-deep px-6 py-2.5 text-[0.9375rem] font-medium text-porcelain transition-colors duration-300 hover:bg-[#8f453d]"
          >
            {t.common.reserve}
            <span className="sr-only"> ({t.common.newTab})</span>
            <ArrowUpRight />
          </a>
        </div>

        {/* Mobile toggle ------------------------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden',
            light
              ? 'border-porcelain/25 text-porcelain'
              : 'border-navy/15 text-navy',
          )}
        >
          <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6.5h14M3 13.5h14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.35"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile panel --------------------------------------------- */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="relative overflow-hidden border-t border-navy/10 bg-porcelain lg:hidden"
      >
        <Crescent
          className="drift-slow pointer-events-none absolute -right-20 -top-16 h-64 w-64 text-coast/60"
        />
        <div className="shell relative flex max-h-[calc(100dvh-var(--header-h))] flex-col gap-8 overflow-y-auto py-8">
          <nav aria-label={t.nav.primary} className="flex flex-col">
            {([...NAV_PAGES, 'order'] as PageKey[]).map((p, i) => (
              <NavLink
                key={p}
                to={to(p)}
                end
                className={({ isActive }) =>
                  cn(
                    'border-b border-navy/10 py-4 font-display text-3xl transition-colors duration-300',
                    isActive ? 'text-rose-deep' : 'text-navy',
                  )
                }
                style={{ ['--i' as string]: i }}
              >
                {t.nav[p as keyof typeof t.nav] as string}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <a
              href={business.reservationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-6 py-4 font-medium text-porcelain"
            >
              {t.common.reserveTable}
              <span className="sr-only"> ({t.common.newTab})</span>
              <ArrowUpRight />
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-navy/20 px-6 py-4 font-medium text-navy"
            >
              <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
              {business.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center justify-between gap-4 pb-2">
            <span className="label-xs text-navy/70">{t.nav.language}</span>
            <LanguageSwitcher tone="ink" />
          </div>
        </div>
      </div>
    </header>
  );
}
