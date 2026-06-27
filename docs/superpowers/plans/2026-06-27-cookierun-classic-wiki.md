# CookieRun Classic Wiki Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy the CookieRun Classic wiki at `cookierunclassic-wiki.wiki` from the existing Next.js wiki template.

**Architecture:** Reuse the existing Next.js App Router, next-intl, MDX content registry, sitemap, ads, and sidebar architecture. Replace template data with CookieRun Classic requirements, import seoscout MDX articles, restyle the UI toward the target site's bright CookieRun layout, and verify sitemap URLs before deployment.

**Tech Stack:** Next.js 15, TypeScript, next-intl v4, @next/mdx, Tailwind CSS, lucide-react, Vercel, GitHub.

---

### Task 1: Project Bootstrap

**Files:**
- Create: `D:/Codex_Work/games-wiki-files/games-source-code/cookierun-classic-wiki`
- Modify: `.gitignore`

- [x] Copy the clean source template without `.git`, `.next`, `.vercel`, `node_modules`, or build artifacts.
- [x] Add `.superpowers/` to `.gitignore`.

### Task 2: CookieRun Data and Navigation

**Files:**
- Modify: `src/locales/en.json`
- Modify: `src/config/navigation.ts`
- Modify: `src/lib/content.ts`

- [ ] Replace site, footer, home, modules, FAQ, sidebar codes, nav, category overview, and metadata values from `00基础信息.md`, `00首页信息.md`, and `keywords.json`.
- [ ] Ensure navigation keys exactly match `guide`, `codes`, `cookies`, `pets`, `treasures`, `jellies`, `system`, `media`.
- [ ] Ensure public English URLs do not include `/en`.

### Task 3: Content Import

**Files:**
- Replace: `content/{locale}/{category}/*.mdx`
- Generate: `src/lib/generated-content.json`
- Generate: `src/lib/localized-content.json`
- Generate: `src/lib/content-registry.ts`

- [ ] Copy seoscout MDX articles from `D:/Codex_Work/seoscout/output/cookierun_classic/articles`.
- [ ] Remove old template MDX.
- [ ] Generate metadata lists and dynamic MDX import registry from real files.

### Task 4: Visual and SEO Polish

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/[locale]/HomePageClient.tsx`
- Modify: `src/components/site.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/[locale]/[...slug]/page.tsx`
- Modify: `src/lib/utils.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`
- Modify: `public/images/*`
- Modify: `public/manifest.json`

- [ ] Apply bright CookieRun visual system based on official assets and target layout rhythm.
- [ ] Add an official YouTube video intro module after Hero.
- [ ] Use official Studio Kingdom / Devsisters assets for hero, logo, OG image, and video preview.
- [ ] Update Organization, WebPage, Article, BreadcrumbList, and ItemList JSON-LD.
- [ ] Ensure sitemap scans real MDX paths and no English `/en` URLs appear.

### Task 5: Verification and Deployment

**Commands:**
- `npm install`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- local dev server plus sitemap URL checks
- GitHub push to `BlackStick01/cookierun-classic-wiki`
- Vercel deploy

- [ ] Verify no old template content remains.
- [ ] Verify visual rendering desktop and mobile.
- [ ] Verify sitemap URLs return no 404/500.
- [ ] Commit, push, and deploy only after local checks pass.
