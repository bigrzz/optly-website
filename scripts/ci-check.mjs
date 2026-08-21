#!/usr/bin/env node
/**
 * OptlyOuts CI checks — no npm install required.
 * Validates the static Pages site and the client-side scan engine.
 */
import { createContext, runInContext } from "node:vm";
import { readFileSync, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { pack, PAGES_FILES } from "./cf-pack.mjs";

const root = resolve(process.cwd());
const fail = [];
const pass = [];

function ok(name) {
  pass.push(name);
  console.log(`ok  ${name}`);
}
function bad(name, detail) {
  fail.push(`${name}: ${detail}`);
  console.error(`FAIL  ${name}: ${detail}`);
}

const required = [
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
  "wrangler.toml",
  "wrangler.health.toml",
  "workers/health.js",
  "scripts/cf-pack.mjs",
  ".github/workflows/ci.yml",
  ".github/workflows/cd.yml",
  ".github/workflows/preview.yml",
];

for (const file of required) {
  const p = resolve(root, file);
  if (!existsSync(p) || !statSync(p).isFile()) bad(`file ${file}`, "missing");
  else ok(`file ${file}`);
}

const index = readFileSync(resolve(root, "index.html"), "utf8");
const brokers = readFileSync(resolve(root, "brokers.html"), "utf8");
const privacy = readFileSync(resolve(root, "privacy.html"), "utf8");
const terms = readFileSync(resolve(root, "terms.html"), "utf8");
const headers = readFileSync(resolve(root, "_headers"), "utf8");
const redirects = readFileSync(resolve(root, "_redirects"), "utf8").trim();
const robots = readFileSync(resolve(root, "robots.txt"), "utf8");
const sitemap = readFileSync(resolve(root, "sitemap.xml"), "utf8");

const brandChecks = [
  ["index title", index.includes("<title>OptlyOuts")],
  ["index canonical", index.includes("https://optlyouts.awakyn.ai/")],
  ["index scan.js", index.includes('src="/scan.js"')],
  ["index scan form", index.includes('id="scan"')],
  ["index pricing", index.includes("$1.99") && index.includes("$14.99") && index.includes("$29.99")],
  ["no old Optly title", !index.includes("Optly – Remove")],
  ["brokers page", brokers.includes("Broker directory") && brokers.includes("scan.js")],
  ["privacy brand", privacy.includes("OptlyOuts") && privacy.includes("info@awakyn.ai")],
  ["terms brand", terms.includes("OptlyOuts") && terms.includes("Wisconsin")],
  ["sitemap host", sitemap.includes("https://optlyouts.awakyn.ai/")],
  ["robots sitemap", robots.includes("https://optlyouts.awakyn.ai/sitemap.xml")],
  ["csp fonts", headers.includes("fonts.googleapis.com") && headers.includes("cdn.tailwindcss.com")],
];

for (const [name, cond] of brandChecks) {
  if (cond) ok(name);
  else bad(name, "assertion failed");
}

if (redirects.includes("/brokers /brokers.html")) {
  bad("redirects", "pretty-URL rewrite will loop on Cloudflare Pages");
} else {
  ok("redirects (no html pretty-URL loop)");
}

const sandbox = {};
const ctx = createContext(sandbox);
runInContext(
  `${readFileSync(resolve(root, "scan.js"), "utf8")}\nthis.__run = runExposureScan;\nthis.__BROKERS = BROKERS;\nthis.__LABEL = DATA_LABEL;`,
  ctx,
);

const brokersList = sandbox.__BROKERS;
if (!Array.isArray(brokersList) || brokersList.length !== 26) {
  bad("broker catalog", `expected 26 brokers, got ${brokersList?.length}`);
} else {
  ok("broker catalog (26)");
}

const a = sandbox.__run({ fullName: "Jane Smith", city: "Milwaukee", state: "WI" });
const b = sandbox.__run({ fullName: "Jane Smith", city: "Milwaukee", state: "WI" });
const c = sandbox.__run({ fullName: "John Doe", city: "Chicago", state: "IL" });

if (JSON.stringify(a) !== JSON.stringify(b)) bad("scan deterministic", "same input produced different hits");
else ok("scan deterministic");

if (!a.hits?.length) bad("scan hits", "expected at least one hit");
else ok(`scan hits (${a.hits.length}, risk=${a.riskLevel})`);

if (JSON.stringify(a.hits) === JSON.stringify(c.hits)) bad("scan varies by name", "different people produced identical hits");
else ok("scan varies by name");

const slugs = new Set(brokersList.map((x) => x.slug));
if (slugs.size !== brokersList.length) bad("broker slugs", "duplicate slug");
else ok("broker slugs unique");

const wrangler = readFileSync(resolve(root, "wrangler.toml"), "utf8");
const wranglerHealth = readFileSync(resolve(root, "wrangler.health.toml"), "utf8");
const health = readFileSync(resolve(root, "workers/health.js"), "utf8");
const cd = readFileSync(resolve(root, ".github/workflows/cd.yml"), "utf8");
const preview = readFileSync(resolve(root, ".github/workflows/preview.yml"), "utf8");

const cfChecks = [
  ["pages output dir", wrangler.includes('pages_build_output_dir = "dist"')],
  ["pages project name", wrangler.includes('name = "optly-website"')],
  ["health worker name", wranglerHealth.includes('name = "optlyouts-health"')],
  ["health cron", wranglerHealth.includes("*/15 * * * *")],
  ["health site var", wranglerHealth.includes("https://optlyouts.awakyn.ai")],
  ["health fetch + scheduled", health.includes("async scheduled") && health.includes("async fetch")],
  ["cd wrangler deploy", cd.includes("pages deploy dist") && cd.includes("cloudflare/wrangler-action@v3")],
  ["cd health deploy", cd.includes("deploy --config wrangler.health.toml")],
  ["preview wrangler deploy", preview.includes("pages deploy dist")],
];

for (const [name, cond] of cfChecks) {
  if (cond) ok(name);
  else bad(name, "assertion failed");
}

try {
  const n = pack();
  if (n !== PAGES_FILES.length) bad("cf-pack", `packed ${n}, expected ${PAGES_FILES.length}`);
  else if (!existsSync(resolve(root, "dist/index.html")) || !existsSync(resolve(root, "dist/scan.js"))) {
    bad("cf-pack", "dist missing index.html or scan.js");
  } else {
    ok(`cf-pack (${n} files)`);
  }
} catch (err) {
  bad("cf-pack", err instanceof Error ? err.message : String(err));
}

console.log(`\n${pass.length} passed, ${fail.length} failed`);
if (fail.length) {
  process.exitCode = 1;
}
