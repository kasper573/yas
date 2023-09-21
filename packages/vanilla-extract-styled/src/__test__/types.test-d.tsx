import { expectTypeOf } from "vitest";
import type { ComponentProps, HTMLAttributes } from "react";
import { createStyledFactory } from "../index";
import type { Color } from "./test.css";
import { sprinkles } from "./test.css";

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

it("sx prop is unavailable when not providing atoms", () => {
  const styled = createStyledFactory();
  const Component = styled("div");

  expectTypeOf<ComponentProps<typeof Component>>().not.toMatchTypeOf<{
    sx?: unknown;
  }>();
});

it("sx prop is derived from atoms", () => {
  const styled = createStyledFactory(sprinkles);
  const Component = styled("div");
  type Sx = ComponentProps<typeof Component>["sx"];
  expectTypeOf<Sx>().toEqualTypeOf<{ color?: Color } | undefined>();
});

it("variants is derived from recipe", () => {
  const styled = createStyledFactory();
  const Component = styled("div");
  type Sx = ComponentProps<typeof Component>["sx"];
  expectTypeOf<Sx>().toEqualTypeOf<{ color?: Color } | undefined>();
});
