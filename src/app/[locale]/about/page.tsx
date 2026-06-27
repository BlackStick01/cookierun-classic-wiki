import messages from "@/locales/en.json";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-[#4a2315]">About {messages.site.name}</h1>
      <p className="mt-6 text-base leading-8 text-slate-700">{messages.footer.about}</p>
      <p className="mt-5 text-base leading-8 text-slate-700">{messages.site.legalNotice}</p>
    </main>
  );
}
