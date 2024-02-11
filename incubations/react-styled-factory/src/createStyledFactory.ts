import type {
  ReactElement,
  ComponentProps,
  ElementType,
  ForwardedRef,
} from "react";
import { createElement, forwardRef, Children } from "react";
import type { PropForwardTester } from "./destructureVariantProps";
import { destructureVariantProps } from "./destructureVariantProps";
import type { ElementPropsLike } from "./createPropsMerger";
import { clsx, createPropsMerger } from "./createPropsMerger";
import type { SXAdapterOptions } from "./sxAdapter";
import { normalizeSXAdapterOptions } from "./sxAdapter";

export function createStyledFactory<SX>(
  sxAdapterOptions?: SXAdapterOptions<SX>,
): StyledComponentFactory<SX> {
  const sxAdapter = normalizeSXAdapterOptions(sxAdapterOptions);
  const mergeElementProps = createPropsMerger(sxAdapter.merge);

  return function createStyledComponent<
    Implementation extends AnyImplementation,
    Variants extends VariantsLike,
  >(
    implementation: Implementation,
    abstractStyle?: AbstractStyle<Variants, SX>,
    options: StyledComponentOptions<Implementation, Variants, SX> = {},
  ): StyledComponent<Implementation, Variants, SX> {
    function StyledComponentImpl(
      inlineProps: AnyStyledComponentProps,
      ref: ForwardedRef<HTMLElement>,
    ) {
      const {
        sx = emptyObject,
        asChild,
        ...mergedProps
      } = mergeElementProps(
        options.defaultProps,
        inlineProps as ElementPropsLike<SX>,
      );

      const finalProps: ElementPropsLike<SX> = [
        { ref } as ElementPropsLike<SX>,
        resolveAbstractStyle(mergedProps),
        compileSX(sx as SX),
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

    function compileSX(sx: SX): ElementPropsLike<SX> {
      const classNameOrStyle = sxAdapter.compile(sx);
      if (typeof classNameOrStyle === "string") {
        return { className: classNameOrStyle };
      } else if (classNameOrStyle) {
        return { style: classNameOrStyle };
      }
      return emptyObject;
    }

    function resolveAbstractStyle(
      props: ElementPropsLike<SX>,
    ): ElementPropsLike<SX> {
      if (!abstractStyle) {
        return props;
      }
      if (typeof abstractStyle === "string") {
        return mergeElementProps({ className: abstractStyle }, props);
      }
      if (Array.isArray(abstractStyle)) {
        return mergeElementProps({ className: clsx(...abstractStyle) }, props);
      }
      if (typeof abstractStyle === "function" && "variants" in abstractStyle) {
        const [variants, forwardedProps] = destructureVariantProps(
          props,
          abstractStyle.variants(),
          options.forwardProps as PropForwardTester,
        );

        const className = abstractStyle(variants as Variants);
        return mergeElementProps({ className }, forwardedProps);
      }

      return mergeElementProps(compileSX(abstractStyle), props);
    }

    const StyledComponent = forwardRef(
      StyledComponentImpl,
    ) as unknown as StyledComponent<Implementation, Variants, SX>;

    StyledComponent.as = (newImplementation) =>
      createStyledComponent(newImplementation, abstractStyle, options);

    StyledComponent.attrs = (defaultProps) =>
      createStyledComponent(implementation, abstractStyle, {
        ...options,
        defaultProps: mergeElementProps(options.defaultProps, defaultProps),
      });

    StyledComponent.shouldForwardProp = (forwardProps) =>
      createStyledComponent(implementation, abstractStyle, {
        ...options,
        forwardProps,
      });

    return StyledComponent;
  };
}

const emptyObject = Object.freeze({});

type ClassName = string;
type AbstractStyle<Variants extends VariantsLike, SX> =
  | ClassName
  | ClassName[]
  | SX
  | VariantsCompiler<Variants>;

interface StyledComponentFactory<SX> {
  <Implementation extends AnyImplementation, Variants extends VariantsLike>(
    implementation: Implementation,
    abstractStyle?: AbstractStyle<Variants, SX>,
  ): StyledComponent<Implementation, Variants, SX>;
}

type DefaultStyledComponentProps<
  Implementation extends AnyImplementation,
  Variants extends VariantsLike,
  SX,
> = Partial<StyledComponentProps<Implementation, Variants, SX>>;

export interface StyledComponentConstructor<
  Implementation extends AnyImplementation,
  Variants extends VariantsLike,
  SX,
> {
  (props: StyledComponentProps<Implementation, Variants, SX>): ReactElement;
}

interface StyledComponent<
  Implementation extends AnyImplementation,
  Variants extends VariantsLike,
  SX,
> extends StyledComponentConstructor<Implementation, Variants, SX> {
  as<NewImplementation extends AnyImplementation>(
    as: NewImplementation,
  ): StyledComponent<NewImplementation, Variants, SX>;

  attrs(
    props: DefaultStyledComponentProps<Implementation, Variants, SX>,
  ): StyledComponent<Implementation, Variants, SX>;

  shouldForwardProp(
    tester: PropForwardTester<
      keyof StyledComponentProps<Implementation, Variants, SX>
    >,
  ): StyledComponent<Implementation, Variants, SX>;
}

export type StyledComponentProps<
  Implementation extends AnyImplementation,
  Variants extends VariantsLike,
  SX,
> =
  // We must strip plain indexes to ensure no variants resolve to empty object
  StripIndexes<Variants> &
    Omit<ComponentProps<Implementation>, keyof StripIndexes<Variants>> & {
      sx?: SX;
      asChild?: boolean;
    };

interface StyledComponentOptions<
  Implementation extends AnyImplementation,
  Variants extends VariantsLike,
  SX,
> {
  defaultProps?: DefaultStyledComponentProps<Implementation, Variants, SX>;
  forwardProps?: PropForwardTester<
    keyof StyledComponentProps<Implementation, Variants, SX>
  >;
}

type AnyStyledComponentProps = StyledComponentProps<
  AnyImplementation,
  VariantsLike,
  unknown
>;

export type AnyImplementation = ElementType;

export type VariantsLike = Record<string, unknown>;

export interface VariantsCompiler<Variants extends VariantsLike> {
  (input?: Variants): ClassName;
  variants: () => Array<keyof Variants>;
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
