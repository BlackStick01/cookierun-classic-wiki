import { adsConfig } from "@/config/ads";
import { AdFrame } from "./AdFrame";

export function ResponsiveLeaderboardAd() {
  const desktop = adsConfig.slots.leaderboard728x90;
  const tablet = adsConfig.slots.banner468x60;

  if (!adsConfig.enabled) return null;

  return (
    <div className="mx-auto my-6 flex w-full justify-center px-4">
      {desktop.enabled ? (
        <div className="hidden h-[90px] w-[728px] overflow-hidden xl:block">
          <AdFrame
            src={desktop.src}
            width={desktop.width}
            height={desktop.height}
            title="Leaderboard advertisement"
          />
        </div>
      ) : null}

      {tablet.enabled ? (
        <div className="hidden h-[60px] w-[468px] overflow-hidden md:block xl:hidden">
          <AdFrame
            src={tablet.src}
            width={tablet.width}
            height={tablet.height}
            title="Banner advertisement"
          />
        </div>
      ) : null}
    </div>
  );
}
