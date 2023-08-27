const { projects } = require("./projects");

const sidebars = {
  ...Object.fromEntries(projects.map(({ sidebar }) => sidebar)),
};

module.exports = sidebars;
