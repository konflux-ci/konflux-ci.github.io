# Konflux Website

Docusaurus 3.9.2 site with React 19, TypeScript, Yarn Berry 4.x. Node >= 20.

## Commands

```bash
yarn install          # Install dependencies
yarn start            # Dev server
yarn build            # Production build
yarn typecheck        # Type check
yarn clear            # Clear Docusaurus cache
yarn serve            # Serve production build locally
yarn swizzle          # Eject/wrap theme components
```

## CRITICAL: Git Worktree Safety Rules

**At the start of EVERY session, run:**

```bash
pwd && git worktree list
```

**If current directory appears in `git worktree list` (but is NOT the main worktree), you are in a worktree. Apply these rules:**

- **ONLY** read/edit/create files within the current worktree directory
- **NEVER** modify files in the parent/main repository
- **ALWAYS** verify with `pwd` before file operations
- All commands (`yarn build`, `yarn start`, git operations) execute from the worktree directory
- Changes are isolated to the worktree's branch only
- **DO NOT** use relative paths like `../../../` that escape the worktree

**Example worktree detection:**

```bash
$ pwd
/workspaces/konflux-ci.github.io/.claude/worktrees/try-konflux-page

$ git worktree list
/workspaces/konflux-ci.github.io                                     59b8635 [main]
/workspaces/konflux-ci.github.io/.claude/worktrees/try-konflux-page  8d7e2c2 [try-konflux-page]
                                                                      ^^^^^^^ ← You are HERE (worktree)
```

If `pwd` matches a non-first entry in `git worktree list` → you're in a worktree → enforce boundaries.

## Critical Files (Read FIRST every session)

1. `git log --oneline -20` — recent changes
2. `/data/*.yaml` — content data files (landing.yaml, navigation.yaml, getting-started.yaml)

## Tech Stack

- **Framework**: Docusaurus v3 with React 19
- **UI Library**: PatternFly 6 (@patternfly/react-core, @patternfly/react-styles, @patternfly/react-icons)
- **Language**: TypeScript strict mode
- **Content**: YAML data files in /data/ (js-yaml for webpack loading)
- **Deployment**: GitHub Pages via GitHub Actions

## Content/Code Separation (CRITICAL)

- ALL text content lives in `/data/*.yaml` files
- React components in `/src/components/` receive data via typed props
- Components NEVER contain hardcoded content strings
- A content author should NEVER need to open a .tsx file to edit text
- When implementing any component, FIRST check the YAML schema in /data/
- If you need to add new content, add it to the YAML file, NOT the component

## Architecture Rules

- Custom components: `src/components/`
- Custom plugins: `src/plugins/` (e.g., googleGtagWithConsent.js)
- Pages: `src/pages/` or `docs/`
- Content data: `data/` (YAML files)
- Type definitions: `src/types/content.ts`
- PatternFly imports: ALWAYS tree-shaken
  ```tsx
  import { Button } from "@patternfly/react-core";
  import { GithubIcon } from "@patternfly/react-icons";
  ```
- Global PatternFly CSS in `src/css/custom.css`
- Brand overrides (orange CTA, section labels) in `src/css/brand-overrides.css`
- PatternFly dark theme: `pf-v6-theme-dark` class on `<html>` — synced via client module in `src/clientModules/htmlDarkClassSync.ts`
- Client modules registered in `docusaurus.config.ts` under `clientModules` array
- **CRITICAL**: Analytics uses standalone script (`static/js/konflux-analytics.js`) generated from `src/analytics-template.js` via `scripts/build-analytics.js`. This script is NOT a Docusaurus plugin.

## Analytics

### GDPR-Compliant Analytics (GA4 + Amplitude)

**CRITICAL**: We use a **standalone analytics script** generated at build time, NOT a Docusaurus plugin.

**Why standalone?**

- Supports Google Consent Mode v2 (sets `gtag('consent', 'default')` BEFORE `gtag('config')`)
- Bundles vanilla-cookieconsent, Google Analytics, and Amplitude in one optimized script
- Includes Docusaurus-specific class persistence logic to handle SPA route changes
- Works on both Docusaurus and Antora sites (auto-detects via `#__docusaurus` element)

**Build Process:**

1. `scripts/build-analytics.js` reads `src/analytics-template.js`
2. Injects environment variables (`GA_MEASUREMENT_ID`, `AMPLITUDE_API_KEY`, `PRIVACY_POLICY_URL`)
3. Minifies in production (terser)
4. Outputs to `static/js/konflux-analytics.js`
5. Script is loaded via `<script>` tag injected in `docusaurus.config.ts` (`headTags`)

**Architecture:**

- **Template**: `src/analytics-template.js` — ESM imports, placeholders, class sync logic
- **Build script**: `scripts/build-analytics.js` — Variable injection, minification
- **Output**: `static/js/konflux-analytics.js` — Self-contained analytics bundle
- **Styling**: `src/css/cookie-consent.css` — PatternFly theming for consent modal

**Docusaurus Integration:**

- On Docusaurus sites, analytics script detects `#__docusaurus` and enables MutationObserver
- Observer re-adds `show--consent` class when Docusaurus removes it during SPA navigation
- Ensures cookie consent modal persists across route changes
- On non-Docusaurus sites (Antora), class sync is skipped

**Environment variables:**

- `GA_MEASUREMENT_ID` - Google Analytics 4 tracking ID (optional)
- `AMPLITUDE_API_KEY` - Amplitude project key (optional)
- `PRIVACY_POLICY_URL` - Privacy policy link (defaults to Red Hat)

**Build & Testing:**

```bash
# Build analytics script (runs automatically during yarn build)
node scripts/build-analytics.js

# Build with analytics enabled
GA_MEASUREMENT_ID=G-XXXXXXXXXX AMPLITUDE_API_KEY=test-key yarn build

# Verify static/js/konflux-analytics.js exists and contains:
# - gtag('consent', 'default', {analytics_storage: 'denied'})
# - CookieConsent initialization
# - Docusaurus class sync (if not minified)

# Browser: No tracking requests until user accepts consent
```

**Analytics Workflow:**

- Changes to `src/analytics-template.js` require running `node scripts/build-analytics.js` to regenerate `static/js/konflux-analytics.js`
- During development, manually run build script; during production build, it runs automatically
- DO NOT import `vanilla-cookieconsent` in client modules — analytics script loads it from CDN
- Single CookieConsent instance only (loaded in analytics script) — importing from npm creates conflicts

**CRITICAL Rules:**

- Analytics script is **standalone** — do NOT use Docusaurus gtag plugin
- Class sync logic lives **inside** analytics script, not as a separate client module
- Single CookieConsent instance (loaded from CDN in analytics script) — no npm import conflicts
- Build script must run before deployment to inject environment variables

## UI Primitives (`src/components/ui/`)

Reusable building blocks shared across Landing and other page components. These are NOT page-specific — use them anywhere.

- **IconCircle** — Circular icon container with `size` and `variant` (secondary/brand). Used in steppers, pipeline diagrams.
- **ArrowSvg** — SVG arrow connector with configurable `color` and `width`. Rotates 90deg on mobile via CSS.
- **SectionHeader** — Reusable section header with `sectionLabel` (uppercase blue), `heading` (h2), and `subtitle`. Use for every landing section.
- **GradientBackground** — Absolute-positioned decorative gradient overlay (`pointer-events: none`). Used in HeroSection.
- **DataDrivenButton** — Wraps PatternFly `Button` to render links from YAML data. Auto-detects external URLs, adds icon + `target="_blank"`. Default variant is `"link"`. Use this for ALL YAML-driven CTAs.
- **DynamicIcon** — Resolves PatternFly icon by string name from YAML (e.g., `"GithubIcon"` → `<GithubIcon />`). Critical for keeping icon choices in YAML, not code.

Rules:

- When building new sections, ALWAYS check if a ui/ primitive exists before creating custom markup
- `DataDrivenButton` + `DynamicIcon` enable fully YAML-driven components — prefer them over hardcoded icons/links
- New reusable primitives belong in `src/components/ui/`, NOT inline in page components

## Navbar Items (`src/components/NavbarItems/`)

Custom PatternFly-based navbar item components registered in `src/theme/NavbarItem/ComponentTypes.tsx`.

- **DefaultNavbarItem** — Replaces Docusaurus default with PatternFly `Button variant="plain"`. Handles both mobile (`menu__link` classes, full-width) and desktop (`navbar__link` classes). Supports `to`, `href`, `label`, `html`, active state detection.
- **GitHubStars** — Live GitHub star counter using PatternFly `Label` + `Badge`. Fetches from GitHub API, caches in sessionStorage.
- **CustomButton** — Simple styled navbar CTA with primary/secondary variants.

Rules:

- Register new navbar item types in `src/theme/NavbarItem/ComponentTypes.tsx` with `"custom-<name>"` key
- Use `type: "custom-<name>"` in `docusaurus.config.ts` navbar items
- Mobile rendering: Docusaurus passes `mobile: true` — must use `menu__link`/`menu__list-item` classes
- Prefer `--wrap` over `--eject` when swizzling Docusaurus theme components

## Styling Rules (STRICTLY ENFORCED)

- **Spacing**: ONLY PatternFly spacing tokens
- **Layout**: ONLY PatternFly layout components (Grid, Flex, Gallery, PageSection)
- **Typography**: ONLY PatternFly Text/Title. NEVER raw h1-h6, p, span
- **Colors**: ONLY PatternFly CSS variables. NEVER hex/rgb
- **EXCEPTION**: Orange CTA button uses custom CSS class .pf-m-brand-orange
- **EXCEPTION**: Section labels use custom .section-label class (uppercase, letter-spacing, blue)
- **DO NOT** write any other custom CSS

## Key Design Patterns from the Figma Site

- Section labels are uppercase, blue, letter-spaced (e.g., "WHY KONFLUX", "UNDER THE HOOD")
- Primary CTAs are ORANGE (not PatternFly blue)
- Alternating section backgrounds: white → gray → white → gray
- Cards have subtle borders, compact padding
- The lifecycle stepper is the most complex interactive component

## Workflow Rules

- `onBrokenLinks: "throw"` is set — navbar/footer links to non-existent pages will fail `yarn build`
- Run `yarn build` after changes to verify the build succeeds
- Run `yarn typecheck` after TypeScript changes
- Read files before editing — never modify blindly
- Use TypeScript (`.ts` / `.tsx`) for all new files
- Follow existing code patterns in the codebase
- Prefer editing existing files over creating new ones
- Do not create documentation files unless explicitly asked

## Package Manager

Use **Yarn Berry (v4)** exclusively. Do NOT use `npm`, `npx`, or `pnpm`.

```bash
yarn add <package>        # Add dependency
yarn add -D <package>     # Add dev dependency
```

## Project Structure

- `docs/` — Documentation pages (`.md` / `.mdx`)
- `blog/` — Blog posts, named `YYYY-MM-DD-slug.md`
- `src/components/ui/` — Reusable UI primitives (IconCircle, ArrowSvg, SectionHeader, DataDrivenButton, DynamicIcon, GradientBackground)
- `src/components/Landing/` — Landing page sections (HeroSection, WhyKonfluxSection, TourFactorySection, LifecycleSection, BottomCTASection)
- `src/components/NavbarItems/` — Custom PatternFly navbar item components (DefaultNavbarItem, GitHubStars, CustomButton)
- `src/plugins/` — Custom Docusaurus plugins (currently empty — analytics moved to standalone script)
- `scripts/` — Build scripts
  - `build-analytics.js` — Generates standalone analytics script from template
- `src/analytics-template.js` — Analytics script template (vanilla-cookieconsent + GA4 + Amplitude + Docusaurus class sync)
- `src/theme/NavbarItem/` — Swizzled navbar item type registry (ComponentTypes.tsx)
- `src/theme/Navbar/` — Wrapped default navbar (pass-through)
- `src/theme/Footer/` — Ejected custom PatternFly footer (reads navigation.yaml)
- `src/theme/Layout/` — Wrapped default layout (pass-through)
- `src/theme/Root.tsx` — Root wrapper (includes CookieConsent component)
- `src/clientModules/` — Browser-side scripts
  - `htmlDarkClassSync.ts` — Syncs PatternFly dark theme with Docusaurus theme
- `src/css/` — Stylesheets
  - `custom.css` — Global PatternFly imports + theme overrides
  - `brand-overrides.css` — Konflux brand styles (orange CTA, section labels)
  - `cookie-consent.css` — PatternFly theming for cookie consent modal
- `src/pages/` — Standalone pages
- `static/` — Static assets (images, fonts, favicons)
- `docusaurus.config.ts` — Site config: metadata, navbar, footer, presets, clientModules, plugins
- `sidebars.ts` — Sidebar structure (auto-generated from `docs/`)

## Docusaurus Conventions

### Swizzled Theme Components

- `src/theme/Navbar/` — **Wrapped** (pass-through, default navbar preserved)
- `src/theme/NavbarItem/ComponentTypes.tsx` — **Ejected** (registers custom PatternFly navbar item types)
- `src/theme/Footer/` — **Ejected** (fully custom PatternFly footer, reads from `data/navigation.yaml` footer section)
- `src/theme/Layout/` — **Wrapped** (pass-through, default layout preserved)

- Sidebar auto-generates from `docs/` folder — use `_category_.json` for ordering/labels
- Navbar items: edit `themeConfig.navbar.items` in `docusaurus.config.ts`
- Custom navbar item types: register in `src/theme/NavbarItem/ComponentTypes.tsx`, use `type: "custom-<name>"` in config
- Theme components: use `yarn swizzle --wrap --typescript --danger` — never manually copy theme internals
- The `future.v4: true` flag is set — write v4-compatible code
- Use MDX only when React components are needed; plain Markdown otherwise

## Git & Security

- Never commit secrets, credentials, or `.env` files
- Never force-push to `main`

## Git & Commits

- NEVER commit AI workflow files: prd.xml, tasks.json (or any .json used for AI task tracking), progress files (claude-progress.txt, progress.txt, progress.md, etc.) or screenshots taken as part of testing/development
- NEVER add `Co-Authored-By` or `Co-authored-by` to commit messages
- Instead, use `Assisted-by: Claude` in the commit message trailer

## What NOT to Do

- DO NOT hardcode content strings in components — use YAML data
- DO NOT build multiple features in one session without committing
- DO NOT skip visual verification
- DO NOT remove/edit feature descriptions in feature_list.json
- DO NOT use custom CSS beyond the two approved overrides
- DO NOT leave the dev server broken at end of session
- DO NOT forget mobile rendering when customizing navbar items — Docusaurus passes `mobile: true` and expects `menu__link`/`menu__list-item` classes
- DO NOT duplicate ui/ primitives — check `src/components/ui/` before writing custom markup for icons, sections, buttons, or arrows
