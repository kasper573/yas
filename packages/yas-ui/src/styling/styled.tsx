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
import type { Atoms } from "./atoms.css";
import { atoms } from "./atoms.css";

interface RecipeImplementationProps {
  className?: string;
  children?: ReactNode;
}

type RecipeComponentProps<Recipe extends RecipeLike> =
  RecipeImplementationProps &
    RecipeVariants<Recipe> & {
      sx?: Atoms;
    };

/**
 * Syntax sugar for creating a @vanilla-extract based
 * react component without having to do the type and props wiring.
 */
export function styled<
  Implementation extends ElementType<RecipeImplementationProps>,
  Recipe extends RecipeLike = RuntimeFn<{}>,
>(implementation: Implementation, recipe?: Recipe) {
  return function RecipeComponent({
    className: inlineClassName,
    sx,
    ...props
  }: RecipeComponentProps<Recipe> &
    ComponentProps<Implementation>): ReactElement {
    const [variantProps, remainingProps] = separateVariantProps(props, recipe);
    const className = clsx(
      recipe?.(variantProps),
      sx ? atoms(sx) : undefined,
      inlineClassName,
    );
    return createElement(implementation, {
      className,
      ...remainingProps,
    });
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
>(props: Props, recipe?: Recipe) {
  const picked = {} as Pick<Props, VariantName<Recipe>>;
  const other = {} as Omit<Props, VariantName<Recipe>>;
  if (recipe) {
    for (const variant of recipe.variants() as VariantName<Recipe>[]) {
      picked[variant] = props[variant];
    }
  }
  return [picked, other] as const;
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

// Typescript specific utilities
type StripIndexes<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};
