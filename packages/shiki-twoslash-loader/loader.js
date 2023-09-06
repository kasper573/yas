// @ts-check

const fs = require("fs");
const path = require("path");
const { renderHtml } = require("./renderHtml");
const { getHighlighters } = require("./getHighlighters");

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
