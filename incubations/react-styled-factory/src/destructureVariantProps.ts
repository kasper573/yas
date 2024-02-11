import type { PropForwardTester } from "./types";

export function destructureVariantProps<
  Props extends Record<PropertyKey, unknown>,
  VariantNames extends PropertyKey[],
>(
  allProps: Props,
  variantNames: VariantNames,
  shouldForwardProp: PropForwardTester<keyof Props> = ({ isVariant }) =>
    !isVariant,
) {
  const variantProps: Record<string, unknown> = {};
  const forwardedProps: Record<string, unknown> = {};
  for (const prop in allProps) {
    const isVariant = variantNames.includes(prop);
    if (isVariant) {
      variantProps[prop] = allProps[prop];
    }
    if (shouldForwardProp({ name: prop, isVariant })) {
      forwardedProps[prop] = allProps[prop];
    }
  }
  return [
    variantProps as Pick<Props, VariantNames[number]>,
    forwardedProps as Omit<Props, VariantNames[number]>,
  ] as const;
}
