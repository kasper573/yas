// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const { projects } = require("./fixtures/projects");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Yet Another Stack",
  tagline: "A collection of React and Typescript libraries",
  favicon: "img/favicon.ico",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  organizationName: "ksandin",
  projectName: "yas",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: ["@docusaurus/theme-live-codeblock"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./fixtures/sidebars.js"),
          editUrl:
            "https://github.com/ksandin/yas/tree/main/packages/docusaurus/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/ksandin/yas/tree/main/packages/docusaurus/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
          src: "img/logo.png",
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
            href: "https://github.com/ksandin/yas",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: "typescript",
      },
      liveCodeBlock: {
        playgroundPosition: "bottom",
      },
    }),
};

module.exports = config;
