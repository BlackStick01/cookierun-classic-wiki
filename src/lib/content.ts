import generatedContent from "./generated-content.json";
import localizedContent from "./localized-content.json";
import { mdxLoaders } from "./content-registry";
import { CONTENT_TYPES, NAVIGATION_CONFIG } from "@/config/navigation";

export type ContentMeta = {
  category: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  path: string;
};

export const GROUP_TITLES: Record<string, string> = {
  guide: "Guide",
  codes: "Codes",
  cookies: "Cookies",
  pets: "Pets",
  treasures: "Treasures",
  jellies: "Jellies",
  system: "System",
  media: "Media",
};

export const GROUP_ORDER = CONTENT_TYPES;

export const allContent = generatedContent as ContentMeta[];
const contentByLocale = localizedContent as Record<SupportedLocale, ContentMeta[]>;

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "es", "de", "fr", "pt"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

export function getLocalePrefix(locale = DEFAULT_LOCALE) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

export function getPublicSlug(item: Pick<ContentMeta, "slug">) {
  return item.slug.replace(/^cookierun-classic-/, "");
}

export function getArticlePath(item: Pick<ContentMeta, "category" | "slug">, locale = DEFAULT_LOCALE) {
  const publicSlug = getPublicSlug(item);
  return `${getLocalePrefix(locale)}/${item.category}/${publicSlug}`;
}

export function getCategoryPath(category: string, locale = DEFAULT_LOCALE) {
  return `${getLocalePrefix(locale)}/${category}`;
}

export function getHomePath(locale = DEFAULT_LOCALE) {
  const prefix = getLocalePrefix(locale);
  return prefix ? `${prefix}/` : "/";
}

export function localizePath(path: string, locale = DEFAULT_LOCALE) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return cleanPath;
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function getAllContentPaths() {
  return allContent.map((item) => ({
    locale: DEFAULT_LOCALE,
    category: item.category,
    slug: item.slug,
    path: getArticlePath(item),
  }));
}

export function getLocalizedContent(locale = DEFAULT_LOCALE) {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return contentByLocale[safeLocale] || contentByLocale[DEFAULT_LOCALE] || allContent;
}

export function getContentByCategory(category: string, locale = DEFAULT_LOCALE) {
  return getLocalizedContent(locale)
    .filter((item) => item.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLatestContent(limit = 8, locale = DEFAULT_LOCALE) {
  return [...getLocalizedContent(locale)]
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
    .slice(0, limit);
}

export function getContentMeta(category: string, slug: string, locale = DEFAULT_LOCALE) {
  return (
    getLocalizedContent(locale).find((item) => item.category === category && item.slug === slug) ||
    allContent.find((item) => item.category === category && item.slug === slug)
  );
}

export function getContentByPublicSlug(publicSlug: string) {
  return allContent.find((item) => getPublicSlug(item) === publicSlug);
}

export async function getContentModule(category: string, slug: string, locale = DEFAULT_LOCALE) {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const localizedKey = `${safeLocale}/${category}/${slug}` as keyof typeof mdxLoaders;
  const fallbackKey = `${DEFAULT_LOCALE}/${category}/${slug}` as keyof typeof mdxLoaders;
  const loader = mdxLoaders[localizedKey] || mdxLoaders[fallbackKey];
  if (!loader) return null;
  return loader();
}

export function getCategoryMeta(category: string) {
  return NAVIGATION_CONFIG[category];
}

export function isKnownCategory(category: string) {
  return category in NAVIGATION_CONFIG;
}
