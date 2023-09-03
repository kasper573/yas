const path = require("path");
const shiki = require("shiki");
const st = require("shiki-twoslash");
const { env } = require("./env");

module.exports = function shikiTwoslashLoader(code) {
  const { resourcePath } = this;
  const callback = this.async();
  const vfsRoot = path.dirname(resourcePath);
  const settings = { vfsRoot, ...getUserSettingsFromEnv() };

  shikiTwoslashCodeToHTML(code, settings).then((html) =>
    callback(null, htmlStringToReactElementModule(html)),
  );
};

function htmlStringToReactElementModule(html) {
  return `
    import React from 'react';
    export default React.createElement("div", { 
      dangerouslySetInnerHTML: { __html: ${JSON.stringify(html)} }
    });
  `;
}

async function shikiTwoslashCodeToHTML(code, settings) {
  const lang = "tsx";
  const { themes = [] } = settings;
  const twoslash = st.runTwoSlash(code, lang, settings);
  if (twoslash) {
    code = twoslash.code;
  }
  const highlighters = await Promise.all(
    themes.map((theme) => shiki.getHighlighter({ theme })),
  );

  let html = "";
  for (let i = 0; i < highlighters.length; i++) {
    const themeName = themes[i];
    const highlighter = highlighters[i];
    html += st.renderCodeToHTML(
      code,
      lang,
      { twoslash: true },
      { ...settings, themeName },
      highlighter,
      twoslash,
    );
  }

  return html;
}

function getUserSettingsFromEnv() {
  return env.userSettingsPath ? require(env.userSettingsPath) ?? {} : {};
}
