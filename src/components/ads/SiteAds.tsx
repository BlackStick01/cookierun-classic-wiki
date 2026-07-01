"use client";

import { usePathname } from "next/navigation";
import { adsConfig } from "@/config/ads";
import { DesktopSideAds } from "./DesktopSideAds";
import { DismissibleTopBanner } from "./DismissibleTopBanner";

export function SiteAds() {
  const pathname = usePathname();

  if (!adsConfig.enabled) return null;

  const hidden = adsConfig.excludedPathSegments.some((segment) =>
    pathname.split("/").filter(Boolean).includes(segment),
  );

  if (hidden) return null;

  return (
    <>
      <DismissibleTopBanner />
      <DesktopSideAds />
    </>
  );
}
