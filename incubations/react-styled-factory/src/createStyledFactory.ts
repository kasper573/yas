import type { ReactElement, ForwardedRef } from "react";
import { createElement, forwardRef, Children } from "react";
import { destructureVariantProps } from "./destructureVariantProps";
import { clsx, createPropsMerger } from "./createPropsMerger";
import { createSXAdapter } from "./sxAdapter";
import type {
  StyleLike,
  ImplementationLike,
  AnyStyledComponentProps,
  ElementPropsLike,
  PropForwardTester,
  SXAdapterOptions,
  SXLike,
  StyledComponentFactory,
  StyledComponentOptions,
  StyledComponent,
  VariantsLike,
} from "./types";

export function createStyledFactory<SX extends SXLike>(
  sxAdapterOptions?: SXAdapterOptions<SX>,
): StyledComponentFactory<SX> {
  const sxAdapter = createSXAdapter(sxAdapterOptions);
  const mergeElementProps = createPropsMerger(sxAdapter.merge);

  return function createStyledComponent<
    Implementation extends ImplementationLike,
    Variants extends VariantsLike,
  >(
    implementation: Implementation,
    abstractStyle?: StyleLike<Variants, SX>,
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
