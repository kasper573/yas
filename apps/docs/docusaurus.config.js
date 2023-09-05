// @ts-check
const path = require("path");

// @ts-expect-error Prisms types seem to not play well with Docusaurus, but they work. Just silence this error.
const { themes: prismThemes } = require("prism-react-renderer");
const remarkShikiTwoslash = require("remark-shiki-twoslash").default;
const { projects } = require("./fixtures/projects");
const { env } = require("./src/env");

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
      "docusaurus-plugin-sass",
      env.analytics
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
            editUrl: env.git.sourceUrl(pathToAppRelativeToRoot),
            remarkPlugins: [
              [remarkShikiTwoslash, require("./shiki-twoslash.config")],
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
              href: env.git.projectUrl,
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
          copyright:
            `Made by <a href="${env.git.ownerUrl}">@${env.git.owner}</a> ` +
            `using <a href="https://docusaurus.io/">Docusaurus</a>.`,
        },
      }),
  };
  return config;
};
