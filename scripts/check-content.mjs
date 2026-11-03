#!/usr/bin/env node
/**
 * Checks the content pages in src/data/content/pages (plus any draft files passed
 * as arguments) without building the site: type errors, the copy rules in
 * src/data/content/validate.ts, and related blog slugs against the live sitemap.
 *
 *   node scripts/check-content.mjs                      # the pages in the repo
 *   node scripts/check-content.mjs path/to/draft.ts     # repo pages + a draft file
 *   node scripts/check-content.mjs --only path/to/draft.ts
 *   node scripts/check-content.mjs --offline            # skip the live sitemap check
 *
 * Draft files must import their types as `import type { ContentPage } from "../types";`.
 * Exits 1 when there are errors.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = path.join(root, "src", "data", "content");
const args = process.argv.slice(2);
const offline = args.includes("--offline");
const only = args.includes("--only");
const extra = args.filter((arg) => !arg.startsWith("--")).map((file) => path.resolve(file));

const work = fs.mkdtempSync(path.join(os.tmpdir(), "content-check-"));
const outContent = path.join(work, "content");
fs.mkdirSync(path.join(outContent, "pages"), { recursive: true });

// Copy the sources into one tree so relative imports resolve.
const copies = [];
const copy = (from, to) => {
  fs.copyFileSync(from, to);
  copies.push(to);
};
for (const name of ["types.ts", "catalog.ts", "validate.ts"]) copy(path.join(contentDir, name), path.join(outContent, name));
const pageFiles = [];
const repoPages = path.join(contentDir, "pages");
if (!only && fs.existsSync(repoPages))
  for (const name of fs.readdirSync(repoPages).filter((n) => n.endsWith(".ts"))) {
    const to = path.join(outContent, "pages", name);
    copy(path.join(repoPages, name), to);
    pageFiles.push(to);
  }
for (const file of extra) {
  const to = path.join(outContent, "pages", `draft-${path.basename(file)}`);
  copy(file, to);
  pageFiles.push(to);
}

// Type-check.
const program = ts.createProgram(copies, {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  skipLibCheck: true,
  types: [],
});
const typeErrors = ts
  .getPreEmitDiagnostics(program)
  .filter((d) => d.file && copies.includes(path.normalize(d.file.fileName)))
  .map((d) => {
    const { line, character } = d.file.getLineAndCharacterOfPosition(d.start ?? 0);
    const name = path.basename(d.file.fileName).replace(/^draft-/, "");
    return `${name}:${line + 1}:${character + 1} ${ts.flattenDiagnosticMessageText(d.messageText, "\n")}`;
  });

// Transpile to CommonJS and load.
for (const file of copies) {
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  fs.writeFileSync(file.replace(/\.ts$/, ".js"), outputText);
}
const require = createRequire(path.join(outContent, "index.js"));
const { validateContentPages, pageText } = require("./validate.js");

const pages = [];
const loadErrors = [];
for (const file of pageFiles) {
  try {
    const mod = require(file.replace(/\.ts$/, ".js"));
    for (const value of Object.values(mod))
      if (Array.isArray(value) && value.every((v) => v && typeof v === "object" && "id" in v && "path" in v)) pages.push(...value);
  } catch (error) {
    loadErrors.push(`${path.basename(file)}: ${error.message}`);
  }
}

const { errors, warnings } = validateContentPages(pages);

// Related blog posts must exist on the live site.
if (!offline) {
  try {
    const xml = await (await fetch("https://www.talentifix.com/sitemap.xml")).text();
    const live = new Set([...xml.matchAll(/\/blog\/([a-z0-9-]+)</g)].map((m) => m[1]));
    for (const page of pages)
      for (const slug of [...page.relatedPosts, ...page.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === "postLinks" ? b.slugs : [])))])
        if (!live.has(slug)) errors.push(`${page.id}: blog post "${slug}" is not on the live site`);
  } catch {
    warnings.push("could not reach the live sitemap; blog slugs not checked (use --offline to silence)");
  }
}

const all = [...loadErrors, ...typeErrors, ...errors];
console.log(`Checked ${pages.length} page(s).`);
for (const page of pages) console.log(`  ${page.status.padEnd(5)} ${page.id.padEnd(32)} ${String(pageText(page).split(/\s+/).length).padStart(5)} words  ${page.path}`);
if (warnings.length) console.log(`\n${warnings.length} warning(s):\n${warnings.map((w) => `  - ${w}`).join("\n")}`);
if (all.length) console.log(`\n${all.length} error(s):\n${all.map((e) => `  x ${e}`).join("\n")}`);
else console.log("\nNo errors.");
fs.rmSync(work, { recursive: true, force: true });
process.exitCode = all.length ? 1 : 0;
