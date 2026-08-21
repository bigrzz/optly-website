#!/usr/bin/env node
/**
 * Copy only the Cloudflare Pages site files into dist/.
 * Keeps .github, workers, and scripts out of the Direct Upload.
 */
import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const dist = resolve(root, "dist");

export const PAGES_FILES = [
  "index.html",
  "brokers.html",
  "privacy.html",
  "terms.html",
  "404.html",
  "scan.js",
  "favicon.svg",
  "og.jpg",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
];

export function pack(dest = dist) {
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  for (const file of PAGES_FILES) {
    const src = resolve(root, file);
    if (!existsSync(src) || !statSync(src).isFile()) {
      throw new Error(`cf-pack: missing ${file}`);
    }
    copyFileSync(src, resolve(dest, file));
  }
  return PAGES_FILES.length;
}

if (process.argv[1]?.endsWith("cf-pack.mjs")) {
  const n = pack();
  console.log(`packed ${n} files → dist/`);
}
