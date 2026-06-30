/* global console, process */

import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = process.cwd();
const defaultTagsPath = "D:\\Codex_Work\\games-wiki-files\\games-wiki-ads\\cookierun classic\\ad tags.txt";
const tagsPath = process.env.ADS_TAGS_PATH || defaultTagsPath;
const configPath = resolve(projectRoot, "src/config/ads.ts");
const adsDir = resolve(projectRoot, "public/ads");

const slotDefinitions = [
  {
    size: "320x50",
    slotName: "sticky320x50",
    fileName: "banner-320x50.html",
    width: 320,
    height: 50,
  },
  {
    size: "728x90",
    slotName: "leaderboard728x90",
    fileName: "banner-728x90.html",
    width: 728,
    height: 90,
  },
  {
    size: "468x60",
    slotName: "banner468x60",
    fileName: "banner-468x60.html",
    width: 468,
    height: 60,
  },
  {
    size: "300x250",
    slotName: "rectangle300x250",
    fileName: "rectangle-300x250.html",
    width: 300,
    height: 250,
  },
  {
    size: "160x300",
    slotName: "side160x300",
    fileName: "side-160x300.html",
    width: 160,
    height: 300,
  },
  {
    size: "160x600",
    slotName: "side160x600",
    fileName: "side-160x600.html",
    width: 160,
    height: 600,
  },
];

const supportedSizes = new Set(slotDefinitions.map((slot) => slot.size));

function getOption(block, name) {
  const quoted = new RegExp(`['"]${name}['"]\\s*:\\s*['"]?([^'",\\n\\r}]+)['"]?`, "i");
  const unquoted = new RegExp(`${name}\\s*:\\s*['"]?([^'",\\n\\r}]+)['"]?`, "i");
  const match = block.match(quoted) || block.match(unquoted);
  return match?.[1]?.trim();
}

function parseAdTags(rawTags) {
  const ads = [];
  const duplicateSizes = [];
  const skipped = [];
  const optionPattern =
    /atOptions\s*=\s*\{([\s\S]*?)\}\s*;[\s\S]*?https:\/\/www\.highperformanceformat\.com\/([a-z0-9]+)\/invoke\.js/gi;

  for (const match of rawTags.matchAll(optionPattern)) {
    const optionsBlock = match[1];
    const invokeKey = match[2];
    const key = getOption(optionsBlock, "key");
    const format = getOption(optionsBlock, "format");
    const height = Number(getOption(optionsBlock, "height"));
    const width = Number(getOption(optionsBlock, "width"));
    const size = `${width}x${height}`;

    if (!key || !invokeKey || key !== invokeKey) {
      skipped.push({ reason: "key mismatch", size });
      continue;
    }

    if (format !== "iframe" || !Number.isFinite(width) || !Number.isFinite(height)) {
      skipped.push({ reason: "not an iframe banner", size });
      continue;
    }

    if (!supportedSizes.has(size)) {
      skipped.push({ reason: "unsupported size", size });
      continue;
    }

    if (ads.some((ad) => ad.size === size)) {
      duplicateSizes.push(size);
      continue;
    }

    ads.push({ key, width, height, size });
  }

  const nativeLikeCount = (rawTags.match(/effectivecpmnetwork\.com/gi) || []).length;

  return { ads, duplicateSizes, skipped, nativeLikeCount };
}

function renderAdHtml({ key, width, height }) {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex,nofollow" />
    <style>
      html,
      body {
        margin: 0;
        padding: 0;
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        background: transparent;
      }
    </style>
  </head>
  <body>
    <script type="text/javascript">
      atOptions = {
        key: "${key}",
        format: "iframe",
        height: ${height},
        width: ${width},
        params: {},
      };
    </script>
    <script
      type="text/javascript"
      src="https://www.highperformanceformat.com/${key}/invoke.js"
    ></script>
  </body>
</html>
`;
}

function renderConfig(activeBySize) {
  const anyEnabled = slotDefinitions.some((slot) => activeBySize.has(slot.size));
  const slotLines = slotDefinitions
    .map((slot) => `    ${slot.slotName}: {
      enabled: ${activeBySize.has(slot.size)},
      src: "/ads/${slot.fileName}",
      width: ${slot.width},
      height: ${slot.height},
    },`)
    .join("\n");

  return `export const adsConfig = {
  enabled: ${anyEnabled},

  slots: {
${slotLines}
  },

  layout: {
    contentMaxWidth: 1280,
    sideAdOffset: 188,
    sideAdTop: 96,
  },

  excludedPathSegments: ["privacy-policy", "terms-of-service", "copyright"],
} as const;
`;
}

if (!existsSync(tagsPath)) {
  console.log(`Ads tag file not found at ${tagsPath}; preserving committed ad config and files.`);
  process.exit(0);
}

const rawTags = readFileSync(tagsPath, "utf8");

if (rawTags.trim().length === 0) {
  mkdirSync(adsDir, { recursive: true });
  for (const slot of slotDefinitions) {
    rmSync(resolve(adsDir, slot.fileName), { force: true });
  }
  writeFileSync(configPath, renderConfig(new Map()), "utf8");
  console.log(`Ads disabled because ${tagsPath} is empty.`);
  process.exit(0);
}

const { ads, duplicateSizes, skipped, nativeLikeCount } = parseAdTags(rawTags);
const activeBySize = new Map(ads.map((ad) => [ad.size, ad]));

mkdirSync(adsDir, { recursive: true });
mkdirSync(dirname(configPath), { recursive: true });

for (const slot of slotDefinitions) {
  const ad = activeBySize.get(slot.size);
  const outputPath = resolve(adsDir, slot.fileName);

  if (ad) {
    writeFileSync(outputPath, renderAdHtml(ad), "utf8");
  } else {
    rmSync(outputPath, { force: true });
  }
}

writeFileSync(configPath, renderConfig(activeBySize), "utf8");

const enabledSizes = slotDefinitions
  .filter((slot) => activeBySize.has(slot.size))
  .map((slot) => slot.size);
const missingSizes = slotDefinitions
  .filter((slot) => !activeBySize.has(slot.size))
  .map((slot) => slot.size);

console.log(`Ads synced from ${tagsPath}`);
console.log(`Enabled sizes: ${enabledSizes.join(", ") || "none"}`);
console.log(`Missing sizes: ${missingSizes.join(", ") || "none"}`);
console.log(`Skipped non-iframe/native-like blocks: ${nativeLikeCount}`);
console.log(`Skipped invalid blocks: ${skipped.length}`);
console.log(`Duplicate sizes ignored: ${duplicateSizes.join(", ") || "none"}`);
