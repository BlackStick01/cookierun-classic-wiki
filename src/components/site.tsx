import Image from "next/image";
import Link from "next/link";
import { BookOpen, Cookie, Shield, Sparkles } from "lucide-react";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import { getArticlePath, getLatestContent, localizePath } from "@/lib/content";
import { getSiteMessages } from "@/lib/site-messages";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader({ locale = "en" }: { locale?: string }) {
  const messages = getSiteMessages(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={localizePath("/", locale)} className="flex min-w-0 items-center gap-3">
          <Image src="/images/main-capsule.webp" alt="CookieRun Classic official CookieRun visual logo" width={112} height={64} className="h-11 w-20 rounded-sm object-cover shadow-lg shadow-orange-100" priority />
          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-sm font-black uppercase tracking-wide text-[#4a2315]">{messages.site.shortName}</div>
            <div className="hidden text-xs text-slate-500 sm:block">{messages.site.tagline}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={localizePath(item.href, locale)} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-orange-700">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a href="https://studiokingdom.co.kr/en/cookie-run/" className="rounded-md bg-orange-500 px-4 py-2 text-sm font-black text-white shadow-lg shadow-orange-100 transition hover:bg-orange-600" target="_blank" rel="noreferrer">
            Official
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale = "en" }: { locale?: string }) {
  const messages = getSiteMessages(locale);

  return (
    <footer className="border-t border-orange-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black text-[#4a2315]">{messages.footer.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{messages.footer.about}</p>
          <p className="mt-4 text-xs text-slate-500">{messages.site.legalNotice}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-teal-700">Official Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="text-slate-600 hover:text-orange-700" href="https://studiokingdom.co.kr/en/cookie-run/" target="_blank" rel="noreferrer">Official CookieRun</a>
            <a className="text-slate-600 hover:text-orange-700" href="https://www.devsisters.com/en/resource" target="_blank" rel="noreferrer">Brand Resources</a>
            <a className="text-slate-600 hover:text-orange-700" href="https://www.youtube.com/watch?v=0imlIAlOC_I" target="_blank" rel="noreferrer">{messages.footer.officialYoutube}</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-teal-700">Site</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link className="text-slate-600 hover:text-orange-700" href={localizePath("/about", locale)}>About</Link>
            <Link className="text-slate-600 hover:text-orange-700" href={localizePath("/privacy-policy", locale)}>{messages.footer.privacyPolicy}</Link>
            <Link className="text-slate-600 hover:text-orange-700" href={localizePath("/terms-of-service", locale)}>{messages.footer.termsOfService}</Link>
            <Link className="text-slate-600 hover:text-orange-700" href={localizePath("/copyright", locale)}>Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WikiSidebar({ locale = "en" }: { locale?: string }) {
  const messages = getSiteMessages(locale);
  const latest = getLatestContent(6, locale);
  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-orange-100 bg-white p-5 shadow-xl shadow-orange-100/70">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-teal-700">
          <BookOpen className="h-4 w-4" />
          {messages.shared.wikiNavigation}
        </div>
        <div className="mt-4 grid gap-2">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={localizePath(item.href, locale)} className="rounded-md border border-orange-100 bg-orange-50/60 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-orange-700">
          <Sparkles className="h-4 w-4" />
          {messages.shared.activeCodes}
        </div>
        <div className="mt-4 space-y-3">
          {messages.sidebarCodes.map((code) => (
            <div key={code.reward} className="rounded-md bg-white p-3">
              <div className="font-mono text-sm font-black text-orange-700">{code.code}</div>
              <div className="mt-1 text-xs leading-5 text-slate-600">{code.reward}</div>
            </div>
          ))}
        </div>
        <Link href={localizePath("/codes", locale)} className="mt-4 inline-flex text-sm font-bold text-orange-700 hover:text-orange-900">
          {messages.shared.viewAllCodes}
        </Link>
      </div>
      <div className="rounded-lg border border-orange-100 bg-white p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-teal-700">
          <Cookie className="h-4 w-4" />
          Latest Articles
        </div>
        <div className="mt-4 space-y-3">
          {latest.map((item) => (
            <Link key={item.path} href={getArticlePath(item, locale)} className="block text-sm font-semibold leading-6 text-slate-700 hover:text-orange-700">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-orange-100 bg-white p-5 text-sm leading-7 text-slate-600">
        <div className="flex items-center gap-2 font-black uppercase tracking-wide text-teal-700">
          <Shield className="h-4 w-4" />
          Fan Notice
        </div>
        <p className="mt-3">{messages.site.legalNotice}</p>
      </div>
    </aside>
  );
}
