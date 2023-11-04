const path = require("path");

/**
 * @type {import("eslint").Rule.RuleModule}
 */
const rule = {
  meta: {
    docs: {
      description: "Prevent the use of exceptions",
      category: "Best Practices",
      recommended: true,
    },
    schema: [
      {
        type: "object",
        properties: {
          message: { type: "string", optional: true },
        },
        additionalProperties: false,
      },
    ],
  },

  create({ report, options: [{ message = "" } = {}] }) {
    return {
      ThrowStatement(node) {
        report({
          node,
          message: `Using the throw keyword is not allowed. ${message}`,
        });
      },
      'CallExpression[callee.object.name="Promise"][callee.property.name="reject"]'(
        node,
      ) {
        report({
          node,
          message: `Using Promise.reject is not allowed. ${message}`,
        });
      },
    };
  },
};

module.exports = rule;
