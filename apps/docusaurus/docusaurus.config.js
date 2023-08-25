// @ts-check

const path = require("path");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const getGitBranchName = require("current-git-branch");
const { projects } = require("./fixtures/projects");

const branchName = getGitBranchName();
const yasGithubUrl = "https://github.com/ksandin/yas";
const rootDir = path.resolve(__dirname, "..", "..");
const pathToAppRelativeToRoot = __dirname
  .replace(rootDir, "")
  .replaceAll("\\", "/");

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
          editUrl: `${yasGithubUrl}/tree/${branchName}${pathToAppRelativeToRoot}`,
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
            href: yasGithubUrl,
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
      footer: {
        copyright: `Made by <a href="https://github.com/ksandin">@ksandin</a> using <a href="https://docusaurus.io/">Docusaurus</a>.`,
      },
    }),
};

module.exports = config;
