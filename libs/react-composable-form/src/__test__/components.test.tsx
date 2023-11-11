import type { AnyZodObject, ZodType } from "zod";
import { z } from "zod";
import { render, userEvent } from "@yas/test/vitest/react";
import { createForm } from "../createForm";
import type { FieldProps } from "../types/optionTypes";
import type { FieldPropNamesAvailableInDefaults } from "../types/optionTypes";

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

  it("shows error when trying to render a form with a field that has no component defined", () => {
    const Form = createForm((options) =>
      options.schema(z.object({ foo: z.string() })),
    );
    const { getByText } = render(<Form />);
    getByText('No component available for field "foo" or type ZodString');
  });

  describe("selects the correct components when using multiple branded types", () => {
    it("tuple", () => test(z.tuple([z.number(), z.number()])));
    it("number", () => test(z.number()));
    it("string", () => test(z.string()));
    it("object", () => test(z.object({ foo: z.string() })));
    it("array", () => test(z.array(z.string())));

    function test(base: ZodType) {
      const brand1 = base.brand("brand1");
      const brand2 = base.brand("brand2");

      const Form = createForm((options) =>
        options
          .schema(
            z.object({
              base,
              brand1,
              brand2,
            }),
          )
          .type(base, Field, { param: 1 })
          .type(brand1, Field, { param: 2 })
          .type(brand2, Field, { param: 3 }),
      );

      function Field({ name, param }: FieldProps & { param: number }) {
        return <span>{`${name}:${param}`}</span>;
      }

      const { getByText } = render(<Form />);
      getByText("base:1");
      getByText("brand1:2");
      getByText("brand2:3");
    }
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

describe("overriding built-in props", () => {
  describe("embedded defaults", () => {
    const tests = {
      value() {
        const { getByRole } = createFieldPropForm("value", "default");
        expect(getByRole("textbox")).toHaveValue("default");
      },
      async onBlur() {
        const fn = vi.fn();
        const { getByRole } = createFieldPropForm("onBlur", fn);
        await userEvent.click(getByRole("textbox"));
        await userEvent.tab();
        expect(fn).toHaveBeenCalled();
      },
      async onChange() {
        const fn = vi.fn();
        const { getByRole } = createFieldPropForm("onChange", fn);
        await userEvent.type(getByRole("textbox"), "hello");
        expect(fn).toHaveBeenCalledTimes(5);
      },
      async onFocus() {
        const fn = vi.fn();
        const { getByRole } = createFieldPropForm("onFocus", fn);
        await userEvent.click(getByRole("textbox"));
        expect(fn).toHaveBeenCalled();
      },
    } satisfies Record<FieldPropNamesAvailableInDefaults, () => unknown>;

    for (const [prop, test] of Object.entries(tests)) {
      it(prop, test);
    }
  });

  describe("embedded defaults and inline props via layout", () => {
    const tests = {
      value() {
        const { getByRole } = createFieldPropForm("value", "default", "inline");
        expect(getByRole("textbox")).toHaveValue("inline");
      },
      async onBlur() {
        const fn = vi.fn();
        const fn2 = vi.fn();
        const { getByRole } = createFieldPropForm("onBlur", fn, fn2);
        await userEvent.click(getByRole("textbox"));
        await userEvent.tab();
        expect(fn).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled();
      },
      async onChange() {
        const fn = vi.fn();
        const fn2 = vi.fn();
        const { getByRole } = createFieldPropForm("onChange", fn, fn2);
        await userEvent.type(getByRole("textbox"), "hello");
        expect(fn).toHaveBeenCalledTimes(5);
        expect(fn2).toHaveBeenCalledTimes(5);
      },
      async onFocus() {
        const fn = vi.fn();
        const fn2 = vi.fn();
        const { getByRole } = createFieldPropForm("onFocus", fn, fn2);
        await userEvent.click(getByRole("textbox"));
        expect(fn).toHaveBeenCalled();
        expect(fn2).toHaveBeenCalled();
      },
    } satisfies Record<FieldPropNamesAvailableInDefaults, () => unknown>;

    for (const [prop, test] of Object.entries(tests)) {
      it(prop, test);
    }
  });

  function createFieldPropForm(
    name: FieldPropNamesAvailableInDefaults,
    defaultValue?: unknown,
    layoutValue?: unknown,
  ) {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(
          z.string(),
          (props) => <input onChange={() => {}} {...{ [name]: props[name] }} />,
          {
            [name]: defaultValue,
          },
        )
        .layout(({ fields: { Foo } }) => <Foo {...{ [name]: layoutValue }} />),
    );
    return render(<Form />);
  }
});
