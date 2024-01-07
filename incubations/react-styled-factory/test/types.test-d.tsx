import type {
  ComponentProps,
  HTMLAttributes,
  InputHTMLAttributes,
} from "react";
import { describe, test, it, expectTypeOf } from "@yas/test/vitest/react";

import { createStyledFactory } from "../src/createStyledFactory";
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

  type Props = ComponentProps<typeof Component>;
  type Selection = Pick<Props, keyof BaseProps>;

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

describe(`derives props from inline implementation in favor of base implementation`, () => {
  test("ElementType", () => {
    const styled = createStyledFactory();

    const Input = styled("input");
    const Dialog = Input.as("dialog");

    type DialogProps = ComponentProps<typeof Dialog>;

    expectTypeOf<DialogProps>().toMatchTypeOf<
      HTMLAttributes<HTMLDialogElement>
    >();

    expectTypeOf<DialogProps>().not.toMatchTypeOf<
      InputHTMLAttributes<HTMLInputElement>
    >();
  });

  test("ComponentType", () => {
    const styled = createStyledFactory();

    type AProps = { foo: string };
    const A = styled((props: AProps) => null);

    type BProps = { bar: number };
    const B = A.as((props: BProps) => null);

    type InferredProps = ComponentProps<typeof B>;

    expectTypeOf<InferredProps>().toMatchTypeOf<BProps>();
    expectTypeOf<InferredProps>().not.toMatchTypeOf<AProps>();
  });
});
