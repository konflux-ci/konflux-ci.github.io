# Konflux Website

The official [Konflux](https://konflux-ci.dev) website

## Quick Start

**Prerequisites:** Node.js >= 20

```bash
yarn install    # Install dependencies
yarn start      # Start dev server at http://localhost:3000
```

## Commands

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `yarn install`   | Install dependencies                   |
| `yarn start`     | Dev server with hot reload             |
| `yarn build`     | Production build to `build/`           |
| `yarn serve`     | Serve production build locally         |
| `yarn typecheck` | TypeScript type checking               |
| `yarn clear`     | Clear Docusaurus cache                 |
| `yarn swizzle`   | Eject/wrap Docusaurus theme components |

> **Note:** This project uses **Yarn Berry (v4)**. Do not use `npm`, `npx`, or `pnpm`.

## Project Structure

```
├── data/                 # YAML content files
├── docs/                 # Documentation pages
├── blog/                 # Blog posts
├── src/
│   ├── components/       # React components
│   ├── plugins/          # Custom Docusaurus plugins
│   ├── theme/            # Swizzled theme components
│   ├── clientModules/    # Browser-side scripts
│   ├── css/              # Stylesheets
│   ├── pages/            # Standalone pages
│   └── types/            # TypeScript definitions
├── static/               # Static assets
├── docusaurus.config.ts  # Site configuration
└── sidebars.ts           # Sidebar structure
```

## Architecture

### Content/Code Separation

All text content lives in **`/data/*.yaml`** files. React components receive data via typed props and never contain hardcoded content strings. A content author should never need to open a `.tsx` file to edit text.

- `data/landing.yaml` — Landing page content (hero, features, lifecycle steps)
- `data/navigation.yaml` — Header nav items and footer links
- `data/getting-started.yaml` — Getting started page content

### Editing Content

#### Landing Page

Edit `data/landing.yaml` to change hero text, feature cards, lifecycle steps, and CTAs.

#### Navigation

Edit `data/navigation.yaml` to change footer links.

#### Blog

Add posts in `blog/` with the naming convention `YYYY-MM-DD-slug.md`.

### Tech Stack

- **Framework:** Docusaurus v3 with React 19
- **UI Library:** [PatternFly 6](https://www.patternfly.org/) for components, layout, and design tokens
- **Language:** TypeScript (strict mode)
- **Content:** YAML data files loaded via webpack (yaml-loader)
- **Deployment:** GitHub Pages via GitHub Actions

### PatternFly Integration

- PatternFly base CSS imported in `src/css/custom.css`
- Dark theme synced automatically — when Docusaurus theme changes, `pf-v6-theme-dark` class is toggled on `<html>` via a client module
- Custom navbar items use PatternFly `Button variant="plain"` as the base component
- Footer is a fully custom PatternFly component

### Analytics

GDPR-compliant analytics using a **standalone script** generated at build time with [vanilla-cookieconsent](https://github.com/orestbida/cookieconsent) v3 and Google Consent Mode v2.

**Environment Variables:**

```bash
GA_MEASUREMENT_ID=G-XXXXXXXXXX      # Google Analytics 4 (optional)
AMPLITUDE_API_KEY=your-api-key      # Amplitude (optional)
PRIVACY_POLICY_URL=/privacy         # Optional (defaults to Red Hat)
```

**How it Works:**

1. **Build-time generation**: `scripts/build-analytics.js` reads `src/analytics-template.js`
2. **Variable injection**: Replaces placeholders with actual environment values
3. **Minification**: Terser minifies in production (keeps analytics debugging logs)
4. **Output**: `static/js/konflux-analytics.js` — self-contained analytics bundle
5. **Load**: Script loaded via `<script>` tag in `docusaurus.config.ts` (headTags)

**Features:**

- **Cookie Consent Modal**: Vanilla-cookieconsent with PatternFly theming
- **Google Analytics**: gtag with Consent Mode v2 (`analytics_storage: denied` by default)
- **Amplitude**: Loaded with `optOut: true`, updates on consent change
- **Docusaurus SPA Support**: Auto-detects Docusaurus sites and persists consent modal classes across route changes

**Flow:**

```
Page loads (consent=denied)
→ User accepts analytics
→ gtag('consent', 'update', {analytics_storage: 'granted'})
→ Tracking starts
```

**Build:**

```bash
# Analytics script is generated automatically during yarn build
yarn build

# Or manually:
node scripts/build-analytics.js
```

### Custom Navbar Items

Navbar items are registered in `src/theme/NavbarItem/ComponentTypes.tsx` and used via `type: "custom-<name>"` in `docusaurus.config.ts`:

```typescript
// docusaurus.config.ts
navbar: {
  items: [
    { to: '/docs', label: 'Docs', position: 'left' },           // Uses PatternFly Button
    { type: 'custom-githubStars', position: 'right' },           // Live star counter
  ],
}
```
