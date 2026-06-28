"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Candy,
  CirclePlay,
  Cookie,
  Gift,
  Sparkles,
  Star,
} from "lucide-react";
import { ResponsiveLeaderboardAd } from "@/components/ads/ResponsiveLeaderboardAd";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import type { ContentMeta } from "@/lib/content";
import type { SiteMessages } from "@/lib/site-messages";
import { cn } from "@/lib/utils";

type HomeModule = SiteMessages["home"]["explore"]["modules"][number];

const iconByIndex = [Gift, BookOpen, Cookie, Sparkles, Candy, BadgeCheck, CirclePlay, Star];

function articleHref(item: Pick<ContentMeta, "category" | "slug">, prefix: string) {
  const publicSlug = item.slug.replace(/^cookierun-classic-/, "");
  return `${prefix}/${item.category}/${publicSlug}`;
}

function ModuleHighlights({ module }: { module: HomeModule }) {
  if (module.displayType === "tier-grid") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-orange-200 bg-white/80 p-3 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-orange-400 font-black text-white">{item.label}</span>
              {"badge" in item && <span className="text-xs font-bold uppercase tracking-wide text-teal-700">{item.badge}</span>}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  if (module.displayType === "code-cards") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-orange-200 bg-orange-50 p-4">
            <div className="font-mono text-lg font-black text-orange-700">{item.label}</div>
            {"badge" in item && <div className="mt-1 text-xs font-bold uppercase tracking-wide text-teal-700">{item.badge}</div>}
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("mt-5 grid gap-3", module.displayType === "step-by-step" ? "sm:grid-cols-2" : "")}>
      {module.highlights.map((item) => (
        <div key={item.label} className="flex gap-3 rounded-md bg-white/70 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded bg-teal-500 text-sm font-black text-white">{item.label}</span>
          <p className="text-sm leading-6 text-slate-700">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePageClient({
  locale,
  messages,
  content,
}: {
  locale: string;
  messages: SiteMessages;
  content: ContentMeta[];
}) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const href = (path: string) => `${prefix}${path}`;
  const latest = [...content].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  const trending = content.filter((item) =>
    [
      "cookierun-classic-beginner-guide",
      "cookierun-classic-codes",
      "cookierun-classic-best-cookies",
      "cookierun-classic-pet-combinations",
    ].includes(item.slug),
  );

  return (
    <main>
      <section className="relative overflow-hidden border-b border-orange-100 bg-[#fff4cf]">
        <Image src="/images/hero.webp" alt="CookieRun Classic official CookieRun banner art" fill priority className="object-cover opacity-24" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fff9e8_0%,rgba(255,249,232,0.96)_38%,rgba(255,249,232,0.64)_72%,#fff4cf_100%)]" />
        <div className="relative mx-auto grid min-h-[660px] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">{messages.home.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-[#4a2315] sm:text-7xl">
              {messages.home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">{messages.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href("/guide/beginner-guide")} className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-black text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600">
                {messages.home.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={href("/cookies")} className="inline-flex items-center gap-2 rounded-md border border-teal-300 bg-white/80 px-5 py-3 text-sm font-black text-teal-800 transition hover:bg-teal-50">
                {messages.home.hero.secondaryCta}
              </Link>
              <Link href={href("/codes")} className="inline-flex items-center gap-2 rounded-md border border-orange-200 bg-white/80 px-5 py-3 text-sm font-black text-orange-700 transition hover:bg-orange-50">
                {messages.home.hero.tertiaryCta}
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-5">
              {messages.home.hero.stats.map((stat) => (
                <div key={stat} className="rounded-md border border-orange-200 bg-white/80 px-3 py-3 text-sm font-bold text-slate-700 shadow-sm">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          <div className="self-center rounded-lg border border-orange-200 bg-white/85 p-4 shadow-2xl shadow-orange-100">
            <Image src="/images/main-capsule.webp" alt="CookieRun Classic official CookieRun visual logo" width={900} height={520} className="rounded-md object-cover" priority />
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-700">
              <div className="rounded-md bg-orange-50 p-3"><span className="block font-black text-orange-700">Developer</span>Devsisters</div>
              <div className="rounded-md bg-teal-50 p-3"><span className="block font-black text-teal-700">Genre</span>Running Action</div>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveLeaderboardAd />

      <section className="border-b border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">{messages.home.hero.videoLabel}</p>
            <h2 className="mt-4 text-3xl font-black text-[#4a2315]">{messages.home.video.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{messages.home.video.description}</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-orange-200 bg-[#4a2315] shadow-2xl shadow-orange-100">
            <iframe
              className="aspect-video w-full"
              src="https://www.youtube.com/embed/0imlIAlOC_I"
              srcDoc={`<style>*{box-sizing:border-box}body{margin:0;background:#4a2315;font-family:Arial,sans-serif}a{position:relative;display:block;height:100vh;color:white;text-decoration:none;background:url('/images/trailer-still.webp') center/cover no-repeat}a:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(74,35,21,.72),rgba(74,35,21,.05))}span{position:absolute;left:32px;bottom:28px;display:inline-flex;align-items:center;gap:12px;border-radius:6px;background:#ff9f1c;color:white;padding:14px 18px;font-weight:900;font-size:14px}span:before{content:'\\25B6';font-size:18px}</style><a href="https://www.youtube.com/embed/0imlIAlOC_I?autoplay=1" aria-label="Play official CookieRun video"><span>${messages.home.video.button}</span></a>`}
              title="Official CookieRun DevNow video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="bg-[#fff9e8]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-orange-200 bg-white p-4 shadow-xl shadow-orange-100/70">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange-700">
                <BookOpen className="h-4 w-4" />
                Side Navigation
              </div>
              <div className="mt-4 grid gap-2">
                {Object.values(NAVIGATION_CONFIG).map((item) => (
                  <Link key={item.key} href={href(item.href)} className="rounded-md border border-orange-100 bg-orange-50/70 px-3 py-2 text-sm font-bold text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <section>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">{messages.home.recent.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-black text-[#4a2315]">{messages.home.recent.title}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-600">{messages.home.recent.description}</p>
                </div>
                <Link href={href("/guide")} className="inline-flex items-center gap-2 text-sm font-black text-orange-700 hover:text-orange-900">
                  Browse All Guides <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {latest.map((item) => (
                  <Link key={item.path} href={articleHref(item, prefix)} className="group rounded-lg border border-orange-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100">
                    <div className="text-xs font-black uppercase tracking-wide text-teal-700">{item.category} · {item.date}</div>
                    <h3 className="mt-3 text-lg font-black leading-snug text-[#4a2315] group-hover:text-orange-700">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">{messages.home.start.eyebrow}</p>
                <h2 className="mt-4 text-3xl font-black text-[#4a2315]">{messages.home.start.title}</h2>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {messages.home.start.cards.map((card) => (
                  <div key={card.number} className="rounded-lg border border-orange-100 bg-white p-5 shadow-sm">
                    <span className="grid h-9 w-9 place-items-center rounded bg-orange-500 font-black text-white">{card.number}</span>
                    <h3 className="mt-5 text-lg font-black text-[#4a2315]">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-lg border border-orange-200 bg-white p-6 shadow-xl shadow-orange-100/70">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-teal-700">{messages.home.trending.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black text-[#4a2315]">{messages.home.trending.title}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {trending.map((item) => (
                  <Link key={item.path} href={articleHref(item, prefix)} className="rounded-md border border-orange-100 bg-[#fff9e8] p-4 hover:border-teal-300">
                    <h3 className="font-black text-[#4a2315]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="border-y border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-[#4a2315]">{messages.home.aboutGame.title}</h2>
            {messages.home.aboutGame.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-8 text-slate-600">{paragraph}</p>
            ))}
            <Link href={href("/guide")} className="mt-7 inline-flex items-center gap-2 rounded-md bg-orange-500 px-5 py-3 text-sm font-black text-white hover:bg-orange-600">
              {messages.home.aboutGame.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {messages.home.aboutGame.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-orange-100 bg-[#fff9e8] p-4">
                <div className="text-xs font-black uppercase tracking-wide text-teal-700">{stat.label}</div>
                <div className="mt-2 text-base font-bold text-[#4a2315]">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#fff9e8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-[#4a2315]">{messages.home.explore.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{messages.home.explore.description}</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {messages.home.explore.modules.map((module, index) => {
              const Icon = iconByIndex[index] || BookOpen;
              return (
                <article key={module.name} className="rounded-lg border border-orange-100 bg-white p-5 shadow-sm">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-orange-500 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-[#4a2315]">{module.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{module.description}</p>
                    </div>
                  </div>
                  <ModuleHighlights module={module} />
                  <Link href={href(module.href)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-orange-700 hover:text-orange-900">
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-orange-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-[#4a2315]">CookieRun Classic FAQ</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">Quick answers for the questions players usually ask before their first run.</p>
          </div>
          <div className="grid gap-4">
            {messages.home.faq.map((item) => (
              <details key={item.question} className="rounded-lg border border-orange-100 bg-[#fff9e8] p-5">
                <summary className="cursor-pointer text-base font-black text-[#4a2315]">{item.question}</summary>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(120deg,#ff9f1c,#2ec4b6)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-white">{messages.home.finalCta.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/90">{messages.home.finalCta.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href("/guide/beginner-guide")} className="rounded-md bg-white px-5 py-3 text-sm font-black text-orange-700 hover:bg-orange-50">
              {messages.home.finalCta.primary}
            </Link>
            <a href="https://studiokingdom.co.kr/en/cookie-run/" target="_blank" rel="noreferrer" className="rounded-md border border-white px-5 py-3 text-sm font-black text-white hover:bg-white/10">
              {messages.home.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
