"use client";

import { usePathname } from "next/navigation";
import { adsConfig } from "@/config/ads";
import { DesktopSideAds } from "./DesktopSideAds";
import { DismissibleStickyBanner } from "./DismissibleStickyBanner";

export function SiteAds() {
  const pathname = usePathname();
  const hidden = adsConfig.excludedPathSegments.some((segment) =>
    pathname.split("/").filter(Boolean).includes(segment),
  );

  if (hidden) return null;

  return (
    <>
      <DismissibleStickyBanner />
      <DesktopSideAds />
    </>
  );
}
