import { z } from "zod";
import { expectTypeOf } from "vitest";
import type { ComponentType } from "react";
import type { inferFormValue } from "../createForm";
import { createForm } from "../createForm";

it("inferFormValue resolves to the correct type", () => {
  const Form = createForm((options) =>
    options.schema(z.object({ foo: z.string(), bar: z.number() })),
  );

  expectTypeOf<inferFormValue<typeof Form>>().toEqualTypeOf<{
    foo: string;
    bar: number;
  }>();
});

it("Form inherits its layouts properties", () => {
  type Props = { foo: string };
  const Form = createForm((options) => options.layout((props: Props) => null));
  expectTypeOf(Form).parameter(0).toMatchTypeOf<Props>();
});

it("Form does not accept unknown properties", () => {
  const Form = createForm();
  expectTypeOf(Form).toMatchTypeOf<ComponentType>();

  // @ts-expect-error Should not accept unknown properties
  const res = <Form unknownProp={123} />;
});
