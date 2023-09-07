// @ts-check

const { renderHtml } = require("shiki-twoslash-loader/renderHtml");
const { getHighlighters } = require("shiki-twoslash-loader/getHighlighters");

/**
 * @param {import("shiki-twoslash").UserConfigSettings} settings
 */
function remarkPlugin(settings = {}) {
  async function transform(ast) {
    // Async import since these packages are all in ESM
    const { visit, SKIP } = await import("unist-util-visit");
    const { mdxFromMarkdown } = await import("mdast-util-mdx");
    const { fromMarkdown } = await import("mdast-util-from-markdown");
    const { mdxjs } = await import("micromark-extension-mdxjs");

    const { themes = [] } = settings;
    const highlighters = await getHighlighters(themes);

    visit(ast, "code", (node) => {
      const { lang, meta, value: code } = node;
      if (!meta?.includes("twoslash")) {
        return;
      }

      const twoslash = renderHtml(lang, code, settings, highlighters);
      if (twoslash.type === "error") {
        throw new Error(twoslash.message);
      }

      // This is a horror show, but it's the only way I could get the raw HTML into MDX.
      const escapedHtml = JSON.stringify(twoslash.html);
      const jsx = `<div dangerouslySetInnerHTML={{__html: ${escapedHtml} }}/>`;
      const rawHtmlNode = fromMarkdown(jsx, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()],
      }).children[0];

      Object.assign(node, rawHtmlNode);

      return SKIP;
    });
  }

  return transform;
}

module.exports = remarkPlugin;
