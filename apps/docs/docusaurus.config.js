// @ts-check

const path = require("path");

// @ts-expect-error Prisms types seem to not play well with Docusaurus, but they work. Just silence this error.
const { themes: prismThemes } = require("prism-react-renderer");
const getGitBranchName = require("current-git-branch");
const remarkShikiTwoslash = require("remark-shiki-twoslash").default;
const { projects } = require("./fixtures/projects");
const shikiTwoslashOptionsPath = require.resolve("./shiki-twoslash.config");

// eslint-disable-next-line no-restricted-syntax
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

    plugins: ["docusaurus-plugin-sass"],

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
