// @ts-check

const { renderHtml } = require("shiki-twoslash-loader/renderHtml");
const { getHighlighters } = require("shiki-twoslash-loader/getHighlighters");

function remarkPlugin(settings = {}) {
  return async function enhancedTransform(ast) {
    const { themes = [] } = settings;
    const { visit } = await import("unist-util-visit");
    const highlighters = await getHighlighters(themes);
    visit(ast, "code", (node) => {
      if (!node.meta?.includes("twoslash")) {
        return;
      }
      const r = renderHtml(node.lang, node.value, settings, highlighters);
      node.type = "html";
      node.value = r.type === "error" ? `<pre>${r.message}</pre>` : r.html;
    });
  };
}

module.exports = remarkPlugin;
