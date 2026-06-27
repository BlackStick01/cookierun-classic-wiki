import { adsConfig } from "@/config/ads";
import { AdFrame } from "./AdFrame";

export function DesktopSideAds() {
  const left = adsConfig.slots.side160x300;
  const right = adsConfig.slots.side160x600;
  const { contentMaxWidth, sideAdOffset, sideAdTop } = adsConfig.layout;

  if (!adsConfig.enabled) return null;

  return (
    <>
      {left.enabled ? (
        <aside
          className="fixed z-10 hidden 2xl:block"
          style={{
            top: sideAdTop,
            left: `calc((100vw - ${contentMaxWidth}px) / 2 - ${sideAdOffset}px)`,
          }}
          aria-label="Left advertisement"
        >
          <AdFrame
            src={left.src}
            width={left.width}
            height={left.height}
            title="Left advertisement"
          />
        </aside>
      ) : null}

      {right.enabled ? (
        <aside
          className="fixed z-10 hidden 2xl:block"
          style={{
            top: sideAdTop,
            right: `calc((100vw - ${contentMaxWidth}px) / 2 - ${sideAdOffset}px)`,
          }}
          aria-label="Right advertisement"
        >
          <AdFrame
            src={right.src}
            width={right.width}
            height={right.height}
            title="Right advertisement"
          />
        </aside>
      ) : null}
    </>
  );
}
