const path = require("path");
const { configureDocusaurusWebpackConfig } = require("@yas/build/webpack");
const { projects } = require("./fixtures/projects");
const { env } = require("./src/env");

const rootDir = path.resolve(__dirname, "..", "..");
const pathToAppRelativeToRoot = __dirname
  .replace(rootDir, "")
  .replaceAll("\\", "/");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Yet Another Stack",
  tagline: "A collection of React and Typescript libraries",
  favicon: "img/favicon.ico",
  url: env.docsUrl,
  baseUrl: "/",
  organizationName: env.git.owner,
  projectName: env.git.project,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    env.analytics ? "@gracefullight/docusaurus-plugin-vercel-analytics" : false,
    () => ({
      name: "webpack-customization-plugin",
      configureWebpack: (config) => {
        configureDocusaurusWebpackConfig(config, { cache: env.webpackCache });
      },
    }),
  ],

  clientModules: [require.resolve("./src/synchronizeYasCSSTheme.ts")],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./fixtures/sidebars.js"),
          editUrl: env.git.sourceUrl(pathToAppRelativeToRoot),
        },
        pages: {
          // Don't treat typesafe css files as pages
          exclude: ["*.css.ts"],
        },
        theme: {
          customCss: require.resolve("./src/styles/global.css.ts"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/card.png",
      navbar: {
        title: "YAS",
        logo: {
          alt: "YAS Logo",
          src: "img/logo.webp",
          width: 32,
          height: 32,
        },
        items: [
          ...projects
            .filter((p) => p.sidebar)
            .map(({ sidebar: [sidebarId], title }) => ({
              type: "docSidebar",
              sidebarId,
              position: "left",
              label: title,
            })),
          {
            href: env.git.projectUrl,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        copyright:
          `Made by <a href="${env.git.ownerUrl}">@${env.git.owner}</a> ` +
          `using <a href="https://docusaurus.io/">Docusaurus</a>.`,
      },
    }),
};

module.exports = config;
