import type {
  ReactNode,
  ReactElement,
  ComponentProps,
  CSSProperties,
  ElementType,
  ComponentType,
  ForwardedRef,
} from "react";
import { createElement, forwardRef, useRef } from "react";

export function createStyledFactory<SX>(
  compileStyle: SXCompiler<SX> = () => undefined,
  isSXPropEqual: EqualityFn = Object.is,
  mergeSX: SXMerger<SX> = defaultSXMerger,
): StyledComponentFactory<SX> {
  const mergeElementProps = createPropsMerger(mergeSX);
  return function createRecipeComponent<
    Implementation extends AnyImplementation,
    RecipeInput extends RecipeInputLike,
  >(
    implementation: Implementation,
    recipe?: RecipeFn<RecipeInput>,
    options: RecipeComponentOptions<Implementation, RecipeInput, SX> = {},
  ): RecipeComponent<Implementation, RecipeInput, SX> {
    const { forwardProps } = options;

    const RecipeComponent = forwardRef(function RecipeComponent<
      InlineImplementation extends AnyImplementation = NoImplementation,
    >(
      {
        as = implementation as unknown as InlineImplementation,
        asProps,
        ...inlineProps
      }: RecipeComponentProps<
        Implementation,
        InlineImplementation,
        RecipeInput,
        SX
      >,
      ref: ForwardedRef<HTMLElement>,
    ) {
      const { sx = emptyObject, ...mergedProps } = mergeElementProps(
        asProps,
        inlineProps,
      );

      const [recipeInput, forwardedProps] = recipe
        ? destructureVariantProps(mergedProps, recipe.variants(), forwardProps)
        : [emptyObject, mergedProps];

      const recipeClassName = recipe?.(recipeInput as RecipeInput);
      const styleOrClassName = useCompareMemo(compileStyle, sx, isSXPropEqual);

      const [sxStyle, sxClassName] =
        typeof styleOrClassName === "string"
          ? [undefined, styleOrClassName]
          : [styleOrClassName, undefined];

      const finalProps = [
        { className: recipeClassName, style: sxStyle, ref },
        { className: sxClassName },
        forwardedProps,
      ].reduce(mergeElementProps);

      return createElement(as, finalProps);
    }) as unknown as RecipeComponent<Implementation, RecipeInput, SX>;

    RecipeComponent.attrs = <
      DefaultProps extends DefaultRecipeComponentProps<
        Implementation,
        RecipeInput,
        SX
      >,
    >(
      defaultProps: DefaultProps,
    ) => {
      return forwardRef(function RecipeComponentWithDefaultProps(
        props: DefaultProps,
        ref: ForwardedRef<HTMLElement>,
      ) {
        return createElement(RecipeComponent, {
          ...mergeElementProps(defaultProps, props),
          ref,
        } as RecipeComponentProps<
          Implementation,
          AnyImplementation,
          RecipeInput,
          SX
        >);
      }) as unknown as RecipeComponent<Implementation, RecipeInput, SX>;
    };

    RecipeComponent.shouldForwardProp = (
      forwardProps: PropForwardTester<
        keyof RecipeComponentProps<
          Implementation,
          AnyImplementation,
          RecipeInput,
          SX
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

type Comparable = Record<string, unknown> | unknown[] | null | undefined;
export type EqualityFn = <T extends Comparable>(a: T, b: T) => boolean;

const emptyObject = Object.freeze({});

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

interface StyledComponentFactory<SX> {
  <
    Implementation extends AnyImplementation,
    RecipeInput extends RecipeInputLike,
  >(
    implementation: Implementation,
    recipe?: RecipeFn<RecipeInput>,
  ): RecipeComponent<Implementation, RecipeInput, SX>;
}

type DefaultRecipeComponentProps<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> = Partial<
  Omit<
    RecipeComponentProps<Implementation, AnyImplementation, RecipeInput, SX>,
    "as" | "asProps"
  >
>;

interface RecipeComponent<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> {
  <InlineImplementation extends AnyImplementation>(
    props: RecipeComponentProps<
      Implementation,
      InlineImplementation,
      RecipeInput,
      SX
    >,
  ): ReactElement;

  attrs: <
    DefaultProps extends DefaultRecipeComponentProps<
      Implementation,
      RecipeInput,
      SX
    >,
  >(
    props: DefaultProps,
  ) => RecipeComponent<Implementation, RecipeInput, SX>;

  shouldForwardProp: (
    tester: PropForwardTester<
      keyof RecipeComponentProps<
        Implementation,
        AnyImplementation,
        RecipeInput,
        SX
      >
    >,
  ) => RecipeComponent<Implementation, RecipeInput, SX>;
}

type RecipeComponentProps<
  Implementation extends AnyImplementation,
  InlineImplementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> =
  // We must strip plain indexes to ensure no variants resolve to empty object
  StripIndexes<RecipeInput> &
    ComponentProps<Implementation> & {
      sx?: SX;
      className?: string;
      style?: CSSProperties;
      children?: ReactNode;
      as?: InlineImplementation;
      asProps?: ComponentProps<InlineImplementation>;
    };

interface RecipeComponentOptions<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> {
  forwardProps?: PropForwardTester<
    keyof RecipeComponentProps<
      Implementation,
      AnyImplementation,
      RecipeInput,
      SX
    >
  >;
}

export type PropForwardTester<PropName extends PropertyKey> = (info: {
  name: PropName;
  isVariant: boolean;
}) => boolean;

export type CSSClassName = string;

type AnyImplementation = ElementType;
type NoImplementation = ComponentType<{}>;

export type SXCompiler<SX> = (
  sx: SX,
) => CSSProperties | CSSClassName | undefined;

export type SXMerger<SX> = (a?: SX, b?: SX) => SX | undefined;

export type RecipeInputLike = Record<string, unknown>;

export interface RecipeFn<Input extends RecipeInputLike> {
  (input?: Input): CSSClassName;
  variants: () => Array<keyof Input>;
}

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

function useCompareMemo<Input extends Comparable, Output>(
  create: (input: Input) => Output,
  input: Input,
  isEqual: EqualityFn,
): Output {
  const ref = useRef<[Input, Output]>();
  if (!ref.current || !isEqual(ref.current[0], input)) {
    ref.current = [input, create(input)];
  }
  return ref.current[1];
}

type ElementPropsLike<SX> = {
  className?: string;
  style?: CSSProperties;
  sx?: SX;
};

function createPropsMerger<SX>(sxMerger: SXMerger<SX>) {
  return function mergeElementProps<
    Left extends ElementPropsLike<SX>,
    Right extends ElementPropsLike<SX>,
  >(a?: Left, b?: Right): Left & Right {
    if (!a || !b) {
      return (a ?? b) as Left & Right;
    }

    return {
      ...a,
      ...b,
      className: clsx(a.className, b.className),
      style: { ...a.style, ...b.style },
      sx: sxMerger(a.sx, b.sx),
    };
  };
}

const defaultSXMerger = <T>(a?: T, b?: T): T | undefined => {
  if (a === b) {
    return a;
  }
  return a && b ? { ...a, ...b } : a ?? b;
};
