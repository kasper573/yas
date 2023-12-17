import type {
  ReactNode,
  ReactElement,
  ComponentProps,
  CSSProperties,
  ElementType,
  ComponentType,
  ForwardedRef,
} from "react";
import { createElement, forwardRef } from "react";
import type { PropForwardTester } from "./destructureVariantProps";
import { destructureVariantProps } from "./destructureVariantProps";
import { useCompareMemo } from "./useCompareMemo";
import { createPropsMerger } from "./createPropsMerger";
import type { SXAdapterOptions } from "./sxAdapter";
import { normalizeSXAdapterOptions } from "./sxAdapter";

export function createStyledFactory<SX>(
  sxAdapterOptions?: SXAdapterOptions<SX>,
): StyledComponentFactory<SX> {
  const sxAdapter = normalizeSXAdapterOptions(sxAdapterOptions);
  const mergeElementProps = createPropsMerger(sxAdapter.merge);

  return function createRecipeComponent<
    Implementation extends AnyImplementation,
    RecipeInput extends RecipeInputLike,
  >(
    implementation: Implementation,
    recipe?: RecipeFn<RecipeInput>,
    options: RecipeComponentOptions<Implementation, RecipeInput, SX> = {},
  ): RecipeComponent<Implementation, RecipeInput, SX> {
    function RecipeComponentImpl(
      { as = implementation, asProps, ...inlineProps }: RecipeComponentProps,
      ref: ForwardedRef<HTMLElement>,
    ) {
      const { sx = emptyObject, ...mergedProps } = [
        options.defaultProps,
        asProps,
        inlineProps,
      ].reduce(mergeElementProps);

      const [recipeInput, forwardedProps] = recipe
        ? destructureVariantProps(
            mergedProps,
            recipe.variants(),
            options.forwardProps,
          )
        : [emptyObject, mergedProps];

      const recipeClassName = recipe?.(recipeInput as RecipeInput);
      const styleOrClassName = useCompareMemo(
        sxAdapter.compile,
        sx,
        sxAdapter.isEqual,
      );

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
    }

    const RecipeComponent = forwardRef(
      RecipeComponentImpl,
    ) as unknown as RecipeComponent<Implementation, RecipeInput, SX>;

    Object.assign(RecipeComponent, {
      displayName: `styled(${getElementTypeName(implementation)})`,
    });

    RecipeComponent.attrs = (defaultProps) =>
      createRecipeComponent(implementation, recipe, {
        ...options,
        defaultProps,
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

function getElementTypeName(impl: ElementType): string {
  if (typeof impl === "string") {
    return impl;
  }
  return impl.displayName ?? impl.name;
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
  <InlineImplementation extends AnyImplementation = NoImplementation>(
    props: RecipeComponentProps<
      Implementation,
      InlineImplementation,
      RecipeInput,
      SX
    >,
  ): ReactElement;

  attrs: (
    props: DefaultRecipeComponentProps<Implementation, RecipeInput, SX>,
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
  Implementation extends AnyImplementation = AnyImplementation,
  InlineImplementation extends AnyImplementation = AnyImplementation,
  RecipeInput extends RecipeInputLike = RecipeInputLike,
  SX = unknown,
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
  defaultProps?: DefaultRecipeComponentProps<Implementation, RecipeInput, SX>;
  forwardProps?: PropForwardTester<
    keyof RecipeComponentProps<
      Implementation,
      AnyImplementation,
      RecipeInput,
      SX
    >
  >;
}

type AnyImplementation = ElementType;
type NoImplementation = ComponentType<{}>;

export type RecipeInputLike = Record<string, unknown>;

export interface RecipeFn<Input extends RecipeInputLike> {
  (input?: Input): string;
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
