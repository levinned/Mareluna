import { Route, Routes } from 'react-router-dom';
import { I18nProvider } from '@/i18n';
import { allRoutes, type Lang, type PageKey } from '@/i18n/routes';
import { Layout } from '@/components/layout/Layout';

import HomePage from '@/pages/HomePage';
import StoryPage from '@/pages/StoryPage';
import MenuPage from '@/pages/MenuPage';
import GalleryPage from '@/pages/GalleryPage';
import OrderPage from '@/pages/OrderPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ContactPage from '@/pages/ContactPage';
import LegalPage from '@/pages/LegalPage';
import NotFoundPage from '@/pages/NotFoundPage';

const PAGES: Record<PageKey, () => React.ReactElement> = {
  home: HomePage,
  story: StoryPage,
  menu: MenuPage,
  gallery: GalleryPage,
  order: OrderPage,
  reviews: ReviewsPage,
  contact: ContactPage,
  privacy: () => <LegalPage kind="privacy" />,
  legal: () => <LegalPage kind="legal" />,
};

/** Which colour sits under the header at the very top of each page. */
const TONES: Partial<Record<PageKey, 'onLight' | 'onDark'>> = {
  story: 'onDark',
};

function LocalizedPage({ page, lang }: { page: PageKey; lang: Lang }) {
  const Page = PAGES[page];
  return (
    <I18nProvider lang={lang} page={page}>
      <Layout page={page} tone={TONES[page] ?? 'onLight'}>
        <Page />
      </Layout>
    </I18nProvider>
  );
}

export default function App() {
  return (
    <Routes>
      {allRoutes().map(({ page, lang, path }) => (
        <Route key={`${lang}:${page}`} path={path} element={<LocalizedPage page={page} lang={lang} />} />
      ))}
      <Route
        path="*"
        element={
          <I18nProvider lang="fr" page="home">
            <Layout page="home">
              <NotFoundPage />
            </Layout>
          </I18nProvider>
        }
      />
    </Routes>
  );
}
