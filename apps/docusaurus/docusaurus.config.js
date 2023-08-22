// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const sidebars = require("./sidebars");

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

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
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
    [
      "docusaurus-preset-shiki-twoslash",
      {
        themes: ["min-light", "nord"],
      },
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
          ...Object.keys(sidebars).map((sidebarId) => ({
            type: "docSidebar",
            sidebarId,
            position: "left",
            label: sidebarId,
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
      },
    }),
};

module.exports = config;
