const path = require("path");

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: "Prevent imports of specific file extensions",
      category: "Best Practices",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          extensions: { type: "array", items: { type: "string" } },
          message: { type: "string", optional: true },
          exceptions: {
            type: "array",
            items: { type: "string" },
            optional: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create({ filename, report, options: [options] }) {
    return {
      ImportDeclaration(node) {
        if (node.importKind !== "type") {
          const message = assertNoInvalidFileExtension(
            filename,
            node.source?.value,
            options,
          );
          if (message) {
            report({ node, message });
          }
        }
      },

      CallExpression(node) {
        const isRequireOrResolve =
          node.callee.name === "require" ||
          (node.callee.object?.name === "require" &&
            node.callee.property?.name === "resolve");

        if (isRequireOrResolve) {
          const [requirePath] = node.arguments ?? [];
          const message = assertNoInvalidFileExtension(
            filename,
            requirePath?.value,
            options,
          );
          if (message) {
            report({ node, message });
          }
        }
      },

      'MetaProperty[meta.name="import"][property.name="resolve"]': (node) => {
        const [importPath] = node.parent.arguments;
        const message = assertNoInvalidFileExtension(
          filename,
          importPath?.value,
          options,
        );
        if (message) {
          report({ node, message });
        }
      },
    };
  },
};

/**
 * @param {string} sourceFile
 * @param {string} importPath
 * @param {string[]} extensions
 * @param {string[]} exceptions
 * @param {string} [message]
 */
function assertNoInvalidFileExtension(
  sourceFile,
  importPath,
  { extensions, exceptions = [], message },
) {
  if (!importPath) {
    return;
  }
  if (!extensions.includes(path.extname(importPath))) {
    return; // Doesn't seem invalid
  }
  const resolvedPath = tryResolve(sourceFile, importPath);
  if (!resolvedPath) {
    return; // Doesn't exist
  }
  if (exceptions.some((exp) => new RegExp(exp).test(resolvedPath))) {
    return; // Allowed exception
  }
  const error = `import of "${resolvedPath}" uses disallowed file extension`;
  const errorWithMessage = [error, message].filter(Boolean).join(". ");
  return errorWithMessage;
}

/**
 * @param {string} sourceFile
 * @param {string} importPath
 * @return {string | undefined}
 */
function tryResolve(sourceFile, importPath) {
  try {
    return require.resolve(importPath, { paths: [path.dirname(sourceFile)] });
  } catch {}
}

module.exports = rule;
