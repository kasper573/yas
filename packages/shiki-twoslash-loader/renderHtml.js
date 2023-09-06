// @ts-check

const st = require("shiki-twoslash");

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

module.exports = { renderHtml };
