export const adsConfig = {
  enabled: true,

  slots: {
    sticky320x50: {
      enabled: true,
      src: "/ads/banner-320x50.html",
      width: 320,
      height: 50,
    },
    leaderboard728x90: {
      enabled: true,
      src: "/ads/banner-728x90.html",
      width: 728,
      height: 90,
    },
    banner468x60: {
      enabled: true,
      src: "/ads/banner-468x60.html",
      width: 468,
      height: 60,
    },
    rectangle300x250: {
      enabled: true,
      src: "/ads/rectangle-300x250.html",
      width: 300,
      height: 250,
    },
    side160x300: {
      enabled: true,
      src: "/ads/side-160x300.html",
      width: 160,
      height: 300,
    },
    side160x600: {
      enabled: true,
      src: "/ads/side-160x600.html",
      width: 160,
      height: 600,
    },
  },

  layout: {
    contentMaxWidth: 1280,
    sideAdOffset: 188,
    sideAdTop: 96,
  },

  excludedPathSegments: ["privacy-policy", "terms-of-service", "copyright"],
} as const;
