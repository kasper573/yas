// @ts-check

// workspaces must be defined in layer order
const workspaces = ["apps", "integrations", "libraries", "core", "incubations"];
const workspacesMayStillDependOn = {
  incubations: ["core"],
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
      from: { path: pathForWorkspaces([workspace]) },
      to: {
        path: pathForWorkspaces(higher),
        pathNot: mayStillDependOn
          ? pathForWorkspaces(mayStillDependOn)
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
        filters: {
          includeOnly: {
            path: pathForWorkspaces(workspaces),
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
 * @param {string[]} workspaces
 * @returns {string}
 */
function pathForWorkspaces(workspaces) {
  return `^(${workspaces.join("|")})/`;
}

module.exports = config;
