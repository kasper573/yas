import { z } from "zod";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createForm } from "../createForm";

describe("layout", () => {
  it("can be defined", () => {
    const Form = createForm((options) =>
      options.layout(() => <span>default</span>),
    );
    const { getByText } = render(<Form />);
    getByText("default");
  });

  it("can be given default props", () => {
    const Layout = ({ foo }: { foo: string }) => <span>{`foo:${foo}`}</span>;
    const Form = createForm((options) =>
      options.layout(Layout, { foo: "bar" }),
    );

    const { getByText, rerender } = render(<Form />);
    getByText("foo:bar");
    rerender(<Form foo="baz" />);
    getByText("foo:baz");
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

  it("can submit the form when adding submit handler after mount", async () => {
    const onSubmit = jest.fn();
    const Form = createForm((options) =>
      options
        .schema(z.object({ foo: z.string() }))
        .layout(({ handleSubmit }) => (
          <button onClick={handleSubmit}>submit</button>
        )),
    );
    const { getByText, rerender } = render(<Form value={{ foo: "hello" }} />);

    rerender(<Form value={{ foo: "hello" }} onSubmit={onSubmit} />);

    await userEvent.click(getByText("submit"));
    expect(onSubmit).toHaveBeenCalledWith({ foo: "hello" });
  });
});
