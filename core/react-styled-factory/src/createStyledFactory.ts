import type {
  ReactNode,
  ReactElement,
  ComponentProps,
  CSSProperties,
  ElementType,
  ForwardedRef,
} from "react";
import { createElement, forwardRef, Children } from "react";
import type { PropForwardTester } from "./destructureVariantProps";
import { destructureVariantProps } from "./destructureVariantProps";
import { clsx, createPropsMerger } from "./createPropsMerger";
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
    recipeOrClassNames?: string | string[] | RecipeFn<RecipeInput>,
    options: RecipeComponentOptions<Implementation, RecipeInput, SX> = {},
  ): RecipeComponent<Implementation, RecipeInput, SX> {
    function RecipeComponentImpl(
      inlineProps: AnyRecipeComponentProps,
      ref: ForwardedRef<HTMLElement>,
    ) {
      const {
        sx = emptyObject,
        asChild,
        ...mergedProps
      } = mergeElementProps(options.defaultProps, inlineProps);

      const styleOrClassName = sxAdapter.compile(sx);
      const [recipeClassName, forwardedProps] = resolveRecipe(mergedProps);
      const [sxStyle, sxClassName] =
        typeof styleOrClassName === "string"
          ? [undefined, styleOrClassName]
          : [styleOrClassName, undefined];

      const finalProps = [
        { className: recipeClassName, style: sxStyle, ref },
        { className: sxClassName },
        forwardedProps,
      ].reduce(mergeElementProps);

      if (asChild) {
        const { children, ...finalPropsWithoutChildren } = finalProps;
        const child = Children.only(children) as ReactElement;
        return createElement(
          child.type,
          mergeElementProps(finalPropsWithoutChildren, child.props),
        );
      }

      return createElement(implementation, finalProps);
    }

    function resolveRecipe(
      props: Record<string, unknown>,
    ): [string | undefined, Record<string, unknown>] {
      if (!recipeOrClassNames) {
        return [undefined, props];
      }
      if (typeof recipeOrClassNames === "string") {
        return [recipeOrClassNames, props];
      }
      if (Array.isArray(recipeOrClassNames)) {
        return [clsx(...recipeOrClassNames), props];
      }

      const [recipeInput, forwardedProps] = destructureVariantProps(
        props,
        recipeOrClassNames.variants(),
        options.forwardProps,
      );

      const recipeClassName = recipeOrClassNames(recipeInput as RecipeInput);
      return [recipeClassName, forwardedProps];
    }

    const RecipeComponent = forwardRef(
      RecipeComponentImpl,
    ) as unknown as RecipeComponent<Implementation, RecipeInput, SX>;

    Object.assign(RecipeComponent, {
      displayName: `styled(${getElementTypeName(implementation)})`,
    });

    RecipeComponent.as = (newImplementation) =>
      createRecipeComponent(newImplementation, recipeOrClassNames, options);

    RecipeComponent.attrs = (defaultProps) =>
      createRecipeComponent(implementation, recipeOrClassNames, {
        ...options,
        defaultProps: {
          ...options.defaultProps,
          ...defaultProps,
        },
      });

    RecipeComponent.shouldForwardProp = (forwardProps) =>
      createRecipeComponent(implementation, recipeOrClassNames, {
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
    recipeOrClassNames?: string | string[] | RecipeFn<RecipeInput>,
  ): RecipeComponent<Implementation, RecipeInput, SX>;
}

type DefaultRecipeComponentProps<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> = Partial<RecipeComponentProps<Implementation, RecipeInput, SX>>;

export interface RecipeComponentConstructor<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> {
  (props: RecipeComponentProps<Implementation, RecipeInput, SX>): ReactElement;
}

interface RecipeComponent<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> extends RecipeComponentConstructor<Implementation, RecipeInput, SX> {
  as<NewImplementation extends AnyImplementation>(
    as: NewImplementation,
  ): RecipeComponent<NewImplementation, RecipeInput, SX>;

  attrs(
    props: DefaultRecipeComponentProps<Implementation, RecipeInput, SX>,
  ): RecipeComponent<Implementation, RecipeInput, SX>;

  shouldForwardProp(
    tester: PropForwardTester<
      keyof RecipeComponentProps<Implementation, RecipeInput, SX>
    >,
  ): RecipeComponent<Implementation, RecipeInput, SX>;
}

export type RecipeComponentProps<
  Implementation extends AnyImplementation,
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
      asChild?: boolean;
    };

interface RecipeComponentOptions<
  Implementation extends AnyImplementation,
  RecipeInput extends RecipeInputLike,
  SX,
> {
  defaultProps?: DefaultRecipeComponentProps<Implementation, RecipeInput, SX>;
  forwardProps?: PropForwardTester<
    keyof RecipeComponentProps<Implementation, RecipeInput, SX>
  >;
}

type AnyRecipeComponentProps = RecipeComponentProps<
  AnyImplementation,
  RecipeInputLike,
  unknown
>;

export type AnyImplementation = ElementType;

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
