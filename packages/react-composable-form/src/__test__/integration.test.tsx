import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { z } from "zod";
import userEvent from "@testing-library/user-event";
import type { ComponentProps, ComponentType } from "react";
import { useState } from "react";
import { createForm } from "../createForm";
import type { FormFieldProps } from "../types/commonTypes";

describe("components", () => {
  it("can be defined by value type", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.number() }))
        .components((builder) =>
          builder
            .type(z.string(), () => <span>text</span>)
            .type(z.number(), () => <span>number</span>),
        ),
    );
    const { getByText } = render(<Form />);
    getByText("number");
  });

  it("can be defined per field name", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ bar: z.number() }))
        .components((builder) =>
          builder
            .field("foo", () => <span>foo</span>)
            .field("bar", () => <span>bar</span>),
        ),
    );
    const { getByText } = render(<Form />);
    getByText("bar");
  });

  it("inherits props from layout composition", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string(), bar: z.string() }))
        .components((add) =>
          add.field("foo", FieldImpl).type(z.string(), TypeImpl),
        )
        .layout(({ fields: { Foo, Bar } }) => (
          <>
            <Foo prop={123} />
            <Bar prop="two" />
          </>
        )),
    );

    function FieldImpl({ prop }: { prop: number } & FormFieldProps) {
      return <span>{prop}</span>;
    }

    function TypeImpl({ prop }: { prop: string } & FormFieldProps) {
      return <span>{prop}</span>;
    }

    const { getByText } = render(<Form />);
    getByText("123");
    getByText("two");
  });

  describe("can be extended from predefined forms", () => {
    it("by value type", () => {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: z.string(), bar: z.number() }))
          .components((builder) =>
            builder.type(z.string(), () => <span>text</span>),
          ),
      );
      const ExtendedForm = Form.extend((options) =>
        options.components((builder) =>
          builder.type(z.number(), () => <span>number</span>),
        ),
      );
      const { getByText } = render(<ExtendedForm />);
      getByText("number");
      getByText("text");
    });

    it("by field name", () => {
      const Form = createForm((options) =>
        options
          .schema(z.object({ foo: z.string(), bar: z.number() }))
          .components((builder) =>
            builder.field("foo", () => <span>foo</span>),
          ),
      );
      const ExtendedForm = Form.extend((options) =>
        options.components((builder) =>
          builder.field("bar", () => <span>bar</span>),
        ),
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
        .components((builder) =>
          builder.type(z.string(), ({ name }) => <span>{name}</span>),
        )
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
        .components((builder) =>
          builder.type(z.string(), ({ name }) => <span>{name}</span>),
        )
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
});

describe("schema", () => {
  it("defines which fields are rendered", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .components((builder) =>
          builder.type(z.string(), () => <span>foo</span>),
        ),
    );
    const { getByText } = render(<Form />);
    getByText("foo");
  });

  it("can be extended from predefined forms", () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .components((builder) =>
          builder.type(z.string(), ({ name }) => <span>{name}</span>),
        ),
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
        .components((builder) =>
          builder.type(z.string(), ({ value }) => (
            <input defaultValue={String(value)} />
          )),
        ),
    );
    const { getByRole } = render(<Form value={{ foo: "bar" }} />);
    expect(getByRole("textbox")).toHaveValue("bar");
  });

  it("can be updated via props", async () => {
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .components((builder) =>
          builder.type(z.string(), ({ onChange, ...rest }) => (
            <input onChange={(e) => onChange(e.target.value)} {...rest} />
          )),
        ),
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
        .components((builder) =>
          builder.type(z.string(), ({ onChange, value = "", ...rest }) => (
            <input
              onChange={(e) => onChange(e.target.value)}
              value={value}
              {...rest}
            />
          )),
        ),
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
        .components((builder) =>
          builder.type(z.string(), ({ onChange, value = "", ...rest }) => (
            <input
              onChange={(e) => onChange(e.target.value)}
              value={value}
              {...rest}
            />
          )),
        ),
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
        .components((add) => add.field("foo", Foo).field("bar", Bar)),
    );
    const { getByRole } = render(<Form value={{ foo: "", bar: "" }} />);
    const fooBefore = Foo.getCount();
    const barBefore = Bar.getCount();
    await userEvent.type(getByRole("textbox", { name: "foo" }), "baz");
    expect(Foo.getCount() - fooBefore).toBe(3);
    expect(Bar.getCount() - barBefore).toBe(0);
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
