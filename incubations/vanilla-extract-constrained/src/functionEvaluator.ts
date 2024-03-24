/**
 * Enables runtime support for functional constrained properties.
 * The support is really basic and only works for pure self contained functions.
 */
export const functionEvaluator = (functionDefinitionCode: string) => {
  const fn = eval(`(${functionDefinitionCode})`);
  return (...args: unknown[]) => {
    try {
      return fn(...args);
    } catch (e) {
      throw new Error(
        `${e}.\n\nRuntime evaluation of functional constrained properties is very limited ` +
          `due to serialization requirements set by vanilla-extract, so only pure self contained functions are supported.`,
      );
    }
  };
};
