const path = require("path");
const shiki = require("shiki");
const st = require("shiki-twoslash");

module.exports = function shikiTwoslashLoader(code) {
  const { resourcePath } = this;
  const callback = this.async();
  const lang = "tsx";
  const vfsRoot = path.dirname(resourcePath);
  const settings = { vfsRoot, themes: ["nord", "min-light"] };

  shikiTwoslashCodeToHTML(code, lang, settings).then((html) =>
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

async function shikiTwoslashCodeToHTML(code, lang, settings) {
  const { themes } = settings;
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
