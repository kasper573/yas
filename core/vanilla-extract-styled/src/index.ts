import type {
  ReactNode,
  ElementType,
  ReactElement,
  ComponentProps,
  CSSProperties,
} from "react";
import type { RuntimeFn } from "@vanilla-extract/recipes";
import { createElement, useMemo, useRef } from "react";

export function createStyledFactory<Style extends Record<string, unknown>>(
  compileStyle: StyleCompiler<Style> = () => undefined,
  isEqual: EqualityFn<Style | CSSProperties | undefined> = Object.is,
): StyledComponentFactory<Style> {
  return function createRecipeComponent<
    Implementation extends ElementType,
    InlineImplementation extends ElementType,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(
    implementation: Implementation,
    recipe?: Recipe,
    options?: RecipeComponentOptions<
      Implementation,
      InlineImplementation,
      Recipe,
      Style
    >,
  ): RecipeComponent<Implementation, InlineImplementation, Recipe, Style> {
    function RecipeComponent({
      className: inlineClassName,
      style: inlineStyle,
      sx = emptyObject as Style,
      as = implementation as unknown as InlineImplementation,
      ...inlineProps
    }: RecipeComponentProps<
      Implementation,
      InlineImplementation,
      Recipe,
      Style
    >) {
      const props = { ...options?.defaultProps, ...inlineProps };
      const [variantProps, forwardedProps] = recipe
        ? destructureVariantProps(props, recipe, options?.forwardProps)
        : [emptyObject, props];

      const className = clsx(recipe?.(variantProps), inlineClassName);
      const sxMemoized = useCompareMemo(compileStyle, sx, isEqual);
      const style = useMemo(
        () => ({ ...sxMemoized, ...inlineStyle }),
        [sxMemoized, inlineStyle],
      );

      return createElement(as, {
        className,
        ...forwardedProps,
        style,
      });
    }

    RecipeComponent.attrs = (
      defaultProps: Partial<
        RecipeComponentProps<
          Implementation,
          InlineImplementation,
          Recipe,
          Style
        >
      >,
    ) =>
      createRecipeComponent(implementation, recipe, {
        ...options,
        defaultProps: {
          ...options?.defaultProps,
          ...defaultProps,
        },
      });

    RecipeComponent.shouldForwardProp = (
      forwardProps: PropForwardTester<
        keyof RecipeComponentProps<
          Implementation,
          InlineImplementation,
          Recipe,
          Style
        >
      >,
    ) =>
      createRecipeComponent(implementation, recipe, {
        ...options,
        forwardProps,
      });

    return RecipeComponent;
  };
}

export type EqualityFn<T> = (a: T, b: T) => boolean;

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

interface StyledComponentFactory<Style> {
  <
    Implementation extends ElementType,
    InlineImplementation extends ElementType,
    Recipe extends RecipeLike = RuntimeFn<{}>,
  >(
    implementation: Implementation,
    recipe?: Recipe,
  ): RecipeComponent<Implementation, InlineImplementation, Recipe, Style>;
}

interface RecipeComponent<
  Implementation extends ElementType,
  InlineImplementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> {
  (
    props: RecipeComponentProps<
      Implementation,
      InlineImplementation,
      Recipe,
      Style
    >,
  ): ReactElement;

  attrs: (
    props: Partial<
      RecipeComponentProps<Implementation, InlineImplementation, Recipe, Style>
    >,
  ) => RecipeComponent<Implementation, InlineImplementation, Recipe, Style>;

  shouldForwardProp: (
    tester: PropForwardTester<
      keyof RecipeComponentProps<
        Implementation,
        InlineImplementation,
        Recipe,
        Style
      >
    >,
  ) => RecipeComponent<Implementation, InlineImplementation, Recipe, Style>;
}

type RecipeComponentProps<
  Implementation extends ElementType,
  InlineImplementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> = RecipeVariants<Recipe> &
  Omit<ComponentProps<Implementation>, keyof RecipeVariants<Recipe>> & {
    sx?: Style;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    as?: InlineImplementation;
    asProps?: ComponentProps<InlineImplementation>;
  };

interface RecipeComponentOptions<
  Implementation extends ElementType,
  InlineImplementation extends ElementType,
  Recipe extends RecipeLike,
  Style,
> {
  defaultProps?: Partial<
    RecipeComponentProps<Implementation, InlineImplementation, Recipe, Style>
  >;
  forwardProps?: PropForwardTester<
    keyof RecipeComponentProps<
      Implementation,
      InlineImplementation,
      Recipe,
      Style
    >
  >;
}

export type PropForwardTester<PropName extends PropertyKey> = (info: {
  name: PropName;
  isVariant: boolean;
}) => boolean;

type StyleCompiler<Style> = (style: Style) => CSSProperties | undefined;

// Improved vanilla extract type utilities
export type RecipeLike = RuntimeFn<Record<string, Record<string, never>>>;
export type RecipeVariants<Recipe extends RecipeLike> = StripIndexes<
  Exclude<Parameters<Recipe>[0], undefined>
>;
export type VariantName<Recipe extends RecipeLike> = `${string &
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

function clsx(...classNames: Array<string | undefined>) {
  const defined = classNames.filter(Boolean);
  return defined.length ? defined.join(" ") : undefined;
}

function useCompareMemo<Input, Output>(
  memoize: (input: Input) => Output,
  input: Input,
  isEqual: EqualityFn<Input>,
): Output {
  const ref = useRef<[Input, Output]>();
  if (!ref.current || !isEqual(ref.current[0], input)) {
    ref.current = [input, memoize(input)];
  }
  return ref.current[1];
}
