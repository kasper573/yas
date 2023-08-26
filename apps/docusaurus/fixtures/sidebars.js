// @ts-check

const { projects } = require("./projects");

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  ...Object.fromEntries(projects.map(({ sidebar }) => sidebar)),
};

module.exports = sidebars;
