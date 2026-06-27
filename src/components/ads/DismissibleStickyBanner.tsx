"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { adsConfig } from "@/config/ads";
import { AdFrame } from "./AdFrame";

export function DismissibleStickyBanner() {
  const [dismissed, setDismissed] = useState(false);
  const slot = adsConfig.slots.sticky320x50;

  if (!adsConfig.enabled || !slot.enabled || dismissed) return null;

  return (
    <div className="sticky top-16 z-30 border-b border-stone-800/70 bg-[#090806]/92 py-2 backdrop-blur-xl">
      <div className="relative mx-auto max-w-4xl px-4">
        <div className="mx-auto flex h-[50px] w-[320px] max-w-full items-center justify-center overflow-hidden">
          <AdFrame
            src={slot.src}
            width={slot.width}
            height={slot.height}
            title="Advertisement"
            loading="eager"
          />
        </div>
        <button
          type="button"
          aria-label="Close advertisement"
          onClick={() => setDismissed(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-stone-700 bg-stone-950/90 p-1 text-stone-300 shadow-sm transition hover:text-amber-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
