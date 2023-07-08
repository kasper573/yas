import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { z } from "zod";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, ComponentType } from "react";
import { createForm } from "../createForm";

describe("components", () => {
  it("can be defined by value type", () => {
    const Form = createForm({
      components: (builder) =>
        builder
          .type(z.string(), () => <span>text</span>)
          .type(z.number(), () => <span>number</span>),
    });
    const { getByText } = render(
      <Form schema={z.object({ foo: z.number() })} />,
    );
    getByText("number");
  });

  it("can be defined per field name", () => {
    const Form = createForm({
      components: (builder) =>
        builder
          .field("foo", () => <span>foo</span>)
          .field("bar", () => <span>bar</span>),
    });
    const { getByText } = render(
      <Form schema={z.object({ bar: z.number() })} />,
    );
    getByText("bar");
  });

  describe("can be extended from predefined forms", () => {
    it("by value type", () => {
      const Form = createForm({
        components: (builder) =>
          builder.type(z.string(), () => <span>text</span>),
      });
      const ExtendedForm = Form.extend({
        components: (builder) =>
          builder.type(z.number(), () => <span>number</span>),
      });
      const { getByText } = render(
        <ExtendedForm
          schema={z.object({ foo: z.string(), bar: z.number() })}
        />,
      );
      getByText("number");
      getByText("text");
    });

    it("by field name", () => {
      const Form = createForm({
        components: (builder) => builder.field("foo", () => <span>foo</span>),
      });
      const ExtendedForm = Form.extend({
        components: (builder) => builder.field("bar", () => <span>bar</span>),
      });
      const { getByText } = render(
        <ExtendedForm
          schema={z.object({ foo: z.string(), bar: z.number() })}
        />,
      );
      getByText("foo");
      getByText("bar");
    });
  });
});

describe("layout", () => {
  it("can be defined", () => {
    const Form = createForm({ layout: () => <span>default</span> });
    const { getByText } = render(<Form />);
    getByText("default");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm();
    const ExtendedForm = Form.extend({
      layout: () => <span>extended</span>,
    });
    const { getByText } = render(<ExtendedForm />);
    getByText("extended");
  });

  it("can control where fields are rendered", () => {
    const Form = createForm({
      components: (builder) =>
        builder.type(z.string(), ({ name }) => <span>{name}</span>),
    });
    const { baseElement } = render(
      <Form schema={z.object({ foo: z.string(), bar: z.string() })}>
        {({ fields: { Foo, Bar } }) => (
          <main>
            <section>
              <Foo />
            </section>
            <section>
              <Bar />
            </section>
          </main>
        )}
      </Form>,
    );
    expect(baseElement.innerHTML).toBe(
      `<div><main><section><span>foo</span></section><section><span>bar</span></section></main></div>`,
    );
  });

  it("can override field component props", () => {
    const Form = createForm({
      components: (builder) =>
        builder.type(z.string(), ({ name }) => <span>{name}</span>),
    });
    const { getByText } = render(
      <Form schema={z.object({ foo: z.string() })}>
        {({ fields: { Foo } }) => <Foo name="bar" />}
      </Form>,
    );
    getByText("bar");
  });
});

describe("schema", () => {
  it("can be predefined", () => {
    const Form = createForm({
      schema: z.object({ foo: z.string() }),
      components: (builder) => builder.type(z.string(), () => <span>foo</span>),
    });
    const { getByText } = render(<Form />);
    getByText("foo");
  });

  it("can be inlined", () => {
    const Form = createForm({
      components: (builder) => builder.type(z.string(), () => <span>foo</span>),
    });
    const { getByText } = render(
      <Form schema={z.object({ foo: z.string() })} />,
    );
    getByText("foo");
  });

  it("inlined replaces predefined", () => {
    const Form = createForm({
      schema: z.object({ foo: z.string() }),
      components: (builder) =>
        builder.type(z.string(), ({ name }) => <span>{name}</span>),
    });
    const { getByText, queryByText } = render(
      <Form schema={z.object({ bar: z.string() })} />,
    );
    expect(queryByText("foo")).toBeNull();
    getByText("bar");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm({
      schema: z.object({ foo: z.string() }),
      components: (builder) =>
        builder.type(z.string(), ({ name }) => <span>{name}</span>),
    });
    const ExtendedForm = Form.extend({
      schema: z.object({ bar: z.string() }),
    });
    const { getByText } = render(<ExtendedForm />);
    getByText("bar");
  });
});

describe("data", () => {
  it("can be displayed", () => {
    const Form = createForm({
      components: (builder) =>
        builder.type(z.string(), ({ value }) => (
          <input defaultValue={String(value)} />
        )),
    });
    const { getByRole } = render(
      <Form schema={z.object({ foo: z.string() })} data={{ foo: "bar" }} />,
    );
    expect(getByRole("textbox")).toHaveValue("bar");
  });

  it("can be updated", async () => {
    const Form = createForm({
      components: (builder) =>
        builder.type(z.string(), ({ onChange, ...rest }) => (
          <input onChange={(e) => onChange(e.target.value)} {...rest} />
        )),
    });
    const { getByRole } = render(
      <Form schema={z.object({ foo: z.string() })} data={{ foo: "bar" }} />,
    );

    await userEvent.clear(getByRole("textbox"));
    await userEvent.type(getByRole("textbox"), "baz");
    expect(getByRole("textbox")).toHaveValue("baz");
  });

  it("changes to one field does not re-render other fields", async () => {
    const Bar = renderCounter(({ name, ...rest }) => (
      <input aria-label={name} {...rest} />
    ));
    const Foo = renderCounter(({ name, ...rest }) => (
      <input aria-label={name} {...rest} />
    ));
    const Form = createForm({
      schema: z.object({ foo: z.string(), bar: z.string() }),
      components: (builder) => builder.field("foo", Foo).field("bar", Bar),
    });
    const { getByRole } = render(<Form data={{ foo: "" }} />);
    const fooBefore = Foo.getCount();
    const barBefore = Bar.getCount();
    await userEvent.type(getByRole("textbox", { name: "foo" }), "baz");
    expect(Foo.getCount() - fooBefore).toBe(3);
    expect(Bar.getCount() - barBefore).toBe(0);
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderCounter<T extends ComponentType<any>>(Component: T) {
  let count = 0;
  function Wrapper(props: ComponentProps<T>) {
    count++;
    return <Component {...props} />;
  }
  Wrapper.getCount = () => count;
  return Wrapper;
}
