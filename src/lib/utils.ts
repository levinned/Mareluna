/** Joins class names, dropping anything falsy. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/** True when the visitor asked the system for reduced motion. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Formats a price from the card for display.
 * Prices are stored exactly as printed ("22.50", "7 / 47"); this only
 * turns the separator into a typographic one.
 */
export function formatPrice(price: string): string {
  return price.replace(' / ', ' / ');
}

/**
 * Scrolls the window to an exact position.
 *
 * The browser's own smooth scrolling runs at a near-constant speed, so a
 * jump across a long page (the menu is ~18 000 px) takes several seconds
 * and feels broken. This keeps every jump between 0.36 s and 0.9 s,
 * whatever the distance, and lands on the exact pixel asked for.
 *
 * Returns a function that cancels the animation.
 */
export function scrollToY(top: number, onDone?: () => void): () => void {
  const start = window.scrollY;
  const delta = top - start;

  if (prefersReducedMotion() || Math.abs(delta) < 2) {
    window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    onDone?.();
    return () => {};
  }

  const duration = Math.min(900, Math.max(360, Math.abs(delta) * 0.32));
  const started = performance.now();
  const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

  let frame = 0;
  let cancelled = false;

  const finish = () => {
    if (cancelled) return;
    cancelled = true;
    cancelAnimationFrame(frame);
    window.clearTimeout(safety);
    window.scrollTo({ top, behavior: 'instant' as ScrollBehavior });
    onDone?.();
  };

  const step = (now: number) => {
    if (cancelled) return;
    const progress = Math.min(1, (now - started) / duration);
    if (progress >= 1) {
      finish();
      return;
    }
    // `instant` overrides the page's `scroll-behavior: smooth`, which would
    // otherwise animate every single step and fight this loop.
    window.scrollTo({
      top: Math.round(start + delta * easeOut(progress)),
      behavior: 'instant' as ScrollBehavior,
    });
    frame = requestAnimationFrame(step);
  };

  // If animation frames are throttled — a backgrounded or occluded tab —
  // land on the target anyway instead of stalling half-way.
  const safety = window.setTimeout(finish, duration + 400);

  frame = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    cancelAnimationFrame(frame);
    window.clearTimeout(safety);
  };
}

/** Builds a `mailto:` URL with a properly encoded subject and body. */
export function mailto(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
/** Deliberately permissive: international numbers, spaces, dots, dashes. */
export const PHONE_RE = /^[+()\d][\d\s./-]{5,}$/;
