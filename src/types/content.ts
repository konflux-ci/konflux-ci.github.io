// TypeScript interfaces for YAML content data files.
// These types match the structure of files in /data/*.yaml.

import { LabelProps } from "@patternfly/react-core";

// ─── Navigation (/data/navigation.yaml) ──────────────────────────

export interface NavChildItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  hasDropdown?: boolean;
  children?: NavChildItem[];
}

export interface HeaderLogo {
  src: string;
  alt: string;
  href: string;
}

export interface GitHubStars {
  href: string;
  count: string;
}

export interface HeaderData {
  logo: HeaderLogo;
  nav: NavItem[];
  githubStars: GitHubStars;
  searchShortcut: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterBottomBar {
  copyright: string;
  links: FooterLink[];
}

export interface FooterData {
  tagline: string;
  columns: FooterColumn[];
  bottomBar: FooterBottomBar;
}

export interface NavigationData {
  header: HeaderData;
  footer: FooterData;
}

// ─── Landing Page (/data/landing.yaml) ───────────────────────────

export interface CTAButton {
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

export interface DataLink {
  label?: string;
  href: string;
  isExternal?: boolean;
  icon?: string;
}

export interface PipelineBadge {
  label: string;
  icon: string;
  color: LabelProps["color"];
}

export interface PipelineSourceCode {
  label: string;
  icons: string[];
}

export interface PipelineFactory {
  icon: string;
  title: string;
  subtitle: string;
  techBadges: string[];
}

export interface PipelineVerifiedOutput {
  label: string;
  badges: PipelineBadge[];
}

export interface PipelineDiagramData {
  sourceCode: PipelineSourceCode;
  factory: PipelineFactory;
  verifiedOutput: PipelineVerifiedOutput;
}

export interface HeroData {
  headline: string;
  subtitle: string;
  tagline: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
  pipelineDiagram: PipelineDiagramData;
}

export interface FeatureCard {
  icon: string;
  image: string;
  title: string;
  description: string;
  link: DataLink;
}

export interface WhyKonfluxData {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  cards: FeatureCard[];
}

export interface FactoryComponent {
  icon: string;
  title: string;
  link: DataLink;
  description: string;
}

export interface TourFactoryData {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  components: FactoryComponent[];
}

export interface LifecycleStep {
  icon: string;
  title: string;
  subtitle: string;
  detailTitle: string;
  description: string;
  badges: string[];
}

export interface HowItWorksData {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  steps: LifecycleStep[];
}

export interface BottomCTAData {
  checkIcons: number;
  heading: string;
  subtitle: string;
  primaryCTA: CTAButton;
  secondaryCTA: CTAButton;
}

export interface EditLinkData {
  label: string;
  href: string;
}

export interface LandingData {
  hero: HeroData;
  whyKonflux: WhyKonfluxData;
  tourTheFactory: TourFactoryData;
  howItWorks: HowItWorksData;
  bottomCTA: BottomCTAData;
  editLink: EditLinkData;
}

// ─── Getting Started (/data/getting-started.yaml) ────────────────

export interface Breadcrumb {
  label: string;
  href: string;
}

export interface GettingStartedStep {
  number: number;
  icon: string;
  title: string;
  description: string;
  items: string[];
}

export interface QuickLinkItem {
  title: string;
  description: string;
  href: string;
}

export interface QuickLinksData {
  title: string;
  icon: string;
  items: QuickLinkItem[];
}

export interface TerminalBlockData {
  commands: string;
  linkLabel: string;
  linkHref: string;
}

export interface GettingStartedData {
  breadcrumbs: Breadcrumb[];
  title: string;
  subtitle: string;
  steps: GettingStartedStep[];
  quickLinks: QuickLinksData;
  terminalBlock: TerminalBlockData;
  bottomCTA: {
    heading: string;
    subtitle: string;
    primaryCTA: CTAButton;
    secondaryCTA: CTAButton;
  };
}

// ─── Try Konflux Page (/data/try-konflux.yaml) ───────────────

export interface InstallationOption {
  icon: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  features: string[];
  link: DataLink;
}

export interface ComparisonTableColumn {
  label: string;
  key: string;
}

export interface ComparisonTableRow {
  feature: string;
  [key: string]: string; // Dynamic columns (kind, tsfcli, etc.)
}

export interface ComparisonTable {
  heading: string;
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
}

export interface TryKonfluxData {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  installationOptions: InstallationOption[];
  comparisonTable: ComparisonTable;
}
