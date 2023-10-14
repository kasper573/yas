import type {
  ReactNode,
  ElementType,
  ReactElement,
  ComponentProps,
} from "react";
import type { RuntimeFn } from "@vanilla-extract/recipes";
import { createElement } from "react";
import { clsx } from "clsx";

export function createStyledFactory<Style>(
  compileStyle?: StyleCompiler<Style>,
) {
  type RecipeComponentProps<
    Recipe extends RecipeLike,
    Implementation extends ElementType,
  > = RecipeVariants<Recipe> &
    Omit<ComponentProps<Implementation>, keyof RecipeVariants<Recipe>> & {
      sx?: Style;
      className?: string;
      children?: ReactNode;
    };

  return function styled<
    Implementation extends ElementType,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(
    implementation: Implementation,
    recipe?: Recipe,
    defaultProps?: Partial<RecipeComponentProps<Recipe, Implementation>>,
    shouldForwardProp?: PropForwardTester<
      keyof RecipeComponentProps<Recipe, Implementation>
    >,
  ) {
    function RecipeComponent({
      className: inlineClassName,
      sx,
      ...inlineProps
    }: RecipeComponentProps<Recipe, Implementation>): ReactElement {
      const props = { ...defaultProps, ...inlineProps };
      const [variantProps, forwardedProps] = recipe
        ? destructureVariantProps(props, recipe, shouldForwardProp)
        : [emptyObject, props];
      const className =
        clsx(
          recipe?.(variantProps),
          sx ? compileStyle?.(sx) : undefined,
          inlineClassName,
        ) || undefined;
      return createElement(implementation, {
        className,
        ...forwardedProps,
      });
    }

    return RecipeComponent;
  };
}

const emptyObject = Object.freeze({});

/**
 * Separates the props into variant props and remaining props based on the given recipe
 */
export function destructureVariantProps<
  Props extends Record<string, unknown>,
  Recipe extends RecipeLike,
>(
  allProps: Props,
  recipe: Recipe,
  shouldForwardProp: PropForwardTester<keyof Props> = ({ isVariant }) =>
    !isVariant,
) {
  const variantProps: Record<string, unknown> = {};
  const forwardedProps: Record<string, unknown> = {};
  const variants = recipe.variants();
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
    variantProps as Pick<Props, VariantName<Recipe>>,
    forwardedProps as Omit<Props, VariantName<Recipe>>,
  ] as const;
}

export type PropForwardTester<PropName extends PropertyKey> = (info: {
  name: PropName;
  isVariant: boolean;
}) => boolean;

// The most abstract representation of a sprinkles fn
// This makes the factory compatible without being limited to sprinkles
type StyleCompiler<Style> = (style: Style) => string | undefined;

// Improved vanilla extract type utilities
type RecipeLike = RuntimeFn<Record<string, Record<string, never>>>;
type RecipeVariants<Recipe extends RecipeLike> = StripIndexes<
  Exclude<Parameters<Recipe>[0], undefined>
>;
type VariantName<Recipe extends RecipeLike> = `${string &
  keyof RecipeVariants<Recipe>}`;

// We must strip plain indexes since recipes without variants
// will have their VariantGroups type resolved to { [key: string]: unknown }
type StripIndexes<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};
