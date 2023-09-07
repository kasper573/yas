// @ts-check

const fs = require("fs");
const path = require("path");
const shiki = require("shiki");
const st = require("shiki-twoslash");

const highlighterMap = new Map();
const userSettings = getUserSettings();

module.exports = function shikiTwoslashLoader(code) {
  const callback = this.async();

  const vfsRoot = path.dirname(this.resourcePath);
  const settings = { vfsRoot, themes: [], ...userSettings };

  getHighlighters(settings.themes).then((highlighters) => {
    const result = renderHtml("tsx", code, settings, highlighters);
    if (result.type === "error") {
      callback(new Error(result.message));
    } else {
      callback(null, htmlStringToReactElementModule(result.html));
    }
  });
};

function htmlStringToReactElementModule(html) {
  return `
    import React from 'react';
    export default React.createElement("div", { 
      dangerouslySetInnerHTML: { __html: ${JSON.stringify(html)} }
    });
  `;
}

function getUserSettings() {
  const configFile = path.join(process.cwd(), "shiki-twoslash.config.js");
  if (fs.existsSync(configFile)) {
    return require(configFile) ?? {};
  }
  return {};
}

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

/**
 * @param {string} lang
 * @param {string} code
 * @param {import("shiki-twoslash").UserConfigSettings} settings
 * @param {Record<string, import("shiki").Highlighter>} highlightersByTheme
 * @return {{type: "error", message: string}|{type: "success", html: string}}
 */
function renderHtml(lang, code, settings, highlightersByTheme) {
  const { themes = [] } = settings;

  let twoslash;

  try {
    twoslash = st.runTwoSlash(code, lang, settings);
    if (twoslash) {
      code = twoslash.code;
    }
  } catch (e) {
    return { type: "error", message: e.message };
  }

  if (!themes.length) {
    return { type: "error", message: "Cannot render twoslash without themes" };
  }

  let html = "";
  for (const themeName of themes) {
    html += st.renderCodeToHTML(
      code,
      lang,
      { twoslash: true },
      { ...settings, themeName },
      highlightersByTheme[themeName],
      twoslash,
    );
  }

  return { type: "success", html };
}
