/**
 * Separates the props into variant props and remaining props based on the given recipe
 */
export function destructureVariantProps<
  Props extends Record<PropertyKey, unknown>,
  Variants extends PropertyKey[],
>(
  allProps: Props,
  variants: Variants,
  shouldForwardProp: PropForwardTester<keyof Props> = ({ isVariant }) =>
    !isVariant,
) {
  const variantProps: Record<string, unknown> = {};
  const forwardedProps: Record<string, unknown> = {};
  for (const prop in allProps) {
    const isVariant = variants.includes(prop);
    if (isVariant) {
      variantProps[prop] = allProps[prop];
    }
    if (shouldForwardProp({ name: prop, isVariant })) {
      forwardedProps[prop] = allProps[prop];
    }
  }
  return [
    variantProps as Pick<Props, Variants[number]>,
    forwardedProps as Omit<Props, Variants[number]>,
  ] as const;
}

export type PropForwardTester<PropName extends PropertyKey = PropertyKey> =
  (info: { name: PropName; isVariant: boolean }) => boolean;
