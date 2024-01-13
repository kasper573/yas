const path = require("path");

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description:
        "Prevent importing anything but sibling files or node modules",
      category: "Best Practices",
      recommended: true,
    },
    schema: [{ type: "array", items: { type: "string" } }],
  },

  create({ filename, report, options: [directoriesInAtomicOrder] }) {
    const index = directoriesInAtomicOrder.findIndex((directory) =>
      isDescendantOf(filename, directory),
    );
    if (index === -1) {
      return {}; // Should not be atomic
    }
    const acceptableDependencies = directoriesInAtomicOrder.slice(index + 1);
    return {
      ImportDeclaration(node) {
        for (const message of assertAtomicDependency(
          String(node.source?.value),
          filename,
          acceptableDependencies,
        )) {
          report({ node, message });
        }
      },

      ExportNamedDeclaration(node) {
        for (const message of assertAtomicDependency(
          String(node.source?.value),
          filename,
          acceptableDependencies,
        )) {
          report({ node, message });
        }
      },

      ExportAllDeclaration(node) {
        for (const message of assertAtomicDependency(
          String(node.source?.value),
          filename,
          acceptableDependencies,
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
            const messages = assertAtomicDependency(
              requirePath?.value,
              filename,
              acceptableDependencies,
            );
            for (const message of messages) {
              report({ node, message });
            }
          }
        }
      },

      'MetaProperty[meta.name="import"][property.name="resolve"]': (node) => {
        const [importPath] = node.parent.arguments;
        const messages = assertAtomicDependency(
          importPath?.value,
          filename,
          acceptableDependencies,
        );
        for (const message of messages) {
          report({ node, message });
        }
      },
    };
  },
};

/**
 * @param {string} relativeDependencyPath
 * @param {string} filename
 * @param {string[]} lowerAtomicDirectories
 * @returns {string[]}
 */
function assertAtomicDependency(
  relativeDependencyPath,
  filename,
  lowerAtomicDirectories,
) {
  const isAbsolute = !relativeDependencyPath.startsWith(".");
  if (isAbsolute) {
    return [];
  }

  const dirname = path.dirname(filename);
  const absoluteDependencyPath = path.resolve(dirname, relativeDependencyPath);
  const absoluteDependencyDirectory = path.dirname(absoluteDependencyPath);
  const siblingImportLike = "./" + withoutExtension(path.basename(filename));

  const isSibling =
    dirname === absoluteDependencyDirectory &&
    (relativeDependencyPath.startsWith(siblingImportLike + ".") ||
      relativeDependencyPath === siblingImportLike);

  if (isSibling) {
    return [];
  }

  const isLowerAtomicOrder = lowerAtomicDirectories.some((directory) =>
    isDescendantOf(absoluteDependencyDirectory, directory),
  );

  if (isLowerAtomicOrder) {
    return [];
  }

  return [
    `Importing from "${relativeDependencyPath}" is not allowed. This file  must be atomic. ` +
      `May only depend on sibling files, absolute imports, or modules of a lower atomic order.`,
    // JSON.stringify(
    //   {
    //     filename,
    //     dirname,
    //     relativeDependencyPath,
    //     absoluteDependencyPath,
    //     absoluteDependencyDirectory,
    //     lowerAtomicDirectories,
    //     siblingImportLike,
    //   },
    //   null,
    //   2,
    // ),
  ];
}

/**
 * @param {string} filename
 * @param {string} directory
 */
function isDescendantOf(filename, directory) {
  return path.resolve(filename).startsWith(path.resolve(directory));
}

function withoutExtension(filename) {
  return filename.replace(/\..*$/, "");
}

module.exports = rule;
