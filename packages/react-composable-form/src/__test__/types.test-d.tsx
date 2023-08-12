import { z } from "zod";
import { expectTypeOf } from "vitest";
import type { ComponentType } from "react";
import type { inferFormValue } from "../createForm";
import { createForm } from "../createForm";
import type { FieldProps } from "../types/optionTypes";

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

it("Layout fields have the correct names", () => {
  createForm((options) =>
    options
      .schema(z.object({ foo: z.string(), bar: z.number() }))
      .layout(({ fields }) => {
        expectTypeOf(fields).toMatchTypeOf<{
          Foo: any;
          Bar: any;
        }>();
        return null;
      }),
  );
});

it("Type associated components have the correct property types in layout", () => {
  createForm((options) =>
    options
      .schema(z.object({ foo: z.string(), bar: z.number() }))
      .type(z.string(), (props: { foo?: string }) => null)
      .type(z.number(), (props: { bar?: number }) => null)
      .layout(({ fields }) => {
        expectTypeOf(fields).toMatchTypeOf<{
          Foo: ComponentType<FieldProps<string> & { foo?: string }>;
          Bar: ComponentType<FieldProps<number> & { bar?: number }>;
        }>();
        return null;
      }),
  );
});

it("Field associated components have the correct property types in layout", () => {
  createForm((options) =>
    options
      .schema(z.object({ foo: z.string(), bar: z.number() }))
      .field("foo", (props: { foo?: string }) => null)
      .field("bar", (props: { bar?: number }) => null)
      .layout(({ fields }) => {
        expectTypeOf(fields).toMatchTypeOf<{
          Foo: ComponentType<FieldProps<string> & { foo?: string }>;
          Bar: ComponentType<FieldProps<number> & { bar?: number }>;
        }>();
        return null;
      }),
  );
});

describe("Layout cannot access unknown fields", () => {
  it("for plain object schemas", () => {
    createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.number() }))
        .layout(({ fields }) => {
          // @ts-expect-error Should not be able to access unknown properties
          const { SomeUnknownProperty } = fields;
          return null;
        }),
    );
  });

  it("for union schemas", () => {
    createForm((options) =>
      options
        .schema(
          z.object({ foo: z.string() }).and(z.object({ bar: z.number() })),
        )
        .layout(({ fields }) => {
          // @ts-expect-error Should not be able to access unknown properties
          const { SomeUnknownProperty } = fields;
          return null;
        }),
    );
  });

  it("for discriminated union schemas", () => {
    createForm((options) =>
      options
        .schema(
          z.discriminatedUnion("type", [
            z.object({ type: z.literal("foo"), foo: z.string() }),
            z.object({ type: z.literal("bar"), bar: z.number() }),
          ]),
        )
        .layout(({ fields }) => {
          // @ts-expect-error Should not be able to access unknown properties
          const { SomeUnknownProperty } = fields;
          return null;
        }),
    );
  });
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
