import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import { getLocalizedContent, isSupportedLocale } from "@/lib/content";
import { getSiteMessages } from "@/lib/site-messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const messages = getSiteMessages(safeLocale);

  return {
    title: messages.home.meta.title,
    description: messages.home.meta.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const safeLocale = isSupportedLocale(locale) ? locale : "en";
  const messages = getSiteMessages(safeLocale);
  const content = getLocalizedContent(safeLocale);

  return <HomePageClient locale={safeLocale} messages={messages} content={content} />;
}
