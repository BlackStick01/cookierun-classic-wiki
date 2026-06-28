/* global console, process */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();
const defaultTagsPath = "D:\\Codex_Work\\games-wiki-files\\games-wiki-ads\\cookierun classic\\ad tags.txt";
const tagsPath = process.env.ADS_TAGS_PATH || defaultTagsPath;
const configPath = resolve(projectRoot, "src/config/ads.ts");

const tags = existsSync(tagsPath) ? readFileSync(tagsPath, "utf8").trim() : "";
const enabled = tags.length > 0;
const config = readFileSync(configPath, "utf8");
const nextConfig = config.replace(/enabled:\s*(true|false),/, `enabled: ${enabled},`);

if (nextConfig !== config) {
  writeFileSync(configPath, nextConfig, "utf8");
}

console.log(`Ads ${enabled ? "enabled" : "disabled"} from ${tagsPath}`);
