// @ts-check

// workspaces must be defined in layer order
const workspaces = ["apps", "integrations", "libraries", "core", "incubations"];
const workspacesMayStillDependOn = {
  incubations: ["core/test", "core/build"],
};

/**
 * @type {import("dependency-cruiser").IForbiddenRuleType[]}
 */
const forbidden = [];

for (let i = 0; i < workspaces.length; i++) {
  const higher = workspaces.slice(0, i);
  const workspace = workspaces[i];
  if (higher.length) {
    const mayStillDependOn = workspacesMayStillDependOn[workspace];
    forbidden.push({
      name: `forbidden-dependencies-for-${workspace}`,
      comment: `${workspace} may not depend on ${higher.join(", ")}`,
      severity: "error",
      from: { path: pathForWorkspace(workspace) },
      to: {
        path: higher.map(pathForWorkspace),
        pathNot: mayStillDependOn
          ? mayStillDependOn.map(pathForWorkspace)
          : undefined,
      },
    });
  }
}

/**
 * @type {import("dependency-cruiser").IConfiguration}
 */
const config = {
  forbidden,
  options: {
    tsPreCompilationDeps: true,
    exclude: ["node_modules", ".*/dist/.*"],
    reporterOptions: {
      archi: {
        theme: {
          graph: {
            ranksep: false,
          },
        },
        filters: {
          includeOnly: {
            path: workspaces.map(pathForWorkspace),
          },
          exclude: {},
          focus: {},
          reaches: {},
        },
        collapsePattern: workspaces.map((workspace) => `^${workspace}/.*?/`),
      },
    },
  },
};

/**
 * @param {string} workspace
 * @returns {string}
 */
function pathForWorkspace(workspace) {
  return `^${workspace}/`;
}

module.exports = config;
