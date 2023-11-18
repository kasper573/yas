import type { ComponentProps, HTMLAttributes } from "react";
import { it, expectTypeOf } from "@yas/test/vitest/react";
import { createStyledFactory } from "../src";
import type { Color, Variants } from "./test.css";
import { recipeWithoutVariants, recipeWithVariants } from "./test.css";

it("inherits props of element", () => {
  const styled = createStyledFactory();
  const Component = styled("div");

  expectTypeOf<ComponentProps<typeof Component>>().toMatchTypeOf<
    HTMLAttributes<HTMLDivElement>
  >();
});

it("inherits props of component", () => {
  const styled = createStyledFactory();

  interface BaseProps {
    foo: string;
    bar: number;
  }

  const Component = styled((props: BaseProps) => null);

  type Selection = Pick<ComponentProps<typeof Component>, keyof BaseProps>;

  expectTypeOf<Selection>().toEqualTypeOf<BaseProps>();
});

it("element does not cause excess props to be accepted", () => {
  const styled = createStyledFactory();
  const Component = styled("div");

  // @ts-expect-error Prop should error
  <Component thisPropDoesNotExist={123} />;
});

it("component does not cause excess props to be accepted", () => {
  const styled = createStyledFactory();
  const Component = styled(() => null);

  // @ts-expect-error Prop should error
  <Component thisPropDoesNotExist={123} />;
});

it("empty recipe does not cause excess props to be accepted", () => {
  const styled = createStyledFactory();
  const Component = styled("div", recipeWithoutVariants);

  // @ts-expect-error Prop should error
  <Component thisPropDoesNotExist={123} />;
});

it("sx prop is derived from atoms", () => {
  const styled = createStyledFactory((input: { color?: Color }) => ({}));
  const Component = styled("div");
  type Sx = ComponentProps<typeof Component>["sx"];
  expectTypeOf<Sx>().toEqualTypeOf<{ color?: Color } | undefined>();
});

it("variants is derived from recipe", () => {
  const styled = createStyledFactory();
  const Component = styled("div", recipeWithVariants);
  type VariantProps = Pick<ComponentProps<typeof Component>, keyof Variants>;
  expectTypeOf<VariantProps>().toEqualTypeOf<Variants>();
});

it("variants can be derived from recipe while using atoms", () => {
  const styled = createStyledFactory((input: { color?: Color }) => ({}));
  const Component = styled("div", recipeWithVariants);
  type VariantProps = Pick<ComponentProps<typeof Component>, keyof Variants>;
  expectTypeOf<VariantProps>().toEqualTypeOf<Variants>();
});
