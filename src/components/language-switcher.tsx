"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";

const languages = [
  { locale: "en", label: "English" },
  { locale: "es", label: "Español" },
  { locale: "de", label: "Deutsch" },
  { locale: "fr", label: "Français" },
  { locale: "pt", label: "Português" },
];

function stripLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];

  if (first && languages.some((language) => language.locale === first)) {
    const pathWithoutLocale = parts.slice(1).join("/");
    return pathWithoutLocale ? `/${pathWithoutLocale}` : "/";
  }

  return pathname || "/";
}

function hrefForLocale(locale: string, pathname: string) {
  const basePath = stripLocale(pathname);
  if (locale === "en") return basePath;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function LanguageSwitcher() {
  const pathname = usePathname();

  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-orange-100 bg-white px-3 text-sm font-black text-slate-700 transition hover:border-orange-300 hover:text-orange-700">
        <Globe2 className="h-4 w-4 text-orange-500" />
        <span className="hidden sm:inline">Language</span>
      </summary>
      <div className="absolute right-0 top-12 z-50 grid min-w-40 gap-1 rounded-md border border-orange-100 bg-white p-2 shadow-2xl shadow-orange-100">
        {languages.map((language) => (
          <Link
            key={language.locale}
            href={hrefForLocale(language.locale, pathname)}
            className="rounded px-3 py-2 text-sm font-bold text-slate-700 hover:bg-orange-50 hover:text-orange-700"
            hrefLang={language.locale}
          >
            {language.label}
          </Link>
        ))}
      </div>
    </details>
  );
}
