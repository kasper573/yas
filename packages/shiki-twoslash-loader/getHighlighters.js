// @ts-check

const shiki = require("shiki");

const highlighterMap = new Map();

/**
 * @param {string} theme
 * @return {Promise<import("shiki").Highlighter>}
 */
async function getHighlighter(theme) {
  let existing = highlighterMap.get(theme);
  if (!existing) {
    existing = shiki.getHighlighter(theme);
    highlighterMap.set(theme, existing);
  }
  return existing;
}

/**
 * @param {string[]} themes
 * @return {Promise<Record<string, import("shiki").Highlighter>>}
 */
function getHighlighters(themes) {
  return Promise.all(themes.map(getHighlighter))
    .then((highlighters) => highlighters.map((h, i) => [themes[i], h]))
    .then(Object.fromEntries);
}

module.exports = { getHighlighters };
