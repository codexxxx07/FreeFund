/**
 * Post-build SEO step (zero dependencies).
 * ─────────────────────────────────────────────────────────────────────────────
 * After `vite build`, writes dist/sitemap.xml with absolute URLs and appends
 * the `Sitemap:` line to dist/robots.txt.
 *
 * Absolute URLs need a production origin. Set it once in
 * src/data/siteConfig.js → siteUrl. Until then the script prints a warning and
 * leaves the build untouched, rather than publishing invented URLs.
 *
 * Run automatically by `npm run build`, or manually with `node scripts/seo.mjs`.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import siteConfig from "../src/data/siteConfig.js";
import { SITE_PATHS } from "../src/data/navigation.js";
import { careerArticles } from "../src/data/careerArticles.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

if (!existsSync(dist)) {
  console.error("[seo] dist/ not found — run `npm run build` first.");
  process.exit(1);
}

const origin = String(siteConfig.siteUrl || "").replace(/\/$/, "");

if (!origin) {
  // Remove anything left by an earlier build so a stale absolute URL never ships.
  const staleSitemap = resolve(dist, "sitemap.xml");
  if (existsSync(staleSitemap)) rmSync(staleSitemap);

  const robotsPath = resolve(dist, "robots.txt");
  if (existsSync(robotsPath)) {
    const cleaned = readFileSync(robotsPath, "utf8").replace(/^\s*Sitemap:.*$/gim, "").trimEnd();
    writeFileSync(robotsPath, `${cleaned}\n`);
  }

  console.warn("[seo] siteConfig.siteUrl is empty — skipping sitemap.xml generation.");
  console.warn("[seo] Set the production origin in src/data/siteConfig.js to publish one.");
  process.exit(0);
}

const paths = [...SITE_PATHS, ...careerArticles.map((article) => `/career-guidance/${article.slug}`)];
const today = new Date().toISOString().slice(0, 10);

const entries = paths
  .map((path) => {
    const loc = `${origin}${path === "/" ? "/" : path}`;
    const isHome = path === "/";
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      `    <changefreq>${isHome ? "daily" : "weekly"}</changefreq>`,
      `    <priority>${isHome ? "1.0" : "0.7"}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
writeFileSync(resolve(dist, "sitemap.xml"), xml);

const robotsPath = resolve(dist, "robots.txt");
const robots = existsSync(robotsPath)
  ? readFileSync(robotsPath, "utf8")
  : "User-agent: *\nAllow: /\n";
const withoutSitemap = robots.replace(/^\s*Sitemap:.*$/gim, "").trimEnd();
writeFileSync(robotsPath, `${withoutSitemap}\n\nSitemap: ${origin}/sitemap.xml\n`);

console.log(`[seo] wrote dist/sitemap.xml (${paths.length} URLs) and dist/robots.txt for ${origin}`);
