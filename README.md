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
├── data/                        # YAML content files (landing, navigation, getting-started)
├── docs/                        # Documentation pages (.md / .mdx)
├── blog/                        # Blog posts
├── src/
│   ├── components/
│   │   ├── ui/                  # Reusable UI primitives
│   │   │   ├── IconCircle       # Circular icon container
│   │   │   ├── ArrowSvg         # SVG arrow connector
│   │   │   ├── SectionHeader    # Section label + heading + subtitle
│   │   │   ├── GradientBackground  # Decorative gradient overlay
│   │   │   ├── DataDrivenButton # YAML-driven link button
│   │   │   └── DynamicIcon      # Resolves PF icon by string name
│   │   ├── Landing/             # Landing page sections
│   │   │   ├── HeroSection
│   │   │   ├── WhyKonfluxSection
│   │   │   ├── TourFactorySection
│   │   │   ├── LifecycleSection
│   │   │   └── BottomCTASection
│   │   └── NavbarItems/         # Custom PatternFly navbar items
│   │       ├── DefaultNavbarItem  # PF Button-based nav link
│   │       ├── GitHubStars        # Live GitHub star counter
│   │       └── CustomButton       # Navbar CTA button
│   ├── theme/                   # Swizzled Docusaurus theme components
│   │   ├── Navbar/              # Wrapped (pass-through)
│   │   ├── NavbarItem/          # Ejected ComponentTypes (custom item registry)
│   │   ├── Footer/              # Ejected (custom PatternFly footer)
│   │   └── Layout/              # Wrapped (pass-through)
│   ├── clientModules/           # Browser-side scripts (theme sync)
│   ├── css/                     # Stylesheets
│   ├── pages/                   # Standalone pages
│   └── types/                   # TypeScript type definitions
├── static/                      # Static assets (images, fonts, favicons)
├── docusaurus.config.ts         # Site configuration
└── sidebars.ts                  # Sidebar structure
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
