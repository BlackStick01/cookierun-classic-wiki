import type { MetadataRoute } from "next";
import { CONTENT_TYPES } from "@/config/navigation";
import { SUPPORTED_LOCALES, getAllContentPaths, getCategoryPath, getHomePath } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticSlugs = ["about", "privacy-policy", "terms-of-service", "copyright"];
  const staticPaths = SUPPORTED_LOCALES.flatMap((locale) => [
    getHomePath(locale),
    ...staticSlugs.map((slug) => `${getHomePath(locale).replace(/\/$/, "")}/${slug}`),
    ...CONTENT_TYPES.map((category) => getCategoryPath(category, locale)),
  ]);
  const englishContentPaths = getAllContentPaths().map((item) => item.path);
  const articlePaths = SUPPORTED_LOCALES.flatMap((locale) =>
    englishContentPaths.map((path) => (locale === "en" ? path : `/${locale}${path}`)),
  );

  return [
    ...[...new Set([...staticPaths, ...articlePaths])].map((path) => ({
      url: absoluteUrl(path),
      lastModified: new Date("2026-06-23"),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      images: [absoluteUrl("/images/og-image.png")],
    })),
  ];
}
