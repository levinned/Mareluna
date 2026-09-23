import { createContext, use, useMemo, type ReactNode } from 'react';
import { fr, type Strings } from './fr';
import { it } from './it';
import { en } from './en';
import { DEFAULT_LANG, pathFor, type Lang, type PageKey } from './routes';

const DICTIONARIES: Record<Lang, Strings> = { fr, it, en };

type L10nRecord = Record<Lang, string>;

type I18nValue = {
  lang: Lang;
  page: PageKey;
  /** UI strings for the active language. */
  t: Strings;
  /** Picks the active language out of a `{ fr, it, en }` content record. */
  pick: (value: L10nRecord) => string;
  /** Path of any page in the active language. */
  to: (page: PageKey) => string;
  /** Path of any page in a specific language — used by the switcher. */
  toIn: (page: PageKey, lang: Lang) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  lang,
  page,
  children,
}: {
  lang: Lang;
  page: PageKey;
  children: ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      lang,
      page,
      t: DICTIONARIES[lang],
      pick: (v) => v[lang],
      to: (p) => pathFor(p, lang),
      toIn: (p, l) => pathFor(p, l),
    }),
    [lang, page],
  );

  return <I18nContext value={value}>{children}</I18nContext>;
}

export function useI18n(): I18nValue {
  const ctx = use(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

/** Fills `{{token}}` placeholders in a translated string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{{${key}}}`,
  );
}

export { DEFAULT_LANG, pathFor };
export type { Lang, PageKey };
