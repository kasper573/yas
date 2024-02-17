// @ts-check

/**
 * @param {Array<string[]>} workspaces
 */
function generateForbiddenRules(workspaces) {
  /**
   * @type {import("dependency-cruiser").IForbiddenRuleType[]}
   */
  const rules = [];

  for (let i = 0; i < workspaces.length; i++) {
    const highers = workspaces[i];
    const lowers = workspaces.slice(i + 1);
    if (lowers.length) {
      rules.push({
        name: `layer`,
        comment: `Packages must not depend on any package in a higher layer`,
        severity: "error",
        from: { path: lowers.map((lower) => `^${lower}/`) },
        to: { path: highers.map((higher) => `${higher}/`) },
      });
    }
  }

  return rules;
}

const workspacesInLayerOrder = [
  "apps",
  "integrations",
  "libraries",
  "incubations",
  "core",
].map((item) => (Array.isArray(item) ? item : [item]));

/**
 * @type {import("dependency-cruiser").IConfiguration}
 */
const config = {
  forbidden: generateForbiddenRules(workspacesInLayerOrder),
  options: {
    tsPreCompilationDeps: true,
    exclude: ["node_modules", ".*/dist/.*", "^.*?.js"],
    reporterOptions: {
      archi: {
        filters: {
          includeOnly: {
            path: workspacesInLayerOrder.flat(),
          },
          exclude: {},
          focus: {},
          reaches: {},
        },
        collapsePattern: workspacesInLayerOrder
          .flat()
          .map((workspace) => `^${workspace}/.*?/`),
      },
    },
  },
};

module.exports = config;
