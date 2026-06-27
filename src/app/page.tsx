import HomePageClient from "./[locale]/HomePageClient";
import { SiteFooter, SiteHeader } from "@/components/site";
import { SiteAds } from "@/components/ads/SiteAds";
import messages from "@/locales/en.json";
import { absoluteUrl } from "@/lib/utils";

export default function RootPage() {
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: messages.site.name,
    url: absoluteUrl("/"),
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
    <div className="min-h-screen bg-[#fff9e8] text-[#4a2315]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <SiteHeader />
      <SiteAds />
      <HomePageClient />
      <SiteFooter />
    </div>
  );
}
