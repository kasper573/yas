const ts = require("typescript");
const { getModifiers } = require("typescript");

module.exports = function sliceLoader(fileContent) {
  const { query, resourceQuery, resourcePath } = this;
  const { names: exportNames } = parseQuery(resourceQuery ?? query);

  const scriptFile = ts.createSourceFile(
    this.resourcePath,
    fileContent,
    ts.ScriptTarget.ESNext,
  );

  const codeSliceByExportName = Object.fromEntries(
    exportNames
      .map((requestedExportName) => {
        const node = scriptFile.statements.find(
          (node) => getExportName(node) === requestedExportName,
        );
        if (!node) {
          throw new Error(
            `Module ${resourcePath} does not contain an export with name "${requestedExportName}".`,
          );
        }
        return [requestedExportName, node?.getText(scriptFile)];
      })
      .filter(([_, node]) => node),
  );

  return toSerializedModule(codeSliceByExportName);
};

function toSerializedModule(exports) {
  return `export default ${JSON.stringify(exports)}`;
}

/**
 * @param {import("typescript").Node} node
 * @returns {string|undefined}
 */
function getExportName(node) {
  if (ts.isVariableStatement(node)) {
    const mods = getModifiers(node);
    const isExport = mods?.find((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (isExport) {
      const nameNode = node.declarationList.declarations[0].name;
      if (ts.isIdentifier(nameNode)) {
        return nameNode.escapedText;
      }
    }
  }
}

function parseQuery(query) {
  if (typeof query === "object") {
    return query;
  }
  const prefix = `?names=`;
  return {
    names: query
      .slice(prefix.length)
      .split(",")
      .map((s) => s.trim()),
  };
}
