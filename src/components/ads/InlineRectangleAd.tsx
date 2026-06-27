import { adsConfig } from "@/config/ads";
import { AdFrame } from "./AdFrame";

export function InlineRectangleAd() {
  const slot = adsConfig.slots.rectangle300x250;

  if (!adsConfig.enabled || !slot.enabled) return null;

  return (
    <div className="mx-auto my-8 flex w-full justify-center px-4">
      <div className="h-[250px] w-[300px] overflow-hidden">
        <AdFrame
          src={slot.src}
          width={slot.width}
          height={slot.height}
          title="Advertisement"
        />
      </div>
    </div>
  );
}
