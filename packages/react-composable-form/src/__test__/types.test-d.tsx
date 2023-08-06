import { z } from "zod";
import { expectTypeOf } from "vitest";
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
  const Form = createForm(({ layout }) => layout<Props>(() => null));
  const expectProps = expectTypeOf(Form).parameter(0);

  expectProps.not.toEqualTypeOf<any>();
  expectProps.toMatchTypeOf<Props>();
});

it("Form does not accept unknown properties", () => {
  const Form = createForm();

  // @ts-expect-error Should not accept unknown properties
  const res = <Form unknownProp={123} />;
});

describe("Form with custom layout does not accept unknown properties ", () => {
  it("no explicit layout props type", () => {
    const Form = createForm(({ layout }) => layout(() => null));

    // @ts-expect-error Should not accept unknown properties
    const res = <Form unknownProp={123} />;
  });

  it("with explicit layout props type", () => {
    const Form = createForm(({ layout }) =>
      layout<{ foo: string }>(() => null),
    );

    // @ts-expect-error Should not accept unknown properties
    const res = <Form unknownProp={123} />;
  });
});
