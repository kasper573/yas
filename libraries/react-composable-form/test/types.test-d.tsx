import { z } from "zod";
import type { ComponentType } from "react";
import { describe, it, expectTypeOf } from "@yas/test/vitest/react";
import type { inferFormValue } from "../src/createForm";
import { createForm } from "../src/createForm";
import type { FieldProps } from "../src/types/optionTypes";

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

describe("Type associated components have the correct property types in layout", () => {
  it("strings and numbers", () => {
    const schema = z.object({ foo: z.string(), bar: z.number() });
    createForm((options) =>
      options
        .schema(schema)
        .type(z.string(), (props: { foo?: string }) => null)
        .type(z.number(), (props: { bar?: number }) => null)
        .layout(({ fields: { Foo, Bar } }) => {
          expectTypeOf(Foo).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<string, z.infer<typeof schema>> & { foo?: string }
              >
            >
          >();
          expectTypeOf(Bar).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<number, z.infer<typeof schema>> & { bar?: number }
              >
            >
          >();
          return null;
        }),
    );
  });

  it("branded types of different kinds", () => {
    type Str = z.infer<typeof str>;
    const str = z.string().brand("str");
    type Num = z.infer<typeof num>;
    const num = z.number().brand("num");
    const schema = z.object({ foo: str, bar: num });

    createForm((options) =>
      options
        .schema(schema)
        .type(str, (props: { foo?: Str }) => null)
        .type(num, (props: { bar?: Num }) => null)
        .layout(({ fields: { Foo, Bar } }) => {
          expectTypeOf(Foo).toEqualTypeOf<
            ComponentType<
              Partial<FieldProps<Str, z.infer<typeof schema>> & { foo?: Str }>
            >
          >();
          expectTypeOf(Bar).toEqualTypeOf<
            ComponentType<
              Partial<FieldProps<Num, z.infer<typeof schema>> & { bar?: Num }>
            >
          >();
          return null;
        }),
    );
  });

  it("branded types of same kinds", () => {
    type First = z.infer<typeof first>;
    const first = z.string().brand("first");
    type Second = z.infer<typeof second>;
    const second = z.string().brand("second");
    const schema = z.object({ first, second });

    createForm((options) =>
      options
        .schema(schema)
        .type(first, (props: { foo?: First }) => null)
        .type(second, (props: { bar?: Second }) => null)
        .layout(({ fields: { First, Second } }) => {
          expectTypeOf(First).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<First, z.infer<typeof schema>> & { foo?: First }
              >
            >
          >();
          expectTypeOf(Second).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<Second, z.infer<typeof schema>> & { bar?: Second }
              >
            >
          >();
          return null;
        }),
    );
  });

  it("strings, numbers and branded types mixed", () => {
    type Branded = z.infer<typeof branded>;
    const branded = z.string().brand("brand");
    const schema = z.object({ str: z.string(), branded });
    createForm((options) =>
      options
        .schema(schema)
        .type(z.string(), (props: { foo?: string }) => null)
        .type(branded, (props: { bar?: Branded }) => null)
        .layout(({ fields: { Str, Branded } }) => {
          expectTypeOf(Str).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<string, z.infer<typeof schema>> & { foo?: string }
              >
            >
          >();
          expectTypeOf(Branded).toEqualTypeOf<
            ComponentType<
              Partial<
                FieldProps<Branded, z.infer<typeof schema>> & { bar?: Branded }
              >
            >
          >();
          return null;
        }),
    );
  });
});

it("Field associated components have the correct property types in layout", () => {
  const schema = z.object({ foo: z.string(), bar: z.number() });
  createForm((options) =>
    options
      .schema(schema)
      .field("foo", (props: { foo?: string }) => null)
      .field("bar", (props: { bar?: number }) => null)
      .layout(({ fields: { Foo, Bar } }) => {
        expectTypeOf(Foo).toEqualTypeOf<
          ComponentType<
            Partial<
              FieldProps<string, z.infer<typeof schema>> & { foo?: string }
            >
          >
        >();
        expectTypeOf(Bar).toEqualTypeOf<
          ComponentType<
            Partial<
              FieldProps<number, z.infer<typeof schema>> & { bar?: number }
            >
          >
        >();
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
