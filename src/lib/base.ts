/**
 * ------------------------------------------------------------------
 *  Where the site is mounted
 * ------------------------------------------------------------------
 *  At the root of a domain (Netlify, a custom domain) this is "/".
 *  On GitHub Pages the site lives in a subfolder, e.g. "/mareluna/",
 *  which is passed to the build as VITE_BASE.
 *
 *  Nothing in the codebase may hard-code a leading "/" path to an asset
 *  or a page any more — it would resolve against the domain root and
 *  break under a subfolder. Use `asset()` and `siteUrl()` instead.
 * ------------------------------------------------------------------
 */

/** Always starts and ends with a slash, e.g. "/" or "/mareluna/". */
export const BASE_URL: string = import.meta.env.BASE_URL || '/';

/** Without the trailing slash: "" at the root, "/mareluna" in a subfolder. */
const PREFIX = BASE_URL.replace(/\/$/, '');

/** Resolves a path from `public/` against the mount point. */
export function asset(path: string): string {
  return PREFIX + path;
}

/** Absolute URL of an in-app path — used for canonical and hreflang tags. */
export function siteUrl(path: string): string {
  return window.location.origin + PREFIX + path;
}

/** What React Router needs as its `basename`. */
export const ROUTER_BASENAME = PREFIX || '/';
