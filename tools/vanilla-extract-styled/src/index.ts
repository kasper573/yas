import type {
  ReactNode,
  ElementType,
  ReactElement,
  ComponentProps,
} from "react";
import type { RuntimeFn } from "@vanilla-extract/recipes";
import { createElement } from "react";

export function createStyledFactory<Style>(
  compileStyle?: StyleCompiler<Style>
): StyledComponentFactory<Style> {
  return function createRecipeComponent<
    Implementation extends ElementType,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(
    implementation: Implementation,
    recipe?: Recipe,
    options?: RecipeComponentOptions<Implementation, Recipe, Style>
  ) {
    const RecipeComponent: RecipeComponent<Implementation, Recipe, Style> =
      function RecipeComponent({
        className: inlineClassName,
        sx,
        ...inlineProps
      }) {
        const props = { ...options?.defaultProps, ...inlineProps };
        const [variantProps, forwardedProps] = recipe
          ? destructureVariantProps(props, recipe, options?.forwardProps)
          : [emptyObject, props];
        const className = [
          recipe?.(variantProps),
          sx ? compileStyle?.(sx) : undefined,
          inlineClassName,
        ]
          .filter(Boolean)
          .join(" ");
        return createElement(implementation, {
          className,
          ...forwardedProps,
        });
      };

    RecipeComponent.attrs = (defaultProps) =>
      createRecipeComponent(implementation, recipe, {
        ...options,
        defaultProps: {
          ...options?.defaultProps,
          ...defaultProps,
        },
      });

    RecipeComponent.shouldForwardProp = (forwardProps) =>
      createRecipeComponent(implementation, recipe, {
        ...options,
        forwardProps,
      });

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
    !isVariant
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

interface StyledComponentFactory<Style> {
  <
    Implementation extends ElementType,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(
    implementation: Implementation,
    recipe?: Recipe
  ): RecipeComponent<Implementation, Recipe, Style>;
}

interface RecipeComponent<
  Implementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> {
  (props: RecipeComponentProps<Implementation, Recipe, Style>): ReactElement;

  attrs: (
    props: Partial<RecipeComponentProps<Implementation, Recipe, Style>>
  ) => RecipeComponent<Implementation, Recipe, Style>;

  shouldForwardProp: (
    tester: PropForwardTester<
      keyof RecipeComponentProps<Implementation, Recipe, Style>
    >
  ) => RecipeComponent<Implementation, Recipe, Style>;
}

type RecipeComponentProps<
  Implementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> = RecipeVariants<Recipe> &
  Omit<ComponentProps<Implementation>, keyof RecipeVariants<Recipe>> & {
    sx?: Style;
    className?: string;
    children?: ReactNode;
  };

interface RecipeComponentOptions<
  Implementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> {
  defaultProps?: Partial<RecipeComponentProps<Implementation, Recipe, Style>>;
  forwardProps?: PropForwardTester<
    keyof RecipeComponentProps<Implementation, Recipe, Style>
  >;
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
