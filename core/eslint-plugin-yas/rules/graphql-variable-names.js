module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "assert that the names of graphql operations according to the specified function",
      category: "Best Practices",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          // A serialized function that takes the operation name and returns the expected variable name.
          // Will be evaluated using `eval`
          variableNameCode: { type: "string" },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      mismatch:
        `The variable name "{{ variableName }}" does not match the expected name "{{ expectedName }}" ` +
        `derived from the operation name "{{ operationName }}".`,
    },
  },

  create({ report, options: [{ variableNameCode = "(op) => op" }] }) {
    const deriveVariableName = eval(`(${variableNameCode})`);

    return {
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "CallExpression" &&
          node.init.callee.name === "graphql" &&
          node.init.arguments.length > 0 &&
          node.init.arguments[0].type === "TemplateLiteral"
        ) {
          const { quasis } = node.init.arguments[0];
          const operationMatch = quasis[0].value.raw.match(
            /\b(mutation|query|subscription)\s+(\w+)/,
          );

          if (operationMatch) {
            const [, operationType, operationName] = operationMatch;
            const expectedVariableName = deriveVariableName(operationName);
            const variableName = node.id.name;
            if (expectedVariableName !== variableName) {
              report({
                node: node.id,
                messageId: "mismatch",
                data: {
                  variableName,
                  expectedName: expectedVariableName,
                  operationName: `${operationType} ${operationName}`,
                },
              });
            }
          }
        }
      },
    };
  },
};
