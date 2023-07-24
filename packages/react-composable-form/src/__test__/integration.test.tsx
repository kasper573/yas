import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import type { ZodType } from "zod";
import { z } from "zod";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, ComponentType } from "react";
import { useState } from "react";
import { createForm } from "../createForm";

import type { FieldProps } from "../types/optionTypes";

describe("components", () => {
  describe("can be defined by value type", () => {
    for (const { name, type, wrong } of [
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
        name: "object",
        type: z.object({ one: z.string() }),
        wrong: z.object({ two: z.number() }),
      },
    ]) {
      describe(name, () => testType(type, wrong));
      describe(`optional ${name}`, () =>
        testType(type.optional(), wrong.optional()));
      describe(`nullable ${name}`, () =>
        testType(type.nullable(), wrong.nullable()));
      describe(`nullish ${name}`, () =>
        testType(type.nullish(), wrong.nullish()));
      describe(`array of ${name}`, () => testType(type.array(), wrong.array()));
    }

    function testType(correctType: ZodType, wrongType: ZodType) {
      it("alone", () => testTypeAlone(correctType));
      it("among others", () => testTypeCollision(correctType, wrongType));
    }

    function testTypeAlone(type: ZodType) {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: type }))
          .type(type, () => <span>found</span>),
      );
      const { getByText } = render(<Form />);
      getByText("found");
    }

    function testTypeCollision(correctType: ZodType, wrongType: ZodType) {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: correctType }))
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

describe("layout", () => {
  it("can be defined", () => {
    const Form = createForm((options) =>
      options.layout(() => <span>default</span>),
    );
    const { getByText } = render(<Form />);
    getByText("default");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm();
    const ExtendedForm = Form.extend((options) =>
      options.layout(() => <span>extended</span>),
    );
    const { getByText } = render(<ExtendedForm />);
    getByText("extended");
  });

  it("can control where fields are rendered", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .type(z.string(), ({ name }) => <span>{name}</span>)
        .layout(({ fields: { Foo, Bar } }) => (
          <main>
            <section>
              <Foo />
            </section>
            <section>
              <Bar />
            </section>
          </main>
        )),
    );
    const { baseElement } = render(<Form />);
    expect(baseElement.innerHTML).toBe(
      `<div><main><section><span>foo</span></section><section><span>bar</span></section></main></div>`,
    );
  });

  it("can override field component props", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ name }) => <span>{name}</span>)
        .layout(({ fields: { Foo } }) => <Foo name="bar" />),
    );
    const { getByText } = render(<Form />);
    getByText("bar");
  });

  it("inherits the form props", () => {
    const Form = createForm((options) =>
      options.layout(({ foo }: { foo: string }) => <main>{foo}</main>),
    );
    const { getByText } = render(<Form foo="bar" />);
    getByText("bar");
  });

  it("can submit the form", async () => {
    const onSubmit = jest.fn();
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .layout(({ handleSubmit }) => (
          <button onClick={handleSubmit}>submit</button>
        )),
    );
    const { getByText } = render(
      <Form value={{ foo: "hello" }} onSubmit={onSubmit} />,
    );
    await userEvent.click(getByText("submit"));
    expect(onSubmit).toHaveBeenCalledWith({ foo: "hello" });
  });
});

describe("schema", () => {
  it("defines which fields are rendered", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), () => <span>foo</span>),
    );
    const { getByText } = render(<Form />);
    getByText("foo");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ name }) => <span>{name}</span>),
    );
    const ExtendedForm = Form.extend((options) =>
      options.schema(z.object({ bar: z.string() })),
    );
    const { getByText } = render(<ExtendedForm />);
    getByText("bar");
  });
});

describe("data", () => {
  it("can be displayed", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ value }) => (
          <input defaultValue={String(value)} />
        )),
    );
    const { getByRole } = render(<Form value={{ foo: "bar" }} />);
    expect(getByRole("textbox")).toHaveValue("bar");
  });

  it("can be updated via props", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, ...rest }) => (
          <input onChange={(e) => onChange(e.target.value)} {...rest} />
        )),
    );
    function App() {
      const [data, setData] = useState({ foo: "default" });
      return (
        <>
          <Form value={data} onChange={setData} />
          <button onClick={() => setData({ foo: "changed" })}>change</button>
        </>
      );
    }

    const { getByRole } = render(<App />);

    await userEvent.click(getByRole("button"));
    expect(getByRole("textbox")).toHaveValue("changed");
  });

  it("can be updated via input", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "", ...rest }) => (
          <input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            {...rest}
          />
        )),
    );
    const { getByRole } = render(<Form />);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "baz");
    expect(getByRole("textbox")).toHaveValue("baz");
  });

  it("can be emitted", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .type(z.string(), ({ onChange, value = "", ...rest }) => (
          <input
            onChange={(e) => onChange(e.target.value)}
            value={value}
            {...rest}
          />
        )),
    );

    let data: unknown;
    const { getByRole } = render(<Form onChange={(d) => (data = d)} />);

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "input");
    expect(data).toEqual({ foo: "input" });
  });

  it("changes to one field does not re-render other fields", async () => {
    const Bar = renderCounter(({ name, ...rest }) => (
      <input aria-label={name} {...rest} />
    ));
    const Foo = renderCounter(({ name, ...rest }) => (
      <input aria-label={name} {...rest} />
    ));
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .field("foo", Foo)
        .field("bar", Bar),
    );
    const { getByRole } = render(<Form value={{ foo: "", bar: "" }} />);
    const fooBefore = Foo.getCount();
    const barBefore = Bar.getCount();
    await userEvent.type(getByRole("textbox", { name: "foo" }), "baz");
    expect(Foo.getCount() - fooBefore).toBe(3);
    expect(Bar.getCount() - barBefore).toBe(0);
  });
});

describe("validation", () => {
  it("displays errors on submit by default", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string().min(3) }))
        .type(z.string(), ({ errors = [] }) => (
          <span>{errors.length ? errors.join(",") : "No errors"}</span>
        ))
        .layout(({ fields: { Foo }, handleSubmit }) => (
          <>
            <Foo />
            <button onClick={handleSubmit}>submit</button>
          </>
        )),
    );
    const { getByText } = render(<Form value={{ foo: "" }} />);
    getByText("No errors");
    await userEvent.click(getByText("submit"));
    getByText("String must contain at least 3 character(s)");
  });

  it("can display errors on blur", async () => {
    const Form = createForm((options) =>
      options
        .validate("blur")
        .schema(z.object({ foo: z.string().min(3), bar: z.string().min(5) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              <span>
                {`${name}: ${errors.length ? errors.join(",") : "No errors"}`}
              </span>
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(
      <Form value={{ foo: "", bar: "" }} />,
    );
    getByText("foo: No errors");
    getByText("bar: No errors");
    await userEvent.click(getByRole("textbox", { name: "foo" }));
    await userEvent.tab();
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: No errors");
    await userEvent.click(getByRole("textbox", { name: "bar" }));
    await userEvent.tab();
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: String must contain at least 5 character(s)");
  });

  it("can display errors on change", async () => {
    const Form = createForm((options) =>
      options
        .validate("change")
        .schema(z.object({ foo: z.string().min(3), bar: z.string().min(5) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              <span>
                {`${name}: ${errors.length ? errors.join(",") : "No errors"}`}
              </span>
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(
      <Form value={{ foo: "", bar: "" }} />,
    );
    getByText("foo: No errors");
    getByText("bar: No errors");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "b");
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: No errors");
    await userEvent.type(getByRole("textbox", { name: "bar" }), "b");
    getByText("foo: String must contain at least 3 character(s)");
    getByText("bar: String must contain at least 5 character(s)");
  });

  it("can fix errors", async () => {
    const Form = createForm((options) =>
      options
        .validate("change")
        .schema(z.object({ foo: z.string().min(3) }))
        .type(
          z.string(),
          ({ onChange, value = "", errors = [], name, ...rest }) => (
            <>
              <input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                aria-label={name}
                {...rest}
              />
              {errors.length ? errors.join(",") : "No errors"}
            </>
          ),
        ),
    );
    const { getByRole, getByText } = render(<Form value={{ foo: "" }} />);
    getByText("No errors");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "b");
    getByText("String must contain at least 3 character(s)");
    await userEvent.type(getByRole("textbox", { name: "foo" }), "bar");
    getByText("No errors");
  });

  it("does not trigger submit for invalid data", async () => {
    const onSubmit = jest.fn();
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string().min(3) }))
        .layout(({ handleSubmit }) => (
          <button onClick={handleSubmit}>submit</button>
        )),
    );
    const { getByText } = render(
      <Form value={{ foo: "" }} onSubmit={onSubmit} />,
    );
    await userEvent.click(getByText("submit"));
    expect(onSubmit).not.toHaveBeenCalled();
  });
});

function renderCounter<T extends ComponentType<any>>(Component: T) {
  let count = 0;
  function Wrapper(props: ComponentProps<T>) {
    count++;
    return <Component {...props} />;
  }
  Wrapper.getCount = () => count;
  return Wrapper;
}

function silenceErrorLogs() {
  const original = console.error;
  console.error = () => {};
  return () => {
    console.error = original;
  };
}
