import type { AnyZodObject, ZodType } from "zod";
import { z } from "zod";
import { render } from "@testing-library/react";
import { createForm } from "../createForm";
import type { FieldProps } from "../types/optionTypes";
import { silenceErrorLogs } from "./utils";

describe("components", () => {
  describe("can be defined by value type", () => {
    enum EnumA {
      Foo,
    }
    enum EnumB {
      Bar,
    }
    for (const { name, type, schemaType, wrong } of [
      { name: "any", type: z.number(), wrong: z.string(), schemaType: z.any() },
      { name: "number", type: z.number(), wrong: z.string() },
      { name: "string", type: z.string(), wrong: z.number() },
      { name: "boolean", type: z.boolean(), wrong: z.string() },
      { name: "date", type: z.date(), wrong: z.string() },
      {
        name: "enum",
        type: z.enum(["correct1", "correct2", "correct3"]),
        wrong: z.enum(["wrong1", "wrong2", "wrong3"]),
      },
      {
        name: "nativeEnum",
        type: z.nativeEnum(EnumA),
        wrong: z.nativeEnum(EnumB),
      },
      {
        name: "object",
        type: z.object({ one: z.string() }),
        wrong: z.object({ two: z.number() }),
      },
    ]) {
      describe(name, () => {
        testType(type, wrong, schemaType);
        describe(`optional`, () =>
          testType(type.optional(), wrong.optional(), schemaType));
        describe(`nullable`, () =>
          testType(type.nullable(), wrong.nullable(), schemaType));
        describe(`nullish`, () =>
          testType(type.nullish(), wrong.nullish(), schemaType));
        describe(`array`, () =>
          testType(type.array(), wrong.array(), schemaType));
      });
    }

    function testType(
      correctType: ZodType,
      wrongType: ZodType,
      schemaType?: ZodType,
    ) {
      it("alone", () => testTypeAlone(correctType, schemaType));
      it("among others", () =>
        testTypeCollision(correctType, wrongType, schemaType));
    }

    function testTypeAlone(type: ZodType, schemaType = type) {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: schemaType }))
          .type(type, () => <span>found</span>),
      );
      const { getByText } = render(<Form />);
      getByText("found");
    }

    function testTypeCollision(
      correctType: ZodType,
      wrongType: ZodType,
      schemaType = correctType,
    ) {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: schemaType }))
          .type(correctType, () => <span>correct</span>)
          .type(wrongType, () => <span>incorrect</span>),
      );
      const { getByText } = render(<Form />);
      getByText("correct");
    }
  });

  it("can be defined per field name", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ bar: z.number() }))
        .field("bar", () => <span>bar</span>),
    );
    const { getByText } = render(<Form />);
    getByText("bar");
  });

  it("inherits props from layout composition", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .field("foo", FieldImpl)
        .type(z.string(), TypeImpl)
        .layout(({ fields: { Foo, Bar } }) => (
          <>
            <Foo prop={123} />
            <Bar prop="two" />
          </>
        )),
    );

    function FieldImpl({ prop }: { prop?: number } & FieldProps<string>) {
      return <span>{prop}</span>;
    }

    function TypeImpl({ prop }: { prop?: string } & FieldProps<string>) {
      return <span>{prop}</span>;
    }

    const { getByText } = render(<Form />);
    getByText("123");
    getByText("two");
  });

  it("can specify initial props", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .field("foo", FieldImpl, { prop: 123 })
        .type(z.string(), TypeImpl, { prop: "two" }),
    );

    function FieldImpl({ prop }: { prop: number } & FieldProps<string>) {
      return <span>{prop}</span>;
    }

    function TypeImpl({ prop }: { prop: string } & FieldProps<string>) {
      return <span>{prop}</span>;
    }

    const { getByText } = render(<Form />);
    getByText("123");
    getByText("two");
  });

  it("throws when trying to render a form with a field that has no component defined", () => {
    const restoreErrorLogs = silenceErrorLogs();
    const Form = createForm((options) =>
      options.schema(z.object({ foo: z.string() })),
    );
    expect(() => render(<Form />)).toThrow(
      'No component available for field "foo" or type ZodString',
    );
    restoreErrorLogs();
  });

  describe("knows when a field is required", () => {
    function renderOptional(type: AnyZodObject) {
      const Form = createForm((options) =>
        options
          .schema(type)
          .type(z.string(), ({ required }) => (
            <span>{required ? "required" : "optional"}</span>
          )),
      );
      return render(<Form />);
    }
    it("plain types are required by default", () => {
      const { getByText } = renderOptional(z.object({ foo: z.string() }));
      getByText("required");
    });
    it(".optional() makes optional", () => {
      const { getByText } = renderOptional(
        z.object({ foo: z.string().optional() }),
      );
      getByText("optional");
    });
    it(".nullish() counts as optional", () => {
      const { getByText } = renderOptional(
        z.object({ foo: z.string().nullish() }),
      );
      getByText("optional");
    });
    it(".nullable() does not count as optional", () => {
      const { getByText } = renderOptional(
        z.object({ foo: z.string().nullable() }),
      );
      getByText("required");
    });
    it(".optional().transform() counts as optional", () => {
      const { getByText } = renderOptional(
        z.object({
          foo: z
            .string()
            .optional()
            .transform((v) => v?.repeat(2)),
        }),
      );
      getByText("optional");
    });
  });

  describe("can be extended from predefined forms", () => {
    it("by value type", () => {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: z.string(), bar: z.number() }))
          .type(z.string(), () => <span>text</span>),
      );
      const ExtendedForm = Form.extend((options) =>
        options.type(z.number(), () => <span>number</span>),
      );
      const { getByText } = render(<ExtendedForm />);
      getByText("number");
      getByText("text");
    });

    it("by field name", () => {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: z.string(), bar: z.number() }))
          .field("foo", () => <span>foo</span>),
      );
      const ExtendedForm = Form.extend((options) =>
        options.field("bar", () => <span>bar</span>),
      );
      const { getByText } = render(<ExtendedForm />);
      getByText("foo");
      getByText("bar");
    });
  });
});
