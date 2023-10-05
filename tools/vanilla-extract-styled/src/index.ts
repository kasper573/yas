import type {
  ReactNode,
  ElementType,
  ReactElement,
  ComponentProps,
} from "react";
import type { ComplexStyleRule } from "@vanilla-extract/css";
import type {
  RuntimeFn,
  RecipeVariants as RecipeVariantsImpl,
} from "@vanilla-extract/recipes";
import { createElement } from "react";
import { clsx } from "clsx";

export function createStyledFactory<Sx>(sxToClassName?: SxToClassName<Sx>) {
  type RecipeComponentProps<
    Recipe extends RecipeLike,
    Implementation extends ElementType,
  > = RecipeVariants<Recipe> &
    ComponentProps<Implementation> & {
      sx?: Sx;
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
  ) {
    function RecipeComponent({
      className: inlineClassName,
      sx,
      ...inlineProps
    }: RecipeComponentProps<Recipe, Implementation>): ReactElement {
      const props = { ...defaultProps, ...inlineProps };
      const [variantProps, remainingProps] = recipe
        ? destructureVariantProps(props, recipe)
        : [emptyObject, props];
      const className =
        clsx(
          recipe?.(variantProps),
          sx ? sxToClassName?.(sx) : undefined,
          inlineClassName,
        ) || undefined;
      return createElement(implementation, {
        className,
        ...remainingProps,
      });
    }

    return RecipeComponent;
  };
}

const emptyObject = Object.freeze({});

/**
 * Selects the props corresponding to the variant names of the given recipe
 */
export function variantProps<
  Props extends Record<string, unknown>,
  Recipe extends RecipeLike,
>(props: Props, recipe: Recipe): Pick<Props, VariantName<Recipe>> {
  return destructureVariantProps(props, recipe)[0];
}

/**
 * Separates the props into variant props and remaining props based on the given recipe
 */
export function destructureVariantProps<
  Props extends Record<string, unknown>,
  Recipe extends RecipeLike,
>(allProps: Props, recipe: Recipe) {
  const variantProps: Record<string, unknown> = {};
  const remainingProps: Record<string, unknown> = {};
  const variants = recipe.variants();
  for (const prop in allProps) {
    if (variants.includes(prop)) {
      variantProps[prop] = allProps[prop];
    } else {
      remainingProps[prop] = allProps[prop];
    }
  }
  return [
    variantProps as Pick<Props, VariantName<Recipe>>,
    remainingProps as Omit<Props, VariantName<Recipe>>,
  ] as const;
}

// The most abstract representation of a sprinkles fn
// This makes the factory compatible without being limited to sprinkles
type SxToClassName<Sx> = (sx: Sx) => string | undefined;

// Improved vanilla extract type utilities
type RecipeLike = RuntimeFn<VariantGroups>;
type RecipeVariants<Recipe extends RecipeLike> = StripIndexes<
  Exclude<RecipeVariantsImpl<Recipe>, undefined>
>;
type VariantName<Recipe extends RecipeLike> = `${string &
  keyof RecipeVariants<Recipe>}`;

// Since vanilla-extract doesn't export these types we'll
// redefine them to be able to construct improved type utilities
type RecipeStyleRule = ComplexStyleRule | string;
type VariantDefinitions = Record<string, RecipeStyleRule>;
type VariantGroups = Record<string, VariantDefinitions>;

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
