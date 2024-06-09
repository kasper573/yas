import type { CSSVar } from "./transformVar";

/**
 * Exactly like assignVars from @vanilla-extract/css, but won't throw an error if there are excess values.
 */
export function assignVars<Property extends string>(
  vars: VarContract<Property>,
  values: NoInfer<Record<Property, string>>,
): Record<CSSVar, string> {
  return Object.fromEntries(
    Object.entries(vars).map(([property, variable]) => [
      variable,
      values[property as Property],
    ]),
  );
}

export type VarContract<Property extends string> = Record<Property, CSSVar>;

type NoInfer<T> = [T][T extends any ? 0 : never];
