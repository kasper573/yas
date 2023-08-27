const ts = require("typescript");

module.exports = function sliceLoader(fileContent) {
  const scriptFile = ts.createSourceFile(
    this.resourcePath ?? "",
    fileContent,
    ts.ScriptTarget.ESNext,
  );

  const codeSliceByExportName = scriptFile.statements.reduce((record, node) => {
    const slice = node.getText(scriptFile);
    const exportName = getExportName(node);
    if (exportName && slice) {
      record[exportName] = slice;
    }
    return record;
  }, {});

  return toSerializedModule(codeSliceByExportName);
};

function toSerializedModule(exports) {
  return `export default ${JSON.stringify(exports)}`;
}

/**
 * @param {import("typescript").Node} rootStatement
 * @returns {string|undefined}
 */
function getExportName(rootStatement) {
  if (ts.isVariableStatement(rootStatement)) {
    const mods = ts.getModifiers(rootStatement);
    const isExport = mods?.find((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (isExport) {
      const nameNode = rootStatement.declarationList.declarations[0].name;
      if (ts.isIdentifier(nameNode)) {
        return nameNode.escapedText;
      }
    }
  }
}
