import { isSupportedLocale } from "@/lib/content";
import { getSiteMessages } from "@/lib/site-messages";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const messages = getSiteMessages(isSupportedLocale(locale) ? locale : "en");

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-[#4a2315]">About {messages.site.name}</h1>
      <p className="mt-6 text-base leading-8 text-slate-700">{messages.footer.about}</p>
      <p className="mt-5 text-base leading-8 text-slate-700">{messages.site.legalNotice}</p>
    </main>
  );
}
