#!/usr/bin/env node
/**
 * Post-build script: uses Critters to inline critical (above-the-fold) CSS
 * into each HTML file and defer the rest. This eliminates render-blocking CSS
 * while avoiding FOUC for visible content.
 */
import Critters from 'critters';
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const BUILD_DIR = resolve(process.cwd(), 'build');

function findHtmlFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const critters = new Critters({
  path: BUILD_DIR,
  preload: 'swap',
  inlineFonts: false,
  pruneSource: false,
  reduceInlineStyles: true,
  mergeStylesheets: true,
});

const htmlFiles = findHtmlFiles(BUILD_DIR);
let processedCount = 0;

for (const htmlFile of htmlFiles) {
  try {
    const html = readFileSync(htmlFile, 'utf-8');
    const result = await critters.process(html);
    writeFileSync(htmlFile, result);
    processedCount++;
  } catch (err) {
    console.error(`Error processing ${htmlFile}:`, err.message);
  }
}

console.log(`Inlined critical CSS in ${processedCount}/${htmlFiles.length} HTML files`);
