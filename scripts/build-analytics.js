#!/usr/bin/env node
/**
 * Build analytics script with environment variables baked in.
 * This runs as part of the Docusaurus build process.
 */

const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file (if it exists)
dotenv.config();

// Read environment variables
const gaId = process.env.GA_MEASUREMENT_ID || "";
const amplitudeKey = process.env.AMPLITUDE_API_KEY || "";
const privacyUrl =
  process.env.PRIVACY_POLICY_URL ||
  "https://www.redhat.com/en/about/privacy-policy";
const debug = process.env.NODE_ENV !== "production";

// Validate formats to prevent injection
if (gaId && !/^G-[A-Z0-9]+$/.test(gaId)) {
  console.warn(
    `[Build Analytics] Warning: GA_MEASUREMENT_ID has unexpected format: ${gaId}`,
  );
}

if (amplitudeKey && !/^[a-zA-Z0-9_-]+$/.test(amplitudeKey)) {
  console.warn(
    `[Build Analytics] Warning: AMPLITUDE_API_KEY has unexpected format`,
  );
}

try {
  new URL(privacyUrl);
} catch {
  console.warn(
    `[Build Analytics] Warning: PRIVACY_POLICY_URL is not a valid URL: ${privacyUrl}`,
  );
}

console.log("[Build Analytics] Building analytics script...");
console.log(`  GA_MEASUREMENT_ID: ${gaId ? "Set ✓" : "Not set"}`);
console.log(`  AMPLITUDE_API_KEY: ${amplitudeKey ? "Set ✓" : "Not set"}`);

// Read the template
const templatePath = path.join(__dirname, "../src/analytics-template.js");
const template = fs.readFileSync(templatePath, "utf8");

// Replace placeholders with actual values (all occurrences)
// Use JSON.stringify to safely escape string values and prevent injection
let output = template
  .replace(/"__GA_MEASUREMENT_ID__"/g, JSON.stringify(gaId))
  .replace(/"__AMPLITUDE_API_KEY__"/g, JSON.stringify(amplitudeKey))
  .replace(/"__PRIVACY_POLICY_URL__"/g, JSON.stringify(privacyUrl))
  .replace(/__DEBUG__/g, debug.toString()); // Boolean literal (no quotes)

// Verify critical placeholders in code were replaced (not in comments)
// Check for const declarations with unreplaced placeholders
const codeLines = output
  .split("\n")
  .filter((line) => !line.trim().startsWith("*"));
const unreplacedInCode = codeLines
  .join("\n")
  .match(/const (gaId|amplitudeKey|privacyUrl|debug) = ["']?__[A-Z_]+__["']?/g);

if (unreplacedInCode) {
  console.error(
    "[Build Analytics] ERROR: Failed to replace placeholders in code:",
    unreplacedInCode,
  );
  process.exit(1);
}

// Minify if in production
if (!debug) {
  try {
    const terser = require("terser");
    const minified = terser.minify_sync(output, {
      compress: {
        dead_code: true,
        drop_console: false, // Keep console.log for analytics debugging
        drop_debugger: true,
        unused: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false, // Remove comments
      },
    });

    if (!minified || minified.error) {
      console.error("[Build Analytics] Minification failed:", minified?.error);
      console.log("[Build Analytics] Using unminified output");
    } else {
      output = minified.code;
      console.log("[Build Analytics] ✓ Minified");
    }
  } catch (e) {
    console.error(
      "[Build Analytics] Terser not available, skipping minification:",
      e.message,
    );
  }
}

// Ensure output directory exists
const outputPath = path.join(__dirname, "../static/js/konflux-analytics.js");
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write to static directory
fs.writeFileSync(outputPath, output, "utf8");

console.log(`[Build Analytics] ✓ Written to ${outputPath}`);
console.log("[Build Analytics] Script ready for deployment");
