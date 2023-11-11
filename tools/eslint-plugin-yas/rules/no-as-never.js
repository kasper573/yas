module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: 'Disallow the use of "as never" in TypeScript',
    },
  },
  create(context) {
    return {
      TSAsExpression(node) {
        if (node.typeAnnotation.type === "TSNeverKeyword") {
          context.report({
            node,
            message: 'Use of "as never" is not allowed.',
          });
        }
      },
    };
  },
};
