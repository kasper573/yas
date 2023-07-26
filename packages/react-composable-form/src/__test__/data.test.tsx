import "@testing-library/jest-dom";
import { z } from "zod";
import { render } from "@testing-library/react";
import type { ComponentProps, ComponentType } from "react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { createForm } from "../createForm";

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
          <input onChange={(e) => onChange?.(e.target.value)} {...rest} />
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
            onChange={(e) => onChange?.(e.target.value)}
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
            onChange={(e) => onChange?.(e.target.value)}
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

function renderCounter<T extends ComponentType<any>>(Component: T) {
  let count = 0;
  function Wrapper(props: ComponentProps<T>) {
    count++;
    return <Component {...props} />;
  }
  Wrapper.getCount = () => count;
  return Wrapper;
}
