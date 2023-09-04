// Using environment variables via process.env is okay since docusaurus is kind of an edge case for now.
/* eslint-disable no-restricted-syntax */

// @ts-check
const path = require("path");

// @ts-expect-error Prisms types seem to not play well with Docusaurus, but they work. Just silence this error.
const { themes: prismThemes } = require("prism-react-renderer");
const getGitBranchName = require("current-git-branch");
const remarkShikiTwoslash = require("remark-shiki-twoslash").default;
const { projects } = require("./fixtures/projects");
const shikiTwoslashOptionsPath = require.resolve("./shiki-twoslash.config");

// A bit unconventional, but it's how we pass options to shiki-twoslash-loader.
process.env.SHIKI_TWOSLASH_SETTINGS_PATH = shikiTwoslashOptionsPath;

const branchName = getGitBranchName();
const yasGithubUrl = "https://github.com/ksandin/yas";
const rootDir = path.resolve(__dirname, "..", "..");
const pathToAppRelativeToRoot = __dirname
  .replace(rootDir, "")
  .replaceAll("\\", "/");

module.exports = async function createConfig() {
  // Using async import since it is allows us to import ESM modules in CommonJS modules.
  // https://github.com/facebook/docusaurus/issues/5379#issuecomment-1525220908
  const { nodeTypes } = await import("@mdx-js/mdx");
  const rehypeRaw = (await import("rehype-raw")).default;

  /** @type {import('@docusaurus/types').Config} */
  const config = {
    title: "Yet Another Stack",
    tagline: "A collection of React and Typescript libraries",
    favicon: "img/favicon.ico",
    url: process.env.DOCS_URL ?? "",
    baseUrl: "/",
    organizationName: "ksandin",
    projectName: "yas",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "throw",
    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

    plugins: [
      "docusaurus-plugin-sass",
      process.env.VERCEL
        ? "@gracefullight/docusaurus-plugin-vercel-analytics"
        : false,
    ],

    presets: [
      [
        "classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve("./fixtures/sidebars.js"),
            editUrl: `${yasGithubUrl}/tree/${branchName}${pathToAppRelativeToRoot}`,
            remarkPlugins: [
              [remarkShikiTwoslash, require(shikiTwoslashOptionsPath)],
            ],
            // Using rehype-raw to make remark-shiki-twoslash work with mdx v2
            // (Works around this error: https://github.com/shikijs/twoslash/issues/125)
            rehypePlugins: [[rehypeRaw, { passThrough: nodeTypes }]],
          },
          theme: {
            customCss: require.resolve("./src/styles/global.scss"),
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
              href: yasGithubUrl,
              label: "GitHub",
              position: "right",
            },
          ],
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
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
  return config;
};
