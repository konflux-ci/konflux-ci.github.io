import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  clientModules: ["./src/clientModules/htmlDarkClassSync.ts"],
  title: "Konflux",
  tagline: "Secure builds made easy",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://konflux-ci.github.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "konflux-ci", // Usually your GitHub org/user name.
  projectName: "konflux-ci.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: false,

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    function yamlLoader() {
      return {
        name: "yaml-loader-plugin",
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /\.ya?ml$/,
                  use: "yaml-loader",
                },
              ],
            },
          };
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/konflux-social.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: "Konflux",
        src: "img/konflux-dark.svg",
        srcDark: "img/konflux.svg",
        href: "/",
        width: 167,
        height: 43,
      },
      items: [
        {
          to: "/getting-started",
          label: "Getting started",
          position: "left",
        },
        {
          label: "Documentation",
          href: "https://konflux-ci.dev/docs",
          position: "left",
        },
        {
          label: "Community",
          href: "https://github.com/konflux-ci/community",
          position: "left",
        },
        {
          label: "Support",
          href: "https://github.com/konflux-ci/support",
          position: "left",
        },
        // Custom navbar items
        {
          type: "custom-githubStars",
          position: "right",
        },
      ],
    },
    // footer: {
    // },
    // prism: {
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
