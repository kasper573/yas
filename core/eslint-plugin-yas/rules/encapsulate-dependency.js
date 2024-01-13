const fs = require("fs");
const { sync: packageUp } = require("pkg-up");

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description:
        "Prevent imports of specific dependencies except from within a specific local package for each given dependency",
      category: "Best Practices",
      recommended: true,
    },
    schema: [{ type: "object" }],
  },

  create({ filename, report, options: [encapsulations] }) {
    const packagePath = packageUp({ cwd: filename });
    const { name: packageName } = JSON.parse(
      fs.readFileSync(packagePath, "utf8"),
    );
    const restrictedEncapsulations = { ...encapsulations };
    delete restrictedEncapsulations[packageName];
    return {
      ImportDeclaration(node) {
        for (const message of assertEncapsulations(
          String(node.source?.value),
          restrictedEncapsulations,
        )) {
          report({ node, message });
        }
      },

      ExportNamedDeclaration(node) {
        for (const message of assertEncapsulations(
          String(node.source?.value),
          restrictedEncapsulations,
        )) {
          report({ node, message });
        }
      },

      ExportAllDeclaration(node) {
        for (const message of assertEncapsulations(
          String(node.source?.value),
          restrictedEncapsulations,
        )) {
          report({ node, message });
        }
      },

      CallExpression(node) {
        const isRequireOrResolve =
          node.callee.name === "require" ||
          (node.callee.object?.name === "require" &&
            node.callee.property?.name === "resolve");

        if (isRequireOrResolve) {
          const [requirePath] = node.arguments ?? [];
          if (requirePath?.value) {
            const messages = assertEncapsulations(
              requirePath?.value,
              encapsulations,
            );
            for (const message of messages) {
              report({ node, message });
            }
          }
        }
      },

      'MetaProperty[meta.name="import"][property.name="resolve"]': (node) => {
        const [importPath] = node.parent.arguments;
        const messages = assertEncapsulations(
          importPath?.value,
          encapsulations,
        );
        for (const message of messages) {
          report({ node, message });
        }
      },
    };
  },
};

/**
 * @param {string} importPath
 * @param {Record<string, string>} encapsulations
 * @returns {string[]}
 */
function assertEncapsulations(importPath, encapsulations) {
  return Object.entries(encapsulations)
    .map(([internalPackageName, thirdPartyPackageName]) =>
      assertEncapsulation(
        importPath,
        internalPackageName,
        thirdPartyPackageName,
      ),
    )
    .filter(Boolean);
}

/**
 * @param {string} importPath
 * @param {string} internalPackageName
 * @param {string} thirdPartyPackageName
 * @returns {string | undefined}
 */
function assertEncapsulation(
  importPath,
  internalPackageName,
  thirdPartyPackageName,
) {
  if (importPath.startsWith(`${thirdPartyPackageName}`)) {
    return `Use "${internalPackageName}" instead of "${thirdPartyPackageName}"`;
  }
}

module.exports = rule;
