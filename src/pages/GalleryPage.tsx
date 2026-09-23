import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { largeSrc, photosByTag, type ImageTag, type Photo } from '@/content/images';
import { useI18n, fill } from '@/i18n';
import { useLockBodyScroll } from '@/lib/hooks';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Primitives';
import { MoonAccent, Picture } from '@/components/ui/Media';
import { PageHero, ReserveCta } from '@/components/sections/Shared';

const FILTERS: (ImageTag | 'all')[] = ['all', 'cuisine', 'restaurant', 'terrasse', 'moments'];

/**
 * A deliberately uneven rhythm: wide, tall, square, wide again.
 * The pattern repeats, so it keeps working whatever the filter returns.
 */
const RHYTHM = [
  { span: 'lg:col-span-7', ratio: '4 / 3', shift: '' },
  { span: 'lg:col-span-5', ratio: '3 / 4', shift: 'lg:translate-y-12' },
  { span: 'lg:col-span-5', ratio: '3 / 4', shift: '' },
  { span: 'lg:col-span-7', ratio: '4 / 3', shift: 'lg:translate-y-10' },
  { span: 'lg:col-span-4', ratio: '3 / 4', shift: '' },
  { span: 'lg:col-span-4', ratio: '3 / 4', shift: 'lg:translate-y-14' },
  { span: 'lg:col-span-4', ratio: '3 / 4', shift: '' },
  { span: 'lg:col-span-6', ratio: '1 / 1', shift: 'lg:translate-y-8' },
  { span: 'lg:col-span-6', ratio: '4 / 5', shift: '' },
];

/* ------------------------------------------------------------------ *
 * Lightbox
 * ------------------------------------------------------------------ */
function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: Photo[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const { t, pick } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const current = items[index];

  useLockBodyScroll(true);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        onStep(1);
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onStep(-1);
        return;
      }
      // Keep focus inside the dialog.
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, [href]');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, onStep]);

  if (!current) return null;

  const caption = pick(current.alt);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      className="on-dark fixed inset-0 z-[70] flex flex-col bg-night/96 backdrop-blur-sm"
      style={{ animation: 'soft-in 280ms cubic-bezier(.22,.8,.3,1)' }}
    >
      {/* Backdrop click target */}
      <button
        type="button"
        onClick={onClose}
        aria-label={t.gallery.close}
        className="absolute inset-0 h-full w-full cursor-default"
        tabIndex={-1}
      />

      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <p className="label-xs text-seafoam/60">
          {fill(t.gallery.counter, { i: index + 1, n: items.length })}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors hover:border-porcelain/60"
        >
          <span className="sr-only">{t.gallery.close}</span>
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
            <path
              d="M5 5l10 10M15 5L5 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-8">
        <img
          key={current.id}
          src={largeSrc(current)}
          alt={caption}
          width={current.w}
          height={current.h}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>

      <div className="relative flex items-center justify-between gap-6 px-5 pb-7 sm:px-8">
        <p className="max-w-xl text-[0.875rem] leading-relaxed text-seafoam/70">{caption}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors hover:border-porcelain/60"
          >
            <span className="sr-only">{t.gallery.prev}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
              <path
                d="M12 4 6 10l6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors hover:border-porcelain/60"
          >
            <span className="sr-only">{t.gallery.next}</span>
            <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4">
              <path
                d="M8 4l6 6-6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
export default function GalleryPage() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<ImageTag | 'all'>('all');
  const [open, setOpen] = useState<number | null>(null);
  const triggersRef = useRef<(HTMLButtonElement | null)[]>([]);

  const items = useMemo(() => photosByTag(filter), [filter]);

  const close = useCallback(() => {
    setOpen((current) => {
      if (current !== null) triggersRef.current[current]?.focus();
      return null;
    });
  }, []);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  return (
    <>
      <PageHero eyebrow={t.gallery.eyebrow} title={t.gallery.title} lede={t.gallery.lede}>
        <div
          role="group"
          aria-label={t.gallery.filterLabel}
          className="mt-10 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(f);
                  setOpen(null);
                }}
                className={cn(
                  'rounded-full border px-5 py-2.5 text-[0.875rem] transition-colors duration-300',
                  active
                    ? 'border-rose bg-rose-deep text-porcelain'
                    : 'border-navy/18 text-navy/65 hover:border-navy/45 hover:text-navy',
                )}
              >
                {t.gallery.filters[f]}
              </button>
            );
          })}
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-porcelain pb-28 lg:pb-40">
        <MoonAccent tone="coast" className="-right-[18%] top-[6%] h-[38rem] w-[38rem] opacity-55" />

        <div className="shell relative">
          {items.length === 0 ? (
            <p className="py-20 text-center text-lede text-ink/70">{t.gallery.empty}</p>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:gap-8">
              {items.map((p, i) => {
                const r = RHYTHM[i % RHYTHM.length];
                return (
                  <Reveal
                    as="li"
                    key={`${filter}-${p.id}`}
                    delay={(i % 3) * 90}
                    className={cn('sm:col-span-1', r.span, r.shift)}
                  >
                    <button
                      ref={(el) => {
                        triggersRef.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setOpen(i)}
                      className="group block w-full overflow-hidden rounded-[1.25rem] text-left"
                    >
                      <span className="sr-only">{t.gallery.open}</span>
                      <Picture
                        photo={p}
                        ratio={r.ratio}
                        sizes="(min-width: 1024px) 45vw, (min-width: 640px) 46vw, 92vw"
                        imgClassName="group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                      />
                    </button>
                  </Reveal>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      {open !== null ? (
        <Lightbox items={items} index={open} onClose={close} onStep={step} />
      ) : null}

      <ReserveCta />
    </>
  );
}
