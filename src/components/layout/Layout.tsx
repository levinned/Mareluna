import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import type { PageKey } from '@/i18n/routes';
import { Header } from './Header';
import { Footer } from './Footer';
import { Seo } from './Seo';

/**
 * `tone` describes what sits directly under the header at the top of the
 * page, so the transparent header can pick a readable colour before the
 * visitor scrolls.
 */
export function Layout({
  page,
  tone = 'onLight',
  children,
}: {
  page: PageKey;
  tone?: 'onLight' | 'onDark';
  children: ReactNode;
}) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let in-page anchors do their job
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return (
    <>
      <Seo page={page} />
      <Header tone={tone} />
      <main id="main" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
