import de from "@/locales/de.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import fr from "@/locales/fr.json";
import pt from "@/locales/pt.json";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./content";

const messagesByLocale: Record<SupportedLocale, typeof en> = {
  en,
  es,
  de,
  fr,
  pt,
};

export type SiteMessages = typeof en;

export function getSiteMessages(locale = DEFAULT_LOCALE): SiteMessages {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  return messagesByLocale[safeLocale] || messagesByLocale[DEFAULT_LOCALE];
}
