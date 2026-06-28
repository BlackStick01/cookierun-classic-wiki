import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { InlineRectangleAd } from "@/components/ads/InlineRectangleAd";
import { ResponsiveLeaderboardAd } from "@/components/ads/ResponsiveLeaderboardAd";
import { WikiSidebar } from "@/components/site";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getArticlePath,
  getCategoryMeta,
  getCategoryPath,
  getContentByCategory,
  getContentMeta,
  getContentModule,
  getHomePath,
  getPublicSlug,
  isKnownCategory,
  isSupportedLocale,
  type ContentMeta,
} from "@/lib/content";
import { getSiteMessages, type SiteMessages } from "@/lib/site-messages";
import { absoluteUrl, titleCaseSlug } from "@/lib/utils";

type Props = {
  params: Promise<{ locale: string; slug: string[] }>;
};

function localizedAlternates(pathForLocale: (locale: string) => string) {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, absoluteUrl(pathForLocale(locale))]),
  );
}

function findArticleInCategory(category: string, slug: string) {
  return getContentByCategory(category).find(
    (item) => item.slug === slug || getPublicSlug(item) === slug,
  );
}

function getCategoryDisplay(category: string, messages: SiteMessages) {
  const key = category as keyof SiteMessages["nav"];
  const overview = messages[key as keyof SiteMessages];
  const categoryMeta = getCategoryMeta(category);

  return {
    label: messages.nav[key] || categoryMeta?.label || titleCaseSlug(category),
    description:
      typeof overview === "object" && overview && "overviewDescription" in overview
        ? String(overview.overviewDescription)
        : categoryMeta?.description || "",
  };
}

function resolveSlug(slug: string[]) {
  const [first, second, extra] = slug;
  if (!first || extra) return null;

  if (!second) {
    if (isKnownCategory(first)) {
      return { type: "category" as const, category: first };
    }

    return null;
  }

  if (!isKnownCategory(first)) return null;
  const article = findArticleInCategory(first, second);
  return article ? { type: "article" as const, article } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const resolved = resolveSlug(slug);
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const messages = getSiteMessages(safeLocale);

  if (!resolved) return {};

  if (resolved.type === "category") {
    if (!getCategoryMeta(resolved.category)) return {};
    const categoryMeta = getCategoryDisplay(resolved.category, messages);
    const canonical = getCategoryPath(resolved.category, safeLocale);
    return {
      title: `${categoryMeta.label} - CookieRun Classic Wiki`,
      description: categoryMeta.description,
      alternates: {
        canonical: absoluteUrl(canonical),
        languages: localizedAlternates((targetLocale) => getCategoryPath(resolved.category, targetLocale)),
      },
    };
  }

  const meta = getContentMeta(resolved.article.category, resolved.article.slug, safeLocale) || resolved.article;
  const canonical = getArticlePath(meta, safeLocale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: absoluteUrl(canonical),
      languages: localizedAlternates((targetLocale) => getArticlePath(meta, targetLocale)),
    },
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(canonical),
      images: [{ url: absoluteUrl("/images/og-image.png"), width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [absoluteUrl("/images/og-image.png")],
    },
  };
}

function CategoryPage({ category, locale }: { category: string; locale: string }) {
  const messages = getSiteMessages(locale);
  const categoryMeta = getCategoryMeta(category);
  const categoryDisplay = getCategoryDisplay(category, messages);
  const articles = getContentByCategory(category, locale);
  if (!categoryMeta) notFound();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${categoryDisplay.label} articles`,
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(getArticlePath(article, locale)),
      name: article.title,
    })),
  };

  return (
    <main className="bg-[#fff9e8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <section>
          <div className="rounded-lg border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/70">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-teal-700">{messages.site.shortName}</p>
            <h1 className="mt-4 text-4xl font-black text-[#4a2315]">{categoryDisplay.label}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{categoryDisplay.description}</p>
          </div>
          <div className="mt-6 grid gap-4">
            {articles.map((article) => (
              <Link key={article.path} href={getArticlePath(article, locale)} className="group rounded-lg border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <h2 className="text-xl font-black text-[#4a2315] group-hover:text-orange-700">{article.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-orange-500" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <WikiSidebar locale={locale} />
      </div>
    </main>
  );
}

async function ArticlePage({ article, locale }: { article: ContentMeta; locale: string }) {
  const messages = getSiteMessages(locale);
  const meta = getContentMeta(article.category, article.slug, locale);
  const mod = await getContentModule(article.category, article.slug, locale);
  if (!meta || !mod) notFound();
  const Content = mod.default;
  const categoryLabel = getCategoryDisplay(article.category, messages).label;
  const canonicalPath = getArticlePath(meta, locale);
  const categoryPath = getCategoryPath(article.category, locale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    dateModified: meta.date,
    image: absoluteUrl("/images/og-image.png"),
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/og-image.png"),
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      name: messages.site.name,
    },
    publisher: {
      "@type": "Organization",
      name: messages.site.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/google-favicon.png"),
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(getHomePath(locale)) },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: absoluteUrl(categoryPath) },
      { "@type": "ListItem", position: 3, name: meta.title, item: absoluteUrl(canonicalPath) },
    ],
  };

  return (
    <main className="bg-[#fff9e8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <article className="min-w-0">
          <div className="rounded-lg border border-orange-100 bg-white p-6 shadow-xl shadow-orange-100/70">
            <nav className="text-sm font-bold text-slate-500">
              <Link href={getHomePath(locale)} className="hover:text-orange-700">Home</Link>
              <span className="px-2">/</span>
              <Link href={categoryPath} className="hover:text-orange-700">{categoryLabel}</Link>
            </nav>
            <h1 className="mt-5 text-4xl font-black leading-tight text-[#4a2315] sm:text-5xl">{meta.title}</h1>
            <p className="mt-5 text-base leading-8 text-slate-600">{meta.description}</p>
            <div className="mt-5 text-sm font-bold uppercase tracking-wide text-teal-700">Updated {meta.date}</div>
          </div>
          <ResponsiveLeaderboardAd />
          <div className="mt-6 rounded-lg border border-orange-100 bg-white p-6 text-slate-700 shadow-xl shadow-orange-100/70">
            <Content />
          </div>
          <InlineRectangleAd />
        </article>
        <WikiSidebar locale={locale} />
      </div>
    </main>
  );
}

export default async function SlugPage({ params }: Props) {
  const { locale, slug } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const resolved = resolveSlug(slug);
  if (!resolved) notFound();
  if (resolved.type === "category") return <CategoryPage category={resolved.category} locale={safeLocale} />;
  return <ArticlePage article={resolved.article} locale={safeLocale} />;
}
