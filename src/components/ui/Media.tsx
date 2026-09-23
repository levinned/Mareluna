import { fallbackSrc, webpSrcSet, type Photo } from '@/content/images';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';
import { Crescent } from './Primitives';

/* ------------------------------------------------------------------ *
 * Picture — a photograph with its intrinsic size declared, so nothing
 * shifts while it loads. Everything below the fold is lazy.
 * ------------------------------------------------------------------ */
export function Picture({
  photo,
  className,
  imgClassName,
  ratio,
  priority = false,
  sizes = '(min-width: 1024px) 45vw, 92vw',
}: {
  photo: Photo;
  className?: string;
  imgClassName?: string;
  /** CSS aspect-ratio, e.g. "4 / 5". Defaults to the file's own ratio. */
  ratio?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const { pick } = useI18n();
  return (
    <div
      className={cn('relative overflow-hidden bg-coast', className)}
      style={{ aspectRatio: ratio ?? `${photo.w} / ${photo.h}` }}
    >
      <picture>
        <source type="image/webp" srcSet={webpSrcSet(photo)} sizes={sizes} />
        <img
          src={fallbackSrc(photo)}
          alt={pick(photo.alt)}
          width={photo.w}
          height={photo.h}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            'transition-transform duration-[1.2s] ease-[cubic-bezier(.22,.8,.3,1)]',
            imgClassName,
          )}
        />
      </picture>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * TideField — the large, quiet moon shapes that recur across the site.
 * Purely decorative: aria-hidden, never over text, never animated when
 * reduced motion is requested (handled in index.css).
 * ------------------------------------------------------------------ */
export function TideField({
  variant = 'porcelain',
  className,
}: {
  variant?: 'porcelain' | 'navy' | 'coast';
  className?: string;
}) {
  const tone = {
    porcelain: { a: 'text-coast/70', b: 'text-sand/40' },
    navy: { a: 'text-white/[0.055]', b: 'text-mist/[0.07]' },
    coast: { a: 'text-porcelain/70', b: 'text-mist/45' },
  }[variant];

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <Crescent
        className={cn(
          'drift-slow absolute -right-[18%] -top-[22%] h-[42rem] w-[42rem] max-w-none',
          tone.a,
        )}
      />
      <Crescent
        flip
        className={cn(
          'drift absolute -bottom-[30%] -left-[22%] h-[34rem] w-[34rem] max-w-none',
          tone.b,
        )}
      />
    </div>
  );
}

/** A single oversized crescent, for sections that need one quiet accent. */
export function MoonAccent({
  className,
  flip = false,
  tone = 'coast',
}: {
  className?: string;
  flip?: boolean;
  tone?: 'coast' | 'sand' | 'navy' | 'mist';
}) {
  const tones = {
    coast: 'text-coast',
    sand: 'text-sand/55',
    navy: 'text-navy/[0.06]',
    mist: 'text-mist/35',
  } as const;
  return (
    <Crescent
      flip={flip}
      className={cn('drift-slow pointer-events-none absolute max-w-none', tones[tone], className)}
    />
  );
}

/**
 * Horizon — the soft transition between a navy band and a porcelain one.
 * A single wide arc, never a hard edge.
 */
export function Horizon({
  from = 'navy',
  className,
}: {
  from?: 'navy' | 'porcelain';
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none h-24 w-full sm:h-32',
        from === 'navy'
          ? 'bg-gradient-to-b from-navy to-porcelain'
          : 'bg-gradient-to-b from-porcelain to-navy',
        className,
      )}
    />
  );
}
