import messages from "@/locales/en.json";

export default function CopyrightPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-black text-[#4a2315]">Copyright</h1>
      <p className="mt-6 text-base leading-8 text-slate-700">{messages.site.legalNotice}</p>
      <p className="mt-5 text-base leading-8 text-slate-700">Official game names, logos, screenshots, trailers, and platform marks belong to their respective owners. This wiki uses official public assets only to identify and discuss the game.</p>
    </main>
  );
}
