"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { adsConfig } from "@/config/ads";
import { AdFrame } from "./AdFrame";

export function DismissibleTopBanner() {
  const [dismissed, setDismissed] = useState(false);
  const slot = adsConfig.slots.sticky320x50;

  if (!adsConfig.enabled || !slot.enabled || dismissed) return null;

  return (
    <div className="border-b border-orange-100 bg-white/80 py-2">
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
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-orange-100 bg-white/95 p-1 text-slate-500 shadow-sm transition hover:text-orange-700"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
