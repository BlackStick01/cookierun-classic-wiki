import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { SiteAds } from "@/components/ads/SiteAds";
import { SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/utils";
import { SUPPORTED_LOCALES, getHomePath, isSupportedLocale } from "@/lib/content";
import { getSiteMessages } from "@/lib/site-messages";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const messages = getSiteMessages(safeLocale);
  const canonical = getHomePath(safeLocale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords: messages.metadata.keywords,
    alternates: {
      canonical: absoluteUrl(canonical),
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((targetLocale) => [targetLocale, absoluteUrl(getHomePath(targetLocale))]),
      ),
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonical),
      siteName: messages.site.name,
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: [{ url: absoluteUrl("/images/og-image.png"), width: 1200, height: 630, alt: "CookieRun Classic Wiki preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: [absoluteUrl("/images/og-image.png")],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const messages = getSiteMessages(safeLocale);
  const intlMessages = await getMessages();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: messages.site.name,
    url: absoluteUrl(getHomePath(locale)),
    logo: absoluteUrl("/google-favicon.png"),
    image: absoluteUrl("/images/og-image.png"),
    sameAs: [
      "https://studiokingdom.co.kr/en/cookie-run/",
      "https://www.devsisters.com/en/resource",
      "https://www.youtube.com/watch?v=0imlIAlOC_I",
    ],
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: messages.site.name,
    url: absoluteUrl(getHomePath(locale)),
    description: messages.metadata.description,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/og-image.png"),
      width: 1200,
      height: 630,
    },
    image: absoluteUrl("/images/og-image.png"),
  };

  return (
    <NextIntlClientProvider messages={intlMessages}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <div className="min-h-screen bg-[#fff9e8] text-[#4a2315]">
        <SiteHeader locale={safeLocale} />
        <SiteAds />
        {children}
        <SiteFooter locale={safeLocale} />
      </div>
    </NextIntlClientProvider>
  );
}
