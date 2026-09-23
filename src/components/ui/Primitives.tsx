import { useId, type ComponentProps, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import wordmarkSrc from '@/assets/brand/wordmark.png';
import { cn } from '@/lib/utils';
import { useRevealOnce } from '@/lib/hooks';

/* ------------------------------------------------------------------ *
 * Reveal — a slow fade-and-rise as a block enters the viewport.
 * Content is fully present without JS and without motion.
 * ------------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure' | 'p';
  className?: string;
}) {
  const ref = useRevealOnce<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ *
 * Wordmark — the official Mareluna logotype, drawn as an alpha mask so
 * it can take any brand colour and stay crisp at any size.
 * ------------------------------------------------------------------ */
export function Wordmark({
  className,
  title = 'Mareluna',
}: {
  className?: string;
  title?: string;
}) {
  return (
    <span
      role="img"
      aria-label={title}
      className={cn('wordmark', className)}
      style={{ '--wordmark-src': `url(${wordmarkSrc})` } as React.CSSProperties}
    />
  );
}

/* ------------------------------------------------------------------ *
 * Crescent — the moon from the logotype, reused as a graphic motif.
 * ------------------------------------------------------------------ */
export function Crescent({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <mask id={`crescent-${id}`}>
          <rect width="100" height="100" fill="black" />
          <circle cx="50" cy="50" r="50" fill="white" />
          <circle cx="76" cy="40" r="46" fill="black" />
        </mask>
      </defs>
      <circle cx="50" cy="50" r="50" fill="currentColor" mask={`url(#crescent-${id})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Eyebrow — the small mono label above a heading.
 * ------------------------------------------------------------------ */
export function Eyebrow({
  children,
  className,
  tone = 'ink',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'ink' | 'rose' | 'sand' | 'mist';
}) {
  const tones = {
    ink: 'text-navy/70',
    rose: 'text-rose-deep',
    sand: 'text-sand',
    mist: 'text-mist',
  } as const;
  return (
    <p className={cn('label-xs flex items-center gap-3', tones[tone], className)}>
      <span
        aria-hidden="true"
        className="inline-block h-px w-6 shrink-0 bg-current opacity-60"
      />
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Buttons & links
 * ------------------------------------------------------------------ */
type Variant = 'primary' | 'outline' | 'ghost' | 'light';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-rose-deep text-porcelain hover:bg-[#8f453d] focus-visible:outline-offset-4 shadow-[0_10px_30px_-14px] shadow-rose/70',
  outline:
    'border border-current/25 text-current hover:border-current/60 hover:bg-current/[0.04]',
  light: 'bg-porcelain text-navy hover:bg-white',
  ghost: 'text-current underline-offset-[6px] hover:underline decoration-rose/60 px-0 py-0',
};

const BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-full font-sans text-[0.9375rem] font-medium tracking-[0.01em] transition-[background-color,border-color,color,transform] duration-300 ease-[cubic-bezier(.22,.8,.3,1)] active:translate-y-px';

const SIZES = { md: 'px-6 py-3', lg: 'px-7 py-3.5', sm: 'px-5 py-2.5 text-sm' } as const;

function classesFor(variant: Variant, size: keyof typeof SIZES, className?: string) {
  return cn(BASE, variant !== 'ghost' && SIZES[size], VARIANTS[variant], className);
}

export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: {
  to: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, 'to' | 'className'>) {
  return (
    <Link to={to} className={classesFor(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function ExternalButton({
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  newTabLabel,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  children: ReactNode;
  /** Screen-reader hint, e.g. “opens in a new tab”. */
  newTabLabel?: string;
} & Omit<ComponentProps<'a'>, 'href' | 'className'>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={classesFor(variant, size, className)}
      {...rest}
    >
      {children}
      {newTabLabel ? <span className="sr-only"> ({newTabLabel})</span> : null}
      <ArrowUpRight />
    </a>
  );
}

export function PlainButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: keyof typeof SIZES;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<'button'>, 'className'>) {
  return (
    <button type="button" className={classesFor(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'h-[0.9em] w-[0.9em] shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,.8,.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
        className,
      )}
    >
      <path
        d="M5 11.5 11.5 5M11.5 5H6.2M11.5 5v5.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Marks an informational note — a gluten-free notice, an adaptation offer. */
export function InfoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false" className={className}>
      <circle cx="10" cy="10" r="8.15" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 9.1v4.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="6.2" r="0.95" fill="currentColor" />
    </svg>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      aria-hidden="true"
      focusable="false"
      className={cn(
        'h-[0.85em] w-[1.05em] shrink-0 transition-transform duration-300 ease-[cubic-bezier(.22,.8,.3,1)] group-hover:translate-x-1',
        className,
      )}
    >
      <path
        d="M1 8h17M12 2l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Section heading — display type with an eyebrow above it.
 * ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = 'ink',
  align = 'left',
  level = 2,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  tone?: 'ink' | 'light';
  align?: 'left' | 'center';
  level?: 1 | 2;
  className?: string;
}) {
  const Tag = level === 1 ? 'h1' : 'h2';
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone === 'light' ? 'sand' : 'ink'}
          className={cn('mb-6', align === 'center' && 'justify-center')}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          'font-display text-d2',
          tone === 'light' ? 'text-porcelain' : 'text-navy',
        )}
      >
        {title}
      </Tag>
      {lede ? (
        <p
          className={cn(
            'mt-6 text-lede',
            tone === 'light' ? 'text-seafoam/85' : 'text-ink/70',
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
