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
            node.source.value,
            options,
          );
          if (message) {
            report({ node, message });
          }
        }
      },

      CallExpression(node) {
        const [requirePath] = node.arguments ?? [];
        if (node.callee.name === "require") {
          const message = assertNoInvalidFileExtension(
            filename,
            requirePath.value,
            options,
          );
          if (message) {
            report({ node, message });
          }
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

function tryResolve(sourceFile, importPath) {
  try {
    return require.resolve(importPath, { paths: [sourceFile] });
  } catch {}
}

module.exports = rule;
