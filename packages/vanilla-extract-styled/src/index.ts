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
import clsx from "clsx";

interface RecipeImplementationProps {
  className?: string;
  children?: ReactNode;
}

export function createStyledFactory<
  Sprinkles extends Record<string, ComplexStyleRule>,
>(sprinkles?: (sx: Sprinkles) => string | undefined) {
  type RecipeComponentProps<Recipe extends RecipeLike> =
    RecipeImplementationProps &
      RecipeVariants<Recipe> & {
        sx?: Sprinkles;
      };

  return function styled<
    Implementation extends ElementType<RecipeImplementationProps>,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(implementation: Implementation, recipe?: Recipe) {
    return function RecipeComponent({
      className: inlineClassName,
      sx,
      ...props
    }: RecipeComponentProps<Recipe> &
      ComponentProps<Implementation>): ReactElement {
      const [variantProps, remainingProps] = separateVariantProps(
        props,
        recipe,
      );
      const className =
        clsx(
          recipe?.(variantProps),
          sx ? sprinkles?.(sx) : undefined,
          inlineClassName,
        ) || undefined;
      return createElement(implementation, {
        className,
        ...remainingProps,
      });
    };
  };
}

/**
 * Selects the props corresponding to the variant names of the given recipe
 */
export function variantProps<
  Props extends Record<string, unknown>,
  Recipe extends RecipeLike,
>(props: Props, recipe: Recipe): Pick<Props, VariantName<Recipe>> {
  return separateVariantProps(props, recipe)[0];
}

/**
 * Separates the props into variants and remaining props
 */
export function separateVariantProps<
  Props extends Record<string, unknown>,
  Recipe extends RecipeLike = RuntimeFn<{}>,
>(
  props: Props,
  recipe?: Recipe,
): [Pick<Props, VariantName<Recipe>>, Omit<Props, VariantName<Recipe>>] {
  const picked = {} as Pick<Props, VariantName<Recipe>>;
  const other = { ...props };
  if (recipe) {
    for (const variant of recipe.variants() as VariantName<Recipe>[]) {
      picked[variant] = props[variant];
      delete other[variant];
    }
  }
  return [picked, other];
}

// Vanilla extract type utilities
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
