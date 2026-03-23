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
- PatternFly dark theme: `pf-v6-theme-dark` class on `<html>` — synced via client module in `src/clientModules/themeListener.ts`
- Client modules registered in `docusaurus.config.ts` under `clientModules` array

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
- `src/theme/NavbarItem/` — Swizzled navbar item type registry (ComponentTypes.tsx)
- `src/theme/Navbar/` — Wrapped default navbar (pass-through)
- `src/theme/Footer/` — Ejected custom PatternFly footer (reads navigation.yaml)
- `src/theme/Layout/` — Wrapped default layout (pass-through)
- `src/clientModules/` — Browser-side scripts (themeListener.ts for PatternFly dark theme sync)
- `src/css/` — Stylesheets (`custom.css` for theme overrides)
- `src/pages/` — Standalone pages
- `static/` — Static assets (images, fonts, favicons)
- `docusaurus.config.ts` — Site config: metadata, navbar, footer, presets, clientModules
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
