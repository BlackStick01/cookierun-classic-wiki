export type NavigationItem = {
  key: string;
  label: string;
  href: string;
  description: string;
};

export const NAVIGATION_CONFIG: Record<string, NavigationItem> = {
  guide: {
    key: "guide",
    label: "Guide",
    href: "/guide",
    description: "Beginner guide, jump and slide basics, scoring basics, upgrade planning, and launch preparation.",
  },
  codes: {
    key: "codes",
    label: "Codes",
    href: "/codes",
    description: "Active codes, coupon rules, pre-registration rewards, launch gifts, and official reward tracking.",
  },
  cookies: {
    key: "cookies",
    label: "Cookies",
    href: "/cookies",
    description: "Cookie list, skills, upgrades, unlock notes, and early best Cookie recommendations.",
  },
  pets: {
    key: "pets",
    label: "Pets",
    href: "/pets",
    description: "Pet list, pairings, support effects, and Cookie plus Pet combination planning.",
  },
  treasures: {
    key: "treasures",
    label: "Treasures",
    href: "/treasures",
    description: "Treasure list, score utility, upgrade value, and future tier list content.",
  },
  jellies: {
    key: "jellies",
    label: "Jellies",
    href: "/jellies",
    description: "Jelly collection, bonus time, score routes, coins, obstacles, and stage route basics.",
  },
  system: {
    key: "system",
    label: "System",
    href: "/system",
    description: "Release date, pre-registration, mobile platforms, account support, support links, and settings.",
  },
  media: {
    key: "media",
    label: "Media",
    href: "/media",
    description: "Official trailer, DevNow coverage, gameplay, review, worth-it searches, and community topics.",
  },
};

export const CONTENT_TYPES = Object.keys(NAVIGATION_CONFIG);
