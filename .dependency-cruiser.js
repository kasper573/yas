// @ts-check

// workspaces must be defined in layer order
const workspaces = ["apps", "integrations", "libraries", "core", "incubations"];
const workspacesMayStillDependOn = {
  incubations: ["^core/test/", "^core/build/"],
  core: ["^libraries/validate/", "^libraries/result/"],
  integrations: ["^apps/.*?-server/.*.graphql"],
};

/**
 * @type {import("dependency-cruiser").IForbiddenRuleType[]}
 */
const forbidden = [];

for (let i = 0; i < workspaces.length; i++) {
  const higher = workspaces.slice(0, i);
  const ws = workspaces[i];
  if (higher.length) {
    const mayStillDependOn = workspacesMayStillDependOn[ws];
    forbidden.push({
      name: `forbidden-dependencies-for-${ws}`,
      comment:
        `${ws} may not depend on ${higher.join(", ")}` +
        (mayStillDependOn ? ` (except ${mayStillDependOn.join(", ")})` : ""),
      severity: "error",
      from: { path: wsPath(ws) },
      to: {
        path: higher.map(wsPath),
        pathNot: mayStillDependOn ? mayStillDependOn : undefined,
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
          includeOnly: { path: workspaces.map(wsPath) },
          exclude: {
            // Reason for hiding these:
            // - incubations: about-to-be 3rd party packages, so not relevant to architecture.
            // - core: used by almost every single package, so it's more distracting than informative to show these.
            path: ["core", "incubations"].map(wsPath),
          },
          focus: {},
          reaches: {},
        },
        collapsePattern: workspaces.map((ws) => `^${ws}/.*?/`),
      },
    },
  },
};

/**
 * @param {string} workspace
 * @returns {string}
 */
function wsPath(workspace) {
  return `^${workspace}/`;
}

module.exports = config;
